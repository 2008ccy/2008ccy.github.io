import { readdir, lstat } from "node:fs/promises";
import { resolve, relative, sep, extname } from "node:path";

export const subjects = {
  linalg: { root: "linalg_notes", hand: "linalg_hand_note" },
  caculus: { root: "caculus_notes", hand: "cacu_hand_note" },
};

export async function filesIn(directory, extensions) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const path = resolve(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`请先处理符号链接：${path}`);
    if (entry.isDirectory()) files.push(...(await filesIn(path, extensions)));
    else if (extensions.includes(extname(path).toLowerCase())) files.push(path);
  }
  return files.sort();
}

export async function manuscriptFiles(homepageRoot) {
  const result = [];
  for (const [subject, config] of Object.entries(subjects)) {
    const directory = resolve(homepageRoot, "note", config.root, config.hand);
    try {
      await lstat(directory);
    } catch (error) {
      if (error.code === "ENOENT") continue;
      throw error;
    }
    if (!(await lstat(directory)).isDirectory())
      throw new Error(`手稿目录异常：${directory}`);
    for (const source of await filesIn(directory, [".pdf"])) {
      const name = relative(directory, source).split(sep).join("/");
      result.push({
        subject,
        source,
        route: `${config.root}/${config.hand}/${name}`,
      });
    }
  }
  return result;
}

// Leave remote links intact; validate recognized local manuscript references.
export function manuscriptUrl(url, subject, files) {
  if (/^(?:[a-z][\w+.-]*:|\/\/)/i.test(url)) return url;
  const [, pathname, suffix = ""] = url.match(/^(.*?)([?#].*)?$/);
  const decoded = decodeURIComponent(pathname);
  if (!/\.pdf$/i.test(decoded)) return url;
  const canonical = decoded.match(
    /^\/notes\/((?:linalg|caculus)_notes\/(?:linalg|cacu)_hand_note\/.+)$/
  );
  let route;
  if (canonical) route = canonical[1];
  else {
    const marker = decoded.match(
      /(?:^|\/)(?:handwrite_notes|handwrite_pdf|hand_note|linalg_hand_note|cacu_hand_note|web_linalg_1)\//
    );
    if (!marker) return url;
    const config = subjects[subject];
    route = `${config.root}/${config.hand}/${decoded.slice(marker.index + marker[0].length)}`;
  }
  if (!files.some(file => file.route === route))
    throw new Error(`手稿不存在：${url}`);
  return `/notes/${route.split("/").map(encodeURIComponent).join("/")}${suffix}`;
}

export function formatLinks(body, subject, files) {
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
      if (fence) return line;
      const replace = (_, start, url, end) => {
        const wrapped = url.startsWith("<");
        const fixed = manuscriptUrl(
          wrapped ? url.slice(1, -1) : url,
          subject,
          files
        );
        return start + (wrapped ? `<${fixed}>` : fixed) + end;
      };
      return line
        .replace(/(\]\(\s*)(<[^>]+>|[^\s)]+)([^)]*\))/g, replace)
        .replace(/^( {0,3}\[[^\]]+\]:\s*)(<[^>]+>|\S+)(.*)$/, replace);
    })
    .join("\n");
}
