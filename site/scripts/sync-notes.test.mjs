import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile, access } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { parse } from "yaml";
import { syncNotes } from "./sync-notes.mjs";

async function fixture() {
  // Keep temporary fixtures; project instructions forbid recursive deletion.
  const root = await mkdtemp(join(tmpdir(), "homepage-sync-test-"));
  const sourceRoot = join(root, "note");
  const homepageRoot = join(root, "homepage");
  await mkdir(join(sourceRoot, "md_web"), { recursive: true });
  await mkdir(join(sourceRoot, "handwrite_notes"));
  await mkdir(join(homepageRoot, "notes/md_notes"), {
    recursive: true,
  });
  return { sourceRoot, homepageRoot };
}

const sourceNote = `---
title: 最新标题
description: 最新摘要
pubDatetime: 2026-10-23T08:00:00+08:00
draft: true
---
# 最新标题

新正文 $a_{11}$。

[原稿](../handwrite_notes/lecture.pdf#page=2)

[参考稿][pdf]

[pdf]: <../handwrite_notes/lecture.pdf>

\`\`\`markdown
# 代码里的标题
[示例](../handwrite_notes/missing.pdf)
\`\`\`
`;

function metadata(text) {
  return parse(text.split("---")[1]);
}

test("updates source text and links while retaining both published and draft states", async () => {
  const options = await fixture();
  await writeFile(
    join(options.sourceRoot, "handwrite_notes/lecture.pdf"),
    "%PDF-fixture"
  );
  for (const draft of [false, true]) {
    const name = `note_linalg_${draft ? 2 : 1}.md`;
    const dest = join(options.homepageRoot, "notes/md_notes", name);
    await writeFile(join(options.sourceRoot, "md_web", name), sourceNote);
    await writeFile(
      dest,
      `---\ntitle: 原标题\ndescription: 原摘要\npubDatetime: 2026-10-20T12:00:00+08:00\ndraft: ${draft}\nfeatured: true\n---\n旧正文\n`
    );
  }
  const result = await syncNotes(options);
  assert.equal(result.changed.length, 3);
  for (const draft of [false, true]) {
    const text = await readFile(
      join(
        options.homepageRoot,
        `notes/md_notes/note_linalg_${draft ? 2 : 1}.md`
      ),
      "utf8"
    );
    const meta = metadata(text);
    assert.equal(meta.draft, draft);
    assert.equal(meta.title, "最新标题");
    assert.equal(meta.pubDatetime, "2026-10-20T12:00:00+08:00");
    assert.equal(meta.featured, true);
    assert.match(text, /新正文 \$a_\{11\}\$/);
    assert.match(text, /\/notes\/note\/handwrite_notes\/lecture.pdf#page=2/);
    assert.match(
      text,
      /\[pdf\]: <\/notes\/note\/handwrite_notes\/lecture.pdf>/
    );
    assert.match(
      text,
      /```markdown\n# 代码里的标题\n\[示例\]\(\.\.\/handwrite_notes\/missing.pdf\)/
    );
    assert.doesNotMatch(text, /^# 最新标题$/m);
  }
  assert.deepEqual((await syncNotes(options)).changed, []);
  assert.equal(
    await readFile(join(options.sourceRoot, "md_web/note_linalg_1.md"), "utf8"),
    sourceNote
  );
});

test("new notes are drafts; dry run leaves files untouched; same-name PDF is linked", async () => {
  const options = await fixture();
  await writeFile(
    join(options.sourceRoot, "md_web/note_linalg_3.md"),
    "# 新笔记\n\n正文。\n"
  );
  await writeFile(
    join(options.sourceRoot, "handwrite_notes/note_linalg_3.pdf"),
    "%PDF-new"
  );
  const target = join(options.homepageRoot, "notes/md_notes/note_linalg_3.md");
  assert.equal(
    (await syncNotes({ ...options, dryRun: true })).changed.length,
    2
  );
  await assert.rejects(access(target));
  await syncNotes(options);
  const text = await readFile(target, "utf8");
  const meta = metadata(text);
  assert.equal(meta.title, "新笔记");
  assert.equal(meta.draft, true);
  assert.ok(meta.description);
  assert.ok(!Number.isNaN(Date.parse(meta.pubDatetime)));
  assert.match(text, /\/notes\/note\/handwrite_notes\/note_linalg_3.pdf/);
  assert.deepEqual((await syncNotes(options)).changed, []);
});

test("missing referenced PDFs fail validation before any destination writes", async () => {
  const options = await fixture();
  await writeFile(
    join(options.sourceRoot, "md_web/note_linalg_4.md"),
    "# 第一篇\n正文\n"
  );
  await writeFile(
    join(options.sourceRoot, "md_web/note_linalg_5.md"),
    sourceNote
  );
  await assert.rejects(syncNotes(options), /手稿不存在/);
  await assert.rejects(
    access(join(options.homepageRoot, "notes/md_notes/note_linalg_4.md"))
  );
});

test("files only present on the website are retained and omitted draft means published", async () => {
  const options = await fixture();
  const target = join(options.homepageRoot, "notes/md_notes/note_linalg_6.md");
  await writeFile(
    target,
    "---\ntitle: 已发布\ndescription: 摘要\npubDatetime: 2026-10-20T12:00:00+08:00\n---\n旧正文\n"
  );
  await writeFile(
    join(options.sourceRoot, "md_web/note_linalg_6.md"),
    "# 更新\n新正文\n"
  );
  const extra = join(options.homepageRoot, "notes/md_notes/website-only.md");
  await writeFile(extra, "keep me");
  await syncNotes(options);
  assert.equal(metadata(await readFile(target, "utf8")).draft, false);
  assert.equal(await readFile(extra, "utf8"), "keep me");
});

test("invalid website draft values fail instead of changing publication status", async () => {
  const options = await fixture();
  const target = join(options.homepageRoot, "notes/md_notes/note_linalg_4.md");
  await writeFile(target, '---\ndraft: "false"\n---\n正文\n');
  await writeFile(
    join(options.sourceRoot, "md_web/note_linalg_4.md"),
    "# 标题\n"
  );
  await assert.rejects(syncNotes(options), /draft 必须/);
  assert.match(await readFile(target, "utf8"), /draft: "false"/);
});

test("a source marked public is imported as a draft and Unicode PDF links are encoded", async () => {
  const options = await fixture();
  const body =
    "---\ntitle: 新笔记\ndescription: 摘要\npubDatetime: 2026-10-23T08:00:00+08:00\ndraft: false\n---\n[原稿](../handwrite_notes/线性代数.pdf)\n";
  await writeFile(join(options.sourceRoot, "md_web/note_linalg_3.md"), body);
  await writeFile(
    join(options.sourceRoot, "handwrite_notes/线性代数.pdf"),
    "%PDF-unicode"
  );
  await syncNotes(options);
  const text = await readFile(
    join(options.homepageRoot, "notes/md_notes/note_linalg_3.md"),
    "utf8"
  );
  assert.equal(metadata(text).draft, true);
  assert.ok(
    text.includes(
      `/notes/note/handwrite_notes/${encodeURIComponent("线性代数.pdf")}`
    )
  );
});

test("only note_linalg followed by a number is synced from md_web", async () => {
  const options = await fixture();
  for (const name of [
    "note_linalg_12.md",
    "note_linalg_13_extra.mdx",
    "test.md",
    "_note_linalg_14.md",
    "note_linalg_x.md",
  ]) {
    await writeFile(join(options.sourceRoot, "md_web", name), "# 标题\n正文\n");
  }
  const result = await syncNotes(options);
  assert.equal(result.markdown, 2);
  assert.deepEqual(result.changed, [
    "notes/md_notes/note_linalg_12.md",
    "notes/md_notes/note_linalg_13_extra.mdx",
  ]);
  await assert.rejects(
    access(join(options.homepageRoot, "notes/md_notes/test.md"))
  );
  await assert.rejects(
    access(join(options.homepageRoot, "notes/note/output_notes"))
  );
  assert.deepEqual((await syncNotes(options)).changed, []);
});
