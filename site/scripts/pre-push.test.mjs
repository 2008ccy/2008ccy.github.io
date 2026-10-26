import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  mkdtemp,
  mkdir,
  readFile,
  realpath,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const hook = fileURLToPath(
  new URL("../../.githooks/pre-push", import.meta.url)
);
const zero = "0".repeat(40);

async function fixture() {
  // Retain small fixtures: this repository forbids recursive deletion.
  const root = await realpath(
    await mkdtemp(join(tmpdir(), "homepage-pre-push-"))
  );
  const repo = join(root, "repo");
  const bin = join(root, "bin");
  const log = join(root, "build.log");
  await mkdir(join(repo, "site"), { recursive: true });
  await mkdir(bin);
  await writeFile(join(repo, "site/package.json"), "{}\n");
  await writeFile(join(repo, "note.md"), "original\n");
  await writeFile(
    join(bin, "npm"),
    '#!/bin/sh\nprintf "%s\\n" "$PWD" "$*" "$ASTRO_TELEMETRY_DISABLED" > "$HOOK_TEST_LOG"\nexit "${HOOK_TEST_BUILD_EXIT:-0}"\n',
    { mode: 0o755 }
  );
  await symlink(process.execPath, join(bin, "node"));

  function git(...args) {
    const result = spawnSync(
      "git",
      ["-c", "core.hooksPath=/dev/null", ...args],
      { cwd: repo, encoding: "utf8" }
    );
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
  }
  git("init", "--quiet", "--initial-branch=main");
  git("add", ".");
  function commit() {
    git(
      "-c",
      "user.name=Hook Test",
      "-c",
      "user.email=hook-test@example.invalid",
      "-c",
      "commit.gpgsign=false",
      "commit",
      "--quiet",
      "-m",
      "fixture"
    );
    return git("rev-parse", "HEAD");
  }
  const sha = commit();

  async function run({
    target = "main",
    localSha = sha,
    buildExit = "0",
  } = {}) {
    const refs = join(root, "push-refs");
    await writeFile(
      refs,
      `refs/heads/main ${localSha} refs/heads/${target} ${zero}\n`
    );
    return spawnSync(
      "git",
      [
        "-c",
        `core.hooksPath=${dirname(hook)}`,
        "hook",
        "run",
        `--to-stdin=${refs}`,
        "pre-push",
        "--",
        "origin",
        "https://example.invalid/repo",
      ],
      {
        cwd: repo,
        encoding: "utf8",
        env: {
          ...process.env,
          PATH: `${bin}:/usr/bin:/bin`,
          HOOK_TEST_LOG: log,
          HOOK_TEST_BUILD_EXIT: buildExit,
        },
      }
    );
  }
  async function noBuild() {
    await assert.rejects(readFile(log), { code: "ENOENT" });
  }
  return { repo, log, sha, git, commit, run, noBuild };
}

test("a clean main push builds via npm with a minimal GUI PATH and no pnpm", async () => {
  const f = await fixture();
  const result = await f.run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(
    await readFile(f.log, "utf8"),
    `${join(f.repo, "site")}\nrun build\n1\n`
  );
  assert.match(result.stderr, /推送检查通过/);
});

test("a failed build blocks a main push", async () => {
  const f = await fixture();
  const result = await f.run({ buildExit: "17" });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /已阻止推送/);
  await readFile(f.log);
});

for (const staged of [false, true]) {
  test(`an uncommitted correction (${staged ? "staged" : "unstaged"}) cannot hide a broken commit`, async () => {
    const f = await fixture();
    await writeFile(join(f.repo, "note.md"), "locally corrected\n");
    if (staged) f.git("add", "note.md");
    const result = await f.run();
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /未提交或未跟踪/);
    await f.noBuild();
    assert.equal(
      await readFile(join(f.repo, "note.md"), "utf8"),
      "locally corrected\n"
    );
  });
}

test("untracked notes or PDFs must be handled before publishing", async () => {
  const f = await fixture();
  await writeFile(join(f.repo, "new note.pdf"), "%PDF-fixture\n");
  const result = await f.run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /未提交或未跟踪/);
  await f.noBuild();
});

test("pushing another commit to main cannot check the wrong HEAD", async () => {
  const f = await fixture();
  await writeFile(join(f.repo, "note.md"), "second version\n");
  f.git("add", "note.md");
  f.commit();
  const result = await f.run({ localSha: f.sha });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /检出准备发布/);
  await f.noBuild();
});

test("other branches and branch deletion do not build", async () => {
  const f = await fixture();
  assert.equal((await f.run({ target: "draft" })).status, 0);
  assert.equal((await f.run({ localSha: zero })).status, 0);
  await f.noBuild();
});
