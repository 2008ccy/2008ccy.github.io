import test from "node:test";
import assert from "node:assert/strict";
import {
  filterPostPage,
  getNextTagOptions,
  matchesTagPath,
  parseTagPath,
  resolveLegacyTagPath,
} from "../src/utils/filterPostPage.ts";

const posts = [
  { id: "a", tags: ["线性代数", "课程笔记"] },
  { id: "b", tags: ["微积分", "课程笔记"] },
  { id: "c", tags: ["线性代数", "课外阅读"] },
  { id: "d", tags: ["线性代数", "课程笔记", "矩阵"] },
  { id: "e", tags: ["线性代数"] },
  { id: "f", tags: [] },
];

test("Chinese and English commas and whitespace describe the same ordered path", () => {
  assert.deepEqual(parseTagPath(" 线性代数 , 课 程笔记， 矩阵 "), [
    "线性代数",
    "课程笔记",
    "矩阵",
  ]);
  assert.deepEqual(parseTagPath([" 线性代数， 课程笔记 ", "矩阵"]), [
    "线性代数",
    "课程笔记",
    "矩阵",
  ]);
  assert.deepEqual(parseTagPath("， , \t"), []);
});

test("the first level offers only root labels, not descendant labels", () => {
  const options = getNextTagOptions(posts, []);
  assert.deepEqual(
    new Map(options.map(o => [o.label, o.count])),
    new Map([
      ["线性代数", 4],
      ["微积分", 1],
    ])
  );
});

test("children and their counts are limited to the selected parent", () => {
  assert.deepEqual(getNextTagOptions(posts, ["微积分"]), [
    { label: "课程笔记", count: 1 },
  ]);
  const mathOptions = getNextTagOptions(posts, ["线性代数"]);
  assert.equal(mathOptions.find(o => o.label === "课程笔记").count, 2);
  assert.equal(mathOptions.find(o => o.label === "课外阅读").count, 1);
  assert.deepEqual(getNextTagOptions(posts, ["线性代数", "课程笔记"]), [
    { label: "矩阵", count: 1 },
  ]);
});

test("a parent selection includes articles at that level and every descendant", () => {
  assert.deepEqual(
    filterPostPage(posts, ["线性代数"], 1, 10).items.map(p => p.id),
    ["a", "c", "d", "e"]
  );
});

test("the same child label under another parent does not match", () => {
  const result = filterPostPage(posts, ["线性代数", "课程笔记"], 1, 10);
  assert.deepEqual(
    result.items.map(p => p.id),
    ["a", "d"]
  );
  assert.equal(
    matchesTagPath(["微积分", "课程笔记"], ["线性代数", "课程笔记"]),
    false
  );
  assert.equal(filterPostPage(posts, ["课程笔记", "线性代数"], 1, 10).total, 0);
});

test("hierarchical filtering runs before pagination and preserves article order", () => {
  const result = filterPostPage(posts, ["线性代数", "课程笔记"], 2, 1);
  assert.deepEqual(
    result.items.map(p => p.id),
    ["d"]
  );
  assert.equal(result.total, 2);
  assert.equal(result.currentPage, 2);
  assert.equal(result.lastPage, 2);
});

test("clearing the path includes all articles, including articles without labels", () => {
  assert.deepEqual(filterPostPage(posts, [], 1, 10).items, posts);
});

test("invalid paths produce an empty result with a valid page number", () => {
  assert.deepEqual(filterPostPage(posts, ["线性代数", "不存在"], 4, 2), {
    items: [],
    total: 0,
    currentPage: 1,
    lastPage: 1,
  });
  assert.equal(filterPostPage(posts, ["线性代数"], 99, 2).currentPage, 2);
  assert.equal(
    filterPostPage(posts, ["线性代数"], Number.NaN, 2).currentPage,
    1
  );
});

test("old unambiguous label links recover the complete parent path", () => {
  assert.deepEqual(
    resolveLegacyTagPath([{ tags: ["线性代数", "AI辅助学习"] }], "ai辅助学习"),
    ["线性代数", "AI辅助学习"]
  );
  assert.deepEqual(resolveLegacyTagPath(posts, "矩阵"), [
    "线性代数",
    "课程笔记",
    "矩阵",
  ]);
  assert.deepEqual(resolveLegacyTagPath(posts, "线性代数"), ["线性代数"]);
  assert.deepEqual(resolveLegacyTagPath(posts, "课程笔记"), []);
});
