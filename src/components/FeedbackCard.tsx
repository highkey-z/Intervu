'use client';

import { Feedback } from '@/types';

interface FeedbackCardProps {
  feedback: Feedback;
}

export default function FeedbackCard({ feedback }: FeedbackCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="card">
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
        Your Feedback
      </h3>
      
      {/* Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold ${getScoreColor(feedback.relevance)}`}>
            {feedback.relevance}
          </div>
          <h4 className="font-semibold text-gray-700 dark:text-white mt-2">Relevance</h4>
          <p className="text-sm text-gray-500 dark:text-white">{getScoreLabel(feedback.relevance)}</p>
        </div>
        
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold ${getScoreColor(feedback.clarity)}`}>
            {feedback.clarity}
          </div>
          <h4 className="font-semibold text-gray-700 dark:text-white mt-2">Clarity</h4>
          <p className="text-sm text-gray-500 dark:text-white">{getScoreLabel(feedback.clarity)}</p>
        </div>
        
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold ${getScoreColor(feedback.confidence)}`}>
            {feedback.confidence}
          </div>
          <h4 className="font-semibold text-gray-700 dark:text-white mt-2">Confidence</h4>
          <p className="text-sm text-gray-500 dark:text-white">{getScoreLabel(feedback.confidence)}</p>
        </div>
      </div>

      {/* Detailed Feedback */}
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-700 dark:text-white mb-2">Specific Feedback:</h4>
          <ul className="space-y-2">
            {feedback.feedback.map((item, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-primary-600 mt-1">•</span>
                <span className="text-gray-700 dark:text-white">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-700 dark:text-white mb-2">Overall Assessment:</h4>
          <p className="text-gray-700 dark:text-white bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            {feedback.overall}
          </p>
        </div>
      </div>
    </div>
  );
}

