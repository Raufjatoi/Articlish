
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, Users, Edit, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchAuthors, Author } from '../services/api';
import AppNavigation from '../components/AppNavigation';
import Footer from '../components/Footer';
import AddAuthorForm from '../components/AddAuthorForm';

const Authors = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { data: authors, isLoading, error } = useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: fetchAuthors,
  });

  if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error loading authors</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-blue-200 to-purple-300 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Yellow curved shape */}
        <div className="absolute top-20 left-4 md:left-10 w-48 md:w-96 h-16 md:h-32 bg-yellow-400 rounded-full transform rotate-45 animate-bounce"></div>
        
        {/* Purple geometric shapes */}
        <div className="absolute top-40 right-10 md:right-20 w-12 md:w-20 h-12 md:h-20 bg-purple-500 rounded-lg animate-pulse"></div>
        <div className="absolute top-60 right-20 md:right-40 w-8 md:w-16 h-8 md:h-16 bg-purple-400 rounded-lg animate-pulse delay-300"></div>
        
        {/* Additional floating elements */}
        <div className="absolute bottom-40 left-1/4 w-3 md:w-4 h-3 md:h-4 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-6 md:w-8 h-6 md:h-8 bg-purple-400 rounded-lg animate-bounce"></div>
      </div>

      <AppNavigation />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Authors<span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">.</span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Manage your content creators and authors
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 md:w-6 md:h-6 text-black" />
            <span className="text-lg md:text-xl font-semibold text-black">
              {authors?.length || 0} Authors
            </span>
          </div>
          <Button 
            className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            {showAddForm ? 'Cancel' : 'Add New Author'}
          </Button>
        </div>

        {/* Add Author Form */}
        {showAddForm && (
          <div className="mb-8">
            <AddAuthorForm />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {authors?.map((author) => (
            <div
              key={author.id}
              className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fadeInUp"
              style={{ animationDelay: `${Math.random() * 0.5}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-black mb-1">
                    {author.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">{author.email}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="p-2">
                    <Edit className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2 text-red-600 hover:text-red-700">
                    <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Posts</span>
                  <span className="font-semibold text-black">{author.postCount || 0}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                    style={{ width: `${Math.min((author.postCount || 0) * 10, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Authors;



