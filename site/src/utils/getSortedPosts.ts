import type { CollectionEntry } from "astro:content";
import { postFilter } from "./postFilter";
import { sortPostEntries } from "./sortPostEntries";

/**
 * Returns eligible posts in display order: calculus filenames descend numerically;
 * other entries retain their last-updated positions.
 *
 * Note: filtering respects drafts and scheduled posts via `postFilter()`.
 */
export function getSortedPosts(posts: CollectionEntry<"posts">[]) {
  return sortPostEntries(posts.filter(postFilter));
}
