export interface MoodEntry {
  id: string;
  date: string;
  mood: number; // 1-10 scale
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative' | 'concerning';
  riskLevel: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emergencyContacts: EmergencyContact[];
  preferences: {
    enableCrisisDetection: boolean;
    dailyReminders: boolean;
  };
}

export interface CrisisResource {
  name: string;
  phone: string;
  description: string;
  available24h: boolean;
  country: string;
}