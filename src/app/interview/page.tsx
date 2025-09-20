'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { InterviewQuestion, Feedback, InterviewSession } from '@/types';
import FeedbackCard from '@/components/FeedbackCard';
import ProgressIndicator from '@/components/ProgressIndicator';
import SmartTTS from '@/components/SmartTTS';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

export default function InterviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<Feedback | null>(null);
  const [isTTSPlaying, setIsTTSPlaying] = useState(false);
  const [ttsJustFinished, setTtsJustFinished] = useState(false);
  const [autoRecordingEnabled, setAutoRecordingEnabled] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isRecordingRef = useRef(false);

  const position = searchParams.get('position') || 'Software Engineer';
  const experience = searchParams.get('experience') || 'mid-level';

  useEffect(() => {
    console.log('=== INITIALIZING SPEECH RECOGNITION ===');
    // Initialize speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      console.log('SpeechRecognition available:', !!SpeechRecognition);
      console.log('webkitSpeechRecognition:', !!window.webkitSpeechRecognition);
      console.log('SpeechRecognition:', !!window.SpeechRecognition);
      
      if (SpeechRecognition) {
        console.log('Creating speech recognition instance...');
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';
        console.log('Speech recognition instance created:', recognitionRef.current);

        recognitionRef.current.onresult = (event) => {
          console.log('=== SPEECH RESULT FIRED ===');
          console.log('isRecording:', isRecording);
          console.log('isTTSPlaying:', isTTSPlaying);
          
          // Only process final results to avoid duplication
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              finalTranscript += result[0].transcript;
            }
          }
          
          console.log('Final transcript:', finalTranscript);
          
          if (finalTranscript.trim()) {
            console.log('Adding final transcript to answer');
            setCurrentAnswer(prev => {
              // Simple approach: just add the transcript with proper spacing
              const separator = prev && !prev.endsWith(' ') ? ' ' : '';
              return prev + separator + finalTranscript;
            });
          }
        };


        recognitionRef.current.onend = () => {
          console.log('=== SPEECH RECOGNITION ENDED ===');
          setIsRecording(false);
          isRecordingRef.current = false;
        };

        recognitionRef.current.onerror = (event) => {
          console.error('=== SPEECH RECOGNITION ERROR ===', event.error);
          setIsRecording(false);
        };
        
        console.log('Speech recognition setup complete');
      } else {
        console.error('Speech recognition not supported in this browser');
      }

      // Initialize session
        initializeSession();
    }
  }, []);

  const initializeSession = async () => {
    try {
      const response = await fetch('/api/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          position,
          experience,
          questionNumber: 1,
          previousQuestions: [],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }
      
      const questions: InterviewQuestion[] = await response.json();
      
      // Create session with questions
    const newSession: InterviewSession = {
        id: `session_${Date.now()}`,
        questions: questions,
        answers: [],
        feedbacks: [],
        currentQuestionIndex: 0,
        isComplete: false,
        startTime: new Date(),
      };
      
      setSession(newSession);
      setAutoRecordingEnabled(false); // Reset auto-recording for new session
    } catch (error) {
      console.error('Error initializing session:', error);
      // Create session without questions as fallback
      const fallbackSession: InterviewSession = {
      id: `session_${Date.now()}`,
      questions: [],
      answers: [],
      feedbacks: [],
      currentQuestionIndex: 0,
      isComplete: false,
      startTime: new Date(),
    };
      setSession(fallbackSession);
      setAutoRecordingEnabled(false); // Reset auto-recording for fallback session
    }
  };

  const generateNextQuestion = async (currentSession?: InterviewSession) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          position,
          experience,
          questionNumber: (currentSession?.currentQuestionIndex || 0) + 1,
          previousQuestions: currentSession?.questions.map(q => q.question) || [],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Failed to generate question');
      }
      
      const questions: InterviewQuestion[] = await response.json();
      
      // Update session with questions
      setSession(prev => {
        if (!prev) return null;
        return {
          ...prev,
          questions: questions,
        };
      });
    } catch (error) {
      console.error('Error generating question:', error);
      alert(`Failed to generate question: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = () => {
    console.log('=== START RECORDING DEBUG ===');
    console.log('recognitionRef.current:', recognitionRef.current);
    console.log('isRecording:', isRecording);
    console.log('isTTSPlaying:', isTTSPlaying);
    
    if (!recognitionRef.current) {
      console.error('No speech recognition available!');
      return;
    }
    
    if (isRecordingRef.current) {
      console.log('Already recording');
      return;
    }
    
    if (isTTSPlaying) {
      console.log('TTS is playing, cannot record');
      return;
    }

    try {
      console.log('Setting recording state...');
      // Keep previous answer and append new recording to it
      setIsRecording(true);
      isRecordingRef.current = true;
      
      console.log('Starting speech recognition...');
        recognitionRef.current.start();
      console.log('Speech recognition started successfully!');
      } catch (error) {
      console.error('Error starting recording:', error);
        setIsRecording(false);
      isRecordingRef.current = false;
    }
  };

  const stopRecording = () => {
    if (!recognitionRef.current || !isRecordingRef.current) return;

      try {
        recognitionRef.current.stop();
      } catch (error) {
      console.error('Error stopping recording:', error);
      }
      setIsRecording(false);
    isRecordingRef.current = false;
  };

  const submitAnswer = async () => {
    if (!currentAnswer.trim() || !session) return;

    setIsLoading(true);
    try {
      // Get feedback
      const feedbackResponse = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: session.questions[session.currentQuestionIndex].question,
          answer: currentAnswer,
          position,
        }),
      });

      if (!feedbackResponse.ok) throw new Error('Failed to get feedback');
      
      const feedback: Feedback = await feedbackResponse.json();
      setCurrentFeedback(feedback);
      setShowFeedback(true);

      // Update session
      const updatedSession = {
        ...session,
        answers: [...session.answers, currentAnswer],
        feedbacks: [...session.feedbacks, feedback],
        currentQuestionIndex: session.currentQuestionIndex + 1,
      };
      setSession(updatedSession);

      // Check if interview is complete
      if (updatedSession.currentQuestionIndex >= 5) {
        updatedSession.isComplete = true;
        updatedSession.endTime = new Date();
        setSession(updatedSession);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Failed to submit answer. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextQuestion = async () => {
    setCurrentAnswer('');
    setShowFeedback(false);
    setCurrentFeedback(null);
    setAutoRecordingEnabled(false); // Reset auto-recording for new question
    
    if (session && !session.isComplete) {
      await generateNextQuestion();
    }
  };

  const finishInterview = () => {
    if (session) {
      const sessionData = {
        ...session,
        endTime: new Date(),
        isComplete: true,
      };
      setSession(sessionData);
      
      // Navigate to results page
      const params = new URLSearchParams({
        session: JSON.stringify(sessionData),
      });
      router.push(`/results?${params.toString()}`);
    }
  };

  if (!session || session.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Initializing interview..." />
      </div>
    );
  }

  const currentQuestion = session.questions[session.currentQuestionIndex];
  const isLastQuestion = session.currentQuestionIndex >= 4;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 relative overflow-hidden">
        {/* Dark Mountain Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-15"
          style={{
            backgroundImage: 'url(https://wallpapers.com/images/hd/dark-mountain-1920-x-1080-wallpaper-yndum713ekbn1v7d.jpg)'
          }}
        ></div>

        <div className="py-8 px-4 relative z-10">
          <div className="max-w-4xl mx-auto relative">
            {/* Left Side Panel */}
            <div className="hidden lg:block absolute -left-40 top-1/2 transform -translate-y-1/2 w-32 h-96">
              <div className="space-y-6">
                {/* Floating cards */}
                <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">AI-Powered</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Smart feedback</p>
                </div>
                
                <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Real-time</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Live analysis</p>
                </div>
                
                <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Expert</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Industry insights</p>
                </div>
              </div>
            </div>

            {/* Right Side Panel */}
            <div className="hidden lg:block absolute -right-40 top-1/2 transform -translate-y-1/2 w-32 h-96">
              <div className="space-y-6">
                {/* Progress indicators */}
                <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Questions</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">5 total</p>
                </div>
                
                <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Recording</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Voice input</p>
                </div>
                
                <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
                  <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Analysis</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Detailed feedback</p>
                </div>
              </div>
            </div>
        {/* Header */}
        <div className="text-center mb-8">
              <div className="flex justify-center items-center mb-4 relative">
                <h1 className="text-3xl font-bold text-primary">
                  Intervu
          </h1>
                <div className="absolute right-0">
                  <ThemeToggle />
                </div>
              </div>
          <p className="text-secondary">
                {position} • {experience.replace('-', ' ')}
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator 
          current={session.currentQuestionIndex + 1} 
          total={5} 
        />

        {!showFeedback ? (
          /* Question Section */
          <div className="card mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Question {session.currentQuestionIndex + 1} of 5
              </h2>
              {currentQuestion && (
                <div className="bg-surface-secondary rounded-lg p-6">
                  <p className="text-lg text-secondary leading-relaxed mb-4">
                    {currentQuestion.question}
                  </p>
                  
                  <div className="flex justify-center mb-4">
                    <SmartTTS 
                      text={currentQuestion.question}
                      autoSpeak={true}
                           onPlay={() => {
                             setIsTTSPlaying(true);
                           }}
                           onStop={() => {
                             setIsTTSPlaying(false);
                             // Auto-start recording after question is finished
                             setTimeout(() => {
                               if (!isRecordingRef.current && !isTTSPlaying) {
                                 startRecording();
                               }
                             }, 500); // Small delay to ensure TTS has fully stopped
                           }}
                    />
                  </div>
                  
                  <div className="flex justify-center space-x-4 text-sm">
                    <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full">
                      {currentQuestion.category}
                    </span>
                    <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white px-3 py-1 rounded-full">
                      {currentQuestion.difficulty}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Answer Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Your Answer
                </label>
                <textarea
                  ref={textareaRef}
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Type your answer here or use the microphone to record..."
                  className="input-field h-32 resize-none"
                />
              </div>

              {/* Voice Recording Controls */}
              <div className="flex justify-center space-x-4">
                {recognitionRef.current ? (
                  !isRecording ? (
                    <button
                      onClick={startRecording}
                       disabled={isTTSPlaying}
                       className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                         isTTSPlaying
                           ? 'bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-400 cursor-not-allowed'
                           : 'bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-100 text-white dark:text-gray-800'
                       }`}
                     >
                       <span>
                         {isTTSPlaying ? 'Question is being spoken...' : 'Start Recording (or wait for auto-start)'}
                       </span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        <span>Recording...</span>
                      </div>
                      <button
                        onClick={stopRecording}
                            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-300 dark:hover:bg-gray-400 text-white dark:text-gray-800 px-4 py-2 rounded-lg transition-colors"
                      >
                        <span>Stop</span>
                      </button>
                    </div>
                  )
                ) : (
                  <div className="text-sm text-gray-500 dark:text-white text-center">
                    Voice recording not supported in this browser. Please use text input.
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  onClick={submitAnswer}
                  disabled={!currentAnswer.trim() || isLoading}
                    className="bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-100 text-white dark:text-gray-800 px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Submit Answer'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Feedback Section */
          <div className="space-y-6">
            <FeedbackCard feedback={currentFeedback!} />
            
            <div className="text-center">
              {isLastQuestion ? (
                <button
                  onClick={finishInterview}
                  className="bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-100 text-white dark:text-gray-800 px-6 py-3 rounded-lg transition-colors"
                >
                  Finish Interview
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                      className="bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-100 text-white dark:text-gray-800 px-6 py-3 rounded-lg transition-colors"
                >
                  Next Question
                </button>
              )}
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}