import { QuestionRequest, FeedbackRequest, InterviewQuestion, Feedback } from '@/types';

// Completely free AI alternative using simple algorithms and templates
// No API keys required!

// Generate multiple questions (3-4) with mix of job-specific and general questions
export async function generateMultipleQuestionsFree(request: QuestionRequest): Promise<InterviewQuestion[]> {
  const { position, experience, questionNumber, previousQuestions = [] } = request;
  
  // Your original general questions (the ones you provided)
  const generalQuestions = [
    "Tell me about yourself.",
    "Why are you interested in this role?",
    "What do you know about our company?",
    "Why do you want to work here?",
    "What are your greatest strengths?",
    "What is your biggest weakness?",
    "Why should we hire you?",
    "What are your career goals?",
    "Can you describe a challenging project you worked on?",
    "Tell me about a time you demonstrated leadership.",
    "Give an example of when you worked in a team.",
    "Describe a situation where you had to solve a problem creatively.",
    "Tell me about a time you had to work under pressure.",
    "How do you prioritize tasks when handling multiple projects?",
    "Tell me about a time you failed — and how you handled it.",
    "What accomplishment are you most proud of?",
    "Do you prefer working independently or in a team?",
    "How do you stay organized?",
    "Describe a conflict you've had at work and how you resolved it.",
    "Give an example of when you went above and beyond.",
    "Tell me about a time you received constructive criticism — how did you respond?",
    "How do you handle tight deadlines?",
    "How do you handle difficult coworkers or clients?",
    "Tell me about a time you adapted to a big change.",
    "Give an example of when you took initiative.",
    "Describe a time when you had to quickly learn a new skill.",
    "How do you handle making mistakes at work?",
    "What do you think you'll bring to this position?",
    "What motivates you to do your best work?",
    "What do you enjoy most about your current/previous job?",
    "What do you enjoy least about your current/previous job?",
    "What does success mean to you?",
    "Where do you see yourself in 5 years?",
    "What kind of work environment do you thrive in?",
    "How do you handle repetitive or mundane tasks?",
    "How do you handle learning new technology or systems?",
    "What salary range are you expecting?"
  ];

  // Job-specific questions based on position
  const jobSpecificQuestions = generateJobSpecificQuestions(position, experience);
  
  // Mix: 2-3 job-specific questions + 1-2 general questions = 3-4 total
  const questions: InterviewQuestion[] = [];
  
  // Add 2-3 job-specific questions
  const numJobSpecific = Math.min(3, jobSpecificQuestions.length);
  for (let i = 0; i < numJobSpecific; i++) {
    const question = jobSpecificQuestions[i];
    questions.push({
      id: `q_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`,
      question,
      category: determineCategory(question),
      difficulty: determineDifficulty(question, experience),
    });
  }
  
  // Add 1-2 general questions
  const numGeneral = Math.min(2, generalQuestions.length);
  for (let i = 0; i < numGeneral; i++) {
    const question = generalQuestions[i];
    questions.push({
      id: `q_${Date.now()}_${i + numJobSpecific}_${Math.random().toString(36).substr(2, 9)}`,
      question,
      category: determineCategory(question),
      difficulty: determineDifficulty(question, experience),
    });
  }
  
  return questions;
}

// Wrapper function to make other APIs return multiple questions too
export async function generateMultipleQuestionsWrapper(request: QuestionRequest, singleQuestionFn: (req: QuestionRequest) => Promise<InterviewQuestion>): Promise<InterviewQuestion[]> {
  try {
    // Generate one question using the provided function
    const question = await singleQuestionFn(request);
    
    // Generate additional questions using our free system
    const additionalQuestions = await generateMultipleQuestionsFree({
      ...request,
      questionNumber: request.questionNumber + 1 // Offset to get different questions
    });
    
    // Combine: 1 from API + 2-3 from free system = 3-4 total
    const allQuestions = [question, ...additionalQuestions.slice(0, 3)];
    
    return allQuestions;
  } catch (error) {
    // If the API fails, fall back to free generation
    return await generateMultipleQuestionsFree(request);
  }
}

export async function generateInterviewQuestionFree(request: QuestionRequest): Promise<InterviewQuestion> {
  const { position, experience, questionNumber, previousQuestions = [] } = request;
  
  // Template-based question generation
  const questionTemplates = {
    personal: [
      "Tell me about yourself and your background in {position}.",
      "What are your greatest strengths as a {position}?",
      "What motivates you to do your best work?",
      "Where do you see yourself in 5 years?",
      "What does success mean to you?"
    ],
    company: [
      "Why are you interested in this {position} role at our company?",
      "What do you know about our company and our mission?",
      "Why do you want to work here specifically?",
      "How do you see yourself contributing to our team?"
    ],
    behavioral: [
      "Can you describe a challenging project you worked on as a {position}?",
      "Tell me about a time you demonstrated leadership in your role.",
      "Give an example of when you had to work under pressure.",
      "Describe a situation where you had to solve a problem creatively.",
      "Tell me about a time you failed and how you handled it.",
      "What accomplishment are you most proud of in your career?"
    ],
    situational: [
      "How do you prioritize tasks when handling multiple projects?",
      "How do you handle tight deadlines?",
      "How do you handle difficult coworkers or clients?",
      "How do you stay organized when managing multiple responsibilities?",
      "How do you handle learning new technology or systems?"
    ],
    technical: generateTechnicalQuestions(position)
  };

  // Select question type based on question number
  const questionTypes = ['personal', 'company', 'behavioral', 'situational', 'technical'] as const;
  const questionType = questionTypes[questionNumber % questionTypes.length];
  
  // Get available questions for this type
  const availableQuestions = questionTemplates[questionType] || questionTemplates.behavioral;
  
  // Filter out previously asked questions
  const filteredQuestions = availableQuestions.filter(q => 
    !previousQuestions.some(pq => pq.toLowerCase().includes(q.toLowerCase().split(' ')[0]))
  );
  
  // Select a question
  const template = filteredQuestions.length > 0 
    ? filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)]
    : availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  
  // Replace placeholders
  const question = template.replace('{position}', position);
  
  // Determine difficulty based on experience and question type
  const difficulty = determineDifficulty(questionType, experience);
  
  return {
    id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    question,
    category: questionType.charAt(0).toUpperCase() + questionType.slice(1),
    difficulty,
  };
}

export async function generateFeedbackFree(request: FeedbackRequest): Promise<Feedback> {
  const { question, answer, position } = request;
  
  // Analyze the answer using simple heuristics
  const analysis = analyzeAnswer(answer, question);
  
  return {
    relevance: analysis.relevance,
    clarity: analysis.clarity,
    confidence: analysis.confidence,
    feedback: analysis.feedback,
    overall: analysis.overall,
  };
}

// Helper functions
function determineCategory(question: string): string {
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
  const technicalTerms = ['code', 'algorithm', 'database', 'api', 'framework', 'software', 'system', 'technical', 'programming', 'development', 'debugging', 'testing'];
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

function generateJobSpecificQuestions(position: string, experience: string): string[] {
  const positionLower = position.toLowerCase();
  
  // Software Engineering questions
  if (positionLower.includes('software') || positionLower.includes('developer') || positionLower.includes('engineer')) {
    return [
      `How do you approach debugging a complex issue in your code?`,
      `Describe your experience with version control systems like Git.`,
      `How do you ensure code quality and maintainability in your projects?`,
      `What is your approach to testing and quality assurance?`,
      `How do you stay updated with the latest programming languages and frameworks?`,
      `Explain the difference between REST and GraphQL APIs.`,
      `How do you handle code reviews and what makes a good code review?`,
      `Describe your experience with database design and optimization.`,
      `How do you approach performance optimization in your applications?`,
      `What is your experience with cloud platforms and deployment?`
    ];
  }
  
  // Data Analysis questions
  if (positionLower.includes('data') || positionLower.includes('analyst')) {
    return [
      `How do you approach analyzing a large dataset with missing values?`,
      `Describe your experience with SQL and database querying.`,
      `How do you ensure data quality and accuracy in your analysis?`,
      `What tools and programming languages do you use for data analysis?`,
      `How do you handle outliers in your datasets?`,
      `Explain the difference between correlation and causation.`,
      `How do you present complex data insights to non-technical stakeholders?`,
      `What is your experience with machine learning and statistical modeling?`,
      `How do you approach data visualization and storytelling?`,
      `Describe your experience with data cleaning and preprocessing.`
    ];
  }
  
  // Marketing questions
  if (positionLower.includes('marketing')) {
    return [
      `How do you measure the success of a marketing campaign?`,
      `What digital marketing tools and platforms are you familiar with?`,
      `How do you approach market research and competitive analysis?`,
      `Describe your experience with content marketing and SEO.`,
      `How do you handle budget allocation across different marketing channels?`,
      `What is your experience with social media marketing and advertising?`,
      `How do you approach brand positioning and messaging?`,
      `Describe your experience with email marketing and automation.`,
      `How do you track and analyze marketing ROI?`,
      `What is your approach to customer segmentation and targeting?`
    ];
  }
  
  // Sales questions
  if (positionLower.includes('sales')) {
    return [
      `How do you approach the sales process from prospecting to closing?`,
      `What CRM systems are you familiar with?`,
      `How do you handle cold calling and lead generation?`,
      `Describe your experience with consultative selling.`,
      `What is your approach to handling price negotiations?`,
      `How do you build and maintain relationships with clients?`,
      `Describe your experience with sales forecasting and pipeline management.`,
      `How do you handle objections from potential customers?`,
      `What is your approach to upselling and cross-selling?`,
      `How do you stay motivated during challenging sales periods?`
    ];
  }
  
  // HR questions
  if (positionLower.includes('hr') || positionLower.includes('human resources')) {
    return [
      `How do you approach talent acquisition and recruitment?`,
      `What HR systems and software are you familiar with?`,
      `How do you handle employee performance management?`,
      `How do you ensure compliance with employment laws and regulations?`,
      `What is your approach to employee training and development?`,
      `How do you handle employee relations and conflict resolution?`,
      `Describe your experience with compensation and benefits administration.`,
      `How do you approach diversity and inclusion initiatives?`,
      `What is your experience with HR analytics and reporting?`,
      `How do you handle sensitive employee information and confidentiality?`
    ];
  }
  
  // Project Management questions
  if (positionLower.includes('project') && positionLower.includes('manager')) {
    return [
      `How do you approach project planning and timeline management?`,
      `What project management methodologies are you familiar with?`,
      `How do you handle scope creep and changing requirements?`,
      `Describe your experience with team coordination and communication.`,
      `How do you manage project risks and issues?`,
      `What tools do you use for project tracking and reporting?`,
      `How do you handle resource allocation and budget management?`,
      `Describe your experience with stakeholder management.`,
      `How do you ensure project quality and deliverables?`,
      `What is your approach to post-project evaluation and lessons learned?`
    ];
  }
  
  // UX/UI Design questions
  if (positionLower.includes('ux') || positionLower.includes('ui') || positionLower.includes('designer')) {
    return [
      `How do you approach user research and understanding user needs?`,
      `What design tools and software are you most comfortable with?`,
      `How do you balance user needs with business requirements?`,
      `Describe your experience with wireframing and prototyping.`,
      `How do you approach usability testing and user feedback?`,
      `What is your experience with responsive design and accessibility?`,
      `How do you collaborate with developers and other team members?`,
      `Describe your design process from concept to final deliverable.`,
      `How do you stay updated with design trends and best practices?`,
      `What is your approach to creating design systems and style guides?`
    ];
  }
  
  // Default questions for any other role
  return [
    `What specific skills and experience do you bring to this ${position} role?`,
    `How do you stay updated with industry trends and best practices?`,
    `What tools and software are you most familiar with in your field?`,
    `How do you approach problem-solving in your work?`,
    `Describe a time when you had to learn a new skill quickly for your role.`,
    `How do you measure success in your position?`,
    `What challenges do you anticipate in this role and how would you address them?`,
    `How do you prioritize your work and manage competing demands?`,
    `What is your experience with cross-functional collaboration?`,
    `How do you handle feedback and continuous improvement in your work?`
  ];
}

function generateTechnicalQuestions(position: string): string[] {
  const positionLower = position.toLowerCase();
  
  if (positionLower.includes('software') || positionLower.includes('developer') || positionLower.includes('engineer')) {
    return [
      "How do you approach debugging a complex issue?",
      "Describe your experience with version control systems like Git.",
      "How do you ensure code quality in your projects?",
      "What is your approach to testing and quality assurance?",
      "How do you stay updated with the latest technologies?",
      "Explain the difference between REST and GraphQL APIs.",
      "How do you handle code reviews and what makes a good code review?"
    ];
  }
  
  if (positionLower.includes('data') || positionLower.includes('analyst')) {
    return [
      "How do you approach analyzing a large dataset with missing values?",
      "Describe your experience with SQL and database querying.",
      "How do you ensure data quality and accuracy in your analysis?",
      "What tools and programming languages do you use for data analysis?",
      "How do you handle outliers in your datasets?",
      "Explain the difference between correlation and causation."
    ];
  }
  
  if (positionLower.includes('marketing')) {
    return [
      "How do you measure the success of a marketing campaign?",
      "What digital marketing tools and platforms are you familiar with?",
      "How do you approach market research and competitive analysis?",
      "Describe your experience with content marketing and SEO.",
      "How do you handle budget allocation across different marketing channels?"
    ];
  }
  
  if (positionLower.includes('sales')) {
    return [
      "How do you approach the sales process from prospecting to closing?",
      "What CRM systems are you familiar with?",
      "How do you handle cold calling and lead generation?",
      "Describe your experience with consultative selling.",
      "What is your approach to handling price negotiations?"
    ];
  }
  
  if (positionLower.includes('hr') || positionLower.includes('human resources')) {
    return [
      "How do you approach talent acquisition and recruitment?",
      "What HR systems and software are you familiar with?",
      "How do you handle employee performance management?",
      "How do you ensure compliance with employment laws?",
      "What is your approach to employee training and development?"
    ];
  }
  
  // Default technical questions
  return [
    "How do you stay updated with industry trends and best practices?",
    "What tools and software are you most familiar with in your field?",
    "How do you approach problem-solving in your work?",
    "Describe a time when you had to learn a new skill quickly.",
    "How do you measure success in your role?"
  ];
}


function analyzeAnswer(answer: string, question: string): {
  relevance: number;
  clarity: number;
  confidence: number;
  feedback: string[];
  overall: string;
} {
  const answerLength = answer.length;
  const answerLower = answer.toLowerCase();
  
  // Calculate relevance (1-10) - More lenient scoring
  let relevance = 3; // Start higher
  if (answerLength > 30) relevance += 2; // Lowered threshold
  if (answerLength > 100) relevance += 2; // Lowered threshold
  if (answerLower.includes('i ') || answerLower.includes('my ') || answerLower.includes('me ')) relevance += 1;
  if (answerLower.includes('example') || answerLower.includes('experience') || answerLower.includes('time')) relevance += 2;
  if (answerLower.includes('result') || answerLower.includes('outcome') || answerLower.includes('impact')) relevance += 1;
  if (answerLower.includes('%') || /\d+/.test(answer)) relevance += 1;
  if (answerLength > 200) relevance += 1; // Bonus for longer answers
  
  // Calculate clarity (1-10) - More lenient scoring
  let clarity = 3; // Start higher
  if (answerLength > 50) clarity += 2; // Lowered threshold
  if (answerLength > 150) clarity += 2; // Lowered threshold
  if (answerLower.includes('first') || answerLower.includes('then') || answerLower.includes('next')) clarity += 1;
  if (answerLower.includes('because') || answerLower.includes('therefore') || answerLower.includes('so')) clarity += 1;
  if (answerLength < 30) clarity = Math.max(2, clarity - 2); // Less harsh penalty
  if (answerLength > 500) clarity = Math.max(2, clarity - 1);
  if (answerLength > 100) clarity += 1; // Bonus for reasonable length
  
  // Calculate confidence (1-10) - More lenient scoring
  let confidence = 3; // Start higher
  if (answerLength > 50) confidence += 2; // Lowered threshold
  if (answerLower.includes('i ') || answerLower.includes('my ') || answerLower.includes('me ')) confidence += 1;
  if (answerLower.includes('success') || answerLower.includes('achieved') || answerLower.includes('accomplished')) confidence += 1;
  if (answerLower.includes('confident') || answerLower.includes('proud') || answerLower.includes('excited')) confidence += 1;
  if (answerLower.includes('i think') || answerLower.includes('maybe') || answerLower.includes('perhaps')) confidence = Math.max(2, confidence - 1); // Less harsh penalty
  if (answerLength > 100) confidence += 1; // Bonus for longer answers
  
  // Generate feedback - More encouraging
  const feedback: string[] = [];
  
  if (answerLength < 50) {
    feedback.push("💡 Consider adding more detail to make your answer more compelling.");
  } else if (answerLength > 400) {
    feedback.push("💡 Your answer is quite detailed! Consider being more concise while maintaining the great detail.");
  } else {
    feedback.push("✅ Great length for an interview answer!");
  }
  
  if (!answerLower.includes('i ') && !answerLower.includes('my ')) {
    feedback.push("💡 Try using more personal language to share your unique experience.");
  } else {
    feedback.push("✅ Excellent use of personal experience and examples!");
  }
  
  if (!answerLower.includes('example') && !answerLower.includes('time') && !answerLower.includes('situation')) {
    feedback.push("💡 Adding specific examples would make your answer even stronger.");
  } else {
    feedback.push("✅ Great use of specific examples!");
  }
  
  if (!/\d+/.test(answer) && !answerLower.includes('result')) {
    feedback.push("💡 Consider adding quantifiable results to make your answer even more impactful.");
  } else {
    feedback.push("✅ Excellent use of quantifiable results!");
  }
  
  // Generate overall assessment - More encouraging thresholds
  const avgScore = (relevance + clarity + confidence) / 3;
  let overall = "";
  
  if (avgScore >= 7.5) {
    overall = "🏆 OUTSTANDING: Excellent answer that demonstrates strong qualifications and clear communication!";
  } else if (avgScore >= 6.5) {
    overall = "✅ VERY GOOD: Solid answer with good structure and relevant examples!";
  } else if (avgScore >= 5.5) {
    overall = "✅ GOOD: Nice answer! A few more specific examples would make it even better.";
  } else if (avgScore >= 4.5) {
    overall = "👍 DECENT: You're on the right track! Adding more detail and examples will strengthen your answer.";
  } else {
    overall = "💪 KEEP GOING: You have the foundation! Try adding more personal examples and specific details.";
  }
  
  return {
    relevance: Math.min(10, relevance),
    clarity: Math.min(10, clarity),
    confidence: Math.min(10, confidence),
    feedback,
    overall,
  };
}
