import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flower2, Play, Pause, RotateCcw, Heart, Moon, Sun } from 'lucide-react';

export default function Wellness() {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [breathingTimer, setBreathingTimer] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeExercise === 'breathing') {
      interval = setInterval(() => {
        setBreathingTimer(prev => {
          const newTime = prev + 1;
          // 4-7-8 breathing pattern (4s inhale, 7s hold, 8s exhale)
          if (newTime <= 4) {
            setBreathingPhase('inhale');
          } else if (newTime <= 11) {
            setBreathingPhase('hold');
          } else if (newTime <= 19) {
            setBreathingPhase('exhale');
          } else {
            return 0; // Reset cycle
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeExercise]);

  const wellnessTools = [
    {
      id: 'breathing',
      title: '4-7-8 Breathing',
      description: 'Calming breathing exercise to reduce anxiety',
      icon: '🫁',
      color: 'bg-blue-500'
    },
    {
      id: 'meditation',
      title: '5-Minute Meditation',
      description: 'Guided mindfulness meditation',
      icon: '🧘‍♂️',
      color: 'bg-purple-500'
    },
    {
      id: 'grounding',
      title: '5-4-3-2-1 Grounding',
      description: 'Technique to help with anxiety and panic',
      icon: '🌱',
      color: 'bg-green-500'
    },
    {
      id: 'sleep',
      title: 'Sleep Sounds',
      description: 'Relaxing sounds for better sleep',
      icon: '🌙',
      color: 'bg-indigo-500'
    }
  ];

  const affirmations = [
    "I am worthy of love and respect",
    "This feeling will pass, and I will be okay",
    "I have the strength to handle whatever comes my way",
    "I choose to focus on what I can control",
    "I am not alone in this journey",
    "Every small step forward is progress",
    "I deserve peace and happiness"
  ];

  const [currentAffirmation] = useState(
    affirmations[Math.floor(Math.random() * affirmations.length)]
  );

  const startExercise = (exerciseId: string) => {
    setActiveExercise(exerciseId);
    if (exerciseId === 'breathing') {
      setBreathingTimer(0);
      setBreathingPhase('inhale');
    }
  };

  const stopExercise = () => {
    setActiveExercise(null);
    setBreathingTimer(0);
  };

  const renderBreathingExercise = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 text-center"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6">4-7-8 Breathing</h3>
      
      <motion.div
        className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center"
        animate={{
          scale: breathingPhase === 'inhale' ? 1.2 : breathingPhase === 'hold' ? 1.2 : 0.8
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <span className="text-white text-6xl">🫁</span>
      </motion.div>

      <div className="text-2xl font-bold text-gray-800 mb-2 capitalize">
        {breathingPhase}
      </div>
      <div className="text-gray-600 mb-6">
        {breathingPhase === 'inhale' && 'Breathe in slowly through your nose'}
        {breathingPhase === 'hold' && 'Hold your breath'}
        {breathingPhase === 'exhale' && 'Exhale slowly through your mouth'}
      </div>

      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={stopExercise}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
        >
          <Pause className="w-5 h-5 mr-2" />
          Stop
        </button>
        <button
          onClick={() => setBreathingTimer(0)}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset
        </button>
      </div>
    </motion.div>
  );

  const renderGroundingExercise = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">5-4-3-2-1 Grounding</h3>
      
      <div className="space-y-6">
        <div className="p-4 bg-white rounded-lg border-l-4 border-green-500">
          <h4 className="font-semibold text-green-800 mb-2">5 Things You Can SEE</h4>
          <p className="text-green-700 text-sm">Look around and name 5 things you can see</p>
        </div>
        <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-blue-800 mb-2">4 Things You Can TOUCH</h4>
          <p className="text-blue-700 text-sm">Feel 4 different textures around you</p>
        </div>
        <div className="p-4 bg-white rounded-lg border-l-4 border-purple-500">
          <h4 className="font-semibold text-purple-800 mb-2">3 Things You Can HEAR</h4>
          <p className="text-purple-700 text-sm">Listen for 3 different sounds</p>
        </div>
        <div className="p-4 bg-white rounded-lg border-l-4 border-orange-500">
          <h4 className="font-semibold text-orange-800 mb-2">2 Things You Can SMELL</h4>
          <p className="text-orange-700 text-sm">Notice 2 different scents</p>
        </div>
        <div className="p-4 bg-white rounded-lg border-l-4 border-red-500">
          <h4 className="font-semibold text-red-800 mb-2">1 Thing You Can TASTE</h4>
          <p className="text-red-700 text-sm">Focus on any taste in your mouth</p>
        </div>
      </div>

      <button
        onClick={stopExercise}
        className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
      >
        Complete Exercise
      </button>
    </motion.div>
  );

  if (activeExercise === 'breathing') {
    return (
      <div className="space-y-6 pb-20">
        {renderBreathingExercise()}
      </div>
    );
  }

  if (activeExercise === 'grounding') {
    return (
      <div className="space-y-6 pb-20">
        {renderGroundingExercise()}
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <Flower2 className="w-6 h-6 mr-2 text-green-500" />
          Wellness Toolbox
        </h1>
        <p className="text-gray-600">
          Tools to help you feel calm and centered
        </p>
      </motion.div>

      {/* Daily Affirmation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200"
      >
        <div className="text-center">
          <Heart className="w-8 h-8 text-pink-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-800 mb-3">Today's Affirmation</h3>
          <p className="text-gray-700 text-lg italic font-medium">
            "{currentAffirmation}"
          </p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4"
      >
        <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-4 rounded-xl text-left hover:shadow-lg transition-all">
          <Sun className="w-8 h-8 mb-2" />
          <div className="font-semibold">Mood Boost</div>
          <div className="text-sm opacity-90">Quick pick-me-up</div>
        </button>
        <button className="bg-gradient-to-r from-indigo-400 to-blue-400 text-white p-4 rounded-xl text-left hover:shadow-lg transition-all">
          <Moon className="w-8 h-8 mb-2" />
          <div className="font-semibold">Sleep Better</div>
          <div className="text-sm opacity-90">Relaxation sounds</div>
        </button>
      </motion.div>

      {/* Wellness Tools */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="font-semibold text-gray-800">Wellness Exercises</h3>
        {wellnessTools.map((tool, index) => (
          <motion.div
            key={tool.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 cursor-pointer"
            onClick={() => startExercise(tool.id)}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 ${tool.color} rounded-full flex items-center justify-center text-2xl`}>
                {tool.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">{tool.title}</h4>
                <p className="text-gray-600 text-sm">{tool.description}</p>
              </div>
              <Play className="w-5 h-5 text-gray-400" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Emergency Wellness */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-red-50 border border-red-200 rounded-xl p-6"
      >
        <h3 className="font-semibold text-red-800 mb-3">Feeling Overwhelmed?</h3>
        <div className="space-y-3">
          <button
            onClick={() => startExercise('breathing')}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Start Emergency Breathing Exercise
          </button>
          <button
            onClick={() => startExercise('grounding')}
            className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-medium hover:bg-red-200 transition-colors"
          >
            Use 5-4-3-2-1 Grounding Technique
          </button>
        </div>
      </motion.div>
    </div>
  );
}