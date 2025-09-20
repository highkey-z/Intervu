export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: 'entry' | 'mid' | 'senior' | 'executive';
  tags?: string[];
  position?: string;
  experience?: string;
}

export interface Feedback {
  relevance: number;
  clarity: number;
  confidence: number;
  feedback: string[];
  overall: string;
}

export interface InterviewSession {
  id: string;
  questions: InterviewQuestion[];
  answers: string[];
  feedbacks: Feedback[];
  currentQuestionIndex: number;
  isComplete: boolean;
  startTime: Date;
  endTime?: Date;
}

export interface QuestionRequest {
  position: string;
  experience: string;
  questionNumber: number;
  previousQuestions?: string[];
}

export interface FeedbackRequest {
  question: string;
  answer: string;
  position: string;
}

