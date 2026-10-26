import { readFile, writeFile, realpath } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  subjects,
  manuscriptFiles,
  filesIn,
  formatLinks,
} from "./manuscripts.mjs";

const defaultHomepage = fileURLToPath(new URL("../../", import.meta.url));

// Homepage is now the only source. Never import or overwrite its edited prose.
export async function syncNotes({
  homepageRoot = defaultHomepage,
  dryRun = false,
  sourceRoot,
} = {}) {
  if (sourceRoot !== undefined)
    throw new Error(
      "已停用 note_private 导入；请直接在 homepage/note 中编辑。"
    );
  homepageRoot = await realpath(homepageRoot);
  const files = await manuscriptFiles(homepageRoot);
  const operations = [];
  let markdown = 0;
  for (const [subject, config] of Object.entries(subjects)) {
    const directory = resolve(homepageRoot, "note", config.root);
    for (const path of await filesIn(directory, [".md", ".mdx"])) {
      const before = await readFile(path, "utf8");
      let text;
      try {
        text = formatLinks(before, subject, files);
      } catch (error) {
        throw new Error(`${relative(homepageRoot, path)}：${error.message}`);
      }
      markdown++;
      if (text !== before) operations.push({ path, text });
    }
  }
  // Validate every article before applying any link updates.
  if (!dryRun)
    for (const { path, text } of operations) await writeFile(path, text);
  return {
    markdown,
    pdfs: files.length,
    dryRun,
    changed: operations.map(({ path }) => relative(homepageRoot, path)),
  };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--source"))
    throw new Error(
      "已停用 --source；以后直接在 homepage/note 中维护笔记和手稿。"
    );
  if (args.includes("--help")) {
    process.stdout.write(
      "用法：node site/scripts/sync-notes.mjs [--dry-run]\n检查 homepage/note 中的手稿并更新 Markdown PDF 链接，不读取 note_private，不改正文或草稿状态，不创建目录或复制文件。手稿会在 pnpm dev/build 时直接提供。\n"
    );
    return;
  }
  for (const arg of args)
    if (arg !== "--dry-run") throw new Error(`未知参数：${arg}`);
  const result = await syncNotes({ dryRun: args.includes("--dry-run") });
  process.stdout.write(
    `${result.dryRun ? "预览" : "检查完成"}：${result.markdown} 份 Markdown，${result.pdfs} 份手稿；${result.changed.length} 个文件${result.dryRun ? "将更新链接" : "已更新链接"}。\n`
  );
  for (const path of result.changed) process.stdout.write(`  ${path}\n`);
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  main().catch(error => {
    process.stderr.write(`检查失败：${error.message}\n`);
    process.exitCode = 1;
  });
