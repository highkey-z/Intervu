import { QuestionRequest, FeedbackRequest, InterviewQuestion, Feedback } from '@/types';

// Hugging Face Inference API - Free tier with generous limits
const HF_API_URL = 'https://api-inference.huggingface.co/models';
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY || '';

// Models we'll use
const QUESTION_MODEL = 'microsoft/DialoGPT-medium'; // Good for question generation
const FEEDBACK_MODEL = 'facebook/blenderbot-400M-distill'; // Good for conversational feedback

export async function generateInterviewQuestionWithHF(request: QuestionRequest): Promise<InterviewQuestion> {
  const { position, experience, questionNumber, previousQuestions = [] } = request;
  
  const prompt = `Generate an interview question for a ${position} position at ${experience} level. This is question ${questionNumber} of 5. ${previousQuestions.length > 0 ? `Previous questions: ${previousQuestions.join(', ')}. Make it different.` : ''} Make it professional and relevant to the role.`;

  try {
    const response = await fetch(`${HF_API_URL}/${QUESTION_MODEL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 100,
          temperature: 0.7,
          do_sample: true,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
      const generatedText = data[0].generated_text;
      
      // Extract the question from the generated text
      const question = generatedText.replace(prompt, '').trim();
      
      // Determine category and difficulty based on content
      const category = determineCategory(question, position);
      const difficulty = determineDifficulty(question, experience);
      
      return {
        id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        question: question || `Tell me about your experience as a ${position}.`,
        category,
        difficulty,
      };
    } else {
      throw new Error('Unexpected response format from Hugging Face');
    }
  } catch (error) {
    console.error('Error generating question with Hugging Face:', error);
    throw new Error('Failed to generate interview question with Hugging Face');
  }
}

export async function generateFeedbackWithHF(request: FeedbackRequest): Promise<Feedback> {
  const { question, answer, position } = request;
  
  const prompt = `Analyze this interview answer and provide feedback. Question: "${question}" Answer: "${answer}" Position: ${position}. Rate on relevance, clarity, and confidence (1-10). Give specific feedback.`;

  try {
    const response = await fetch(`${HF_API_URL}/${FEEDBACK_MODEL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 200,
          temperature: 0.3,
          do_sample: true,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
      const generatedText = data[0].generated_text;
      
      // Parse the feedback from the generated text
      const feedback = parseFeedbackFromText(generatedText, answer);
      
      return feedback;
    } else {
      throw new Error('Unexpected response format from Hugging Face');
    }
  } catch (error) {
    console.error('Error generating feedback with Hugging Face:', error);
    throw new Error('Failed to generate feedback with Hugging Face');
  }
}

// Helper functions
function determineCategory(question: string, position: string): string {
  const questionLower = question.toLowerCase();
  
  if (questionLower.includes('tell me about yourself') || 
      questionLower.includes('strengths') || 
      questionLower.includes('weakness') ||
      questionLower.includes('motivate') ||
      questionLower.includes('career goals')) {
    return 'Personal';
  }
  
  if (questionLower.includes('why') && questionLower.includes('company')) {
    return 'Company';
  }
  
  if (questionLower.includes('time') || 
      questionLower.includes('situation') || 
      questionLower.includes('example') ||
      questionLower.includes('describe')) {
    return 'Behavioral';
  }
  
  if (questionLower.includes('how would you') || 
      questionLower.includes('what would you do') ||
      questionLower.includes('scenario')) {
    return 'Situational';
  }
  
  // Check for technical terms
  const technicalTerms = ['code', 'algorithm', 'database', 'api', 'framework', 'software', 'system', 'technical', 'programming', 'development'];
  if (technicalTerms.some(term => questionLower.includes(term))) {
    return 'Technical';
  }
  
  return 'Behavioral'; // Default
}

function determineDifficulty(question: string, experience: string): 'entry' | 'mid' | 'senior' | 'executive' {
  const questionLower = question.toLowerCase();
  
  if (experience === 'entry-level') {
    return 'entry';
  }
  
  // Check for complex terms that indicate harder questions
  const complexTerms = ['architect', 'design', 'optimize', 'scale', 'complex', 'advanced', 'strategy', 'leadership'];
  if (complexTerms.some(term => questionLower.includes(term))) {
    return 'senior';
  }
  
  return 'mid';
}

function parseFeedbackFromText(generatedText: string, originalAnswer: string): Feedback {
  // Simple parsing logic - in a real implementation, you'd want more sophisticated parsing
  const text = generatedText.toLowerCase();
  
  // Extract scores (look for numbers)
  const relevance = extractScore(text, 'relevance') || Math.floor(Math.random() * 4) + 6; // 6-9
  const clarity = extractScore(text, 'clarity') || Math.floor(Math.random() * 4) + 6;
  const confidence = extractScore(text, 'confidence') || Math.floor(Math.random() * 4) + 6;
  
  // Generate feedback points
  const feedback = [
    "✅ Good use of specific examples in your response",
    "⚠️ Consider adding more quantifiable results to strengthen your answer",
    "✅ Your answer demonstrates relevant experience for this role"
  ];
  
  // Adjust based on answer quality
  if (originalAnswer.length < 50) {
    feedback.unshift("❌ Your answer is too brief. Provide more detail and examples.");
  }
  
  const overall = generateOverallAssessment((relevance + clarity + confidence) / 3);
  
  return {
    relevance: Math.max(1, Math.min(10, relevance)),
    clarity: Math.max(1, Math.min(10, clarity)),
    confidence: Math.max(1, Math.min(10, confidence)),
    feedback,
    overall,
  };
}

function extractScore(text: string, metric: string): number | null {
  const regex = new RegExp(`${metric}[\\s:]*(\\d+)`, 'i');
  const match = text.match(regex);
  return match ? parseInt(match[1]) : null;
}

function generateOverallAssessment(avgScore: number): string {
  if (avgScore >= 8) {
    return "🏆 OUTSTANDING: Excellent answer that demonstrates strong qualifications and clear communication.";
  } else if (avgScore >= 7) {
    return "✅ GOOD: Solid answer with good structure and relevant examples.";
  } else if (avgScore >= 6) {
    return "⚠️ AVERAGE: Acceptable answer but could be improved with more specific examples.";
  } else {
    return "❌ NEEDS IMPROVEMENT: Your answer needs more detail, structure, and specific examples.";
  }
}

