const pdfPrefix = "/notes/note/handwrite_notes/";

/** Resolve handwritten-PDF links copied from the original Markdown notes. */
export default function remarkNoteLinks() {
  return tree => {
    function visit(node) {
      if (
        (node.type === "link" || node.type === "definition") &&
        typeof node.url === "string"
      ) {
        const relative = node.url.match(/^(?:\.\.?\/)*handwrite_notes\/(.+)$/);
        if (relative) {
          // Preserve page fragments and query strings; escape PDF filenames.
          const [, path, suffix = ""] = relative[1].match(/^([^?#]*)(.*)$/);
          node.url =
            pdfPrefix +
            path
              .split("/")
              .map(part => encodeURIComponent(decodeURIComponent(part)))
              .join("/") +
            suffix;
        }
      }
      for (const child of node.children ?? []) visit(child);
    }
    visit(tree);
  };
}
