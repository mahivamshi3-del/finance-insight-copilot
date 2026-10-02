"use client";

import { useState } from "react";

export default function Home() {
  const [revenue, setRevenue] = useState("");
  const [previousRevenue, setPreviousRevenue] = useState("");
  const [cogs, setCogs] = useState("");
  const [operatingExpenses, setOperatingExpenses] = useState("");
  const [budgetRevenue, setBudgetRevenue] = useState("");
  const [aiInsight, setAiInsight] = useState("");
  const [result, setResult] = useState<{
    grossProfit: number;
    operatingProfit: number;
    profitMargin: number;
    revenueGrowth: number;
    budgetVariance: number;
    expenseRatio: number;
  } | null>(null);

async function analyzeFinancials() {
  const currentRevenue = Number(revenue);
  const previous = Number(previousRevenue);
  const costOfGoods = Number(cogs);
  const expenses = Number(operatingExpenses);
  const budget = Number(budgetRevenue);

  const grossProfit = currentRevenue - costOfGoods;
  const operatingProfit = grossProfit - expenses;
  const profitMargin =
  currentRevenue > 0 ? (operatingProfit / currentRevenue) * 100 : 0;
  const revenueGrowth =
  previous > 0 ? ((currentRevenue - previous) / previous) * 100 : 0;
  const budgetVariance = currentRevenue - budget;
  const expenseRatio =
  currentRevenue > 0 ? (expenses / currentRevenue) * 100 : 0;

  setResult({
  grossProfit,
  operatingProfit,
  profitMargin,
  revenueGrowth,
  budgetVariance,
  expenseRatio,
  });
  setAiInsight(
  `Overall Performance: Revenue is ₹${currentRevenue.toLocaleString("en-IN")}.

  Revenue Trend: Revenue changed by ${revenueGrowth.toFixed(2)}% compared with the previous year.

  Profitability: Operating profit is ₹${operatingProfit.toLocaleString("en-IN")} with an operating margin of ${profitMargin.toFixed(2)}%.

  Budget Variance: Revenue is ₹${Math.abs(budgetVariance).toLocaleString("en-IN")} ${
      budgetVariance >= 0 ? "above" : "below"
    } budget.

  Management Observation: Operating expenses represent ${expenseRatio.toFixed(
      2
    )}% of current revenue.`
  );

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        revenue: currentRevenue,
        previousRevenue: previous,
        cogs: costOfGoods,
        operatingExpenses: expenses,
        budgetRevenue: budget,
        grossProfit,
        operatingProfit,
        profitMargin,
        revenueGrowth,
        budgetVariance,
        expenseRatio,
      }),
    });

    const data = await response.json();

    console.log("Claude response:", data);
  } catch (error) {
    console.error("Claude error:", error);
  }
}

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Finance Insight Copilot
        </h1>

        <p className="text-slate-400 mb-8">
          AI-powered financial analysis and variance insights
        </p>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

          <h2 className="text-2xl font-semibold mb-6">
            Enter Financial Data
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="number"
              placeholder="Current Revenue"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700"
            />

            <input
              type="number"
              placeholder="Previous Year Revenue"
              value={previousRevenue}
              onChange={(e) => setPreviousRevenue(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700"
            />

            <input
              type="number"
              placeholder="COGS"
              value={cogs}
              onChange={(e) => setCogs(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700"
            />

            <input
              type="number"
              placeholder="Operating Expenses"
              value={operatingExpenses}
              onChange={(e) => setOperatingExpenses(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700"
            />

            <input
              type="number"
              placeholder="Budget Revenue"
              value={budgetRevenue}
              onChange={(e) => setBudgetRevenue(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700"
            />

          </div>

          <button
            onClick={analyzeFinancials}
            className="mt-6 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold"
          >
            Analyze Financials
          </button>

        </div>

        {result && (
          <div className="mt-8">

            <h2 className="text-2xl font-semibold mb-5">
              Financial Analysis
            </h2>

            <div className="grid md:grid-cols-3 gap-5">

              <Metric
                title="Gross Profit"
                value={`₹${result.grossProfit.toLocaleString("en-IN")}`}
              />

              <Metric
                title="Operating Profit"
                value={`₹${result.operatingProfit.toLocaleString("en-IN")}`}
              />

              <Metric
                title="Profit Margin"
                value={`${result.profitMargin.toFixed(2)}%`}
              />

              <Metric
                title="Revenue Growth"
                value={`${result.revenueGrowth.toFixed(2)}%`}
              />

              <Metric
                title="Budget Variance"
                value={`₹${result.budgetVariance.toLocaleString("en-IN")}`}
              />

              <Metric
                title="Expense Ratio"
                value={`${result.expenseRatio.toFixed(2)}%`}
              />

            </div>

            <div className="mt-8 bg-slate-900 p-6 rounded-2xl border border-slate-800">

              <h2 className="text-2xl font-semibold mb-3">
                Claude AI Management Insight
              </h2>

              <p className="text-slate-300 whitespace-pre-line">
                {aiInsight}
              </p>

            </div>

          </div>
        )}

      </div>
      <div className="mt-8 text-center">
        <a
          href="/abc"
          className="inline-block px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-semibold"
        >
          Open ABC Profitability Analyzer
        </a>
      </div>
    </main>
  );
}

function Metric({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
      <p className="text-slate-400 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}