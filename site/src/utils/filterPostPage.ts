/** Comma-separated labels describe one ordered path, from broad to specific. */
export function parseTagPath(value: string | readonly string[]): string[] {
  const parts = typeof value === "string" ? [value] : value;
  return parts
    .flatMap(part => part.split(/[,，]/u))
    .map(part => part.replace(/\s+/gu, ""))
    .filter(Boolean);
}

export function matchesTagPath(
  tags: readonly string[],
  selection: readonly string[]
) {
  const path = parseTagPath(tags);
  return parseTagPath(selection).every((tag, index) => path[index] === tag);
}

/** Only children of the selected parent path are offered at the next level. */
export function getNextTagOptions<T extends { tags: string[] }>(
  posts: readonly T[],
  selection: readonly string[]
) {
  const prefix = parseTagPath(selection);
  const counts = new Map<string, number>();
  for (const post of posts) {
    const path = parseTagPath(post.tags);
    if (!matchesTagPath(path, prefix)) continue;
    const label = path[prefix.length];
    if (label) counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return Array.from(counts, ([label, count]) => ({ label, count })).sort(
    (a, b) => a.label.localeCompare(b.label, "zh-CN")
  );
}

/** Old flat links can recover a path when their label has a unique parent. */
export function resolveLegacyTagPath<T extends { tags: string[] }>(
  posts: readonly T[],
  value: string
) {
  const selection = parseTagPath(value);
  if (selection.length !== 1) return selection;
  const legacyLabel = selection[0].toLocaleLowerCase();
  const paths = new Map<string, string[]>();
  for (const post of posts) {
    const path = parseTagPath(post.tags);
    path.forEach((label, index) => {
      const prefix = path.slice(0, index + 1);
      if (
        label.toLocaleLowerCase() === legacyLabel ||
        prefix.join("-").toLocaleLowerCase() === legacyLabel
      ) {
        paths.set(JSON.stringify(prefix), prefix);
      }
    });
  }
  if (paths.size === 1) return Array.from(paths.values())[0];
  return paths.size > 1 ? [] : selection;
}

/** Match the complete parent prefix before applying pagination. */
export function filterPostPage<T extends { tags: string[] }>(
  posts: T[],
  selection: readonly string[],
  requestedPage: number,
  pageSize: number
) {
  const matching = posts.filter(post => matchesTagPath(post.tags, selection));
  const size = Math.max(1, Math.floor(pageSize) || 1);
  const lastPage = Math.max(1, Math.ceil(matching.length / size));
  const currentPage = Math.min(
    lastPage,
    Math.max(1, Math.floor(requestedPage) || 1)
  );
  const start = (currentPage - 1) * size;
  return {
    items: matching.slice(start, start + size),
    total: matching.length,
    currentPage,
    lastPage,
  };
}
