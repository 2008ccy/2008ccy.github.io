import test from "node:test";
import assert from "node:assert/strict";
import { sortPostEntries } from "../src/utils/sortPostEntries.ts";
import { filterPostPage } from "../src/utils/filterPostPage.ts";

const post = (name, time = 1, calculus = true) => ({
  id: calculus ? `cacu_notes/cacu_web_note/${name}` : name,
  data: { pubDatetime: new Date(time * 1000) },
  tags: calculus ? ["微积分", "课程笔记"] : ["线性代数"],
});

test("calculus uses numeric descending filenames rather than title or date", () => {
  const input = [
    post("web_cacu_1", 20),
    post("web_cacu_9", 30),
    post("web_cacu_10", 10),
  ];
  assert.deepEqual(
    sortPostEntries(input).map(p => p.id.split("/").at(-1)),
    ["web_cacu_10", "web_cacu_9", "web_cacu_1"]
  );
  assert.equal(input[0].id.split("/").at(-1), "web_cacu_1");
});

test("other articles retain their date-ordered positions in mixed lists", () => {
  const a = post("other-a", 40, false),
    b = post("other-b", 20, false);
  assert.deepEqual(
    sortPostEntries([post("web_cacu_1", 30), b, post("web_cacu_10", 10), a]),
    [a, post("web_cacu_10", 10), b, post("web_cacu_1", 30)]
  );
});

test("calculus filtering and pagination retain descending order", () => {
  const sorted = sortPostEntries(
    Array.from({ length: 10 }, (_, i) => post(`web_cacu_${i + 1}`))
  );
  const ids = [];
  for (let page = 1; page <= 3; page++)
    ids.push(
      ...filterPostPage(sorted, ["微积分"], page, 4).items.map(p =>
        p.id.split("/").at(-1)
      )
    );
  assert.deepEqual(
    ids,
    Array.from({ length: 10 }, (_, i) => `web_cacu_${10 - i}`)
  );
});
