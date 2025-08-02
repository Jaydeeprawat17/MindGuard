import React from 'react';
import { MoodEntry } from '../types';
import { Calendar, TrendingDown, TrendingUp } from 'lucide-react';

interface MoodChartProps {
  entries: MoodEntry[];
}

export default function MoodChart({ entries }: MoodChartProps) {
  const recentEntries = entries.slice(-14).reverse(); // Last 14 days
  const avgMood = entries.length > 0 
    ? (entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length).toFixed(1)
    : '0';

  const trend = entries.length >= 2 
    ? entries[entries.length - 1].mood - entries[entries.length - 2].mood
    : 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
          Mood Trends
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            {trend > 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : trend < 0 ? (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            ) : null}
            <span className="text-gray-600">Avg: {avgMood}</span>
          </div>
        </div>
      </div>

      <div className="relative h-40 mb-4">
        <svg className="w-full h-full">
          {/* Grid lines */}
          {[2, 4, 6, 8].map((y) => (
            <line
              key={y}
              x1="0"
              y1={`${100 - (y * 10)}%`}
              x2="100%"
              y2={`${100 - (y * 10)}%`}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Mood line */}
          {recentEntries.length > 1 && (
            <polyline
              fill="none"
              stroke="url(#moodGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={recentEntries
                .map((entry, index) => {
                  const x = (index / (recentEntries.length - 1)) * 100;
                  const y = 100 - (entry.mood * 10);
                  return `${x},${y}`;
                })
                .join(' ')}
            />
          )}
          
          {/* Mood points */}
          {recentEntries.map((entry, index) => {
            const x = (index / Math.max(recentEntries.length - 1, 1)) * 100;
            const y = 100 - (entry.mood * 10);
            const color = entry.mood >= 7 ? '#10b981' : entry.mood >= 4 ? '#f59e0b' : '#ef4444';
            
            return (
              <circle
                key={entry.id}
                cx={`${x}%`}
                cy={`${y}%`}
                r="4"
                fill={color}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
          
          <defs>
            <linearGradient id="moodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {entries.filter(e => e.mood >= 7).length}
          </div>
          <div className="text-sm text-green-700">Good Days</div>
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">
            {entries.filter(e => e.mood >= 4 && e.mood < 7).length}
          </div>
          <div className="text-sm text-yellow-700">Okay Days</div>
        </div>
        <div className="p-3 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">
            {entries.filter(e => e.mood < 4).length}
          </div>
          <div className="text-sm text-red-700">Difficult Days</div>
        </div>
      </div>
    </div>
  );
}