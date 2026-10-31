import { lstat, readFile } from "node:fs/promises";
import { basename, extname, relative, resolve, sep } from "node:path";
import { filesIn } from "./manuscripts.mjs";

export const booksRepositoryUrl =
  "https://github.com/2008ccy/2008ccy.github.io/tree/main/books";

export async function libraryBooks(homepageRoot) {
  const directory = resolve(homepageRoot, "books");
  try {
    const directoryStat = await lstat(directory);
    if (!directoryStat.isDirectory() || directoryStat.isSymbolicLink())
      throw new Error(`书库目录异常：${directory}`);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }

  let catalog = {};
  try {
    catalog = JSON.parse(
      await readFile(resolve(directory, "catalog.json"), "utf8")
    );
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (!catalog || typeof catalog !== "object" || Array.isArray(catalog))
    throw new Error("books/catalog.json 必须是以 PDF 文件名为键的对象");

  const books = [];
  const routes = new Set();
  const filenames = new Set();
  for (const source of await filesIn(directory, [".pdf"])) {
    const filename = relative(directory, source).split(sep).join("/");
    filenames.add(filename);
    const metadata = catalog[filename] ?? {};
    if (!metadata || typeof metadata !== "object" || Array.isArray(metadata))
      throw new Error(`书籍信息异常：${filename}`);
    if (metadata.draft !== undefined && typeof metadata.draft !== "boolean")
      throw new Error(`书籍 ${filename} 的 draft 必须是布尔值`);
    if (metadata.draft === true) continue;
    for (const key of [
      "title",
      "author",
      "edition",
      "category",
      "description",
      "route",
    ]) {
      if (
        metadata[key] !== undefined &&
        (typeof metadata[key] !== "string" || !metadata[key].trim())
      )
        throw new Error(`书籍 ${filename} 的 ${key} 必须是非空文字`);
    }
    const route = metadata.route ?? filename;
    if (
      !route.toLowerCase().endsWith(".pdf") ||
      route
        .split("/")
        .some(part => !part || part.startsWith(".") || part.includes("\\")) ||
      /[?#]/.test(route) ||
      routes.has(route.toLowerCase())
    )
      throw new Error(`书籍网址无效或重复：${route}`);
    routes.add(route.toLowerCase());
    books.push({
      filename,
      source,
      route,
      title: metadata.title ?? basename(source, extname(source)),
      author: metadata.author,
      edition: metadata.edition,
      category: metadata.category ?? "其他",
      description: metadata.description,
      bytes: (await lstat(source)).size,
    });
  }
  for (const filename of Object.keys(catalog)) {
    if (!filenames.has(filename) && catalog[filename]?.draft !== true)
      throw new Error(`书库目录中找不到：${filename}`);
  }
  return books.sort((a, b) =>
    a.title.localeCompare(b.title, "zh-CN", { numeric: true })
  );
}
