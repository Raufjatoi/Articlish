import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Edit, Trash2, MessageSquare, Tag } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts, Post } from '../services/api';
import AppNavigation from '../components/AppNavigation';
import Footer from '../components/Footer';
import AddPostForm from '../components/AddPostForm';

const Posts = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error loading posts</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-blue-200 to-purple-300 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Yellow curved shape */}
        <div className="absolute top-20 left-4 md:left-10 w-48 md:w-96 h-16 md:h-32 bg-yellow-400 rounded-full transform rotate-45 animate-bounce"></div>
        
        {/* Purple geometric shapes */}
        <div className="absolute top-40 right-10 md:right-20 w-12 md:w-20 h-12 md:h-20 bg-purple-500 rounded-lg animate-pulse"></div>
        <div className="absolute top-60 right-20 md:right-40 w-8 md:w-16 h-8 md:h-16 bg-purple-400 rounded-lg animate-pulse delay-300"></div>
        
        {/* Pixelated pattern */}
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
            Posts<span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">.</span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Manage your articles and blog posts
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 md:w-6 md:h-6 text-black" />
            <span className="text-lg md:text-xl font-semibold text-black">
              {posts?.length || 0} Posts
            </span>
          </div>
          <Button 
            className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus className="w-4 h-4 mr-2" />
            {showAddForm ? 'Cancel' : 'Add New Post'}
          </Button>
        </div>

        {/* Add Post Form */}
        {showAddForm && (
          <div className="mb-8">
            <AddPostForm />
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {posts?.map((post) => (
            <div
              key={post.id}
              className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-black mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-2">
                    By {post.authorName} • {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
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
              
              <div className="text-sm md:text-base text-gray-700 mb-4">
                {post.content.length > 200 
                  ? `${post.content.substring(0, 200)}...` 
                  : post.content}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <MessageSquare className="w-4 h-4 mr-1" />
                <span>{post.commentCount} comments</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Posts;
