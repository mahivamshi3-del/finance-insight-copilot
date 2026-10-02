# Finance Insight Copilot

A finance-focused web application for financial performance analysis, management insights, and Activity-Based Costing (ABC) analysis.

## Live Demo

https://finance-insight-copilot.vercel.app

## Source Code

https://github.com/mahivamshi3-del/finance-insight-copilot

## Project Overview

Finance Insight Copilot is designed as a practical corporate-finance decision-support application.

It converts financial inputs into key management metrics and structured financial commentary while providing an Activity-Based Costing analyzer for indirect cost allocation.

## Key Features

### 1. Financial Analysis

The application calculates:

- Gross Profit
- Operating Profit
- Profit Margin
- Revenue Growth
- Budget Variance
- Expense Ratio

It also generates structured management commentary based on the provided financial data.

### 2. ABC Profitability Analyzer

The ABC module demonstrates Activity-Based Costing by allocating activity costs using cost-driver consumption.

Example activities include:

- Machine Setup
- Quality Inspection
- Order Processing

The application calculates the allocated cost for each activity and the total ABC allocated cost.

### 3. Finance Variance Analysis Skill

The project includes a reusable Claude Skill:

`skills/finance-variance-analysis/SKILL.md`

The skill defines a structured workflow for analyzing financial performance, revenue variance, profitability, budget variance, and management observations.

## Technology Stack

- Next.js
- TypeScript
- Tailwind CSS
- Anthropic Claude API integration
- GitHub
- Vercel

## Project Structure

```text
finance-insight-copilot/
├── app/
│   ├── page.tsx
│   ├── abc/
│   │   └── page.tsx
│   └── api/
│       └── analyze/
│           └── route.ts
├── skills/
│   └── finance-variance-analysis/
│       └── SKILL.md
├── public/
├── package.json
└── README.md