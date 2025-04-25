import { NextResponse } from 'next/server';
import { generateSmartSummary, FinancialOverviewData } from '@/lib/openai';

interface OpenAIError extends Error {
  status?: number;
  headers?: Record<string, string>;
}

export async function POST(request: Request) {
  try {
    const data: FinancialOverviewData = await request.json();
    const summary = await generateSmartSummary(data);
    
    return NextResponse.json({ summary });
  } catch (error) {
    const openAIError = error as OpenAIError;
    const errorMessage = openAIError.message || 'An unknown error occurred';
    const status = openAIError.status || 500;
    
    return NextResponse.json(
      { error: errorMessage },
      { status }
    );
  }
} 