import { lstat, readFile } from "node:fs/promises";
import { basename, extname, relative, resolve, sep } from "node:path";
import { filesIn } from "./manuscripts.mjs";

export const examSubjects = [
  { id: "cacu_test", title: "微积分" },
  { id: "linalg_test", title: "线性代数" },
];

const mediaTypes = {
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

export async function examPapers(homepageRoot) {
  let hidden = [];
  let titles = {};
  try {
    const catalog = JSON.parse(
      await readFile(resolve(homepageRoot, "test/catalog.json"), "utf8")
    );
    hidden = catalog.hidden ?? [];
    titles = catalog.titles ?? {};
    if (
      !titles ||
      typeof titles !== "object" ||
      Array.isArray(titles) ||
      Object.values(titles).some(
        title => typeof title !== "string" || !title.trim()
      )
    )
      throw new Error(
        "test/catalog.json 的 titles 必须是文件相对路径与非空标题的对应表"
      );
    if (!Array.isArray(hidden) || hidden.some(path => typeof path !== "string"))
      throw new Error("test/catalog.json 的 hidden 必须是文件相对路径数组");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  const hiddenRoutes = new Set(hidden);
  const papers = [];
  for (const subject of examSubjects) {
    const directory = resolve(homepageRoot, "test", subject.id);
    let directoryStat;
    try {
      directoryStat = await lstat(directory);
    } catch (error) {
      if (error.code === "ENOENT") continue;
      throw error;
    }
    if (!directoryStat.isDirectory() || directoryStat.isSymbolicLink())
      throw new Error(`题库目录异常：${directory}`);
    for (const source of await filesIn(directory, Object.keys(mediaTypes))) {
      const filename = relative(directory, source).split(sep).join("/");
      const extension = extname(source);
      papers.push({
        subject: subject.id,
        title:
          titles[`${subject.id}/${filename}`] ?? basename(source, extension),
        filename,
        source,
        route: `${subject.id}/${filename}`,
        readerRoute: `${subject.id}/${filename.slice(0, -extension.length)}`,
        mediaType: mediaTypes[extension.toLowerCase()],
        hidden: hiddenRoutes.has(`${subject.id}/${filename}`),
      });
    }
  }
  return papers.sort((a, b) =>
    a.filename.localeCompare(b.filename, "zh-CN", { numeric: true })
  );
}
