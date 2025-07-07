
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, MessageSquare, FileText, BarChart3 } from 'lucide-react';
import { api } from '../services/api';
import AppNavigation from '../components/AppNavigation';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import Footer from '../components/Footer';

const Analytics = () => {
  const { data: monthlyStats, isLoading: statsLoading } = useQuery({
    queryKey: ['monthlyStats'],
    queryFn: api.getMonthlyStats,
  });

  const { data: topAuthors, isLoading: authorsLoading } = useQuery({
    queryKey: ['topAuthors'],
    queryFn: api.getTopAuthors,
  });

  const { data: topPosts, isLoading: postsLoading } = useQuery({
    queryKey: ['topPosts'],
    queryFn: api.getTopCommentedPosts,
  });

  const isLoading = statsLoading || authorsLoading || postsLoading;

  const pieData = topAuthors?.slice(0, 4).map((author, index) => ({
    name: author.name,
    value: author.postCount,
    color: ['#8B5CF6', '#06B6D4', '#F59E0B', '#EF4444'][index],
  })) || [];

  const chartConfig = {
    posts: {
      label: "Posts",
      color: "#8B5CF6",
    },
    comments: {
      label: "Comments", 
      color: "#06B6D4",
    },
    authors: {
      label: "Authors",
      color: "#F59E0B",
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-blue-200 to-purple-300 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-blue-200 to-purple-300 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-6 md:left-10 w-20 md:w-32 h-4 md:h-8 bg-yellow-400 rounded-full transform rotate-12 animate-bounce"></div>
        <div className="absolute top-40 right-10 md:right-20 w-4 md:w-6 h-4 md:h-6 bg-purple-500 rounded-lg animate-pulse"></div>
        <div className="absolute bottom-40 left-1/4 w-3 md:w-4 h-3 md:h-4 bg-yellow-400 rounded-full animate-ping"></div>
        
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
            Analytics<span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">.</span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Track your content performance and engagement metrics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fadeInUp">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-black">
              {monthlyStats?.reduce((sum, stat) => sum + stat.posts, 0) || 0}
            </div>
            <div className="text-sm text-gray-600">Total Posts</div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-black">
              {monthlyStats?.reduce((sum, stat) => sum + stat.comments, 0) || 0}
            </div>
            <div className="text-sm text-gray-600">Total Comments</div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-black">
              {monthlyStats?.reduce((sum, stat) => sum + stat.authors, 0) || 0}
            </div>
            <div className="text-sm text-gray-600">Active Authors</div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-black">
              {topPosts?.reduce((sum, post) => sum + post.commentCount, 0) || 0}
            </div>
            <div className="text-sm text-gray-600">Engagement Rate</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Monthly Trends Chart */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-scaleIn">
            <h3 className="text-lg md:text-xl font-semibold text-black mb-4">Monthly Trends</h3>
            <ChartContainer config={chartConfig} className="h-80">
              <LineChart data={monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="posts" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#8B5CF6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="comments" 
                  stroke="#06B6D4" 
                  strokeWidth={3}
                  dot={{ fill: '#06B6D4', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#06B6D4' }}
                />
              </LineChart>
            </ChartContainer>
          </div>

          {/* Author Distribution */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-scaleIn" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg md:text-xl font-semibold text-black mb-4">Top Authors Distribution</h3>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Content Performance Bar Chart */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-scaleIn" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg md:text-xl font-semibold text-black mb-4">Content Performance</h3>
            <ChartContainer config={chartConfig} className="h-80">
              <BarChart data={monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="posts" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="comments" fill="#06B6D4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>

          {/* Top Posts List */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-scaleIn" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-lg md:text-xl font-semibold text-black mb-4">Top Performing Posts</h3>
            <div className="space-y-4">
              {topPosts?.slice(0, 5).map((post, index) => (
                <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-black text-sm">{post.title}</h4>
                    <p className="text-xs text-gray-600">by {post.authorName}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-semibold text-black">{post.commentCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Analytics;

