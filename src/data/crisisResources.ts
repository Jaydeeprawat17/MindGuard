import { CrisisResource } from '../types';

export const crisisResources: CrisisResource[] = [
  {
    name: "National Suicide Prevention Lifeline",
    phone: "988",
    description: "Free, confidential crisis support 24/7",
    available24h: true,
    country: "US"
  },
  {
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    description: "Free crisis counseling via text message",
    available24h: true,
    country: "US"
  },
  {
    name: "SAMHSA National Helpline",
    phone: "1-800-662-4357",
    description: "Mental health and substance abuse support",
    available24h: true,
    country: "US"
  },
  {
    name: "International Association for Suicide Prevention",
    phone: "Visit iasp.info/resources",
    description: "Global directory of crisis centers",
    available24h: true,
    country: "International"
  }
];