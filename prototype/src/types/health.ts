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
  quickActions?: QuickAction[];
  dataCard?: DataCard;
  suggestedQuestions?: string[];
}

export interface QuickAction {
  id: string;
  label: string;
  action: 'navigate' | 'suggest';
  target?: string; // page to navigate to
  question?: string; // question to ask
  icon?: string;
}

export interface DataCard {
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  context?: string;
}

// Co-interpretation types for HCI best paper innovation
export interface ReasoningStep {
  id: string;
  type: 'observation' | 'inference' | 'hypothesis' | 'uncertainty' | 'user_input';
  content: string;
  confidence?: 'high' | 'medium' | 'low';
  dataPoints?: string[];
  requiresUserInput?: boolean;
}

export interface ReasoningChain {
  id: string;
  question: string;
  steps: ReasoningStep[];
  conclusion?: string;
  uncertainty?: string;
  userContributions?: string[];
  openQuestions?: string[];
}

export interface Hypothesis {
  id: string;
  statement: string;
  confidence: 'high' | 'medium' | 'low';
  evidence: string[];
  counterEvidence?: string[];
  userValidated?: boolean;
  userRejected?: boolean;
  alternativeExplanations?: string[];
  requiresUserInput?: boolean;
}

export interface Pattern {
  id: string;
  description: string;
  dataPoints: number[];
  confidence: 'high' | 'medium' | 'low';
  userConfirmed?: boolean;
  userNotes?: string;
}

export interface Counterfactual {
  id: string;
  question: string;
  scenario: string;
  predictedOutcome: string;
  confidence: 'high' | 'medium' | 'low';
  reasoning: string[];
}
