import { describe, expect, it } from "vitest";
import { mapGithubEvents } from "./github";

const push = {
  type: "PushEvent",
  repo: { name: "vedanthirekar/dsa-solutions" },
  created_at: "2026-07-04T06:00:00Z",
  payload: {
    commits: [
      { message: "add two-sum solution" },
      { message: "add binary search variant\n\nlonger body" },
    ],
  },
};

const pr = {
  type: "PullRequestEvent",
  repo: { name: "some/repo" },
  created_at: "2026-07-03T06:00:00Z",
  payload: {
    action: "opened",
    pull_request: { title: "Fix pipeline", html_url: "https://github.com/some/repo/pull/1" },
  },
};

const createRepo = {
  type: "CreateEvent",
  repo: { name: "vedanthirekar/new-thing" },
  created_at: "2026-07-02T06:00:00Z",
  payload: { ref_type: "repository" },
};

// Real shape served by the public events API since GitHub slimmed payloads:
// no commits array, just refs and shas.
const slimPush = {
  type: "PushEvent",
  repo: { name: "vedanthirekar/DSA" },
  created_at: "2026-07-04T00:17:43Z",
  payload: {
    before: "0000000",
    head: "a1b2c3d4e5f60718",
    push_id: 123,
    ref: "refs/heads/main",
    repository_id: 1,
  },
};

const fork = {
  type: "ForkEvent",
  repo: { name: "ericosiu/beat-claude" },
  created_at: "2026-07-04T01:10:13Z",
  payload: {
    forkee: {
      full_name: "vedanthirekar/beat-claude",
      html_url: "https://github.com/vedanthirekar/beat-claude",
    },
  },
};

describe("mapGithubEvents", () => {
  it("maps push events with commit count and latest message", () => {
    const [e] = mapGithubEvents([push]);
    expect(e.verb).toBe("pushed 2 commits to");
    expect(e.repo).toBe("vedanthirekar/dsa-solutions");
    expect(e.detail).toBe("add binary search variant");
    expect(e.url).toBe("https://github.com/vedanthirekar/dsa-solutions");
  });

  it("maps opened PRs and created repositories", () => {
    const events = mapGithubEvents([pr, createRepo]);
    expect(events[0].verb).toBe("opened a pull request in");
    expect(events[0].detail).toBe("Fix pipeline");
    expect(events[0].url).toBe("https://github.com/some/repo/pull/1");
    expect(events[1].verb).toBe("created");
  });

  it("maps slim push payloads (no commits array) to branch @ short-sha", () => {
    const [e] = mapGithubEvents([slimPush]);
    expect(e.verb).toBe("pushed to");
    expect(e.repo).toBe("vedanthirekar/DSA");
    expect(e.detail).toBe("main @ a1b2c3d");
  });

  it("maps fork events to the forked copy", () => {
    const [e] = mapGithubEvents([fork]);
    expect(e.verb).toBe("forked");
    expect(e.detail).toBe("vedanthirekar/beat-claude");
    expect(e.url).toBe("https://github.com/vedanthirekar/beat-claude");
  });

  it("skips unknown event types, branch creates, and closed PRs", () => {
    const events = mapGithubEvents([
      { ...pr, payload: { ...pr.payload, action: "closed" } },
      { ...createRepo, payload: { ref_type: "branch" } },
      { type: "WatchEvent", repo: { name: "x/y" }, created_at: "2026-07-01T00:00:00Z" },
    ]);
    expect(events).toEqual([]);
  });

  it("handles empty and malformed input", () => {
    expect(mapGithubEvents([])).toEqual([]);
    expect(mapGithubEvents([{ type: "PushEvent" }])).toEqual([]);
  });
});
