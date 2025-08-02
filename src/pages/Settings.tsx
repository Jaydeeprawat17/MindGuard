import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Shield, User, Heart, Phone } from 'lucide-react';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [crisisDetection, setCrisisDetection] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  return (
    <div className="space-y-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <SettingsIcon className="w-6 h-6 mr-2 text-gray-500" />
          Settings
        </h1>
        <p className="text-gray-600">
          Customize your MindGuard experience
        </p>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
      >
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-blue-500" />
          Profile
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              defaultValue="Alex Smith"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              defaultValue="alex@example.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
      >
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-yellow-500" />
          Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Daily Reminders</h4>
              <p className="text-sm text-gray-600">Get reminded to check in with your mood</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Privacy & Safety */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
      >
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-green-500" />
          Privacy & Safety
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Crisis Detection</h4>
              <p className="text-sm text-gray-600">Enable AI to detect concerning content</p>
            </div>
            <button
              onClick={() => setCrisisDetection(!crisisDetection)}
              className={`w-12 h-6 rounded-full transition-colors ${
                crisisDetection ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  crisisDetection ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Anonymous Data Sharing</h4>
              <p className="text-sm text-gray-600">Help improve mental health research</p>
            </div>
            <button
              onClick={() => setDataSharing(!dataSharing)}
              className={`w-12 h-6 rounded-full transition-colors ${
                dataSharing ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  dataSharing ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Emergency Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
      >
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Phone className="w-5 h-5 mr-2 text-red-500" />
          Emergency Contacts
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">Sarah Johnson</h4>
                <p className="text-sm text-gray-600">Sister • (555) 123-4567</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Edit
              </button>
            </div>
          </div>
          <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
            + Add Emergency Contact
          </button>
        </div>
      </motion.div>

      {/* App Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
      >
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-pink-500" />
          About MindGuard
        </h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Version</span>
            <span>1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span>Last Updated</span>
            <span>January 2025</span>
          </div>
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              MindGuard is designed to support your mental health journey. 
              If you're in crisis, please contact professional help immediately.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-red-50 rounded-xl p-6 border border-red-200"
      >
        <h3 className="font-semibold text-red-800 mb-4">Data Management</h3>
        <div className="space-y-3">
          <button className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-medium hover:bg-red-200 transition-colors">
            Export My Data
          </button>
          <button className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
            Delete All Data
          </button>
        </div>
        <p className="text-xs text-red-600 mt-3">
          Data deletion is permanent and cannot be undone.
        </p>
      </motion.div>
    </div>
  );
}