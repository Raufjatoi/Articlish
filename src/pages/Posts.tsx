
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Eye, Edit, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts, Post } from '../services/api';
import AppNavigation from '../components/AppNavigation';
import Footer from '../components/Footer';

const Posts = () => {
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
        <div className="absolute top-10 right-6 md:right-10 w-16 md:w-24 h-3 md:h-6 bg-yellow-400 rounded-full transform -rotate-12 animate-bounce"></div>
        <div className="absolute top-60 left-10 md:left-20 w-6 md:w-8 h-6 md:h-8 bg-purple-500 rounded-lg animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-4 md:w-6 h-4 md:h-6 bg-yellow-400 rounded-full animate-ping"></div>
        
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
          {Array.from({ length: 20 }).map((_, i) => (
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
          <Button className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Create New Post
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {posts?.map((post) => (
            <div
              key={post.id}
              className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-black mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-3 line-clamp-2">
                    {post.content}
                  </p>
                  <div className="flex items-center space-x-4 text-xs md:text-sm text-gray-500">
                    <span>By {post.authorName}</span>
                    <span>•</span>
                    <span>Post #{post.id}</span>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <Button size="sm" variant="outline" className="p-2">
                    <Eye className="w-3 h-3 md:w-4 md:h-4" />
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
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
                    <span className="text-xs md:text-sm text-gray-600">
                      {Math.floor(Math.random() * 1000) + 100} views
                    </span>
                  </div>
                </div>
                <span className="text-xs md:text-sm text-gray-500">
                  2 days ago
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

export default Posts;

