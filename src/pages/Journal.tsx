import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Mic, Send, AlertTriangle, Heart, Sparkles, CheckCircle } from 'lucide-react';
import { MoodEntry } from '../types';
import { analyzeSentiment, generateSupportiveResponse } from '../utils/sentimentAnalysis';
import MoodScale from '../components/MoodScale';

export default function Journal() {
  const [journalText, setJournalText] = useState('');
  const [mood, setMood] = useState(5);
  const [isRecording, setIsRecording] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [aiResponse, setAiResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalText.trim()) return;

    setIsSubmitting(true);

    // Analyze sentiment
    const sentimentResult = analyzeSentiment(journalText);
    setAnalysis(sentimentResult);

    // Generate AI response
    const response = generateSupportiveResponse(sentimentResult.sentiment, sentimentResult.riskLevel);
    setAiResponse(response);

    // Create mood entry
    const entry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood,
      text: journalText,
      sentiment: sentimentResult.sentiment,
      riskLevel: sentimentResult.riskLevel,
      createdAt: new Date()
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('mindguard-entries') || '[]');
    const updated = [...existing, entry];
    localStorage.setItem('mindguard-entries', JSON.stringify(updated));

    setIsSubmitting(false);
  };

  const startNewEntry = () => {
    setJournalText('');
    setMood(5);
    setAnalysis(null);
    setAiResponse('');
  };

  const handleVoiceRecording = () => {
    // Simulated voice recording - in production, integrate with Speech Recognition API
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setJournalText(prev => prev + " I recorded this with my voice.");
        setIsRecording(false);
      }, 2000);
    }
  };

  if (analysis && aiResponse) {
    return (
      <div className="space-y-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full border border-green-200/50">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-700">Entry saved successfully</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Thank You for Sharing
          </h1>
          <p className="text-xl text-gray-600">Your thoughts have been safely recorded</p>
        </motion.div>

        {/* Crisis Alert */}
        {analysis.riskLevel === 'high' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-800 mb-3">
                  We're Concerned About You
                </h3>
                <p className="text-red-700 text-lg mb-6">
                  Your entry suggests you might be in crisis. Please reach out for immediate support.
                </p>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Call Crisis Helpline: 988
                  </button>
                  <button className="w-full bg-red-100 text-red-700 py-3 rounded-xl font-semibold hover:bg-red-200 transition-colors">
                    Text Crisis Line: 741741
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* AI Response */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-blue-200/50 shadow-xl"
        >
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                MindGuard AI Companion
                <Sparkles className="w-5 h-5 ml-2 text-purple-500" />
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {aiResponse}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Analysis Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Analysis Summary</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200/50">
              <div className="text-4xl mb-3">
                {mood >= 7 ? '😊' : mood >= 4 ? '😐' : '😔'}
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{mood}/10</div>
              <div className="font-medium text-gray-600">Mood Rating</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200/50">
              <div className={`text-2xl mb-2 ${
                analysis.riskLevel === 'high' ? 'text-red-500' :
                analysis.riskLevel === 'medium' ? 'text-yellow-500' : 'text-green-500'
              }`}>
                {analysis.riskLevel === 'high' ? '⚠️' :
                 analysis.riskLevel === 'medium' ? '⚡' : '✅'}
              </div>
              <div className="text-xl font-bold text-gray-800 capitalize mb-1">{analysis.riskLevel}</div>
              <div className="font-medium text-gray-600">Risk Level</div>
            </div>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={startNewEntry}
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all duration-200 shadow-lg"
        >
          Write Another Entry
        </motion.button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent flex items-center justify-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          Daily Journal
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Share your thoughts and feelings in a safe space
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Mood Scale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">How are you feeling today?</h3>
          <MoodScale value={mood} onChange={setMood} />
        </motion.div>

        {/* Journal Entry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">What's on your mind?</h3>
          <div className="relative">
            <textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Write about your day, your feelings, or anything that's important to you. This is a safe space for your thoughts..."
              className="w-full h-48 p-6 border border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg leading-relaxed bg-white/50 backdrop-blur-sm"
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={handleVoiceRecording}
              className={`absolute bottom-6 right-6 p-3 rounded-full transition-all duration-200 ${
                isRecording 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white animate-pulse shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>
          <div className="flex justify-between items-center mt-4 text-gray-500">
            <span className="font-medium">{journalText.length} characters</span>
            {isRecording && <span className="text-red-500 font-semibold animate-pulse">Recording...</span>}
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={!journalText.trim() || isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-5 rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all duration-200 shadow-lg"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
              Analyzing...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Send className="w-6 h-6 mr-3" />
              Save Entry
            </div>
          )}
        </motion.button>
      </form>
    </div>
  );
}