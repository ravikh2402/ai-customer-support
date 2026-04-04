import connectdb from "@/lib/db";
import Settings from "@/model/settings.model";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { message, ownerId } = await req.json();

    if (!message || !ownerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: corsHeaders }
      );
    }

    await connectdb();
    const settings = await Settings.findOne({ ownerId });

    if (!settings) {
      return NextResponse.json(
        { error: "Settings not found for the given ownerId" },
        { status: 404, headers: corsHeaders }
      );
    }

    const businessInfo = {
      name: settings.businessName || "not provided",
      email: settings.supportEmail || "not provided",
      knowledge: settings.knowledge || "not provided",
    };

    const systemPrompt = `You are a professional customer support agent. Follow these rules strictly:
1. Use ONLY the provided business information to answer questions
2. You may rephrase, summarize, or interpret the information
3. Do NOT invent policies, prices, or promises
4. If the question is unrelated or cannot be answered, respond EXACTLY with: "Please contact support"`;

    const userPrompt = `Business Information:
Name: ${businessInfo.name}
Email: ${businessInfo.email}
Knowledge Base: ${businessInfo.knowledge}

Customer Question: ${message}`;

    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      systemInstruction: systemPrompt,
    });

    const text =
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated";

    return NextResponse.json(
      { message: text },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500, headers: corsHeaders }
    );
  }
}
