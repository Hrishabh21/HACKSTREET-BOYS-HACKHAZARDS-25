import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { application } = await req.json();

  const prompt = `
You are a scholarship evaluator. Evaluate the following application based on:
- Financial Need (1-10)
- Motivation (1-10)
- Family Background (1-10)

Give final NEED_SCORE between 1 to 10.

Application:
${JSON.stringify(application)}
`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "mixtral-8x7b-32768", // Or whatever you're using
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const result = await response.json();
  const content = result.choices?.[0]?.message?.content || "";
  const matched = content.match(/NEED_SCORE\s*[:\-]?\s*(\d+)/i);
  const score = matched ? parseInt(matched[1]) : 0;

  return NextResponse.json({ score });
}
