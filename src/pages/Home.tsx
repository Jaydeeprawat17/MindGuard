import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, TrendingUp, MessageCircle, Phone, 
  Flower2, ChevronRight, AlertTriangle, Heart, Sparkles, ArrowRight
} from 'lucide-react';
import { MoodEntry } from '../types';
import MoodScale from '../components/MoodScale';

export default function Home() {
  const [quickMood, setQuickMood] = useState(5);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [userName] = useState('Alex'); // In production, this would come from user context

  useEffect(() => {
    // Load mood entries from localStorage
    const stored = localStorage.getItem('mindguard-entries');
    if (stored) {
      setMoodEntries(JSON.parse(stored));
    }
  }, []);

  const recentMood = moodEntries.length > 0 ? moodEntries[moodEntries.length - 1] : null;
  const needsAttention = recentMood && (recentMood.riskLevel === 'high' || recentMood.mood < 4);

  const quickActions = [
    {
      title: 'Daily Journal',
      description: 'Share your thoughts',
      icon: BookOpen,
      path: '/journal',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Mood Tracker',
      description: 'View your progress',
      icon: TrendingUp,
      path: '/tracker',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      title: 'AI Companion',
      description: 'Chat for support',
      icon: MessageCircle,
      path: '/chat',
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      title: 'Wellness Tools',
      description: 'Breathing & relaxation',
      icon: Flower2,
      path: '/wellness',
      gradient: 'from-teal-500 to-cyan-600'
    }
  ];

  return (
    <div className="space-y-8 pb-24">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full border border-blue-200/50">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-blue-700">Your wellness journey continues</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
          Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{userName}</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          How are you feeling today?
        </p>
      </motion.div>

      {/* Crisis Alert */}
      {needsAttention && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-800 mb-2">
                We're Here for You
              </h3>
              <p className="text-red-700 mb-4">
                Your recent entries show you might be struggling. Remember, you're not alone.
              </p>
              <Link
                to="/crisis"
                className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Phone className="w-4 h-4 mr-2" />
                Get Support Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Mood Check */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mr-3">
            <Heart className="w-5 h-5 text-white" />
          </div>
          Quick Mood Check
        </h2>
        <MoodScale value={quickMood} onChange={setQuickMood} size="small" />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-4 rounded-xl font-semibold mt-6 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Save Mood
        </motion.button>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4"
      >
        {quickActions.map((action, index) => (
          <Link
            key={action.path}
            to={action.path}
            className="group"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 group-hover:border-gray-300/50"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${action.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {action.title}
              </h3>
              <p className="text-gray-600 mb-3">
                {action.description}
              </p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                Open
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Recent Activity */}
      {recentMood && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Entry</h3>
          <div className="flex items-center space-x-3">
            <div className="text-2xl">
              {recentMood.mood >= 7 ? '😊' : recentMood.mood >= 4 ? '😐' : '😔'}
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-semibold">
                Mood: {recentMood.mood}/10
              </p>
              <p className="text-gray-600">
                {new Date(recentMood.date).toLocaleDateString()}
              </p>
            </div>
            <Link
              to="/tracker"
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              View All
            </Link>
          </div>
        </motion.div>
      )}

      {/* Daily Affirmation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 rounded-2xl p-8 border border-purple-200/50 shadow-xl"
      >
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-xl font-bold text-purple-800">Daily Affirmation</h3>
        </div>
        <p className="text-lg text-purple-700 italic font-medium leading-relaxed">
          "You are stronger than you know, braver than you feel, and more loved than you can imagine."
        </p>
      </motion.div>
    </div>
  );
}