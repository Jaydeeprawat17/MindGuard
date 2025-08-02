import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Heart, MapPin, Clock, ExternalLink } from 'lucide-react';
import { crisisResources } from '../data/crisisResources';

export default function Crisis() {
  const handleCall = (phone: string) => {
    if (phone.includes('988')) {
      window.open('tel:988');
    } else if (phone.includes('741741')) {
      // SMS not directly openable, show instructions
      alert('Text "HOME" to 741741 for crisis support');
    } else {
      window.open(`tel:${phone.replace(/[^\d]/g, '')}`);
    }
  };

  const emergencyActions = [
    {
      title: 'Call 988',
      subtitle: 'Suicide & Crisis Lifeline',
      description: 'Free, confidential support 24/7',
      action: () => handleCall('988'),
      color: 'bg-red-500 hover:bg-red-600',
      icon: Phone
    },
    {
      title: 'Text Crisis Line',
      subtitle: 'Text HOME to 741741',
      description: 'Crisis counseling via text',
      action: () => handleCall('741741'),
      color: 'bg-orange-500 hover:bg-orange-600',
      icon: MessageCircle
    },
    {
      title: 'Emergency Services',
      subtitle: 'Call 911',
      description: 'For immediate danger',
      action: () => handleCall('911'),
      color: 'bg-red-600 hover:bg-red-700',
      icon: Phone
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          You Are Not Alone
        </h1>
        <p className="text-gray-600">
          Immediate help is available. Reach out now.
        </p>
      </motion.div>

      {/* Emergency Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {emergencyActions.map((action, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={action.action}
            className={`w-full p-6 rounded-xl text-white text-left transition-all ${action.color}`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <action.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{action.title}</h3>
                <p className="text-white/90 font-medium mb-1">{action.subtitle}</p>
                <p className="text-white/80 text-sm">{action.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Reassuring Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200"
      >
        <h3 className="font-semibold text-gray-800 mb-3">Remember:</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            Your feelings are temporary, even when they feel overwhelming
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            You have survived difficult times before
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            Professional help is available and effective
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            Many people care about you, even if it doesn't feel that way
          </li>
        </ul>
      </motion.div>

      {/* Additional Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
      >
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Phone className="w-5 h-5 mr-2 text-blue-500" />
          More Crisis Resources
        </h3>
        <div className="space-y-4">
          {crisisResources.map((resource, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">{resource.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {resource.available24h ? '24/7' : 'Limited Hours'}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {resource.country}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCall(resource.phone)}
                  className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Safety Planning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
      >
        <h3 className="font-semibold text-gray-800 mb-4">Create a Safety Plan</h3>
        <div className="space-y-3">
          <div className="p-3 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-1">1. Warning Signs</h4>
            <p className="text-purple-700 text-sm">Identify thoughts, feelings, or situations that might lead to crisis</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-1">2. Coping Strategies</h4>
            <p className="text-blue-700 text-sm">List activities that help you feel better or distract you</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-1">3. Support Contacts</h4>
            <p className="text-green-700 text-sm">People you can reach out to when you need help</p>
          </div>
        </div>
        <button className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
          Start Safety Plan
        </button>
      </motion.div>
    </div>
  );
}