import { NextRequest, NextResponse } from 'next/server';
import { generateFeedback } from '@/lib/openai';
import { generateFeedbackWithGemini } from '@/lib/gemini';
import { generateFeedbackWithHF } from '@/lib/huggingface';
import { generateFeedbackFree } from '@/lib/free-ai';
import { generateFeedbackWithGroq } from '@/lib/groq-tts';
import { getFallbackFeedback } from '@/lib/fallback-questions';
import { FeedbackRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackRequest = await request.json();
    
    if (!body.question || !body.answer || !body.position) {
      return NextResponse.json(
        { error: 'Question, answer, and position are required' },
        { status: 400 }
      );
    }

    try {
      // Try Groq first (free and reliable)
      const feedback = await generateFeedbackWithGroq(body.question, body.answer, body.position);
      return NextResponse.json(feedback);
    } catch (groqError) {
      console.log('Groq failed, trying OpenAI:', groqError);
      try {
        // Try OpenAI as fallback
        const feedback = await generateFeedback(body);
        return NextResponse.json(feedback);
      } catch (openaiError) {
        console.log('OpenAI failed, trying Gemini:', openaiError);
        try {
          // Try Gemini as fallback
          const feedback = await generateFeedbackWithGemini(body);
          return NextResponse.json(feedback);
        } catch (geminiError) {
          console.log('Gemini failed, trying Hugging Face:', geminiError);
          try {
            // Try Hugging Face as another fallback
            const feedback = await generateFeedbackWithHF(body);
            return NextResponse.json(feedback);
          } catch (hfError) {
            console.log('Hugging Face failed, trying free AI feedback:', hfError);
            try {
              // Try free AI feedback as another fallback
              const feedback = await generateFeedbackFree(body);
              return NextResponse.json(feedback);
            } catch (freeError) {
              console.log('Free AI failed, using static fallback feedback:', freeError);
              // Use static fallback feedback
              const feedback = getFallbackFeedback(body.question, body.answer);
              return NextResponse.json(feedback);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error in /api/feedback:', error);
    return NextResponse.json(
      { error: 'Failed to generate feedback' },
      { status: 500 }
    );
  }
}
