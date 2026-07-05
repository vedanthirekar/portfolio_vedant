// Bakes real build metadata into the deployed artifact. Runs as `prebuild`.
// In CI, GitHub Actions env vars are the source of truth; locally it falls
// back to git. Test counts come from the Vitest JSON report if CI produced one.
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(root, "src", "generated", "build-info.json");

function git(cmd) {
  try {
    return execSync(`git ${cmd}`, { cwd: root, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return null;
  }
}

function readTests() {
  // Remote builds on Vercel can't see the Actions workspace, so the pipeline
  // forwards the counts from test-results.json as build env vars.
  if (process.env.TESTS_TOTAL) {
    return {
      total: Number(process.env.TESTS_TOTAL),
      passed: Number(process.env.TESTS_PASSED),
    };
  }
  try {
    const report = JSON.parse(readFileSync(join(root, "test-results.json"), "utf8"));
    return { total: report.numTotalTests, passed: report.numPassedTests };
  } catch {
    return null;
  }
}

const isCI = process.env.GITHUB_ACTIONS === "true";

const info = {
  sha: (process.env.GITHUB_SHA ?? git("rev-parse HEAD"))?.slice(0, 7) ?? null,
  branch: process.env.GITHUB_REF_NAME ?? git("rev-parse --abbrev-ref HEAD"),
  runNumber: process.env.GITHUB_RUN_NUMBER
    ? Number(process.env.GITHUB_RUN_NUMBER)
    : null,
  builtAt: new Date().toISOString(),
  tests: readTests(),
  env: isCI ? "ci" : "development",
};

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify(info, null, 2) + "\n");
console.log("build-info:", JSON.stringify(info));
