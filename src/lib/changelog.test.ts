import { describe, expect, it } from "vitest";
import { groupCommitsByDay, isMeaningfulCommit } from "./changelog";
import type { Commit } from "./github";

function commit(sha: string, message: string, date: string): Commit {
  return { sha, message, date, url: `https://example.com/${sha}` };
}

describe("isMeaningfulCommit", () => {
  it("filters merge commits", () => {
    expect(isMeaningfulCommit(commit("a", "Merge branch 'main'", ""))).toBe(false);
    expect(isMeaningfulCommit(commit("a", "Add changelog page", ""))).toBe(true);
  });
});

describe("groupCommitsByDay", () => {
  it("groups by UTC day, newest day first", () => {
    const groups = groupCommitsByDay([
      commit("a", "third", "2026-07-04T10:00:00Z"),
      commit("b", "second", "2026-07-03T22:00:00Z"),
      commit("c", "first", "2026-07-03T08:00:00Z"),
    ]);
    expect(groups.map((g) => g.day)).toEqual(["2026-07-04", "2026-07-03"]);
    expect(groups[1].commits.map((c) => c.sha)).toEqual(["b", "c"]);
  });

  it("drops merge commits and commits without dates", () => {
    const groups = groupCommitsByDay([
      commit("a", "Merge pull request #1", "2026-07-04T10:00:00Z"),
      commit("b", "real change", "2026-07-04T10:00:00Z"),
      commit("c", "no date", ""),
    ]);
    expect(groups).toHaveLength(1);
    expect(groups[0].commits.map((c) => c.sha)).toEqual(["b"]);
  });

  it("handles an empty list", () => {
    expect(groupCommitsByDay([])).toEqual([]);
  });
});
