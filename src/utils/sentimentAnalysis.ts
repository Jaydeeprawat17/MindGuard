// Simulated AI sentiment analysis for demo purposes
// In production, this would integrate with Hugging Face or similar NLP service

const riskKeywords = [
  'suicide', 'kill myself', 'end it all', 'no point', 'worthless', 
  'better off dead', 'cant go on', 'give up', 'hopeless', 'meaningless'
];

const negativeKeywords = [
  'sad', 'depressed', 'anxious', 'worried', 'scared', 'angry', 
  'frustrated', 'lonely', 'empty', 'numb', 'tired', 'exhausted'
];

const positiveKeywords = [
  'happy', 'grateful', 'excited', 'peaceful', 'content', 'hopeful',
  'proud', 'accomplished', 'loved', 'supported', 'motivated', 'optimistic'
];

export function analyzeSentiment(text: string): {
  sentiment: 'positive' | 'neutral' | 'negative' | 'concerning';
  riskLevel: 'low' | 'medium' | 'high';
  confidence: number;
} {
  const lowerText = text.toLowerCase();
  
  // Check for crisis indicators
  const hasRiskKeywords = riskKeywords.some(keyword => lowerText.includes(keyword));
  if (hasRiskKeywords) {
    return {
      sentiment: 'concerning',
      riskLevel: 'high',
      confidence: 0.95
    };
  }

  // Count sentiment indicators
  const negativeCount = negativeKeywords.filter(keyword => lowerText.includes(keyword)).length;
  const positiveCount = positiveKeywords.filter(keyword => lowerText.includes(keyword)).length;

  if (negativeCount > positiveCount + 2) {
    return {
      sentiment: 'negative',
      riskLevel: negativeCount > 3 ? 'medium' : 'low',
      confidence: Math.min(0.8, negativeCount * 0.2)
    };
  }

  if (positiveCount > negativeCount) {
    return {
      sentiment: 'positive',
      riskLevel: 'low',
      confidence: Math.min(0.8, positiveCount * 0.15)
    };
  }

  return {
    sentiment: 'neutral',
    riskLevel: 'low',
    confidence: 0.6
  };
}

export function generateSupportiveResponse(sentiment: string, riskLevel: string): string {
  if (riskLevel === 'high') {
    return "I'm concerned about what you've shared. You're not alone, and there are people who want to help. Please consider reaching out to a crisis helpline or trusted person right now.";
  }

  if (sentiment === 'negative' || riskLevel === 'medium') {
    return "It sounds like you're going through a difficult time. Remember that these feelings are temporary, and it's okay to ask for help. Would you like to try a breathing exercise or talk to someone?";
  }

  if (sentiment === 'positive') {
    return "I'm glad to hear you're feeling positive today! These moments of happiness are important to acknowledge and celebrate.";
  }

  return "Thank you for sharing with me. How are you feeling right now? I'm here to listen and support you.";
}