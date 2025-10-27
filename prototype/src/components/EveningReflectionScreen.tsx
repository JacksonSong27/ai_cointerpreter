import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

interface EveningReflectionScreenProps {
  stepsGoal: number;
  sleepGoal: number;
  onSubmit: (reflection: string) => void;
  onBack: () => void;
}

export function EveningReflectionScreen({ 
  stepsGoal, 
  sleepGoal,
  onSubmit,
  onBack 
}: EveningReflectionScreenProps) {
  // Mock actual data - in real app would come from health data
  const actualSteps = 8100;
  const actualSleep = 7.2;
  
  const [reflection, setReflection] = useState('');

  // Calculate differences
  const stepsDiff = actualSteps - stepsGoal;
  const stepsPercent = ((stepsDiff / stepsGoal) * 100).toFixed(0);
  const sleepDiff = actualSleep - sleepGoal;
  const sleepPercent = ((sleepDiff / sleepGoal) * 100).toFixed(0);

  // Calculate playful scores
  // Calibration Points: 0-100 scale, higher = more accurate prediction
  const stepsErrorPercent = Math.abs((stepsDiff / stepsGoal) * 100);
  const sleepErrorPercent = Math.abs((sleepDiff / sleepGoal) * 100);
  
  const stepsCalibration = Math.max(0, 100 - stepsErrorPercent);
  const sleepCalibration = Math.max(0, 100 - sleepErrorPercent);
  const avgCalibration = (stepsCalibration + sleepCalibration) / 2;
  
  // Surprise Index: Combined metric showing how much actual deviated
  // Higher number = more surprising (either direction)
  const stepsSurprise = Math.abs(stepsDiff);
  const sleepSurprise = Math.abs(sleepDiff);
  
  // Combined surprise score (weighted: steps are in thousands, sleep in hours)
  // Normalize both to percentage then average
  const totalSurprise = Math.round((stepsErrorPercent + sleepErrorPercent) / 2);

  const handleSubmit = () => {
    onSubmit(reflection);
  };

  return (
    <div className="min-h-screen px-6 pb-8 pt-4" style={{ backgroundColor: '#F7FAFC' }}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 500, color: '#2C3639', marginBottom: '0.5rem' }}>
            How did today go?
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
            Let's see how your body responded
          </p>
        </div>

        <div className="space-y-6">
          {/* Steps Actual vs Forecast */}
          <Card className="p-6">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#2C3639', marginBottom: '1rem' }}>
              Steps
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-xl" style={{ backgroundColor: '#F7FAFC' }}>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                  Your Goal
                </p>
                <p style={{ fontSize: '1.5rem', fontWeight: 500, color: '#2C3639' }}>
                  {stepsGoal.toLocaleString()}
                </p>
              </div>
              
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(125, 212, 176, 0.1)' }}>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                  Actual
                </p>
                <div className="flex items-baseline gap-2">
                  <p style={{ fontSize: '1.5rem', fontWeight: 500, color: '#7DD4B0' }}>
                    {actualSteps.toLocaleString()}
                  </p>
                  {stepsDiff > 0 ? (
                    <TrendingUp className="w-4 h-4" style={{ color: '#7DD4B0' }} />
                  ) : (
                    <TrendingDown className="w-4 h-4" style={{ color: '#7DD4B0' }} />
                  )}
                </div>
              </div>
            </div>

            {/* Visual bar comparison */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p style={{ fontSize: '0.75rem', color: '#6B7280', minWidth: '50px' }}>Goal</p>
                <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'rgba(44, 54, 57, 0.1)' }}>
                  <div 
                    className="h-2 rounded-full" 
                    style={{ backgroundColor: '#6B7280', width: '100%' }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p style={{ fontSize: '0.75rem', color: '#7DD4B0', minWidth: '50px' }}>Actual</p>
                <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'rgba(125, 212, 176, 0.15)' }}>
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      backgroundColor: '#7DD4B0', 
                      width: `${Math.min(100, (actualSteps / stepsGoal) * 100)}%` 
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Sleep Actual vs Forecast */}
          <Card className="p-6">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#2C3639', marginBottom: '1rem' }}>
              Sleep
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-xl" style={{ backgroundColor: '#F7FAFC' }}>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                  Your Goal
                </p>
                <p style={{ fontSize: '1.5rem', fontWeight: 500, color: '#2C3639' }}>
                  {sleepGoal.toFixed(1)}h
                </p>
              </div>
              
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(125, 212, 176, 0.12)' }}>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                  Actual
                </p>
                <div className="flex items-baseline gap-2">
                  <p style={{ fontSize: '1.5rem', fontWeight: 500, color: '#7DD4B0' }}>
                    {actualSleep.toFixed(1)}h
                  </p>
                  {sleepDiff > 0 ? (
                    <TrendingUp className="w-4 h-4" style={{ color: '#7DD4B0' }} />
                  ) : (
                    <TrendingDown className="w-4 h-4" style={{ color: '#7DD4B0' }} />
                  )}
                </div>
              </div>
            </div>

            {/* Visual bar comparison */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p style={{ fontSize: '0.75rem', color: '#6B7280', minWidth: '50px' }}>Goal</p>
                <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'rgba(44, 54, 57, 0.1)' }}>
                  <div 
                    className="h-2 rounded-full" 
                    style={{ backgroundColor: '#6B7280', width: '100%' }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p style={{ fontSize: '0.75rem', color: '#7DD4B0', minWidth: '50px' }}>Actual</p>
                <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'rgba(125, 212, 176, 0.2)' }}>
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      backgroundColor: '#7DD4B0', 
                      width: `${Math.min(100, (actualSleep / sleepGoal) * 100)}%` 
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Playful Scores */}
          <Card 
            className="p-6"
            style={{ 
              background: 'linear-gradient(135deg, rgba(10, 132, 255, 0.06) 0%, rgba(125, 212, 176, 0.06) 100%)'
            }}
          >
            <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#2C3639', marginBottom: '1rem' }}>
              📊 Forecast Game Results
            </h3>

            <div className="space-y-4">
              {/* Calibration Points */}
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#2C3639' }}>
                    Calibration Points
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                    How accurate was our prediction?
                  </p>
                </div>
                <span 
                  className="px-4 py-2 rounded-full"
                  style={{ 
                    backgroundColor: '#0A84FF',
                    color: '#FFFFFF',
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}
                >
                  {avgCalibration.toFixed(0)}pts
                </span>
              </div>

              {/* Surprise Index */}
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#2C3639' }}>
                    Surprise Index
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                    How much life surprised us!
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" style={{ color: '#7DD4B0' }} />
                  <span 
                    className="px-4 py-2 rounded-full"
                    style={{ 
                      backgroundColor: '#7DD4B0',
                      color: '#2C3639',
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}
                  >
                    {totalSurprise}%
                  </span>
                </div>
              </div>

              {/* Interpretation */}
              <div className="pt-4 border-t" style={{ borderColor: 'rgba(44, 54, 57, 0.08)' }}>
                <p style={{ fontSize: '0.875rem', color: '#2C3639', fontStyle: 'italic' }}>
                  {avgCalibration >= 85
                    ? `🎯 Excellent forecast! We're ${avgCalibration.toFixed(0)}% aligned. You know your body well!`
                    : avgCalibration >= 70
                    ? `✨ Pretty good sync! Our predictions were ${avgCalibration.toFixed(0)}% accurate. What patterns are you noticing?`
                    : totalSurprise >= 30
                    ? `📚 Life threw some surprises today (${totalSurprise}% variance). What unexpected things happened?`
                    : `🌱 Your body had different plans today. That's valuable data—what influenced the shift?`
                  }
                </p>
              </div>
            </div>
          </Card>

          {/* Reflection Input */}
          <Card className="p-6">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#2C3639', marginBottom: '0.5rem' }}>
              What helped or hurt today?
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem' }}>
              Your insights help you learn your patterns
            </p>
            
            <Textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Maybe I walked more because the weather was nice, or slept less because of a late meeting..."
              className="min-h-32"
              style={{ 
                backgroundColor: '#F7FAFC',
                border: '1px solid rgba(44, 54, 57, 0.1)',
                fontSize: '0.875rem',
                lineHeight: '1.5'
              }}
            />
          </Card>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            className="w-full h-14"
            style={{ 
              backgroundColor: '#7DD4B0',
              color: '#2C3639',
              fontSize: '1rem',
              fontWeight: 500
            }}
          >
            Submit Reflection
          </Button>

          {/* Microcopy */}
          <p 
            className="text-center"
            style={{ 
              fontSize: '0.75rem',
              color: '#6B7280',
              fontStyle: 'italic'
            }}
          >
            Once submitted, you can't go back—this keeps our forecast game honest
          </p>
        </div>
      </div>
    </div>
  );
}
