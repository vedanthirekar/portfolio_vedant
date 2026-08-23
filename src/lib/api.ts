import { site } from "@/lib/site";

/** Structured JSON error body: a machine-readable code, a human message, and
 * a resolution hint so an agent can recover without parsing prose. */
export function jsonError(
  status: number,
  code: string,
  message: string,
  hint?: string,
) {
  return Response.json(
    {
      error: {
        code,
        message,
        ...(hint && { hint }),
        docs: `${site.url}/api-docs`,
      },
    },
    { status },
  );
}

export function methodNotAllowed() {
  return jsonError(
    405,
    "method_not_allowed",
    "This endpoint only supports GET.",
    "Retry with a GET request.",
  );
}

export function apiNotFound(path: string) {
  return jsonError(
    404,
    "not_found",
    `No API endpoint at ${path}.`,
    `See ${site.url}/openapi.json for the full list of endpoints, or ${site.url}/api-docs.`,
  );
}
