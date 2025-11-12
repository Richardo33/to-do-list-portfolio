/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type GenerateDescRequest = { title: string };
type GenerateDescOK = {
  description: string;
  source: "openai" | "fallback-no-api-key";
};
type GenerateDescErr = { error: string; details?: string };
type GenerateDescResponse = GenerateDescOK | GenerateDescErr;

function isGenerateDescRequest(x: unknown): x is GenerateDescRequest {
  if (typeof x !== "object" || x === null) return false;
  const r = x as Record<string, unknown>;
  return typeof r.title === "string";
}

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "Failed to generate description";
}

function fallback(title: string): string {
  return `Kerjain "${title}" dengan senyum—deadline hampir ngajak balapan!`;
}

export async function POST(req: Request) {
  // Parse body aman (tanpa any)
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json<GenerateDescErr>(
      { error: "Body harus JSON" },
      { status: 400 }
    );
  }
  if (!isGenerateDescRequest(raw) || !raw.title.trim()) {
    return NextResponse.json<GenerateDescErr>(
      { error: "Title is required" },
      { status: 400 }
    );
  }
  const title = raw.title.trim();

  // Guard API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json<GenerateDescOK>({
      description: fallback(title),
      source: "fallback-no-api-key",
    });
  }

  try {
    // Buat client DI DALAM handler (bukan top-level)
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content:
            `Buatkan deskripsi singkat namun lucu, maksimal 20 kata, ` +
            `yang menggambarkan aktivitas dari judul berikut: "${title}"`,
        },
      ],
      temperature: 0.4,
      max_tokens: 60,
    });

    const rawText = completion.choices[0]?.message?.content ?? "";
    const description =
      rawText.replace(/^["']|["']$/g, "").trim() || fallback(title);

    return NextResponse.json<GenerateDescOK>({
      description,
      source: "openai",
    });
  } catch (err: unknown) {
    console.error("OpenAI error:", err);
    return NextResponse.json<GenerateDescErr>(
      {
        error: "Failed to generate description",
        details: getErrorMessage(err),
      },
      { status: 500 }
    );
  }
}
