import test from "node:test";
import assert from "node:assert/strict";
import { filterPostPage } from "../src/utils/filterPostPage.ts";

const posts = [
  { id: "a", tags: ["math"] },
  { id: "b", tags: ["ai", "math"] },
  { id: "c", tags: ["math"] },
  { id: "d", tags: ["ai"] },
  { id: "e", tags: ["ai"] },
];

test("a tag includes matches beyond the unfiltered first page", () => {
  const result = filterPostPage(posts, "ai", 1, 2);
  assert.deepEqual(
    result.items.map(post => post.id),
    ["b", "d"]
  );
  assert.equal(result.total, 3);
  assert.equal(result.lastPage, 2);
});

test("filtered pagination retains its tag and article order", () => {
  assert.deepEqual(
    filterPostPage(posts, "ai", 2, 2).items.map(post => post.id),
    ["e"]
  );
});

test("clearing a filter restores articles of every tag", () => {
  const result = filterPostPage(posts, "", 1, 10);
  assert.deepEqual(result.items, posts);
  assert.equal(result.total, 5);
});

test("an unknown tag produces an empty result without a broken page number", () => {
  assert.deepEqual(filterPostPage(posts, "unknown", 4, 2), {
    items: [],
    total: 0,
    currentPage: 1,
    lastPage: 1,
  });
});

test("invalid or stale page numbers are clamped to a valid result page", () => {
  assert.equal(filterPostPage(posts, "math", 99, 2).currentPage, 2);
  assert.equal(filterPostPage(posts, "math", Number.NaN, 2).currentPage, 1);
  assert.equal(filterPostPage(posts, "math", -1, 2).currentPage, 1);
});
