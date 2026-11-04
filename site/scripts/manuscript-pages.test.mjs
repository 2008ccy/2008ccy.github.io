import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { manuscriptReadings } from "./manuscript-pages.mjs";

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), "manuscript-pages-"));
  const route = "cacu_notes/cacu_hand_note/example.pdf";
  const source = join(root, "note", route);
  const pdf = Buffer.from("%PDF fixture");
  const digest = createHash("sha256").update(pdf).digest("hex");
  const src = `manuscripts/${digest.slice(0, 16)}/page-01.webp`;
  await mkdir(join(root, "note/cacu_notes/cacu_hand_note"), { recursive: true });
  await mkdir(join(root, "site/public", `manuscripts/${digest.slice(0, 16)}`), { recursive: true });
  await writeFile(source, pdf);
  await writeFile(join(root, "site/public", src), "fixture image");
  const manifest = {
    [route]: { sha256: digest, pages: [{ src, width: 10, height: 20 }] },
  };
  const save = () => writeFile(
    join(root, "site/public/manuscripts/manifest.json"), JSON.stringify(manifest)
  );
  await save();
  return { root, route, source, manifest, save };
}

test("reader inventory includes a valid manuscript and its page images", async () => {
  const { root, route, manifest } = await fixture();
  const readings = await manuscriptReadings(root);
  assert.equal(readings.length, 1);
  assert.equal(readings[0].file.route, route);
  assert.deepEqual(readings[0].reading, manifest[route]);
});

test("reader build rejects a changed PDF until its pages are regenerated", async () => {
  const { root, source } = await fixture();
  await writeFile(source, "%PDF edited fixture");
  await assert.rejects(manuscriptReadings(root), /更新手稿阅读页/);
});

test("reader build rejects a missing generated page image", async () => {
  const { root, route, manifest, save } = await fixture();
  manifest[route].pages[0].src = manifest[route].pages[0].src.replace("page-01", "missing");
  await save();
  await assert.rejects(manuscriptReadings(root), /图片不存在/);
});

test("reader build rejects empty or malformed page metadata", async () => {
  const { root, route, manifest, save } = await fixture();
  manifest[route].pages[0].width = 0;
  await save();
  await assert.rejects(manuscriptReadings(root), /页面信息无效/);
  manifest[route].pages = [];
  await save();
  await assert.rejects(manuscriptReadings(root), /更新手稿阅读页/);
});

test("reader inventory does not require pages for a local-only PDF", async () => {
  const { root } = await fixture();
  await writeFile(join(root, "note/cacu_notes/cacu_hand_note/local.pdf"), "%PDF local fixture");
  await writeFile(join(root, "note/manuscripts.json"), JSON.stringify({
    localOnly: ["cacu_notes/cacu_hand_note/local.pdf"],
  }));
  assert.equal((await manuscriptReadings(root)).length, 1);
});
