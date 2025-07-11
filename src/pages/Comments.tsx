import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Plus, Edit, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api, Comment } from '../services/api';
import AppNavigation from '../components/AppNavigation';
import Footer from '../components/Footer';
import AddCommentForm from '../components/AddCommentForm';

const Comments = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['comments', page, limit],
    queryFn: () => api.getComments(page, limit),
  });

  const comments = data?.comments || [];
  const totalComments = data?.total || 0;
  const totalPages = Math.ceil(totalComments / limit);

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
      </div>

      <AppNavigation />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Comments<span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">.</span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Manage user feedback and discussions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-black" />
            <span className="text-lg md:text-xl font-semibold text-black">
              {totalComments} Comments
            </span>
          </div>
          <Button 
            className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus className="w-4 h-4 mr-2" />
            {showAddForm ? 'Cancel' : 'Add New Comment'}
          </Button>
        </div>

        {/* Add Comment Form */}
        {showAddForm && (
          <div className="mb-8">
            <AddCommentForm />
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-black mb-1">
                    Re: {comment.postTitle}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-2">
                    By {comment.authorName} • {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2 mt-2 md:mt-0">
                  <Button size="sm" variant="outline" className="p-2">
                    <Edit className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2 text-red-600 hover:text-red-700">
                    <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="text-sm md:text-base text-gray-700">
                {comment.content}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <Button
                  key={p}
                  variant={p === page ? "default" : "outline"}
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
              
              <Button 
                variant="outline" 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Comments;


