import raw from "@/generated/build-info.json";

export interface BuildInfo {
  sha: string | null;
  branch: string | null;
  runNumber: number | null;
  builtAt: string | null;
  tests: { total: number; passed: number } | null;
  env: "ci" | "development" | string;
}

export const buildInfo: BuildInfo = raw as BuildInfo;
