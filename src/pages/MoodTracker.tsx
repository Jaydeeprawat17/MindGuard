import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Filter } from 'lucide-react';
import { MoodEntry } from '../types';
import MoodChart from '../components/MoodChart';

export default function MoodTracker() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [filter, setFilter] = useState<'all' | 'week' | 'month'>('all');

  useEffect(() => {
    const stored = localStorage.getItem('mindguard-entries');
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  const filteredEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    const now = new Date();
    
    switch (filter) {
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return entryDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return entryDate >= monthAgo;
      default:
        return true;
    }
  });

  const averageMood = filteredEntries.length > 0
    ? (filteredEntries.reduce((sum, entry) => sum + entry.mood, 0) / filteredEntries.length).toFixed(1)
    : '0';

  const moodDistribution = {
    high: filteredEntries.filter(e => e.mood >= 7).length,
    medium: filteredEntries.filter(e => e.mood >= 4 && e.mood < 7).length,
    low: filteredEntries.filter(e => e.mood < 4).length
  };

  const insights = [
    {
      title: 'Mood Patterns',
      description: filteredEntries.length > 7 
        ? 'You have consistent tracking habits!' 
        : 'Try to log your mood daily for better insights.',
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      title: 'Progress',
      description: parseFloat(averageMood) >= 6
        ? 'Your overall mood has been positive!'
        : parseFloat(averageMood) >= 4
        ? 'Your mood shows room for improvement.'
        : 'Consider reaching out for additional support.',
      color: parseFloat(averageMood) >= 6 
        ? 'bg-green-50 text-green-700 border-green-200'
        : parseFloat(averageMood) >= 4
        ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
        : 'bg-red-50 text-red-700 border-red-200'
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
          Mood Tracker
        </h1>
        <p className="text-gray-600">
          Track your emotional journey over time
        </p>
      </motion.div>

      {/* Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-4 shadow-sm border border-blue-100"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Time Period:</span>
          </div>
          <div className="flex space-x-2">
            {[
              { key: 'week', label: '7 Days' },
              { key: 'month', label: '30 Days' },
              { key: 'all', label: 'All Time' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filter === key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4"
      >
        <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{averageMood}</div>
          <div className="text-sm text-gray-600">Average Mood</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{filteredEntries.length}</div>
          <div className="text-sm text-gray-600">Total Entries</div>
        </div>
      </motion.div>

      {/* Mood Chart */}
      {filteredEntries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <MoodChart entries={filteredEntries} />
        </motion.div>
      )}

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="font-semibold text-gray-800 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-purple-500" />
          Insights
        </h3>
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border ${insight.color}`}
          >
            <h4 className="font-semibold mb-1">{insight.title}</h4>
            <p className="text-sm">{insight.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Recent Entries */}
      {filteredEntries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
        >
          <h3 className="font-semibold text-gray-800 mb-4">Recent Entries</h3>
          <div className="space-y-3">
            {filteredEntries.slice(-5).reverse().map((entry, index) => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {entry.mood >= 7 ? '😊' : entry.mood >= 4 ? '😐' : '😔'}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{entry.mood}/10</div>
                    <div className="text-sm text-gray-600">
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  entry.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                  entry.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {entry.riskLevel}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {filteredEntries.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Entries Yet</h3>
          <p className="text-gray-600 mb-6">Start journaling to see your mood trends!</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Write First Entry
          </button>
        </motion.div>
      )}
    </div>
  );
}