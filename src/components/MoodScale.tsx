import React from 'react';
import { motion } from 'framer-motion';

interface MoodScaleProps {
  value: number;
  onChange: (value: number) => void;
  size?: 'small' | 'large';
}

const moodEmojis = ['😢', '😟', '😐', '🙂', '😊', '😄', '🥳', '😍', '🤩', '🌟'];
const moodLabels = [
  'Very Sad', 'Sad', 'Down', 'Okay', 'Good', 'Happy', 
  'Very Happy', 'Excited', 'Amazing', 'Euphoric'
];

export default function MoodScale({ value, onChange, size = 'large' }: MoodScaleProps) {
  const isSmall = size === 'small';
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.div 
          className={`${isSmall ? 'text-5xl' : 'text-7xl'} mb-3`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {moodEmojis[value - 1]}
        </motion.div>
        <p className={`font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent ${isSmall ? 'text-base' : 'text-xl'}`}>
          {moodLabels[value - 1]}
        </p>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 to-blue-200 rounded-full h-3 opacity-30"></div>
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="relative w-full h-3 bg-transparent rounded-full appearance-none cursor-pointer z-10"
          style={{
            background: 'transparent'
          }}
        />
        <motion.div
          className="absolute top-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-xl transform -translate-y-2.5 border-4 border-white"
          style={{ left: `calc(${(value - 1) * 11.11}% - 16px)` }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>
      
      <div className="flex justify-between text-sm font-medium text-gray-500">
        <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Very Sad</span>
        <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Amazing</span>
      </div>
    </div>
  );
}