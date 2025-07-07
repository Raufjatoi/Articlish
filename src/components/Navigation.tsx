
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, BarChart3, Users, FileText, MessageSquare, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navigation = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: BarChart3 },
    { path: '/authors', label: 'Authors', icon: Users },
    { path: '/posts', label: 'Posts', icon: FileText },
    { path: '/comments', label: 'Comments', icon: MessageSquare },
    { path: '/analytics', label: 'Analytics', icon: TrendingUp },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-xl font-bold text-black hover:scale-105 transition-transform duration-300"
          >
            Articlish
          </Link>
          
          <div className="flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isActive(path)
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors duration-300"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
