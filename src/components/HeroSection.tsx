
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-cyan-300 via-blue-200 to-purple-300 overflow-hidden">
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

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-4 md:p-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-black rounded-lg flex items-center justify-center">
            <Sparkles className="w-3 h-3 md:w-5 md:h-5 text-white" />
          </div>
          <span className="text-lg md:text-2xl font-bold text-black">Articlish</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/authors" className="text-gray-700 hover:text-black transition-colors">Authors</Link>
          <Link to="/posts" className="text-gray-700 hover:text-black transition-colors">Posts</Link>
          <Link to="/comments" className="text-gray-700 hover:text-black transition-colors">Comments</Link>
          <Link to="/analytics">
            <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
              Analytics
            </Button>
          </Link>
          <Link to="/">
            <Button className="bg-black text-white hover:bg-gray-800">
              Dashboard
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 mx-4 md:hidden z-50">
          <nav className="flex flex-col p-4 space-y-3">
            <Link
              to="/authors"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Authors
            </Link>
            <Link
              to="/posts"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Posts
            </Link>
            <Link
              to="/comments"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Comments
            </Link>
            <Link to="/analytics" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="bg-white text-black border border-gray-300 hover:bg-black hover:text-white transition-colors w-full justify-start">
                Analytics
              </Button>
            </Link>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="bg-black text-white hover:bg-gray-800 w-full justify-start">
                Dashboard
              </Button>
            </Link>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-black mb-6 md:mb-8 leading-tight">
            Content<br />
            Management<br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl">Dashboard.</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8 md:mt-12">
            <Link to="/posts">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto">
                View Posts <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </Link>
            <Link to="/authors">
              <Button variant="outline" size="lg" className="border-black text-black hover:bg-black hover:text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto">
                Manage Authors
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


