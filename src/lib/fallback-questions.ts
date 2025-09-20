import { InterviewQuestion } from '@/types';

// Fallback questions when OpenAI is not available
export const FALLBACK_QUESTIONS: Record<string, InterviewQuestion[]> = {
  'Software Engineer': [
    // Personal Introduction Questions
    {
      id: 'q_1',
      question: 'Tell me about yourself.',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_2',
      question: 'What are your greatest strengths?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_3',
      question: 'What is your biggest weakness?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_4',
      question: 'Why should we hire you?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_5',
      question: 'What are your career goals?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_6',
      question: 'Where do you see yourself in 5 years?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_7',
      question: 'What does success mean to you?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_8',
      question: 'What kind of work environment do you thrive in?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_9',
      question: 'Do you prefer working independently or in a team?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_10',
      question: 'How do you stay organized?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_11',
      question: 'What motivates you to do your best work?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_12',
      question: 'What do you think you\'ll bring to this position?',
      category: 'Personal',
      difficulty: 'mid'
    },
    
    // Company Interest Questions
    {
      id: 'q_13',
      question: 'Why are you interested in this role?',
      category: 'Company',
      difficulty: 'entry'
    },
    {
      id: 'q_14',
      question: 'What do you know about our company?',
      category: 'Company',
      difficulty: 'mid'
    },
    {
      id: 'q_15',
      question: 'Why do you want to work here?',
      category: 'Company',
      difficulty: 'entry'
    },
    
    // Behavioral Questions
    {
      id: 'q_16',
      question: 'Can you describe a challenging project you worked on?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_17',
      question: 'Tell me about a time you demonstrated leadership.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_18',
      question: 'Give an example of when you worked in a team.',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    {
      id: 'q_19',
      question: 'Describe a situation where you had to solve a problem creatively.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_20',
      question: 'Tell me about a time you had to work under pressure.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_21',
      question: 'Tell me about a time you failed — and how you handled it.',
      category: 'Behavioral',
      difficulty: 'senior'
    },
    {
      id: 'q_22',
      question: 'What accomplishment are you most proud of?',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    {
      id: 'q_23',
      question: 'Describe a conflict you\'ve had at work and how you resolved it.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_24',
      question: 'Give an example of when you went above and beyond.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_25',
      question: 'Tell me about a time you received constructive criticism — how did you respond?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_26',
      question: 'Tell me about a time you adapted to a big change.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_27',
      question: 'Give an example of when you took initiative.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_28',
      question: 'Describe a time when you had to quickly learn a new skill.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_29',
      question: 'How do you handle making mistakes at work?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    
    // Situational Questions
    {
      id: 'q_30',
      question: 'How do you prioritize tasks when handling multiple projects?',
      category: 'Situational',
      difficulty: 'mid'
    },
    {
      id: 'q_31',
      question: 'How do you handle tight deadlines?',
      category: 'Situational',
      difficulty: 'mid'
    },
    {
      id: 'q_32',
      question: 'How do you handle difficult coworkers or clients?',
      category: 'Situational',
      difficulty: 'mid'
    },
    {
      id: 'q_33',
      question: 'How do you handle repetitive or mundane tasks?',
      category: 'Situational',
      difficulty: 'entry'
    },
    
    // Technical Questions
    {
      id: 'q_34',
      question: 'Describe a challenging technical problem you solved recently.',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_35',
      question: 'How do you approach debugging a complex issue in production?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_36',
      question: 'How do you stay updated with the latest technologies and best practices?',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_37',
      question: 'Explain the difference between REST and GraphQL APIs.',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_38',
      question: 'How do you ensure code quality in your projects?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_39',
      question: 'Describe your experience with version control systems like Git.',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_40',
      question: 'How do you handle code reviews and what makes a good code review?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_41',
      question: 'What is your approach to testing and quality assurance?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_42',
      question: 'How do you handle tight deadlines and pressure in software development?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_43',
      question: 'Explain the concept of microservices and when you would use them.',
      category: 'Technical',
      difficulty: 'senior'
    },
    {
      id: 'q_44',
      question: 'What is your experience with cloud platforms like AWS or Azure?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_45',
      question: 'How do you handle learning new technology or systems?',
      category: 'Technical',
      difficulty: 'entry'
    },
    
    // Role & Motivation Questions
    {
      id: 'q_46',
      question: 'What do you enjoy most about your current/previous job?',
      category: 'Role',
      difficulty: 'entry'
    },
    {
      id: 'q_47',
      question: 'What do you enjoy least about your current/previous job?',
      category: 'Role',
      difficulty: 'mid'
    },
    {
      id: 'q_48',
      question: 'What salary range are you expecting?',
      category: 'Role',
      difficulty: 'senior'
    }
  ],
  'Data Analyst': [
    // Personal Introduction Questions
    {
      id: 'q_1',
      question: 'Tell me about yourself.',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_2',
      question: 'What are your greatest strengths?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_3',
      question: 'What is your biggest weakness?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_4',
      question: 'Why should we hire you?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_5',
      question: 'What are your career goals?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_6',
      question: 'Where do you see yourself in 5 years?',
      category: 'Personal',
      difficulty: 'entry'
    },
    
    // Company Interest Questions
    {
      id: 'q_7',
      question: 'Why are you interested in this role?',
      category: 'Company',
      difficulty: 'entry'
    },
    {
      id: 'q_8',
      question: 'What do you know about our company?',
      category: 'Company',
      difficulty: 'mid'
    },
    {
      id: 'q_9',
      question: 'Why do you want to work here?',
      category: 'Company',
      difficulty: 'entry'
    },
    
    // Behavioral Questions
    {
      id: 'q_10',
      question: 'Can you describe a challenging project you worked on?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_11',
      question: 'Tell me about a time you demonstrated leadership.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_12',
      question: 'Give an example of when you worked in a team.',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    {
      id: 'q_13',
      question: 'Describe a situation where you had to solve a problem creatively.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_14',
      question: 'Tell me about a time you had to work under pressure.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_15',
      question: 'Tell me about a time you failed — and how you handled it.',
      category: 'Behavioral',
      difficulty: 'senior'
    },
    {
      id: 'q_16',
      question: 'What accomplishment are you most proud of?',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    
    // Technical Questions
    {
      id: 'q_17',
      question: 'Walk me through your experience with data analysis and visualization.',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_18',
      question: 'How would you approach analyzing a large dataset with missing values?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_19',
      question: 'Describe a time when your data analysis led to a significant business decision.',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_20',
      question: 'What tools and programming languages do you use for data analysis?',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_21',
      question: 'How do you ensure data quality and accuracy in your analysis?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_22',
      question: 'Explain the difference between correlation and causation in data analysis.',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_23',
      question: 'How do you handle outliers in your datasets?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_24',
      question: 'Describe your experience with SQL and database querying.',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_25',
      question: 'Tell me about a time when you had to present complex data to non-technical stakeholders.',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_26',
      question: 'What is your approach to data cleaning and preprocessing?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_27',
      question: 'How do you validate the accuracy of your analytical models?',
      category: 'Technical',
      difficulty: 'senior'
    },
    {
      id: 'q_28',
      question: 'Describe a project where you used machine learning for data analysis.',
      category: 'Technical',
      difficulty: 'senior'
    },
    {
      id: 'q_29',
      question: 'How do you stay updated with the latest trends in data science?',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_30',
      question: 'What is your experience with data visualization tools like Tableau or Power BI?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_31',
      question: 'How do you handle sensitive or confidential data in your analysis?',
      category: 'Technical',
      difficulty: 'mid'
    }
  ],
  'Product Manager': [
    // Personal Introduction Questions
    {
      id: 'q_1',
      question: 'Tell me about yourself.',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_2',
      question: 'What are your greatest strengths?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_3',
      question: 'What is your biggest weakness?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_4',
      question: 'Why should we hire you?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_5',
      question: 'What are your career goals?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_6',
      question: 'Where do you see yourself in 5 years?',
      category: 'Personal',
      difficulty: 'entry'
    },
    
    // Company Interest Questions
    {
      id: 'q_7',
      question: 'Why are you interested in this role?',
      category: 'Company',
      difficulty: 'entry'
    },
    {
      id: 'q_8',
      question: 'What do you know about our company?',
      category: 'Company',
      difficulty: 'mid'
    },
    {
      id: 'q_9',
      question: 'Why do you want to work here?',
      category: 'Company',
      difficulty: 'entry'
    },
    
    // Behavioral Questions
    {
      id: 'q_10',
      question: 'Can you describe a challenging project you worked on?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_11',
      question: 'Tell me about a time you demonstrated leadership.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_12',
      question: 'Give an example of when you worked in a team.',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    {
      id: 'q_13',
      question: 'Describe a situation where you had to solve a problem creatively.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_14',
      question: 'Tell me about a time you had to work under pressure.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_15',
      question: 'Tell me about a time you failed — and how you handled it.',
      category: 'Behavioral',
      difficulty: 'senior'
    },
    {
      id: 'q_16',
      question: 'What accomplishment are you most proud of?',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    
    // Technical Questions
    {
      id: 'q_17',
      question: 'Tell me about your experience managing product development.',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_18',
      question: 'How do you prioritize features when resources are limited?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_19',
      question: 'Describe a time when you had to make a difficult product decision.',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_20',
      question: 'How do you gather and analyze user feedback for product improvements?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_21',
      question: 'What metrics do you use to measure product success?',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_22',
      question: 'How do you handle competing priorities from different stakeholders?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_23',
      question: 'Describe your experience with agile development methodologies.',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_24',
      question: 'How do you conduct user research and what methods do you use?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_25',
      question: 'Tell me about a product launch that didn\'t go as planned and how you handled it.',
      category: 'Technical',
      difficulty: 'senior'
    },
    {
      id: 'q_26',
      question: 'How do you balance user needs with business objectives?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_27',
      question: 'What is your approach to creating product roadmaps?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_28',
      question: 'How do you work with engineering teams to define technical requirements?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_29',
      question: 'Describe a time when you had to pivot a product strategy.',
      category: 'Technical',
      difficulty: 'senior'
    },
    {
      id: 'q_30',
      question: 'How do you measure and improve user engagement?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_31',
      question: 'What is your experience with A/B testing and experimentation?',
      category: 'Technical',
      difficulty: 'mid'
    }
  ],
  'General': [
    // Personal Introduction Questions
    {
      id: 'q_1',
      question: 'Tell me about yourself.',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_2',
      question: 'What are your greatest strengths?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_3',
      question: 'What is your biggest weakness?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_4',
      question: 'Why should we hire you?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_5',
      question: 'What are your career goals?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_6',
      question: 'Where do you see yourself in 5 years?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_7',
      question: 'What does success mean to you?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_8',
      question: 'What kind of work environment do you thrive in?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_9',
      question: 'Do you prefer working independently or in a team?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_10',
      question: 'How do you stay organized?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_11',
      question: 'What motivates you to do your best work?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_12',
      question: 'What do you think you\'ll bring to this position?',
      category: 'Personal',
      difficulty: 'mid'
    },
    
    // Company Interest Questions
    {
      id: 'q_13',
      question: 'Why are you interested in this role?',
      category: 'Company',
      difficulty: 'entry'
    },
    {
      id: 'q_14',
      question: 'What do you know about our company?',
      category: 'Company',
      difficulty: 'mid'
    },
    {
      id: 'q_15',
      question: 'Why do you want to work here?',
      category: 'Company',
      difficulty: 'entry'
    },
    
    // Behavioral Questions
    {
      id: 'q_16',
      question: 'Can you describe a challenging project you worked on?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_17',
      question: 'Tell me about a time you demonstrated leadership.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_18',
      question: 'Give an example of when you worked in a team.',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    {
      id: 'q_19',
      question: 'Describe a situation where you had to solve a problem creatively.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_20',
      question: 'Tell me about a time you had to work under pressure.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_21',
      question: 'Tell me about a time you failed — and how you handled it.',
      category: 'Behavioral',
      difficulty: 'senior'
    },
    {
      id: 'q_22',
      question: 'What accomplishment are you most proud of?',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    {
      id: 'q_23',
      question: 'Describe a conflict you\'ve had at work and how you resolved it.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_24',
      question: 'Give an example of when you went above and beyond.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_25',
      question: 'Tell me about a time you received constructive criticism — how did you respond?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_26',
      question: 'Tell me about a time you adapted to a big change.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_27',
      question: 'Give an example of when you took initiative.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_28',
      question: 'Describe a time when you had to quickly learn a new skill.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_29',
      question: 'How do you handle making mistakes at work?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    
    // Situational Questions
    {
      id: 'q_30',
      question: 'How do you prioritize tasks when handling multiple projects?',
      category: 'Situational',
      difficulty: 'mid'
    },
    {
      id: 'q_31',
      question: 'How do you handle tight deadlines?',
      category: 'Situational',
      difficulty: 'mid'
    },
    {
      id: 'q_32',
      question: 'How do you handle difficult coworkers or clients?',
      category: 'Situational',
      difficulty: 'mid'
    },
    {
      id: 'q_33',
      question: 'How do you handle repetitive or mundane tasks?',
      category: 'Situational',
      difficulty: 'entry'
    },
    
    // Role & Motivation Questions
    {
      id: 'q_34',
      question: 'What do you enjoy most about your current/previous job?',
      category: 'Role',
      difficulty: 'entry'
    },
    {
      id: 'q_35',
      question: 'What do you enjoy least about your current/previous job?',
      category: 'Role',
      difficulty: 'mid'
    },
    {
      id: 'q_36',
      question: 'What salary range are you expecting?',
      category: 'Role',
      difficulty: 'senior'
    },
    {
      id: 'q_37',
      question: 'How do you handle learning new technology or systems?',
      category: 'Role',
      difficulty: 'entry'
    }
  ],
  'Marketing Manager': [
    // Personal Introduction Questions
    {
      id: 'q_1',
      question: 'Tell me about yourself.',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_2',
      question: 'What are your greatest strengths?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_3',
      question: 'What is your biggest weakness?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_4',
      question: 'Why should we hire you?',
      category: 'Personal',
      difficulty: 'mid'
    },
    
    // Company Interest Questions
    {
      id: 'q_5',
      question: 'Why are you interested in this role?',
      category: 'Company',
      difficulty: 'entry'
    },
    {
      id: 'q_6',
      question: 'What do you know about our company?',
      category: 'Company',
      difficulty: 'mid'
    },
    {
      id: 'q_7',
      question: 'Why do you want to work here?',
      category: 'Company',
      difficulty: 'entry'
    },
    
    // Behavioral Questions
    {
      id: 'q_8',
      question: 'Can you describe a challenging marketing campaign you worked on?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_9',
      question: 'Tell me about a time you demonstrated leadership in a marketing team.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_10',
      question: 'Give an example of when you worked in a cross-functional team.',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    {
      id: 'q_11',
      question: 'Describe a situation where you had to solve a marketing problem creatively.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_12',
      question: 'Tell me about a time you had to work under pressure to meet a campaign deadline.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_13',
      question: 'What accomplishment are you most proud of in your marketing career?',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    
    // Technical Questions
    {
      id: 'q_14',
      question: 'How do you measure the success of a marketing campaign?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_15',
      question: 'What digital marketing tools and platforms are you familiar with?',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_16',
      question: 'How do you approach market research and competitive analysis?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_17',
      question: 'Describe your experience with content marketing and SEO.',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_18',
      question: 'How do you handle budget allocation across different marketing channels?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_19',
      question: 'What is your approach to A/B testing and optimization?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_20',
      question: 'How do you stay updated with the latest marketing trends and technologies?',
      category: 'Technical',
      difficulty: 'entry'
    }
  ],
  'Sales Representative': [
    // Personal Introduction Questions
    {
      id: 'q_1',
      question: 'Tell me about yourself.',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_2',
      question: 'What are your greatest strengths?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_3',
      question: 'What is your biggest weakness?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_4',
      question: 'Why should we hire you?',
      category: 'Personal',
      difficulty: 'mid'
    },
    
    // Company Interest Questions
    {
      id: 'q_5',
      question: 'Why are you interested in this sales role?',
      category: 'Company',
      difficulty: 'entry'
    },
    {
      id: 'q_6',
      question: 'What do you know about our company and products?',
      category: 'Company',
      difficulty: 'mid'
    },
    {
      id: 'q_7',
      question: 'Why do you want to work here?',
      category: 'Company',
      difficulty: 'entry'
    },
    
    // Behavioral Questions
    {
      id: 'q_8',
      question: 'Can you describe a challenging sales situation you handled?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_9',
      question: 'Tell me about a time you exceeded your sales targets.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_10',
      question: 'Give an example of when you had to handle a difficult customer.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_11',
      question: 'Describe a situation where you had to overcome a sales objection.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_12',
      question: 'Tell me about a time you had to work under pressure to close a deal.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_13',
      question: 'What accomplishment are you most proud of in sales?',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    
    // Technical Questions
    {
      id: 'q_14',
      question: 'How do you approach the sales process from prospecting to closing?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_15',
      question: 'What CRM systems are you familiar with?',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_16',
      question: 'How do you handle cold calling and lead generation?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_17',
      question: 'Describe your experience with consultative selling.',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_18',
      question: 'How do you build and maintain relationships with clients?',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_19',
      question: 'What is your approach to handling price negotiations?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_20',
      question: 'How do you stay motivated during slow sales periods?',
      category: 'Technical',
      difficulty: 'mid'
    }
  ],
  'HR Manager': [
    // Personal Introduction Questions
    {
      id: 'q_1',
      question: 'Tell me about yourself.',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_2',
      question: 'What are your greatest strengths?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_3',
      question: 'What is your biggest weakness?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_4',
      question: 'Why should we hire you?',
      category: 'Personal',
      difficulty: 'mid'
    },
    
    // Company Interest Questions
    {
      id: 'q_5',
      question: 'Why are you interested in this HR role?',
      category: 'Company',
      difficulty: 'entry'
    },
    {
      id: 'q_6',
      question: 'What do you know about our company culture?',
      category: 'Company',
      difficulty: 'mid'
    },
    {
      id: 'q_7',
      question: 'Why do you want to work here?',
      category: 'Company',
      difficulty: 'entry'
    },
    
    // Behavioral Questions
    {
      id: 'q_8',
      question: 'Can you describe a challenging HR situation you handled?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_9',
      question: 'Tell me about a time you had to handle an employee conflict.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_10',
      question: 'Give an example of when you had to make a difficult hiring decision.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_11',
      question: 'Describe a situation where you had to implement a new HR policy.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_12',
      question: 'Tell me about a time you had to work under pressure during a crisis.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_13',
      question: 'What accomplishment are you most proud of in HR?',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    
    // Technical Questions
    {
      id: 'q_14',
      question: 'How do you approach talent acquisition and recruitment?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_15',
      question: 'What HR systems and software are you familiar with?',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_16',
      question: 'How do you handle employee performance management?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_17',
      question: 'Describe your experience with compensation and benefits administration.',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_18',
      question: 'How do you ensure compliance with employment laws and regulations?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_19',
      question: 'What is your approach to employee training and development?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_20',
      question: 'How do you measure HR effectiveness and employee satisfaction?',
      category: 'Technical',
      difficulty: 'mid'
    }
  ],
  'Project Manager': [
    // Personal Introduction Questions
    {
      id: 'q_1',
      question: 'Tell me about yourself.',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_2',
      question: 'What are your greatest strengths?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_3',
      question: 'What is your biggest weakness?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_4',
      question: 'Why should we hire you?',
      category: 'Personal',
      difficulty: 'mid'
    },
    
    // Company Interest Questions
    {
      id: 'q_5',
      question: 'Why are you interested in this project management role?',
      category: 'Company',
      difficulty: 'entry'
    },
    {
      id: 'q_6',
      question: 'What do you know about our company and projects?',
      category: 'Company',
      difficulty: 'mid'
    },
    {
      id: 'q_7',
      question: 'Why do you want to work here?',
      category: 'Company',
      difficulty: 'entry'
    },
    
    // Behavioral Questions
    {
      id: 'q_8',
      question: 'Can you describe a challenging project you managed?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_9',
      question: 'Tell me about a time you had to lead a team through a difficult project.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_10',
      question: 'Give an example of when you had to manage conflicting priorities.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_11',
      question: 'Describe a situation where you had to solve a project problem creatively.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_12',
      question: 'Tell me about a time a project went over budget or timeline.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_13',
      question: 'What accomplishment are you most proud of as a project manager?',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    
    // Technical Questions
    {
      id: 'q_14',
      question: 'How do you approach project planning and risk management?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_15',
      question: 'What project management methodologies are you familiar with?',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_16',
      question: 'How do you handle stakeholder communication and reporting?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_17',
      question: 'Describe your experience with project management software.',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_18',
      question: 'How do you manage project scope and change requests?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_19',
      question: 'What is your approach to team motivation and conflict resolution?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_20',
      question: 'How do you ensure project quality and deliverable standards?',
      category: 'Technical',
      difficulty: 'mid'
    }
  ],
  'Financial Analyst': [
    // Personal Introduction Questions
    {
      id: 'q_1',
      question: 'Tell me about yourself.',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_2',
      question: 'What are your greatest strengths?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_3',
      question: 'What is your biggest weakness?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_4',
      question: 'Why should we hire you?',
      category: 'Personal',
      difficulty: 'mid'
    },
    
    // Company Interest Questions
    {
      id: 'q_5',
      question: 'Why are you interested in this financial analyst role?',
      category: 'Company',
      difficulty: 'entry'
    },
    {
      id: 'q_6',
      question: 'What do you know about our company\'s financial position?',
      category: 'Company',
      difficulty: 'mid'
    },
    {
      id: 'q_7',
      question: 'Why do you want to work here?',
      category: 'Company',
      difficulty: 'entry'
    },
    
    // Behavioral Questions
    {
      id: 'q_8',
      question: 'Can you describe a challenging financial analysis you completed?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_9',
      question: 'Tell me about a time you identified a significant financial risk.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_10',
      question: 'Give an example of when you had to present complex financial data.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_11',
      question: 'Describe a situation where your analysis led to cost savings.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_12',
      question: 'Tell me about a time you had to work under pressure to meet reporting deadlines.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_13',
      question: 'What accomplishment are you most proud of in financial analysis?',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    
    // Technical Questions
    {
      id: 'q_14',
      question: 'How do you approach financial modeling and forecasting?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_15',
      question: 'What financial software and tools are you familiar with?',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_16',
      question: 'How do you analyze financial statements and key ratios?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_17',
      question: 'Describe your experience with budgeting and variance analysis.',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_18',
      question: 'How do you ensure accuracy in financial reporting?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_19',
      question: 'What is your approach to risk assessment and management?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_20',
      question: 'How do you stay updated with financial regulations and standards?',
      category: 'Technical',
      difficulty: 'entry'
    }
  ],
  'UX/UI Designer': [
    // Personal Introduction Questions
    {
      id: 'q_1',
      question: 'Tell me about yourself.',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_2',
      question: 'What are your greatest strengths?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_3',
      question: 'What is your biggest weakness?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_4',
      question: 'Why should we hire you?',
      category: 'Personal',
      difficulty: 'mid'
    },
    
    // Company Interest Questions
    {
      id: 'q_5',
      question: 'Why are you interested in this UX/UI design role?',
      category: 'Company',
      difficulty: 'entry'
    },
    {
      id: 'q_6',
      question: 'What do you know about our company\'s design philosophy?',
      category: 'Company',
      difficulty: 'mid'
    },
    {
      id: 'q_7',
      question: 'Why do you want to work here?',
      category: 'Company',
      difficulty: 'entry'
    },
    
    // Behavioral Questions
    {
      id: 'q_8',
      question: 'Can you describe a challenging design project you worked on?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_9',
      question: 'Tell me about a time you had to advocate for user needs.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_10',
      question: 'Give an example of when you had to collaborate with developers.',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    {
      id: 'q_11',
      question: 'Describe a situation where you had to solve a complex UX problem.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_12',
      question: 'Tell me about a time you received negative feedback on a design.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_13',
      question: 'What accomplishment are you most proud of in design?',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    
    // Technical Questions
    {
      id: 'q_14',
      question: 'How do you approach user research and usability testing?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_15',
      question: 'What design tools and software are you familiar with?',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_16',
      question: 'How do you create wireframes and prototypes?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_17',
      question: 'Describe your experience with responsive design principles.',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_18',
      question: 'How do you ensure accessibility in your designs?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_19',
      question: 'What is your approach to design systems and consistency?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_20',
      question: 'How do you stay updated with design trends and best practices?',
      category: 'Technical',
      difficulty: 'entry'
    }
  ],
  'Operations Manager': [
    // Personal Introduction Questions
    {
      id: 'q_1',
      question: 'Tell me about yourself.',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_2',
      question: 'What are your greatest strengths?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_3',
      question: 'What is your biggest weakness?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_4',
      question: 'Why should we hire you?',
      category: 'Personal',
      difficulty: 'mid'
    },
    
    // Company Interest Questions
    {
      id: 'q_5',
      question: 'Why are you interested in this operations role?',
      category: 'Company',
      difficulty: 'entry'
    },
    {
      id: 'q_6',
      question: 'What do you know about our company\'s operations?',
      category: 'Company',
      difficulty: 'mid'
    },
    {
      id: 'q_7',
      question: 'Why do you want to work here?',
      category: 'Company',
      difficulty: 'entry'
    },
    
    // Behavioral Questions
    {
      id: 'q_8',
      question: 'Can you describe a challenging operational problem you solved?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_9',
      question: 'Tell me about a time you improved operational efficiency.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_10',
      question: 'Give an example of when you had to manage a crisis situation.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_11',
      question: 'Describe a situation where you had to implement process improvements.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_12',
      question: 'Tell me about a time you had to work under pressure to meet deadlines.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_13',
      question: 'What accomplishment are you most proud of in operations?',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    
    // Technical Questions
    {
      id: 'q_14',
      question: 'How do you approach process optimization and efficiency?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_15',
      question: 'What operations management tools are you familiar with?',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_16',
      question: 'How do you handle quality control and assurance?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_17',
      question: 'Describe your experience with supply chain management.',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_18',
      question: 'How do you manage vendor relationships and contracts?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_19',
      question: 'What is your approach to cost reduction and budgeting?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_20',
      question: 'How do you ensure compliance with safety and regulatory standards?',
      category: 'Technical',
      difficulty: 'mid'
    }
  ],
  'Business Analyst': [
    // Personal Introduction Questions
    {
      id: 'q_1',
      question: 'Tell me about yourself.',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_2',
      question: 'What are your greatest strengths?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_3',
      question: 'What is your biggest weakness?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_4',
      question: 'Why should we hire you?',
      category: 'Personal',
      difficulty: 'mid'
    },
    
    // Company Interest Questions
    {
      id: 'q_5',
      question: 'Why are you interested in this business analyst role?',
      category: 'Company',
      difficulty: 'entry'
    },
    {
      id: 'q_6',
      question: 'What do you know about our company\'s business model?',
      category: 'Company',
      difficulty: 'mid'
    },
    {
      id: 'q_7',
      question: 'Why do you want to work here?',
      category: 'Company',
      difficulty: 'entry'
    },
    
    // Behavioral Questions
    {
      id: 'q_8',
      question: 'Can you describe a challenging business analysis project you completed?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_9',
      question: 'Tell me about a time you identified a business opportunity.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_10',
      question: 'Give an example of when you had to gather requirements from stakeholders.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_11',
      question: 'Describe a situation where your analysis led to process improvements.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_12',
      question: 'Tell me about a time you had to present findings to executives.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_13',
      question: 'What accomplishment are you most proud of as a business analyst?',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    
    // Technical Questions
    {
      id: 'q_14',
      question: 'How do you approach requirements gathering and documentation?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_15',
      question: 'What business analysis tools and methodologies are you familiar with?',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_16',
      question: 'How do you analyze business processes and workflows?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_17',
      question: 'Describe your experience with data analysis and reporting.',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_18',
      question: 'How do you handle stakeholder management and communication?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_19',
      question: 'What is your approach to gap analysis and solution design?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_20',
      question: 'How do you ensure your recommendations align with business objectives?',
      category: 'Technical',
      difficulty: 'mid'
    }
  ],
  'Customer Success Manager': [
    // Personal Introduction Questions
    {
      id: 'q_1',
      question: 'Tell me about yourself.',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_2',
      question: 'What are your greatest strengths?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_3',
      question: 'What is your biggest weakness?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_4',
      question: 'Why should we hire you?',
      category: 'Personal',
      difficulty: 'mid'
    },
    
    // Company Interest Questions
    {
      id: 'q_5',
      question: 'Why are you interested in this customer success role?',
      category: 'Company',
      difficulty: 'entry'
    },
    {
      id: 'q_6',
      question: 'What do you know about our company\'s customer base?',
      category: 'Company',
      difficulty: 'mid'
    },
    {
      id: 'q_7',
      question: 'Why do you want to work here?',
      category: 'Company',
      difficulty: 'entry'
    },
    
    // Behavioral Questions
    {
      id: 'q_8',
      question: 'Can you describe a challenging customer situation you handled?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_9',
      question: 'Tell me about a time you helped a customer achieve their goals.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_10',
      question: 'Give an example of when you prevented a customer from churning.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_11',
      question: 'Describe a situation where you had to manage multiple customer accounts.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_12',
      question: 'Tell me about a time you had to work under pressure to resolve a customer issue.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_13',
      question: 'What accomplishment are you most proud of in customer success?',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    
    // Technical Questions
    {
      id: 'q_14',
      question: 'How do you approach customer onboarding and training?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_15',
      question: 'What customer success tools and platforms are you familiar with?',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_16',
      question: 'How do you measure and track customer satisfaction and health scores?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_17',
      question: 'Describe your experience with account management and expansion.',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_18',
      question: 'How do you handle customer feedback and feature requests?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_19',
      question: 'What is your approach to building long-term customer relationships?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_20',
      question: 'How do you collaborate with sales and product teams?',
      category: 'Technical',
      difficulty: 'mid'
    }
  ],
  'Accountant': [
    // Personal Introduction Questions
    {
      id: 'q_1',
      question: 'Tell me about yourself.',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_2',
      question: 'What are your greatest strengths?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_3',
      question: 'What is your biggest weakness?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_4',
      question: 'Why should we hire you?',
      category: 'Personal',
      difficulty: 'mid'
    },
    
    // Company Interest Questions
    {
      id: 'q_5',
      question: 'Why are you interested in this accounting role?',
      category: 'Company',
      difficulty: 'entry'
    },
    {
      id: 'q_6',
      question: 'What do you know about our company\'s financial structure?',
      category: 'Company',
      difficulty: 'mid'
    },
    {
      id: 'q_7',
      question: 'Why do you want to work here?',
      category: 'Company',
      difficulty: 'entry'
    },
    
    // Behavioral Questions
    {
      id: 'q_8',
      question: 'Can you describe a challenging accounting problem you solved?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_9',
      question: 'Tell me about a time you identified a financial discrepancy.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_10',
      question: 'Give an example of when you had to work under tight deadlines.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_11',
      question: 'Describe a situation where you had to implement new accounting procedures.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_12',
      question: 'Tell me about a time you had to prepare for an audit.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_13',
      question: 'What accomplishment are you most proud of in accounting?',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    
    // Technical Questions
    {
      id: 'q_14',
      question: 'How do you approach financial statement preparation and analysis?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_15',
      question: 'What accounting software and systems are you familiar with?',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_16',
      question: 'How do you ensure compliance with accounting standards and regulations?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_17',
      question: 'Describe your experience with tax preparation and filing.',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_18',
      question: 'How do you handle month-end and year-end closing processes?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_19',
      question: 'What is your approach to internal controls and risk management?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_20',
      question: 'How do you stay updated with accounting standards and tax laws?',
      category: 'Technical',
      difficulty: 'entry'
    }
  ],
  'Marketing Coordinator': [
    // Personal Introduction Questions
    {
      id: 'q_1',
      question: 'Tell me about yourself.',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_2',
      question: 'What are your greatest strengths?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_3',
      question: 'What is your biggest weakness?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_4',
      question: 'Why should we hire you?',
      category: 'Personal',
      difficulty: 'mid'
    },
    
    // Company Interest Questions
    {
      id: 'q_5',
      question: 'Why are you interested in this marketing coordinator role?',
      category: 'Company',
      difficulty: 'entry'
    },
    {
      id: 'q_6',
      question: 'What do you know about our company\'s marketing strategy?',
      category: 'Company',
      difficulty: 'mid'
    },
    {
      id: 'q_7',
      question: 'Why do you want to work here?',
      category: 'Company',
      difficulty: 'entry'
    },
    
    // Behavioral Questions
    {
      id: 'q_8',
      question: 'Can you describe a marketing campaign you helped coordinate?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_9',
      question: 'Tell me about a time you had to manage multiple marketing projects.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_10',
      question: 'Give an example of when you had to work with external vendors.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_11',
      question: 'Describe a situation where you had to coordinate with different departments.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_12',
      question: 'Tell me about a time you had to work under pressure to meet campaign deadlines.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_13',
      question: 'What accomplishment are you most proud of in marketing?',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    
    // Technical Questions
    {
      id: 'q_14',
      question: 'How do you approach event planning and coordination?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_15',
      question: 'What marketing tools and platforms are you familiar with?',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_16',
      question: 'How do you handle social media content creation and scheduling?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_17',
      question: 'Describe your experience with email marketing campaigns.',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_18',
      question: 'How do you track and measure marketing campaign performance?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_19',
      question: 'What is your approach to content creation and brand consistency?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_20',
      question: 'How do you stay organized when managing multiple marketing initiatives?',
      category: 'Technical',
      difficulty: 'entry'
    }
  ],
  'Content Writer': [
    // Personal Introduction Questions
    {
      id: 'q_1',
      question: 'Tell me about yourself.',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_2',
      question: 'What are your greatest strengths?',
      category: 'Personal',
      difficulty: 'entry'
    },
    {
      id: 'q_3',
      question: 'What is your biggest weakness?',
      category: 'Personal',
      difficulty: 'mid'
    },
    {
      id: 'q_4',
      question: 'Why should we hire you?',
      category: 'Personal',
      difficulty: 'mid'
    },
    
    // Company Interest Questions
    {
      id: 'q_5',
      question: 'Why are you interested in this content writing role?',
      category: 'Company',
      difficulty: 'entry'
    },
    {
      id: 'q_6',
      question: 'What do you know about our company\'s content strategy?',
      category: 'Company',
      difficulty: 'mid'
    },
    {
      id: 'q_7',
      question: 'Why do you want to work here?',
      category: 'Company',
      difficulty: 'entry'
    },
    
    // Behavioral Questions
    {
      id: 'q_8',
      question: 'Can you describe a challenging writing project you completed?',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_9',
      question: 'Tell me about a time you had to write for a difficult audience.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_10',
      question: 'Give an example of when you had to meet tight writing deadlines.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_11',
      question: 'Describe a situation where you had to adapt your writing style.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_12',
      question: 'Tell me about a time you received negative feedback on your writing.',
      category: 'Behavioral',
      difficulty: 'mid'
    },
    {
      id: 'q_13',
      question: 'What accomplishment are you most proud of as a writer?',
      category: 'Behavioral',
      difficulty: 'entry'
    },
    
    // Technical Questions
    {
      id: 'q_14',
      question: 'How do you approach research for content creation?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_15',
      question: 'What writing tools and software are you familiar with?',
      category: 'Technical',
      difficulty: 'entry'
    },
    {
      id: 'q_16',
      question: 'How do you optimize content for SEO?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_17',
      question: 'Describe your experience with different content formats and styles.',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_18',
      question: 'How do you ensure brand voice consistency in your writing?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_19',
      question: 'What is your approach to editing and proofreading?',
      category: 'Technical',
      difficulty: 'mid'
    },
    {
      id: 'q_20',
      question: 'How do you stay creative and overcome writer\'s block?',
      category: 'Technical',
      difficulty: 'entry'
    }
  ]
};

export function getFallbackQuestion(position: string, questionNumber: number, previousQuestions: string[] = []): InterviewQuestion {
  // Try to find questions for the specific position, fall back to General, then Software Engineer
  let questions = FALLBACK_QUESTIONS[position] || FALLBACK_QUESTIONS['General'] || FALLBACK_QUESTIONS['Software Engineer'];
  
  // Filter out previously asked questions
  const availableQuestions = questions.filter(q => !previousQuestions.includes(q.question));
  
  // If we've used all questions, reset the filter
  const questionsToUse = availableQuestions.length > 0 ? availableQuestions : questions;
  
  // Randomly select a question
  const randomIndex = Math.floor(Math.random() * questionsToUse.length);
  const question = questionsToUse[randomIndex];
  
  return {
    ...question,
    id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  };
}

import { getUltraStrictFeedback } from './ultra-strict-feedback';

export function getFallbackFeedback(question: string, answer: string): any {
  return getUltraStrictFeedback(question, answer);
}
