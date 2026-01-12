export type GenDescInput = { title: string; hint?: string };

export class BadRequest extends Error {
  status = 400 as const;
  constructor(message: string) {
    super(message);
    this.name = "BadRequest";
  }
}

export function parseGenDescInput(input: unknown): GenDescInput {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new BadRequest("Body must be a JSON object");
  }
  const obj = input as Record<string, unknown>;
  const rawTitle = obj.title;
  const rawHint = obj.hint;

  if (typeof rawTitle !== "string" || rawTitle.trim() === "") {
    throw new BadRequest("`title` is required");
  }
  if (rawHint !== undefined && typeof rawHint !== "string") {
    throw new BadRequest("`hint` must be a string");
  }

  const title = rawTitle.trim();
  const hint =
    typeof rawHint === "string" && rawHint.trim() !== ""
      ? rawHint.trim()
      : undefined;

  return { title, hint };
}
