import { HealthMetric, Goal, DailyForecast, Reflection, ContextTag, WhatIfScenario } from '../types/health';

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

// Generate context tags based on day and conditions
export function generateContextTags(): ContextTag[] {
  const allTags: ContextTag[] = [
    { id: '1', label: '3hr workshop', icon: '📅', type: 'calendar', active: true },
    { id: '2', label: 'Rainy weather', icon: '🌧️', type: 'weather', active: true },
    { id: '3', label: 'Feeling tired', icon: '😴', type: 'feeling', active: true },
    { id: '4', label: 'Lunch plans', icon: '🍽️', type: 'calendar', active: true },
    { id: '5', label: 'Clear skies', icon: '☀️', type: 'weather', active: true },
    { id: '6', label: 'Energized', icon: '⚡', type: 'feeling', active: true },
  ];
  
  // Return random 2-3 tags
  const shuffled = allTags.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.floor(Math.random() * 2) + 2);
}

// Generate What-If scenarios for tomorrow
export function generateWhatIfScenarios(metric: string, baselineProbability: number): WhatIfScenario[] {
  if (metric === 'steps') {
    return [
      {
        id: '1',
        title: 'Morning Walk',
        description: '10-minute walk before breakfast',
        action: 'Take a short morning walk to energize your day',
        probabilityIncrease: 8,
        sleepImpact: 'positive',
        effortLevel: 'light'
      },
      {
        id: '2',
        title: 'Park Far Away',
        description: 'Choose distant parking spots',
        action: 'Park further from destinations throughout the day',
        probabilityIncrease: 5,
        sleepImpact: 'none',
        effortLevel: 'light'
      },
      {
        id: '3',
        title: 'Stairs Challenge',
        description: 'Take stairs instead of elevators',
        action: 'Use stairs whenever possible today',
        probabilityIncrease: 12,
        sleepImpact: 'positive',
        effortLevel: 'light'
      }
    ];
  } else if (metric === 'sleep') {
    return [
      {
        id: '1',
        title: 'Early Wind-Down',
        description: 'Start bedtime routine 30 min earlier',
        action: 'Wind down 30 min early',
        probabilityIncrease: 30,
        sleepImpact: 'positive',
        effortLevel: 'light'
      },
      {
        id: '2',
        title: 'Screen Curfew',
        description: 'No screens 1 hour before bed',
        action: 'Screen-free last hour',
        probabilityIncrease: 45,
        sleepImpact: 'positive',
        effortLevel: 'moderate'
      }
    ];
  } else {
    return [];
  }
}

// Generate Morning-specific What-If scenarios
export function generateMorningScenarios(baselineProbability: number): WhatIfScenario[] {
  return [
    {
      id: 'm1',
      title: 'Morning Walk Boost',
      description: 'Start your day with a 10-minute energizing walk',
      action: 'Take a short walk before or after breakfast',
      probabilityIncrease: 8,
      sleepImpact: 'positive',
      effortLevel: 'light'
    },
    {
      id: 'm2',
      title: 'Active Commute',
      description: 'Add movement to your morning routine',
      action: 'Walk part of your commute or park further away',
      probabilityIncrease: 12,
      sleepImpact: 'none',
      effortLevel: 'light'
    },
    {
      id: 'm3',
      title: 'Midday Movement Break',
      description: 'Schedule a lunchtime walking session',
      action: 'Block 15 minutes on your calendar for a lunch walk',
      probabilityIncrease: 15,
      sleepImpact: 'positive',
      effortLevel: 'light'
    }
  ];
}

// Generate Evening-specific What-If scenarios  
export function generateEveningScenarios(baselineProbability: number): WhatIfScenario[] {
  return [
    {
      id: 'e1',
      title: 'Evening Stroll',
      description: 'Wind down with a gentle post-dinner walk',
      action: 'Take a 20-minute walk after dinner',
      probabilityIncrease: 10,
      sleepImpact: 'positive',
      effortLevel: 'light'
    },
    {
      id: 'e2',
      title: 'Screen Wind-Down',
      description: 'No screens 1 hour before bedtime',
      action: 'Put devices away at 9 PM tonight',
      probabilityIncrease: 18,
      sleepImpact: 'positive',
      effortLevel: 'moderate'
    },
    {
      id: 'e3',
      title: 'Gentle Stretching',
      description: '10 minutes of calming stretches before bed',
      action: 'Do light stretches as part of bedtime routine',
      probabilityIncrease: 12,
      sleepImpact: 'positive',
      effortLevel: 'light'
    },
    {
      id: 'e4',
      title: 'Consistent Bedtime',
      description: 'Go to bed at the same time tonight',
      action: 'Set a bedtime alarm for 10:30 PM',
      probabilityIncrease: 20,
      sleepImpact: 'positive',
      effortLevel: 'light'
    }
  ];
}