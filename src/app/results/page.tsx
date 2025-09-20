'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { InterviewSession, Feedback } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [overallFeedback, setOverallFeedback] = useState<string>('');

  useEffect(() => {
    const sessionData = searchParams.get('session');
    if (sessionData) {
      try {
        const parsedSession = JSON.parse(sessionData);
        setSession(parsedSession);
        generateOverallFeedback(parsedSession);
      } catch (error) {
        console.error('Error parsing session data:', error);
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [searchParams, router]);

  const generateOverallFeedback = async (sessionData: InterviewSession) => {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: 'Overall Interview Performance',
          answer: `Interview completed with ${sessionData.feedbacks.length} questions. Average scores: Relevance ${getAverageScore(sessionData.feedbacks, 'relevance')}, Clarity ${getAverageScore(sessionData.feedbacks, 'clarity')}, Confidence ${getAverageScore(sessionData.feedbacks, 'confidence')}`,
          position: 'General',
        }),
      });

      if (response.ok) {
        const feedback: Feedback = await response.json();
        setOverallFeedback(feedback.overall);
      }
    } catch (error) {
      console.error('Error generating overall feedback:', error);
    }
  };

  const getAverageScore = (feedbacks: Feedback[], metric: keyof Pick<Feedback, 'relevance' | 'clarity' | 'confidence'>): string => {
    if (feedbacks.length === 0) return '0';
    const sum = feedbacks.reduce((acc, feedback) => acc + feedback[metric], 0);
    return (sum / feedbacks.length).toFixed(1);
  };

  const getOverallGrade = (averageScore: number) => {
    if (averageScore >= 8) return { grade: 'A', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (averageScore >= 7) return { grade: 'B', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (averageScore >= 6) return { grade: 'C', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { grade: 'D', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const exportResults = () => {
    if (!session) return;

    const results = {
      position: 'Interview Results',
      date: new Date().toLocaleDateString(),
      totalQuestions: session.questions.length,
      averageScores: {
        relevance: getAverageScore(session.feedbacks, 'relevance'),
        clarity: getAverageScore(session.feedbacks, 'clarity'),
        confidence: getAverageScore(session.feedbacks, 'confidence'),
      },
      questions: session.questions.map((q, i) => ({
        question: q.question,
        answer: session.answers[i] || 'No answer provided',
        feedback: session.feedbacks[i] || null,
      })),
      overallFeedback,
    };

    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-results-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Loading results..." />
      </div>
    );
  }

  const avgRelevance = parseFloat(getAverageScore(session.feedbacks, 'relevance'));
  const avgClarity = parseFloat(getAverageScore(session.feedbacks, 'clarity'));
  const avgConfidence = parseFloat(getAverageScore(session.feedbacks, 'confidence'));
  const overallAverage = (avgRelevance + avgClarity + avgConfidence) / 3;
  const grade = getOverallGrade(overallAverage);

  return (
    <div className="min-h-screen py-8 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Interview Results
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Congratulations on completing your interview practice!
          </p>
        </div>

        {/* Overall Score */}
        <div className="card mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Overall Performance
            </h2>
            
            <div className="flex justify-center items-center space-x-8 mb-6">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold ${grade.bgColor} ${grade.color}`}>
                {grade.grade}
              </div>
              
              <div className="text-left">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {overallAverage.toFixed(1)}/10
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Average Score
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {avgRelevance.toFixed(1)}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Relevance</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {avgClarity.toFixed(1)}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Clarity</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {avgConfidence.toFixed(1)}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Confidence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Feedback */}
        {overallFeedback && (
          <div className="card mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Overall Assessment
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {overallFeedback}
            </p>
            
            {/* Improvement Areas */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Areas for Improvement</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Structure Your Responses</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Use the STAR method (Situation, Task, Action, Result) to organize your answers clearly.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Provide Specific Examples</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Back up your statements with concrete examples from your experience.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Practice Active Listening</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Make sure you understand the question fully before responding.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Show Enthusiasm</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Demonstrate genuine interest in the role and company throughout your responses.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tips Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Interview Tips</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h5 className="font-medium text-blue-900 dark:text-blue-200 mb-2">Research the Company</h5>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Learn about their mission, values, and recent news to show genuine interest.</p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h5 className="font-medium text-green-900 dark:text-green-200 mb-2">Prepare Questions</h5>
                  <p className="text-sm text-green-700 dark:text-green-300">Have thoughtful questions ready about the role, team, and company culture.</p>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h5 className="font-medium text-yellow-900 dark:text-yellow-200 mb-2">Practice Common Questions</h5>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">Rehearse answers to typical interview questions like &ldquo;Tell me about yourself.&rdquo;</p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h5 className="font-medium text-purple-900 dark:text-purple-200 mb-2">Follow Up</h5>
                  <p className="text-sm text-purple-700 dark:text-purple-300">Send a thank-you email within 24 hours to express continued interest.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Question-by-Question Results */}
        <div className="space-y-6 mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Question-by-Question Analysis
          </h3>
          
          {session.questions.map((question, index) => {
            const feedback = session.feedbacks[index];
            const answer = session.answers[index];
            
            return (
              <div key={question.id} className="card">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                    Question {index + 1}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {question.question}
                  </p>
                  
                  {answer && (
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Your Answer:</h5>
                      <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        {answer}
                      </p>
                    </div>
                  )}
                </div>

                {feedback && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {feedback.relevance}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Relevance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {feedback.clarity}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Clarity</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {feedback.confidence}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Confidence</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Feedback:</h5>
                      <ul className="space-y-1">
                        {feedback.feedback.map((item, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/')}
            className="btn-primary"
          >
            Start New Interview
          </button>
          
          <button
            onClick={exportResults}
            className="btn-secondary"
          >
            Export Results
          </button>
        </div>
      </div>
    </div>
  );
}
