import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET() {
  try {
    const models = await genAI.listModels();
    return NextResponse.json(models);
  } catch (err) {
    console.error("ListModels error:", err);
    return NextResponse.json(
      { error: "Failed to list models" },
      { status: 500 }
    );
  }
}
