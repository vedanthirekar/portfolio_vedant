import { describe, expect, it } from "vitest";
import {
  formatDay,
  formatDuration,
  formatMonth,
  formatRange,
  timeAgo,
} from "./format";

describe("formatMonth", () => {
  it("formats a YYYY-MM string", () => {
    expect(formatMonth("2025-06")).toBe("Jun 2025");
    expect(formatMonth("2024-12")).toBe("Dec 2024");
  });

  it("returns the input unchanged when malformed", () => {
    expect(formatMonth("not-a-date")).toBe("not-a-date");
    expect(formatMonth("2025-13")).toBe("2025-13");
  });
});

describe("formatRange", () => {
  it("formats a closed range", () => {
    expect(formatRange("2024-02", "2024-07")).toBe("Feb 2024 — Jul 2024");
  });

  it("uses Present for an open range", () => {
    expect(formatRange("2025-06", null)).toBe("Jun 2025 — Present");
  });
});

describe("timeAgo", () => {
  const now = new Date("2026-07-04T12:00:00Z");

  it("handles minutes, hours, and days", () => {
    expect(timeAgo("2026-07-04T11:58:00Z", now)).toBe("2m ago");
    expect(timeAgo("2026-07-04T09:00:00Z", now)).toBe("3h ago");
    expect(timeAgo("2026-07-01T12:00:00Z", now)).toBe("3d ago");
  });

  it("says just now for very recent timestamps", () => {
    expect(timeAgo("2026-07-04T11:59:45Z", now)).toBe("just now");
  });

  it("returns empty string for invalid input", () => {
    expect(timeAgo("garbage", now)).toBe("");
  });
});

describe("formatDay", () => {
  it("formats an ISO day", () => {
    expect(formatDay("2026-07-04")).toBe("July 4, 2026");
  });
});

describe("formatDuration", () => {
  it("formats seconds and minutes", () => {
    expect(formatDuration(42)).toBe("42s");
    expect(formatDuration(102)).toBe("1m 42s");
  });
});
