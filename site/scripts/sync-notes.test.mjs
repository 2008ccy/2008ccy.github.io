import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  readFile,
  writeFile,
  readdir,
  access,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { syncNotes } from "./sync-notes.mjs";
import { manuscriptFiles, manuscriptUrl } from "./manuscripts.mjs";

async function fixture() {
  // Fixtures are retained because this project forbids recursive deletion.
  const homepageRoot = await mkdtemp(join(tmpdir(), "homepage-local-notes-"));
  for (const [subject, hand] of [
    ["linalg", "linalg_hand_note"],
    ["caculus", "cacu_hand_note"],
  ]) {
    await mkdir(join(homepageRoot, "note", `${subject}_notes`, hand), {
      recursive: true,
    });
  }
  return { homepageRoot };
}

test("updates legacy and relative manuscript links without changing prose or publication metadata", async () => {
  const options = await fixture();
  const directory = join(options.homepageRoot, "note/linalg_notes");
  await mkdir(join(directory, "lianlg_md_note"));
  await writeFile(
    join(directory, "linalg_hand_note/note_linalg_1.pdf"),
    "%PDF-original"
  );
  const note = join(directory, "lianlg_md_note/note_linalg_1.md");
  const before =
    "---\ntitle: 保留标题\ndraft: false # 保留注释\n---\n# 保留一级标题\n编辑后的正文 $a_{11}$。\n[原稿](/notes/note/handwrite_notes/note_linalg_1.pdf#page=2)\n[ref]: ../handwrite_pdf/note_linalg_1.pdf\n```md\n[示例](../handwrite_pdf/missing.pdf)\n```\n";
  await writeFile(note, before);
  assert.equal(
    (await syncNotes({ ...options, dryRun: true })).changed.length,
    1
  );
  assert.equal(await readFile(note, "utf8"), before);
  await syncNotes(options);
  const after = await readFile(note, "utf8");
  assert.equal(
    after,
    before
      .replace(
        "/notes/note/handwrite_notes/note_linalg_1.pdf",
        "/notes/linalg_notes/linalg_hand_note/note_linalg_1.pdf"
      )
      .replace(
        "../handwrite_pdf/note_linalg_1.pdf",
        "/notes/linalg_notes/linalg_hand_note/note_linalg_1.pdf"
      )
  );
  assert.deepEqual((await syncNotes(options)).changed, []);
  assert.deepEqual((await readdir(directory)).sort(), [
    "lianlg_md_note",
    "linalg_hand_note",
  ]);
  await assert.rejects(access(join(options.homepageRoot, "site/public")));
});

test("missing PDFs fail preflight before any link changes", async () => {
  const options = await fixture();
  const directory = join(options.homepageRoot, "note/linalg_notes");
  await writeFile(join(directory, "linalg_hand_note/a.pdf"), "%PDF-a");
  const valid = join(directory, "a.md");
  const body = "[valid](../handwrite_pdf/a.pdf)\n";
  await writeFile(valid, body);
  await writeFile(
    join(options.homepageRoot, "note/caculus_notes/b.md"),
    "[missing](../handwrite_pdf/missing.pdf)\n"
  );
  await assert.rejects(syncNotes(options), /手稿不存在/);
  assert.equal(await readFile(valid, "utf8"), body);
});

test("discovers nested manuscripts for both subjects, encodes Unicode and preserves fragments", async () => {
  const options = await fixture();
  await mkdir(
    join(options.homepageRoot, "note/caculus_notes/cacu_hand_note/chapter")
  );
  const path = join(
    options.homepageRoot,
    "note/caculus_notes/cacu_hand_note/chapter/微积分 1.pdf"
  );
  await writeFile(path, "%PDF-caculus");
  const files = await manuscriptFiles(options.homepageRoot);
  assert.equal(files.length, 1);
  assert.equal(files[0].source, path);
  assert.equal(
    manuscriptUrl(
      "../cacu_hand_note/chapter/微积分%201.pdf#page=3",
      "caculus",
      files
    ),
    `/notes/caculus_notes/cacu_hand_note/chapter/${encodeURIComponent("微积分 1.pdf")}#page=3`
  );
  assert.equal(
    manuscriptUrl(
      "https://example.com/handwrite_pdf/missing.pdf",
      "linalg",
      files
    ),
    "https://example.com/handwrite_pdf/missing.pdf"
  );
  assert.throws(
    () =>
      manuscriptUrl(
        "/notes/linalg_notes/linalg_hand_note/missing.pdf",
        "linalg",
        files
      ),
    /手稿不存在/
  );
});

test("private import is rejected and local files are untouched", async () => {
  const options = await fixture();
  await assert.rejects(
    syncNotes({ ...options, sourceRoot: "/missing/note_private" }),
    /已停用/
  );
  assert.deepEqual((await syncNotes(options)).changed, []);
});
