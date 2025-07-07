import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, FileText, MessageCircle, BarChart } from 'lucide-react';

const PricingSection = () => {
  const features = [
    {
      name: 'Authors',
      description: 'Collaborate with a vibrant community of active writers.',
      bgColor: 'from-green-500 to-green-600',
      icon: Users
    },
    {
      name: 'Posts',
      description: 'Easily publish and manage your articles and content.',
      bgColor: 'from-blue-400 to-blue-500',
      icon: FileText
    },
    {
      name: 'Comments',
      description: 'Engage your audience through interactive discussions.',
      bgColor: 'from-blue-500 to-blue-600',
      icon: MessageCircle
    },
    {
      name: 'Views',
      description: 'Track how your content reaches thousands of readers.',
      bgColor: 'from-pink-500 to-red-500',
      icon: BarChart
    }
  ];

  return (
    <div className="py-12 md:py-20 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-8 md:left-16 w-20 md:w-32 h-4 md:h-8 bg-yellow-400 rounded-full transform rotate-12 animate-bounce"></div>
        <div className="absolute top-40 right-10 md:right-20 w-4 md:w-6 h-4 md:h-6 bg-purple-500 rounded-lg animate-pulse"></div>
        <div className="absolute bottom-40 left-1/4 w-3 md:w-4 h-3 md:h-4 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-6 md:w-8 h-6 md:h-8 bg-purple-400 rounded-lg animate-bounce"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute right-0 top-0 w-1/4 h-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 md:w-4 md:h-4 bg-purple-400 rounded-sm animate-float"
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
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 md:mb-8 text-center">
          Articlish Platform
        </h2>
        <p className="text-base md:text-lg text-gray-700 mb-10 md:mb-12 text-center max-w-3xl mx-auto">
          Powerful tools to create, publish, and grow your audience effortlessly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className={`h-2 bg-gradient-to-r ${feature.bgColor}`}></div>
              
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-center mb-4 md:mb-6">
                  <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r ${feature.bgColor} rounded-xl flex items-center justify-center`}>
                    <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-center text-gray-900 mb-2">
                  {feature.name}
                </h3>
                <p className="text-sm md:text-base text-center text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
