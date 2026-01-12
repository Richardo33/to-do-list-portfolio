import { describe, it, expect } from "vitest";
import { parseGenDescInput, BadRequest } from "../validation";

describe("parseGenDescInput", () => {
  it("mengembalikan title yang di-trim (valid, tanpa hint)", () => {
    const out = parseGenDescInput({ title: "  Plan sprint  " });
    expect(out).toEqual({ title: "Plan sprint", hint: undefined });
  });

  it("menerima hint dan di-trim", () => {
    const out = parseGenDescInput({
      title: "Code review",
      hint: " backend only ",
    });
    expect(out).toEqual({ title: "Code review", hint: "backend only" });
  });

  it("menolak body non-objek", () => {
    expect(() => parseGenDescInput(undefined)).toThrow(BadRequest);
    expect(() => parseGenDescInput([])).toThrow(BadRequest);
  });

  it("menolak title kosong", () => {
    expect(() => parseGenDescInput({ title: "   " })).toThrow(BadRequest);
  });

  it("menolak hint bertipe selain string", () => {
    expect(() => parseGenDescInput({ title: "Docs", hint: 123 })).toThrow(
      BadRequest
    );
  });
});
