/** Filter the entire article list before applying pagination. */
export function filterPostPage<T extends { tags: string[] }>(
  posts: T[],
  tag: string,
  requestedPage: number,
  pageSize: number
) {
  const matching = tag ? posts.filter(post => post.tags.includes(tag)) : posts;
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
