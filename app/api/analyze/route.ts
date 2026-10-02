import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const prompt = `
You are a corporate finance analyst.

Analyze the following financial information:

Current Revenue: ₹${data.revenue}
Previous Year Revenue: ₹${data.previousRevenue}
COGS: ₹${data.cogs}
Operating Expenses: ₹${data.operatingExpenses}
Budget Revenue: ₹${data.budgetRevenue}

Calculated metrics:
Gross Profit: ₹${data.grossProfit}
Operating Profit: ₹${data.operatingProfit}
Profit Margin: ${data.profitMargin}%
Revenue Growth: ${data.revenueGrowth}%
Budget Variance: ₹${data.budgetVariance}
Expense Ratio: ${data.expenseRatio}%

Provide a short management-style financial commentary.

Use these sections:

1. Overall Performance
2. Revenue Trend
3. Profitability
4. Budget Variance
5. Management Observations

Rules:
- Use only the numbers provided.
- Do not invent information.
- Keep the answer concise and professional.
- Do not provide investment, tax, or legal advice.
`;

    const message = await anthropic.messages.create({
      model: "claude-3-5-haiku-latest",
      max_tokens: 800,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text =
      message.content[0].type === "text"
        ? message.content[0].text
        : "No analysis was generated.";

    return NextResponse.json({ analysis: text });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to generate Claude analysis." },
      { status: 500 }
    );
  }
}