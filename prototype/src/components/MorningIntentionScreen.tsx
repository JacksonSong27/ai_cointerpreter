import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { TrendingUp, Minus, Plus } from 'lucide-react';

interface MorningIntentionScreenProps {
  onConfirm: (stepsGoal: number, sleepGoal: number) => void;
  onBack: () => void;
}

export function MorningIntentionScreen({ onConfirm, onBack }: MorningIntentionScreenProps) {
  // Mock predictions based on historical data
  const stepsPrediction = 7200;
  const sleepPrediction = 7.5;
  
  const [stepsGoal, setStepsGoal] = useState(stepsPrediction);
  const [sleepGoal, setSleepGoal] = useState(sleepPrediction);

  // Weekly budget progress (mock data)
  const weeklyStepsTarget = 50000;
  const weeklyStepsProgress = 28000;
  const weeklySleepTarget = 52.5; // 7.5 hours × 7 days
  const weeklySleepProgress = 30.0;

  const handleConfirm = () => {
    onConfirm(stepsGoal, sleepGoal);
  };

  return (
    <div className="min-h-screen px-6 pb-8 pt-4" style={{ backgroundColor: '#F7FAFC' }}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 500, color: '#2C3639', marginBottom: '0.5rem' }}>
            Today's Intention
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
            Based on your patterns, here's what I predict
          </p>
        </div>

        <div className="space-y-6">
          {/* Steps Forecast Card */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#2C3639', marginBottom: '0.25rem' }}>
                  Steps Today
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                  Based on your past 2 weeks
                </p>
              </div>
              <TrendingUp className="w-5 h-5" style={{ color: '#0A84FF' }} />
            </div>

            {/* Prediction */}
            <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: 'rgba(10, 132, 255, 0.08)' }}>
              <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                My Prediction
              </p>
              <div className="flex items-baseline gap-2">
                <span style={{ fontSize: '2rem', fontWeight: 500, color: '#0A84FF' }}>
                  {stepsPrediction.toLocaleString()}
                </span>
                <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>steps</span>
              </div>
            </div>

            {/* Goal Adjustment */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#2C3639' }}>
                  Your Intention
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setStepsGoal(Math.max(1000, stepsGoal - 500))}
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: 'rgba(10, 132, 255, 0.1)' }}
                  >
                    <Minus className="w-4 h-4" style={{ color: '#0A84FF' }} />
                  </button>
                  <span style={{ fontSize: '1.25rem', fontWeight: 500, color: '#2C3639', minWidth: '80px', textAlign: 'center' }}>
                    {stepsGoal.toLocaleString()}
                  </span>
                  <button
                    onClick={() => setStepsGoal(Math.min(20000, stepsGoal + 500))}
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: 'rgba(10, 132, 255, 0.1)' }}
                  >
                    <Plus className="w-4 h-4" style={{ color: '#0A84FF' }} />
                  </button>
                </div>
              </div>
              <Slider
                value={[stepsGoal]}
                onValueChange={(value) => setStepsGoal(value[0])}
                min={1000}
                max={20000}
                step={500}
                className="w-full"
              />
            </div>

            {/* Weekly Budget Progress */}
            <div className="pt-4 border-t" style={{ borderColor: 'rgba(44, 54, 57, 0.08)' }}>
              <div className="flex items-center justify-between mb-2">
                <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>Weekly Budget</p>
                <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  {weeklyStepsProgress.toLocaleString()} / {weeklyStepsTarget.toLocaleString()}
                </p>
              </div>
              <div className="h-1.5 rounded-full" style={{ backgroundColor: 'rgba(10, 132, 255, 0.1)' }}>
                <div 
                  className="h-1.5 rounded-full" 
                  style={{ 
                    backgroundColor: '#0A84FF',
                    width: `${(weeklyStepsProgress / weeklyStepsTarget) * 100}%`
                  }}
                />
              </div>
            </div>
          </Card>

          {/* Sleep Forecast Card */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#2C3639', marginBottom: '0.25rem' }}>
                  Sleep Tonight
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                  Your typical sleep duration
                </p>
              </div>
              <TrendingUp className="w-5 h-5" style={{ color: '#7DD4B0' }} />
            </div>

            {/* Prediction */}
            <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: 'rgba(125, 212, 176, 0.12)' }}>
              <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                My Prediction
              </p>
              <div className="flex items-baseline gap-2">
                <span style={{ fontSize: '2rem', fontWeight: 500, color: '#2C3639' }}>
                  {sleepPrediction.toFixed(1)}
                </span>
                <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>hours</span>
              </div>
            </div>

            {/* Goal Adjustment */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#2C3639' }}>
                  Your Intention
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSleepGoal(Math.max(4, sleepGoal - 0.5))}
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: 'rgba(125, 212, 176, 0.2)' }}
                  >
                    <Minus className="w-4 h-4" style={{ color: '#2C3639' }} />
                  </button>
                  <span style={{ fontSize: '1.25rem', fontWeight: 500, color: '#2C3639', minWidth: '60px', textAlign: 'center' }}>
                    {sleepGoal.toFixed(1)}h
                  </span>
                  <button
                    onClick={() => setSleepGoal(Math.min(12, sleepGoal + 0.5))}
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: 'rgba(125, 212, 176, 0.2)' }}
                  >
                    <Plus className="w-4 h-4" style={{ color: '#2C3639' }} />
                  </button>
                </div>
              </div>
              <Slider
                value={[sleepGoal * 10]}
                onValueChange={(value) => setSleepGoal(value[0] / 10)}
                min={40}
                max={120}
                step={5}
                className="w-full"
              />
            </div>

            {/* Weekly Budget Progress */}
            <div className="pt-4 border-t" style={{ borderColor: 'rgba(44, 54, 57, 0.08)' }}>
              <div className="flex items-center justify-between mb-2">
                <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>Weekly Budget</p>
                <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  {weeklySleepProgress.toFixed(1)}h / {weeklySleepTarget.toFixed(1)}h
                </p>
              </div>
              <div className="h-1.5 rounded-full" style={{ backgroundColor: 'rgba(125, 212, 176, 0.2)' }}>
                <div 
                  className="h-1.5 rounded-full" 
                  style={{ 
                    backgroundColor: '#7DD4B0',
                    width: `${(weeklySleepProgress / weeklySleepTarget) * 100}%`
                  }}
                />
              </div>
            </div>
          </Card>

          {/* Confirm Button */}
          <Button
            onClick={handleConfirm}
            className="w-full h-14"
            style={{ 
              backgroundColor: '#0A84FF',
              color: '#FFFFFF',
              fontSize: '1rem',
              fontWeight: 500
            }}
          >
            Confirm Intention
          </Button>

          {/* Microcopy */}
          <p 
            className="text-center"
            style={{ 
              fontSize: '0.875rem',
              color: '#6B7280',
              fontStyle: 'italic',
              marginTop: '1rem'
            }}
          >
            Movement doesn't have to be big to matter
          </p>
        </div>
      </div>
    </div>
  );
}
