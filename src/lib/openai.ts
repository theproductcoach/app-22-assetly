import OpenAI from 'openai';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
console.log('API Key exists:', !!apiKey); // Debug log (will only show if key exists, not the key itself)

// Initialize OpenAI client
let openai: OpenAI | null = null;
try {
  if (apiKey) {
    openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true // Note: In production, you should use server-side API calls
    });
  } else {
    console.error('OpenAI API key is missing. Please check your .env.local file.');
  }
} catch (error) {
  console.error('Error initializing OpenAI client:', error);
}

export interface FinancialOverviewData {
  netWorth: number;
  totalAssets: number;
  totalLiabilities: number;
  monthlyCashFlow: number;
  assetTypes: { type: string; total: number }[];
  currency: { code: string; symbol: string };
}

interface OpenAIError extends Error {
  status?: number;
  headers?: Record<string, string>;
}

export async function generateSmartSummary(data: FinancialOverviewData): Promise<string> {
  if (!openai) {
    console.error('OpenAI client not initialized. API Key exists:', !!apiKey);
    return "OpenAI API key not configured correctly. Please check your .env.local file and restart the development server.";
  }

  const prompt = `
    As a financial advisor, provide a concise 2-3 sentence summary of this financial overview:
    - Net Worth: ${data.currency.symbol}${data.netWorth.toLocaleString()}
    - Total Assets: ${data.currency.symbol}${data.totalAssets.toLocaleString()}
    - Total Liabilities: ${data.currency.symbol}${data.totalLiabilities.toLocaleString()}
    - Monthly Cash Flow: ${data.currency.symbol}${data.monthlyCashFlow.toLocaleString()}
    - Asset Breakdown: ${data.assetTypes.map(a => 
      `${a.type}: ${data.currency.symbol}${a.total.toLocaleString()}`
    ).join(', ')}

    Focus on key insights, trends, and potential areas of note. Use a professional but approachable tone.
  `;

  try {
    console.log('Attempting to generate summary...'); // Debug log
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const summary = completion.choices[0].message.content;
    console.log('Summary generated successfully'); // Debug log
    return summary || "Unable to generate summary.";
  } catch (error) {
    const openAIError = error as OpenAIError;
    console.error('Error generating summary:', openAIError.message, openAIError.status, openAIError.headers);
    if (openAIError.status === 401) {
      return "Invalid API key. Please check your OpenAI API key configuration.";
    }
    return `Error generating summary: ${openAIError.message || 'Unknown error'}`;
  }
} 