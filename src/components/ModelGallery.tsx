import React from 'react';

const ModelGallery = () => {
  const teamMembers = [
    {
      name: 'Abdul Rauf Jatoi',
      role: 'Developer',
      image: 'rauf.png'
    },
    {
      name: 'Muhammad Kamran',
      role: 'Team Lead',
      image: 'kamran.png'
    }
  ];

  return (
    <div className="py-12 md:py-20 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-4 md:left-10 w-24 md:w-32 h-4 md:h-8 bg-yellow-400 rounded-full transform rotate-12 animate-bounce"></div>
        <div className="absolute top-20 right-10 md:right-20 w-4 md:w-6 h-4 md:h-6 bg-purple-500 rounded-lg animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-3 md:w-4 h-3 md:h-4 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-10 right-1/3 w-6 md:w-8 h-6 md:h-8 bg-purple-400 rounded-lg animate-bounce"></div>

        {/* Floating geometric shapes */}
        <div className="absolute right-0 top-0 w-1/4 md:w-1/4 h-full">
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
        {/* Team Members */}
        <div className="mt-0">
          <h3 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
            Our Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover mb-5 border-4 border-purple-300"
                />
                <h4 className="text-xl md:text-2xl font-semibold text-gray-900">
                  {member.name}
                </h4>
                <p className="text-base md:text-lg text-gray-600">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelGallery;
