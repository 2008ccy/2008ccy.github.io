import { lstat } from "node:fs/promises";
import { basename, extname, relative, resolve, sep } from "node:path";
import { filesIn } from "./manuscripts.mjs";

export const examSubjects = [
  { id: "caculus_test", title: "微积分" },
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
        title: basename(source, extension),
        filename,
        source,
        route: `${subject.id}/${filename}`,
        mediaType: mediaTypes[extension.toLowerCase()],
      });
    }
  }
  return papers.sort((a, b) =>
    a.filename.localeCompare(b.filename, "zh-CN", { numeric: true })
  );
}
