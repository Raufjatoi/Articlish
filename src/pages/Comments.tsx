import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Reply, Edit, Trash2, ThumbsUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchComments, Comment } from '../services/api';
import AppNavigation from '../components/AppNavigation';
import Footer from '../components/Footer';

const Comments = () => {
  const { data: comments, isLoading, error } = useQuery<Comment[]>({
    queryKey: ['comments'],
    queryFn: fetchComments,
  });

  if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error loading comments</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-blue-200 to-purple-300 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Yellow curved shape */}
        <div className="absolute top-20 left-4 md:left-10 w-48 md:w-96 h-16 md:h-32 bg-yellow-400 rounded-full transform rotate-45 animate-bounce"></div>
        
        {/* Purple geometric shapes */}
        <div className="absolute top-40 right-10 md:right-20 w-12 md:w-20 h-12 md:h-20 bg-purple-500 rounded-lg animate-pulse"></div>
        <div className="absolute top-60 right-20 md:right-40 w-8 md:w-16 h-8 md:h-16 bg-purple-400 rounded-lg animate-pulse delay-300"></div>
        
        {/* Pixelated brain-like pattern */}
        <div className="absolute left-0 top-1/4 w-48 md:w-96 h-48 md:h-96 opacity-20">
          <div className="grid grid-cols-8 md:grid-cols-12 gap-1 h-full">
            {Array.from({ length: 96 }).map((_, i) => (
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

        {/* Right side scattered squares */}
        <div className="absolute right-0 top-0 w-1/4 md:w-1/3 h-full">
          {Array.from({ length: 30 }).map((_, i) => (
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

      <AppNavigation />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Comments<span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">.</span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Manage user comments and engagement
          </p>
        </div>

        <div className="flex items-center space-x-2 mb-6 md:mb-8">
          <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-black" />
          <span className="text-lg md:text-xl font-semibold text-black">
            {comments?.length || 0} Comments
          </span>
        </div>

        <div className="space-y-4 md:space-y-6">
          {comments?.map((comment) => (
            <div
              key={comment.id}
              className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-base md:text-lg font-semibold text-black">
                      {comment.authorName}
                    </h4>
                    <span className="text-xs md:text-sm text-gray-500">
                      on {comment.postTitle}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button size="sm" variant="outline" className="p-2">
                    <Reply className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2">
                    <Edit className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2 text-red-600 hover:text-red-700">
                    <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                    <ThumbsUp className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-xs md:text-sm">
                      {Math.floor(Math.random() * 20) + 1}
                    </span>
                  </button>
                  <Button size="sm" variant="ghost" className="text-xs md:text-sm">
                    Reply
                  </Button>
                </div>
                <span className="text-xs md:text-sm text-gray-500">
                  {Math.floor(Math.random() * 7) + 1} days ago
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Comments;

