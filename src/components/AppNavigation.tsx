
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu, X } from 'lucide-react';

const AppNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/authors', label: 'Authors' },
    { path: '/posts', label: 'Posts' },
    { path: '/comments', label: 'Comments' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative z-50 flex justify-between items-center p-4 md:p-6">
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-6 h-6 md:w-8 md:h-8 bg-black rounded-lg flex items-center justify-center">
          <Sparkles className="w-3 h-3 md:w-5 md:h-5 text-white" />
        </div>
        <span className="text-lg md:text-2xl font-bold text-black">Articlish</span>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`transition-colors ${
              isActive(item.path)
                ? 'text-black font-semibold'
                : 'text-gray-700 hover:text-black'
            }`}
          >
            {item.label}
          </Link>
        ))}
        <Link to="/analytics">
          <Button className="bg-white text-black border border-gray-300 hover:bg-black hover:text-white transition-colors">
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

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 mx-4 md:hidden">
          <nav className="flex flex-col p-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-black text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
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
    </header>
  );
};

export default AppNavigation;
