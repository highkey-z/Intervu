'use client';

import { useState, useEffect } from 'react';

interface SimulationStep {
  id: string;
  type: 'question' | 'answer' | 'feedback';
  content: string;
  duration: number;
}

const simulationData: SimulationStep[] = [
  {
    id: '1',
    type: 'question',
    content: 'Tell me about yourself and why you\'re interested in this role.',
    duration: 3000
  },
  {
    id: '2',
    type: 'answer',
    content: 'I\'m a passionate software engineer with 3 years of experience building scalable web applications. I\'m excited about this role because it combines my technical skills with opportunities to mentor junior developers and work on cutting-edge projects.',
    duration: 4000
  },
  {
    id: '3',
    type: 'feedback',
    content: 'Great introduction! You clearly articulated your background and motivation. Your response demonstrates strong technical expertise and genuine enthusiasm for the role.',
    duration: 2000
  }
];

export default function InterviewSimulation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [typingText, setTypingText] = useState('');
  const [showScores, setShowScores] = useState(false);
  const [scores, setScores] = useState({ relevance: 8, clarity: 7, confidence: 9 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [duration, setDuration] = useState(0);

  const currentSimulation = simulationData[currentStep];

  // Duration timer effect
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying || !currentSimulation) return;

    let typingInterval: NodeJS.Timeout | null = null;
    let nextStepTimer: NodeJS.Timeout | null = null;

    const startNextStep = () => {
      // Start transition
      setIsTransitioning(true);
      setTypingText('');
      setShowScores(false);
      
      // Wait for fade out, then change content and fade in
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % simulationData.length);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 500);
    };

    const timer = setTimeout(() => {
      if (currentSimulation.type === 'question') {
        // Just show the question, then move to answer after a delay
        nextStepTimer = setTimeout(startNextStep, 3000);
      } else if (currentSimulation.type === 'answer') {
        // Start typing the answer
        setTimeout(() => {
          typingInterval = typeText(currentSimulation.content, () => {
            nextStepTimer = setTimeout(startNextStep, 2000);
          });
        }, 500);
      } else if (currentSimulation.type === 'feedback') {
        setShowScores(true);
        setScores({
          relevance: 8,
          clarity: 7,
          confidence: 9
        });
        nextStepTimer = setTimeout(startNextStep, Math.max(currentSimulation.duration, 4000));
      }
    }, currentSimulation.type === 'question' ? 0 : 800);

    return () => {
      clearTimeout(timer);
      if (typingInterval) clearInterval(typingInterval);
      if (nextStepTimer) clearTimeout(nextStepTimer);
    };
  }, [currentStep, isPlaying]);

  const typeText = (text: string, onComplete: () => void) => {
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypingText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 50); // Slightly slower for better readability
    
    // Store interval ID for cleanup
    return interval;
  };

  return (
    <div className="relative w-full">
      <div className="bg-gray-800 rounded-3xl p-4 shadow-2xl mx-auto" style={{maxWidth: '900px', width: '900px'}}>
        <div className="bg-white rounded-2xl p-6 h-[560px] relative overflow-hidden">
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-black h-2 rounded-full transition-all duration-500" style={{width: `${((currentStep + 1) / simulationData.length) * 100}%`}}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Progress: {currentStep + 1} of {simulationData.length}</span>
              <span>{Math.round(((currentStep + 1) / simulationData.length) * 100)}% Complete</span>
            </div>
            
            {/* Enhanced Header with more details */}
            <div className="text-center border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <h2 className="text-xl font-bold text-gray-800">AI Interview Simulation</h2>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <span>Secure</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 font-medium">Live Session</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-600 font-medium">Recording</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-purple-600 font-medium">AI Powered</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span>Duration: 0:15</span>
                  </div>
                  <div className="text-gray-400">•</div>
                  <div className="flex items-center space-x-1">
                    <span>Position: Software Engineer</span>
                  </div>
                </div>
              </div>
              
          </div>
          
            {currentSimulation.type === 'question' && (
              <div className={`transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                {/* Question */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold shadow-md">
                      Q
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="text-sm text-blue-700 font-semibold">AI Interviewer</p>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-gray-500">Live</span>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
                        <p className="text-gray-800 text-sm leading-relaxed font-medium">
                          &ldquo;{currentSimulation.content}&rdquo;
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>Question 1 of 5</span>
                          <span>•</span>
                          <span>Difficulty: Medium</span>
                          <span>•</span>
                          <span>Time Limit: 3 min</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <span>10:16 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              )}

              {currentSimulation.type === 'answer' && (
              <div className={`transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                {/* Question */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500 shadow-sm mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold shadow-md">
                      Q
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="text-sm text-blue-700 font-semibold">AI Interviewer</p>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-gray-500">Live</span>
                        </div>
                  </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
                        <p className="text-gray-800 text-sm leading-relaxed font-medium">
                          &ldquo;Tell me about yourself and why you&apos;re interested in this role.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Answer */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold shadow-md">
                      A
                  </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="text-sm text-green-700 font-semibold">Your Response</p>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-gray-500">Typing...</span>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200 min-h-[80px]">
                        <p className="text-gray-800 text-sm leading-relaxed font-medium">
                          &ldquo;{typingText}&rdquo;
                          {typingText && <span className="animate-pulse text-green-500">|</span>}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>Response Length: {typingText.length} characters</span>
                          <span>•</span>
                          <span>Time: 0:15</span>
                          <span>•</span>
                          <span>Speaking Rate: 150 WPM</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <div className="w-8 h-1 bg-gray-200 rounded-full">
                              <div className="w-6 h-1 bg-green-500 rounded-full"></div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-green-600 font-medium">Good</span>
                      </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              )}
              
            {currentSimulation.type === 'feedback' && (
              <div className={`bg-purple-50 rounded-lg p-6 border-l-4 border-purple-400 transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                    F
                  </div>
                  <div>
                    <p className="text-sm text-purple-600 font-medium mb-1">AI Feedback</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 transition-all duration-300">
                  {currentSimulation.content}
                </p>
                
                {showScores && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 transition-all duration-500">
                      <div className="text-center bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">{scores.relevance}</div>
                        <div className="text-xs text-gray-600">Relevance</div>
                      </div>
                      <div className="text-center bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-2xl font-bold text-green-600">{scores.clarity}</div>
                        <div className="text-xs text-gray-600">Clarity</div>
                      </div>
                      <div className="text-center bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-2xl font-bold text-purple-600">{scores.confidence}</div>
                        <div className="text-xs text-gray-600">Confidence</div>
                      </div>
                    </div>
                    
                    {/* Additional feedback details */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2">Key Strengths</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Clear and articulate communication</li>
                        <li>• Strong technical knowledge demonstrated</li>
                        <li>• Good use of specific examples</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2">Areas for Improvement</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Consider structuring responses with STAR method</li>
                        <li>• Provide more quantifiable achievements</li>
                        <li>• Ask clarifying questions when needed</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
            </div>
          </div>
        </div>
    </div>
  );
}