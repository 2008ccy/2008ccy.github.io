import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import {
  copyFile,
  lstat,
  mkdir,
  readFile,
  readdir,
  realpath,
  stat,
  writeFile,
} from "node:fs/promises";
import {
  dirname,
  extname,
  isAbsolute,
  relative,
  resolve,
  sep,
} from "node:path";
import { fileURLToPath } from "node:url";
import { parse, stringify } from "yaml";

const defaultHomepage = fileURLToPath(new URL("../../", import.meta.url));
const assetPrefix = "/notes/note/handwrite_notes/";

async function exists(path) {
  try {
    await lstat(path);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function filesIn(directory, extensions) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const path = resolve(directory, entry.name);
    if (entry.isSymbolicLink())
      throw new Error(`请先处理源目录中的符号链接：${path}`);
    if (entry.isDirectory()) files.push(...(await filesIn(path, extensions)));
    else if (extensions.includes(extname(path).toLowerCase())) files.push(path);
  }
  return files.sort();
}

function splitNote(text, path) {
  text = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  if (!text.startsWith("---\n")) return { metadata: {}, body: text };
  const match = text.match(/^---\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/);
  if (!match) throw new Error(`笔记信息区缺少结束的 ---：${path}`);
  const metadata = parse(match[1]) ?? {};
  if (typeof metadata !== "object" || Array.isArray(metadata)) {
    throw new Error(`笔记信息区必须是 YAML 键值对：${path}`);
  }
  return { metadata, body: match[2] };
}

// Keep code examples intact when converting headings and Markdown links.
function mapProse(body, transform) {
  let fence;
  return body
    .split("\n")
    .map(line => {
      const marker = line.match(/^ {0,3}(`{3,}|~{3,})/);
      if (marker) {
        if (!fence) fence = marker[1];
        else if (marker[1][0] === fence[0] && marker[1].length >= fence.length)
          fence = undefined;
        return line;
      }
      return fence ? line : transform(line);
    })
    .join("\n");
}

function dateValue(value, path) {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}T/.test(value) ||
    Number.isNaN(Date.parse(value))
  ) {
    throw new Error(`发布时间格式错误（需完整 ISO 日期时间）：${path}`);
  }
  return value;
}

function formatNote(source, previous, path, modifiedTime, pdfPaths) {
  const { metadata: incoming } = source;
  const existing = previous?.metadata ?? {};
  if (existing.draft !== undefined && typeof existing.draft !== "boolean") {
    throw new Error(`网站端 draft 必须为 true 或 false：${path}`);
  }
  let heading;
  let body = mapProse(source.body, line => {
    const match = line.match(/^#\s+(.+)$/);
    if (match && !heading) {
      heading = match[1];
      return heading;
    }
    return line;
  });
  const metadata = {
    ...existing,
    ...incoming,
    title:
      incoming.title ||
      existing.title ||
      heading ||
      path
        .split(/[\\/]/)
        .pop()
        .replace(/\.(md|mdx)$/i, ""),
    description:
      incoming.description ||
      existing.description ||
      `${heading || "学习笔记"}的知识点、推导和手写原稿。`,
    pubDatetime: dateValue(
      existing.pubDatetime ||
        incoming.pubDatetime ||
        modifiedTime.toISOString(),
      path
    ),
    tags: incoming.tags ?? existing.tags ?? ["学习笔记"],
    // An existing entry without a draft field is already public in Astro.
    draft: previous ? (existing.draft ?? false) : true,
  };
  if (
    typeof metadata.title !== "string" ||
    typeof metadata.description !== "string"
  ) {
    throw new Error(`title 和 description 必须是文字：${path}`);
  }
  if (
    !Array.isArray(metadata.tags) ||
    metadata.tags.some(tag => typeof tag !== "string")
  ) {
    throw new Error(`tags 必须是文字数组：${path}`);
  }
  if (metadata.modDatetime != null) dateValue(metadata.modDatetime, path);

  let hasManuscript = false;
  function pdfLink(url) {
    if (/^(?:[a-z][\w+.-]*:|\/\/)/i.test(url)) return url;
    const match = url.match(/^(.*?)([?#].*)?$/);
    const location = decodeURIComponent(match[1]);
    const marker = "handwrite_notes/";
    const index = location.indexOf(marker);
    if (index < 0) return url;
    const pdf = location.slice(index + marker.length);
    if (!pdf.toLowerCase().endsWith(".pdf")) return url;
    if (!pdfPaths.has(pdf))
      throw new Error(`笔记引用的手稿不存在：${path} → ${pdf}`);
    hasManuscript = true;
    return (
      assetPrefix +
      pdf.split("/").map(encodeURIComponent).join("/") +
      (match[2] ?? "")
    );
  }
  body = mapProse(body, line =>
    line
      .replace(/(\]\(\s*)(<[^>]+>|[^\s)]+)([^)]*\))/g, (_, start, url, end) => {
        const wrapped = url.startsWith("<");
        const fixed = pdfLink(wrapped ? url.slice(1, -1) : url);
        return start + (wrapped ? `<${fixed}>` : fixed) + end;
      })
      .replace(
        /^( {0,3}\[[^\]]+\]:\s*)(<[^>]+>|\S+)(.*)$/,
        (_, start, url, end) => {
          const wrapped = url.startsWith("<");
          const fixed = pdfLink(wrapped ? url.slice(1, -1) : url);
          return start + (wrapped ? `<${fixed}>` : fixed) + end;
        }
      )
  );
  const sameNamePdf = path
    .replace(/\.(md|mdx)$/i, ".pdf")
    .split(sep)
    .join("/");
  if (!hasManuscript && pdfPaths.has(sameNamePdf)) {
    body =
      body.trimEnd() +
      `\n\n## 手写原稿\n\n[查看手写原稿（PDF）](${assetPrefix}${sameNamePdf.split("/").map(encodeURIComponent).join("/")})\n`;
  }
  // ISO timestamp strings stay unquoted so Astro's YAML loader produces Dates.
  return `---\n${stringify(metadata, { lineWidth: 0 })}---\n\n${body.trim()}\n`;
}

async function hash(path) {
  const digest = createHash("sha256");
  for await (const chunk of createReadStream(path)) digest.update(chunk);
  return digest.digest("hex");
}

async function assertRegularTarget(path) {
  if ((await exists(path)) && !(await lstat(path)).isFile()) {
    throw new Error(`目标不是普通文件，请手动检查：${path}`);
  }
}

export async function syncNotes({
  homepageRoot = defaultHomepage,
  sourceRoot = resolve(homepageRoot, "../note"),
  dryRun = false,
} = {}) {
  sourceRoot = await realpath(sourceRoot);
  homepageRoot = await realpath(homepageRoot);
  const sourceNotes = resolve(sourceRoot, "md_web");
  const sourcePdfs = resolve(sourceRoot, "handwrite_notes");
  const targetNotes = resolve(homepageRoot, "notes/md_notes");
  const targetPdfs = resolve(
    homepageRoot,
    "site/public/notes/note/handwrite_notes"
  );
  const sourceRelative = relative(sourceRoot, homepageRoot);
  const homeRelative = relative(homepageRoot, sourceRoot);
  if (
    (!sourceRelative.startsWith(`..${sep}`) && !isAbsolute(sourceRelative)) ||
    (!homeRelative.startsWith(`..${sep}`) && !isAbsolute(homeRelative))
  ) {
    throw new Error("源项目与 homepage 必须是相互独立的目录。");
  }
  const markdown = (await filesIn(sourceNotes, [".md", ".mdx"])).filter(path =>
    /^note_linalg_\d/.test(path.split(sep).pop())
  );
  const pdfs = await filesIn(sourcePdfs, [".pdf"]);
  const pdfPaths = new Set(
    pdfs.map(path => relative(sourcePdfs, path).split(sep).join("/"))
  );
  const operations = [];
  // Validate every note and PDF link before writing any destination file.
  for (const path of markdown) {
    const name = relative(sourceNotes, path);
    const target = resolve(targetNotes, name);
    await assertRegularTarget(target);
    const old = (await exists(target))
      ? await readFile(target, "utf8")
      : undefined;
    const text = formatNote(
      splitNote(await readFile(path, "utf8"), path),
      old === undefined ? undefined : splitNote(old, target),
      name,
      (await stat(path)).mtime,
      pdfPaths
    );
    if (old !== text) operations.push({ target, text });
  }
  for (const source of pdfs) {
    const target = resolve(targetPdfs, relative(sourcePdfs, source));
    await assertRegularTarget(target);
    const same =
      (await exists(target)) &&
      (await stat(source)).size === (await stat(target)).size &&
      (await hash(source)) === (await hash(target));
    if (!same) operations.push({ source, target });
  }
  if (!dryRun) {
    for (const operation of operations) {
      await mkdir(dirname(operation.target), { recursive: true });
      if (operation.source) await copyFile(operation.source, operation.target);
      else await writeFile(operation.target, operation.text);
    }
  }
  return {
    sourceRoot,
    markdown: markdown.length,
    pdfs: pdfs.length,
    dryRun,
    changed: operations.map(operation =>
      relative(homepageRoot, operation.target)
    ),
  };
}

async function main() {
  const args = process.argv.slice(2);
  let sourceRoot;
  let dryRun = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--dry-run") dryRun = true;
    else if (
      args[i] === "--source" &&
      args[i + 1] &&
      !args[i + 1].startsWith("--")
    )
      sourceRoot = resolve(args[++i]);
    else if (args[i] === "--help") {
      process.stdout.write(
        "用法：node site/scripts/sync-notes.mjs [--dry-run] [--source /path/to/note]\n默认读取同级 note/md_web 中以 note_linalg_数字 开头的笔记，写入 notes/md_notes。只同步笔记和 PDF，不删除文件、不提交或发布。\n"
      );
      return;
    } else throw new Error(`未知或不完整的参数：${args[i]}`);
  }
  const result = await syncNotes({ sourceRoot, dryRun });
  process.stdout.write(
    `${dryRun ? "预览" : "同步完成"}：${result.markdown} 篇笔记，${result.pdfs} 份 PDF；${result.changed.length} 个文件${dryRun ? "将更新" : "已更新"}。\n`
  );
  for (const path of result.changed) process.stdout.write(`  ${path}\n`);
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch(error => {
    process.stderr.write(`同步失败：${error.message}\n`);
    process.exitCode = 1;
  });
}
