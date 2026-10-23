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

function formatNote(
  source,
  previous,
  path,
  modifiedTime,
  pdfPaths,
  assetPrefix
) {
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
    const marker = location.match(/(?:handwrite_notes|handwrite_pdf)\//);
    if (!marker) return url;
    const pdf = location.slice(marker.index + marker[0].length);
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
  sourceRoot = resolve(homepageRoot, "../note_private"),
  dryRun = false,
} = {}) {
  sourceRoot = await realpath(sourceRoot);
  homepageRoot = await realpath(homepageRoot);
  const sourceRelative = relative(sourceRoot, homepageRoot);
  const homeRelative = relative(homepageRoot, sourceRoot);
  if (
    (!sourceRelative.startsWith(`..${sep}`) && !isAbsolute(sourceRelative)) ||
    (!homeRelative.startsWith(`..${sep}`) && !isAbsolute(homeRelative))
  ) {
    throw new Error("源项目与 homepage 必须是相互独立的目录。");
  }
  const operations = [];
  let markdownCount = 0;
  let pdfCount = 0;
  let subjects = 0;
  // Preflight all subjects before writing any files.
  for (const subject of ["linalg", "caculus"]) {
    const subjectRoot = resolve(sourceRoot, `${subject}_note`);
    if (!(await exists(subjectRoot))) continue;
    subjects++;
    const sourcePdfs = resolve(subjectRoot, "handwrite_pdf");
    const pdfs = await filesIn(sourcePdfs, [".pdf"]);
    const pdfPaths = new Set(
      pdfs.map(path => relative(sourcePdfs, path).split(sep).join("/"))
    );
    // Keep existing linear algebra PDF URLs working.
    const assetPrefix =
      subject === "linalg"
        ? "/notes/note/handwrite_notes/"
        : `/notes/${subject}_notes/handwrite_pdf/`;
    const targetPdfs = resolve(
      homepageRoot,
      "site/public",
      assetPrefix.slice(1)
    );
    pdfCount += pdfs.length;
    const targets = new Set();
    for (const folder of ["note_md", "web_md"]) {
      const sourceNotes = resolve(subjectRoot, folder);
      if (!(await exists(sourceNotes))) {
        if (folder === "note_md")
          throw new Error(`缺少原稿目录：${sourceNotes}`);
        continue;
      }
      const markdown = (await filesIn(sourceNotes, [".md", ".mdx"])).filter(
        path => !path.split(sep).pop().startsWith("_")
      );
      for (const path of markdown) {
        const name = relative(sourceNotes, path);
        const basename = path.split(sep).pop();
        const namedSubject = basename.match(
          /^(?:note|web)_(linalg|caculus)(?:_|\.)/
        )?.[1];
        if (namedSubject && namedSubject !== subject)
          throw new Error(`文件学科与来源目录不一致：${path}`);
        const kind = basename.startsWith("web")
          ? "web_notes"
          : basename.startsWith("note")
            ? "md_notes"
            : folder === "web_md"
              ? "web_notes"
              : "md_notes";
        const target = resolve(
          homepageRoot,
          "note",
          `${subject}_notes`,
          kind,
          name
        );
        if (targets.has(target))
          throw new Error(`多个源文件对应同一目标：${target}`);
        targets.add(target);
        markdownCount++;
        await assertRegularTarget(target);
        const old = (await exists(target))
          ? await readFile(target, "utf8")
          : undefined;
        const text = formatNote(
          splitNote(await readFile(path, "utf8"), path),
          old === undefined ? undefined : splitNote(old, target),
          name,
          (await stat(path)).mtime,
          pdfPaths,
          assetPrefix
        );
        if (old !== text) operations.push({ target, text });
      }
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
  }
  if (!subjects) throw new Error("未找到 linalg_note 或 caculus_note 源目录。");
  if (!dryRun) {
    for (const operation of operations) {
      await mkdir(dirname(operation.target), { recursive: true });
      if (operation.source) await copyFile(operation.source, operation.target);
      else await writeFile(operation.target, operation.text);
    }
  }
  return {
    sourceRoot,
    markdown: markdownCount,
    pdfs: pdfCount,
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
        "用法：node site/scripts/sync-notes.mjs [--dry-run] [--source /path/to/note_private]\n默认读取同级 note_private/<学科>_note/note_md（可选 web_md），按文件名前缀写入 note/<学科>_notes/md_notes 或 web_notes。只同步笔记和 PDF，不删除文件、不提交或发布。\n"
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
