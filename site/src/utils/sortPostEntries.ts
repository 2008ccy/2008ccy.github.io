type DatedPost = {
  id: string;
  data: { pubDatetime: Date; modDatetime?: Date | null };
};

const filenames = new Intl.Collator("zh-CN", { numeric: true });
const isCalculus = (post: DatedPost) =>
  post.id.startsWith("cacu_notes/cacu_web_note/");

/** Keep date ordering for the list; order calculus entries by descending filename. */
export function sortPostEntries<T extends DatedPost>(posts: readonly T[]): T[] {
  const byDate = [...posts].sort(
    (a, b) =>
      Math.floor((b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000) -
      Math.floor((a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000)
  );
  const calculus = byDate
    .filter(isCalculus)
    .sort((a, b) =>
      filenames.compare(b.id.split("/").at(-1)!, a.id.split("/").at(-1)!)
    );
  let index = 0;
  return byDate.map(post => (isCalculus(post) ? calculus[index++] : post));
}
