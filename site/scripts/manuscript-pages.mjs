import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve, relative, sep } from "node:path";
import { publishedManuscripts } from "./manuscripts.mjs";

async function sha256(path) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return hash.digest("hex");
}

/** Validate the committed page images before building manuscript readers. */
export async function manuscriptReadings(homepageRoot) {
  const publicRoot = resolve(homepageRoot, "site/public");
  let manifest;
  try {
    manifest = JSON.parse(
      await readFile(resolve(publicRoot, "manuscripts/manifest.json"), "utf8")
    );
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    throw new Error(
      "请先运行 scripts/render-manuscript-pages.py 生成手稿阅读页"
    );
  }
  const readings = [];
  for (const file of await publishedManuscripts(homepageRoot)) {
    const reading = manifest[file.route];
    const digest = await sha256(file.source);
    if (
      !reading ||
      reading.sha256 !== digest ||
      !Array.isArray(reading.pages) ||
      !reading.pages.length
    )
      throw new Error(
        `请先运行 scripts/render-manuscript-pages.py 更新手稿阅读页：${file.route}`
      );
    for (const page of reading.pages) {
      const target = resolve(publicRoot, page.src ?? "");
      const local = relative(publicRoot, target).split(sep).join("/");
      if (
        typeof page.src !== "string" ||
        !local.startsWith(`manuscripts/${digest.slice(0, 16)}/`) ||
        !Number.isInteger(page.width) ||
        page.width <= 0 ||
        !Number.isInteger(page.height) ||
        page.height <= 0
      )
        throw new Error(`手稿页面信息无效：${file.route}`);
      const info = await stat(target).catch(() => null);
      if (!info?.isFile() || !info.size)
        throw new Error(`手稿页面图片不存在：${page.src}`);
    }
    readings.push({ file, reading });
  }
  return readings;
}
