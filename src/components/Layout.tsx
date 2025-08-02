import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, BookOpen, TrendingUp, Phone, Flower2, Settings, Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Heart, label: 'Home' },
    { path: '/journal', icon: BookOpen, label: 'Journal' },
    { path: '/tracker', icon: TrendingUp, label: 'Tracker' },
    { path: '/crisis', icon: Phone, label: 'Crisis' },
    { path: '/wellness', icon: Flower2, label: 'Wellness' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              MindGuard
            </span>
          </div>
          <Link
            to="/crisis"
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Help Now
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'text-blue-600 bg-gradient-to-t from-blue-50 to-blue-100/50 shadow-sm'
                      : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform duration-200`} />
                  <span className={`text-xs mt-1 font-medium ${isActive ? 'font-semibold' : ''}`}>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}