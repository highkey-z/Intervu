import { NextRequest, NextResponse } from 'next/server';
import { generateInterviewQuestion } from '@/lib/openai';
import { generateInterviewQuestionWithGemini } from '@/lib/gemini';
import { generateInterviewQuestionWithHF } from '@/lib/huggingface';
import { generateInterviewQuestionFree, generateMultipleQuestionsFree, generateMultipleQuestionsWrapper } from '@/lib/free-ai';
import { getFallbackQuestion } from '@/lib/fallback-questions';
import { getRandomQuestions, getRandomQuestionsByLevel } from '@/lib/question-database';
import { QuestionRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: QuestionRequest = await request.json();
    
    if (!body.position || !body.experience) {
      return NextResponse.json(
        { error: 'Position and experience are required' },
        { status: 400 }
      );
    }

    // Use our enhanced question database with experience-level appropriate distribution
    try {
      const questionData = getRandomQuestionsByLevel(body.position, body.experience as 'entry' | 'mid' | 'senior' | 'executive', 5, body.previousQuestions || []);
      
      // Convert QuestionData to InterviewQuestion format
      const questions = questionData.map((q, index) => ({
        id: `q-${Date.now()}-${index}`,
        question: q.question,
        category: q.category,
        difficulty: q.difficulty,
        tags: q.tags,
        position: body.position,
        experience: body.experience
      }));
      
      return NextResponse.json(questions);
    } catch (dbError) {
      console.log('Question database failed, trying free AI generation:', dbError);
      
      // Fallback to free AI generation
      try {
        const questions = await generateMultipleQuestionsFree(body);
        return NextResponse.json(questions);
      } catch (freeError) {
        console.log('Free AI failed, using static fallback questions:', freeError);
        // Use static fallback questions
        const question = getFallbackQuestion(body.position, body.questionNumber, body.previousQuestions || []);
        return NextResponse.json([question]); // Wrap in array for consistency
      }
    }
  } catch (error) {
    console.error('Error in /api/question:', error);
    return NextResponse.json(
      { error: 'Failed to generate question' },
      { status: 500 }
    );
  }
}
