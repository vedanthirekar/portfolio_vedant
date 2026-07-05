import type { Commit } from "./github";

export interface DayGroup {
  day: string; // "YYYY-MM-DD"
  commits: Commit[];
}

/** Drop merge commits - they're pipeline noise, not changes. */
export function isMeaningfulCommit(c: Commit): boolean {
  return !c.message.startsWith("Merge ");
}

/** Group commits by calendar day (UTC), newest day first. */
export function groupCommitsByDay(commits: Commit[]): DayGroup[] {
  const groups = new Map<string, Commit[]>();
  for (const c of commits.filter(isMeaningfulCommit)) {
    const day = c.date.slice(0, 10);
    if (!day) continue;
    const list = groups.get(day) ?? [];
    list.push(c);
    groups.set(day, list);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([day, list]) => ({ day, commits: list }));
}
