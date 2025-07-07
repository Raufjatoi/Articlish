
import React from 'react';

const InferenceSection = () => {
  return (
    <div className="py-12 md:py-20 bg-gradient-to-br from-purple-200 via-pink-100 to-purple-300 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-4 md:left-10 w-6 md:w-8 h-6 md:h-8 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute top-20 right-10 md:right-20 w-4 md:w-6 h-4 md:h-6 bg-pink-400 rounded-sm animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-3 md:w-4 h-3 md:h-4 bg-purple-500 rounded-full animate-ping"></div>
        <div className="absolute top-40 left-10 md:left-20 w-16 md:w-24 h-4 md:h-6 bg-yellow-400 rounded-full transform -rotate-12 animate-bounce"></div>
        
        {/* Pixelated pattern */}
        <div className="absolute left-0 top-1/3 w-32 md:w-64 h-32 md:h-64 opacity-20">
          <div className="grid grid-cols-6 md:grid-cols-8 gap-1 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 md:w-2 md:h-2 ${
                  Math.random() > 0.7 ? 'bg-yellow-400' : 'bg-transparent'
                } animate-pulse`}
                style={{ animationDelay: `${Math.random() * 2}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Right side floating elements */}
        <div className="absolute right-0 top-0 w-1/4 md:w-1/3 h-full">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 md:w-3 md:h-3 bg-purple-400 rounded-sm animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                right: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Analytics Progress */}
        <div className="mb-12 md:mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs md:text-sm font-medium">Content Performance</span>
                <span className="text-xs md:text-sm text-gray-600">Real-time</span>
              </div>
              
              <div className="relative h-6 md:h-8 bg-white/50 rounded-lg overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-3/4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg"></div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs md:text-sm text-gray-600">User Engagement</span>
                  <span className="text-xs md:text-sm text-gray-600">87%</span>
                </div>
                <div className="h-4 md:h-6 bg-white/30 rounded-lg overflow-hidden">
                  <div className="h-full w-[87%] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg"></div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs md:text-sm text-gray-600">Content Quality</span>
                  <span className="text-xs md:text-sm text-gray-600">92%</span>
                </div>
                <div className="h-4 md:h-6 bg-gradient-to-r from-pink-300 to-orange-300 rounded-lg"></div>
              </div>
              
              <div className="mt-4 md:mt-6 text-center">
                <p className="text-xs md:text-sm text-gray-600">
                  <span className="font-medium">Articlish</span> analytics dashboard
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center px-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 md:mb-8">
            Content Analytics<sup className="text-xl md:text-3xl">™</sup> is
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-base md:text-xl text-gray-700 leading-relaxed">
              comprehensive, insightful, and built for content creators. 
              Track your articles, manage authors, and engage with your community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InferenceSection;
