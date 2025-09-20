import { Feedback } from '@/types';

export async function generateFeedbackWithGroq(
  question: string,
  answer: string,
  position: string
): Promise<Feedback> {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    throw new Error('Groq API key not found');
  }

  const prompt = `You are an expert interview evaluator. Analyze this interview answer and provide detailed feedback.

QUESTION: "${question}"
ANSWER: "${answer}"
POSITION: "${position}"

Evaluate the answer on these criteria:
1. RELEVANCE (1-10): How well does the answer address the question?
2. CLARITY (1-10): How clear and well-structured is the response?
3. CONFIDENCE (1-10): How confident and professional does the candidate sound?

CRITICAL: If the answer contains any of these unprofessional elements, give scores of 1-3:
- Job rejection ("don't want this job", "don't hire me", "should not hire me")
- Interview hostility ("don't like this interview", "want to go home", "leave me alone")
- Self-sabotage ("useless", "don't do anything", "not good at")
- Work avoidance ("never have to work", "avoid pressure", "no work")
- Hostile behavior ("never contact me", "ever again", "hate this")

Provide specific, constructive feedback with actionable advice.

Respond in this exact JSON format:
{
  "relevance": [1-10],
  "clarity": [1-10], 
  "confidence": [1-10],
  "feedback": [
    "Specific feedback point 1",
    "Specific feedback point 2",
    "Specific feedback point 3",
    "Specific feedback point 4"
  ],
  "overall": "Overall assessment with specific recommendations"
}`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Groq API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content received from Groq API');
    }

    // Parse the JSON response
    const feedback = JSON.parse(content);
    
    // Validate the response structure
    if (!feedback.relevance || !feedback.clarity || !feedback.confidence || !feedback.feedback || !feedback.overall) {
      throw new Error('Invalid response structure from Groq API');
    }

    return {
      relevance: Math.max(1, Math.min(10, feedback.relevance)),
      clarity: Math.max(1, Math.min(10, feedback.clarity)),
      confidence: Math.max(1, Math.min(10, feedback.confidence)),
      feedback: feedback.feedback,
      overall: feedback.overall
    };

  } catch (error) {
    console.error('Error generating feedback with Groq:', error);
    throw new Error(`Failed to generate feedback with Groq: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
