/** Minimal RFC 7231 §5.3.2 Accept header parsing, just enough to decide
 * whether a request prefers `text/markdown` over `text/html`. */

interface MediaRange {
  type: string;
  subtype: string;
  q: number;
  index: number;
}

function parseAccept(header: string): MediaRange[] {
  return header
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part, index) => {
      const [mediaType, ...params] = part.split(";").map((s) => s.trim());
      const [type, subtype] = mediaType.split("/");
      let q = 1;
      for (const param of params) {
        const [key, value] = param.split("=").map((s) => s.trim());
        if (key === "q") {
          const parsed = Number.parseFloat(value);
          if (!Number.isNaN(parsed)) q = parsed;
        }
      }
      return { type: type || "*", subtype: subtype || "*", q, index };
    });
}

/** 2 = exact match, 1 = type match + wildcard subtype, 0 = full wildcard, -1 = no match */
function specificity(range: MediaRange, type: string, subtype: string): number {
  if (range.type === type && range.subtype === subtype) return 2;
  if (range.type === type && range.subtype === "*") return 1;
  if (range.type === "*" && range.subtype === "*") return 0;
  return -1;
}

function bestMatch(
  ranges: MediaRange[],
  type: string,
  subtype: string,
): { q: number; index: number } | null {
  let best: { q: number; index: number; specificity: number } | null = null;
  for (const range of ranges) {
    const spec = specificity(range, type, subtype);
    if (spec < 0 || range.q <= 0) continue;
    if (
      !best ||
      spec > best.specificity ||
      (spec === best.specificity && range.q > best.q)
    ) {
      best = { q: range.q, index: range.index, specificity: spec };
    }
  }
  return best;
}

/**
 * Whether a client's Accept header prefers `text/markdown` over `text/html`.
 * Ties (equal q-value) fall back to source order - whichever type appears
 * first in the header wins, matching how most Accept-aware clients build it.
 */
export function prefersMarkdown(acceptHeader: string | null | undefined): boolean {
  if (!acceptHeader) return false;
  const ranges = parseAccept(acceptHeader);
  const markdown = bestMatch(ranges, "text", "markdown");
  if (!markdown) return false;
  const html = bestMatch(ranges, "text", "html");
  if (!html) return true;
  if (markdown.q !== html.q) return markdown.q > html.q;
  return markdown.index < html.index;
}
