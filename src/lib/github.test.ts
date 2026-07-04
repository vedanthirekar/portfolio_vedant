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

  it("skips unknown event types, branch creates, closed PRs, and empty pushes", () => {
    const events = mapGithubEvents([
      { ...push, payload: { commits: [] } },
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
