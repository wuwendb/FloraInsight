// Plant Types
export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  image?: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
}

// Image Analysis Types
export interface AnalysisRequest {
  image: string;
}

export interface AnalysisResponse {
  plantType: string;
  confidence: number;
  diseases?: Disease[];
}

export interface Disease {
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  treatment: string;
}

// Care Advice Types
export interface CareAdvice {
  plantId: string;
  water: number;
  sunlight: string;
  humidity: string;
  temperature: number;
  fertilizer: string;
  lastWatered?: string;
}

// AI Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  context?: {
    plantId?: string;
    plantName?: string;
  };
}

export interface ChatResponse {
  answer: string;
  plantAdvice?: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  plants: Plant[];
}

export interface UserSettings {
  language: string;
  notifications: boolean;
  darkMode: boolean;
}
