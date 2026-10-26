import { fileURLToPath } from "node:url";
import { relative, sep } from "node:path";
import { manuscriptFiles, manuscriptUrl } from "../../scripts/manuscripts.mjs";

interface MarkdownNode {
  type: string;
  url?: string;
  children?: MarkdownNode[];
}

// Resolve links from local Markdown in dev and build, including reference links.
export default function remarkNoteLinks() {
  return async (tree: MarkdownNode, file: { path: string }) => {
    const root = fileURLToPath(new URL("../../../", import.meta.url));
    const path = relative(root, file.path).split(sep).join("/");
    const subject = path.match(/^note\/(linalg|caculus)_notes\//)?.[1];
    if (!subject) return;
    const files = await manuscriptFiles(root);
    const visit = (node: MarkdownNode) => {
      if (
        (node.type === "link" ||
          node.type === "definition" ||
          node.type === "image") &&
        node.url
      )
        node.url = manuscriptUrl(node.url, subject, files);
      if (node.children) for (const child of node.children) visit(child);
    };
    visit(tree);
  };
}
