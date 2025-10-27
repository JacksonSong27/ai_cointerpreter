import { HealthMetric, Goal, DailyForecast, Reflection } from '../types/health';

// Generate mock health data for the past 14 days
export function generateMockHealthData(): HealthMetric[] {
  const data: HealthMetric[] = [];
  const today = new Date();
  
  for (let i = 13; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      steps: Math.floor(5000 + Math.random() * 7000),
      sleep: 5.5 + Math.random() * 3,
      heartRate: 65 + Math.floor(Math.random() * 20),
      mindfulness: Math.floor(Math.random() * 3),
      activeMinutes: 20 + Math.floor(Math.random() * 60)
    });
  }
  
  return data;
}

export const defaultGoals: Goal[] = [
  {
    id: '1',
    type: 'sleep',
    weeklyTarget: 49,
    unit: 'hours',
    description: '7h average sleep per night'
  },
  {
    id: '2',
    type: 'steps',
    weeklyTarget: 8000,
    unit: 'steps on 4+ days',
    description: 'Hit 8,000 steps on at least 4 days'
  },
  {
    id: '3',
    type: 'mindfulness',
    weeklyTarget: 2,
    unit: 'sessions',
    description: '2 mindfulness sessions per week'
  }
];

export function generateTodayForecast(historicalData: HealthMetric[]): DailyForecast[] {
  const recent = historicalData.slice(-7);
  const avgSteps = recent.reduce((sum, d) => sum + d.steps, 0) / recent.length;
  const avgSleep = recent.reduce((sum, d) => sum + d.sleep, 0) / recent.length;
  
  const today = new Date().toISOString().split('T')[0];
  
  return [
    {
      date: today,
      metric: 'steps',
      predicted: Math.round(avgSteps)
    },
    {
      date: today,
      metric: 'sleep',
      predicted: Math.round(avgSleep * 10) / 10
    }
  ];
}

export function calculateCalibrationScore(predicted: number, actual: number): number {
  const percentError = Math.abs(predicted - actual) / predicted;
  return Math.max(0, 100 - percentError * 100);
}

export function calculateSurpriseIndex(predicted: number, actual: number): number {
  return Math.abs(actual - predicted);
}
