'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InterviewSimulation from '@/components/InterviewSimulation';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const router = useRouter();
  const [position, setPosition] = useState('');
  const [experience, setExperience] = useState('');

  const handleStartInterview = () => {
    if (!position.trim()) {
      alert('Please enter a position');
      return;
    }
    
    const params = new URLSearchParams({
      position: position.trim(),
      experience: experience || 'mid-level'
    });
    
    router.push(`/interview?${params.toString()}`);
  };

  return (
    <ThemeProvider>
    <div className="min-h-screen">
        <ThemeToggle />
        <style jsx>{`
          @keyframes fadeInOut {
            0% { opacity: 1; }
            20% { opacity: 1; }
            25% { opacity: 0; }
            95% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}</style>
      {/* Hero Section with Gradient Background */}
        <div className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 overflow-hidden min-h-screen transition-colors duration-300">
        {/* Rotating Office Background Images */}
        <div className="absolute inset-0 opacity-50">
          <div className="w-full h-full relative">
            {/* Image 1 - Modern office workspace */}
            <div 
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out" 
              style={{
                backgroundImage: `url("https://www.shutterstock.com/shutterstock/videos/3409275957/thumb/1.jpg?ip=x480")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(1px)',
                animation: 'fadeInOut 30s infinite'
              }}
            ></div>

            {/* Image 2 - Professional office environment */}
            <div 
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out" 
              style={{
                backgroundImage: `url("https://livestorm.imgix.net/1127/1642785626-office_003.jpg")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(1px)',
                animation: 'fadeInOut 30s infinite 7.5s'
              }}
            ></div>

            {/* Image 3 - Open space office */}
            <div 
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out" 
              style={{
                backgroundImage: `url("https://virtualbackgrounds.site/wp-content/uploads/2020/07/open-space-office.jpg")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(1px)',
                animation: 'fadeInOut 30s infinite 15s'
              }}
            ></div>

            {/* Image 4 - Modern office workspace (repeat) */}
            <div 
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out" 
              style={{
                backgroundImage: `url("https://www.shutterstock.com/shutterstock/videos/3409275957/thumb/1.jpg?ip=x480")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(1px)',
                animation: 'fadeInOut 30s infinite 22.5s'
              }}
            ></div>
          </div>
        </div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-40">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Left Content */}
            <div className="text-black dark:text-white lg:col-span-2 ml-8" style={{fontFamily: 'Times New Roman, serif'}}>
              <h1 className="text-7xl lg:text-9xl font-bold leading-tight mb-8" style={{fontFamily: 'Times New Roman, serif'}}>
                Intervu
              </h1>
              <p className="text-4xl lg:text-5xl font-semibold text-black dark:text-white mb-6" style={{fontFamily: 'Times New Roman, serif'}}>
                Practice with AI. Get instant feedback.
              </p>
              <p className="text-3xl text-black dark:text-gray-300 mb-10 leading-relaxed max-w-2xl" style={{fontFamily: 'Times New Roman, serif'}}>
                Master interview skills with AI-generated questions, personalized feedback, and confidence-building practice sessions.
              </p>
            </div>
            
            {/* Right Content - Interactive Simulation */}
            <div className="lg:col-span-3">
            <InterviewSimulation />
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Setup Form Section */}
      <div className="py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-8">
              <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-5xl font-bold text-black dark:text-white mb-8" style={{fontFamily: 'Times New Roman, serif'}}>Ready to Get Started?</h2>
            <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed" style={{fontFamily: 'Times New Roman, serif'}}>Choose your role and experience level to begin your personalized interview practice session</p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Left side - Form */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 border border-gray-100 dark:border-gray-700 lg:col-span-3 transition-colors duration-300">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-600 dark:bg-gray-400 rounded-full mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" style={{fontFamily: 'Times New Roman, serif'}}>
                  Configure Your Interview
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400" style={{fontFamily: 'Times New Roman, serif'}}>
                  Set up your personalized practice session
                </p>
              </div>
              
              <div className="space-y-10">
                <div>
                  <label htmlFor="position" className="block text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-5" style={{fontFamily: 'Times New Roman, serif'}}>
                    Position You&apos;re Interviewing For *
                  </label>
                  <input
                    id="position"
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="e.g., Software Engineer, Data Scientist, Product Manager, Marketing Manager, Sales Representative, Financial Analyst, HR Manager, Nurse, Doctor, Teacher, Business Analyst, Customer Service Representative, Operations Manager, Mechanical Engineer, Electrical Engineer, Civil Engineer, Computer Science, Business Administrator, Accountant, Psychologist, Communications Specialist, Graphic Designer"
                    className="w-full px-8 py-6 text-2xl border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    style={{fontFamily: 'Times New Roman, serif'}}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="experience" className="block text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-5" style={{fontFamily: 'Times New Roman, serif'}}>
                    Experience Level
                  </label>
                  <select
                    id="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-8 py-6 text-2xl border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    style={{fontFamily: 'Times New Roman, serif'}}
                  >
                    <option value="entry-level" style={{fontFamily: 'Times New Roman, serif'}}>Entry Level (0-2 years)</option>
                    <option value="mid-level" style={{fontFamily: 'Times New Roman, serif'}}>Mid Level (3-5 years)</option>
                    <option value="senior-level" style={{fontFamily: 'Times New Roman, serif'}}>Senior Level (6+ years)</option>
                    <option value="executive" style={{fontFamily: 'Times New Roman, serif'}}>Executive Level</option>
                  </select>
                </div>
                
                <button
                  onClick={handleStartInterview}
                  className="w-full bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-100 text-white dark:text-gray-800 px-16 py-6 rounded-xl text-2xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{fontFamily: 'Times New Roman, serif'}}
                >
                  <span className="flex items-center justify-center space-x-3">
                    <span>Start Interview Practice</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </div>
          </div>
          
            {/* Right side - Features */}
            <div className="space-y-8 lg:col-span-2">
              <div className="text-center lg:text-left">
                <h3 className="text-4xl font-bold text-black dark:text-white mb-8" style={{fontFamily: 'Times New Roman, serif'}}>
                  Why Choose Our Platform?
                </h3>
              </div>
              
              <div className="space-y-8">
                {[
                  {
                    title: "AI-Powered Questions",
                    description: "Get questions tailored to your specific role and experience level",
                    icon: (
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )
                  },
                  {
                    title: "Real-Time Feedback",
                    description: "Receive instant analysis of your responses and speaking patterns",
                    icon: (
                      <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    )
                  },
                  {
                    title: "Performance Analytics",
                    description: "Track your progress with detailed metrics and improvement areas",
                    icon: (
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
            </div>
                    )
                  },
                  {
                    title: "Industry-Specific",
                    description: "Practice with questions relevant to your field and company type",
                    icon: (
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
              </div>
                    )
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-6 p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                    {feature.icon}
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3" style={{fontFamily: 'Times New Roman, serif'}}>
                        {feature.title}
                      </h4>
                      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {feature.description}
              </p>
            </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    </ThemeProvider>
  );
}
