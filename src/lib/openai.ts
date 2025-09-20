import OpenAI from 'openai';
import { QuestionRequest, FeedbackRequest, InterviewQuestion, Feedback } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateInterviewQuestion(request: QuestionRequest): Promise<InterviewQuestion> {
  const { position, experience, questionNumber, previousQuestions = [] } = request;
  
  const prompt = `You are an expert interview coach. Generate a realistic interview question for a ${position} position.
  
  Context:
  - Position: ${position}
  - Experience Level: ${experience}
  - Question Number: ${questionNumber} of 5
  ${previousQuestions.length > 0 ? `- Previous Questions: ${previousQuestions.join(', ')}` : ''}
  
  Generate a single, focused interview question that:
  1. Is appropriate for the experience level
  2. Tests relevant skills for the position
  3. Is different from previous questions
  4. Is clear and concise
  
  Return your response in this exact JSON format:
  {
    "question": "Your question here",
    "category": "Technical/Behavioral/Situational",
    "difficulty": "easy/medium/hard"
  }`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    const parsed = JSON.parse(response);
    return {
      id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      question: parsed.question,
      category: parsed.category,
      difficulty: parsed.difficulty,
    };
  } catch (error) {
    console.error('Error generating question:', error);
    throw new Error('Failed to generate interview question');
  }
}

export async function generateFeedback(request: FeedbackRequest): Promise<Feedback> {
  const { question, answer, position } = request;
  
  const prompt = `You are an expert interview coach. Analyze this interview answer and provide structured feedback.

  Position: ${position}
  Question: ${question}
  Answer: ${answer}

  Rate the answer on three criteria (0-10 scale):
  1. Relevance: How well does the answer address the question?
  2. Clarity: How clear and well-structured is the response?
  3. Confidence: How confident and professional does the candidate sound?

  Provide 2-3 specific, actionable feedback points.
  Give an overall assessment.

  Return your response in this exact JSON format:
  {
    "relevance": 8,
    "clarity": 7,
    "confidence": 9,
    "feedback": [
      "Specific feedback point 1",
      "Specific feedback point 2",
      "Specific feedback point 3"
    ],
    "overall": "Overall assessment of the answer"
  }`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    const parsed = JSON.parse(response);
    return {
      relevance: Math.max(0, Math.min(10, parsed.relevance)),
      clarity: Math.max(0, Math.min(10, parsed.clarity)),
      confidence: Math.max(0, Math.min(10, parsed.confidence)),
      feedback: parsed.feedback,
      overall: parsed.overall,
    };
  } catch (error) {
    console.error('Error generating feedback:', error);
    throw new Error('Failed to generate feedback');
  }
}

