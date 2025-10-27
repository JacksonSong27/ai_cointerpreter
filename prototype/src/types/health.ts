// Health data types
export interface HealthMetric {
  date: string;
  steps: number;
  sleep: number;
  heartRate: number;
  mindfulness: number;
  activeMinutes: number;
}

export interface Goal {
  id: string;
  type: 'sleep' | 'steps' | 'mindfulness' | 'active';
  weeklyTarget: number;
  unit: string;
  description: string;
}

export interface DailyForecast {
  date: string;
  metric: string;
  predicted: number;
  userAdjusted?: number;
  actual?: number;
}

export interface Reflection {
  date: string;
  surpriseIndex: number;
  calibrationScore: number;
  notes: string;
  mood: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
