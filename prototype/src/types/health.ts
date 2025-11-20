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

// Context tag for morning forecast
export interface ContextTag {
  id: string;
  label: string;
  icon: string;
  type: 'calendar' | 'weather' | 'feeling' | 'custom';
  active?: boolean;
}

// Enhanced forecast with comfort zone
export interface DailyForecast {
  date: string;
  metric: string;
  predicted: number;
  comfortZoneMin?: number;
  comfortZoneMax?: number;
  userAdjusted?: number;
  actual?: number;
  contextTags?: ContextTag[];
}

// Attribution cause for Detective Mode
export interface AttributionCause {
  id: string;
  label: string;
  selected: boolean;
  userInput?: string;
}

// What-If scenario for planning
export interface WhatIfScenario {
  id: string;
  title: string;
  description: string;
  action: string;
  probabilityIncrease: number;
  sleepImpact?: 'none' | 'positive' | 'negative';
  effortLevel: 'light' | 'moderate' | 'challenging';
}

export interface Reflection {
  date: string;
  surpriseIndex: number;
  calibrationScore: number;
  notes: string;
  mood: string;
  attributions?: AttributionCause[];
  gracePointUsed?: boolean;
  selectedScenario?: WhatIfScenario;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
