import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Target, Moon, Footprints, Brain } from 'lucide-react';

interface WeeklyGoalsScreenProps {
  onConfirm: (goals: { sleep: number; stepDays: number; mindfulness: number }) => void;
  onBack: () => void;
}

export function WeeklyGoalsScreen({ onConfirm, onBack }: WeeklyGoalsScreenProps) {
  const [sleepHours, setSleepHours] = useState(7.5);
  const [stepDays, setStepDays] = useState(5);
  const [mindfulnessSessions, setMindfulnessSessions] = useState(3);

  const handleConfirm = () => {
    onConfirm({
      sleep: sleepHours,
      stepDays,
      mindfulness: mindfulnessSessions
    });
  };

  return (
    <div className="min-h-screen px-6 pb-8 pt-4" style={{ backgroundColor: '#F7FAFC' }}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 500, color: '#2C3639', marginBottom: '0.5rem' }}>
            This Week's Intentions
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
            Set flexible budgets for the week ahead
          </p>
        </div>

        {/* Info Card */}
        <Card 
          className="p-4 mb-6 border-none" 
          style={{ background: 'linear-gradient(135deg, rgba(10, 132, 255, 0.05) 0%, rgba(125, 212, 176, 0.08) 100%)' }}
        >
          <p style={{ fontSize: '0.875rem', color: '#2C3639', fontStyle: 'italic' }}>
            💡 <strong>Why "budgets" not "targets"?</strong> These are flexible intentions—some days you'll spend more of your energy budget, some days less. That's not failure, that's being human! 🌈
          </p>
        </Card>

        <div className="space-y-6">
          {/* Sleep Goal */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(125, 212, 176, 0.15)' }}>
                <Moon className="w-6 h-6" style={{ color: '#7DD4B0' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#2C3639', marginBottom: '0.25rem' }}>
                  Sleep Hours
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                  Target hours per night
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div 
                  className="inline-block px-6 py-3 rounded-xl mb-4"
                  style={{ backgroundColor: 'rgba(125, 212, 176, 0.12)' }}
                >
                  <span style={{ fontSize: '2.5rem', fontWeight: 500, color: '#2C3639' }}>
                    {sleepHours.toFixed(1)}
                  </span>
                  <span style={{ fontSize: '1rem', color: '#6B7280', marginLeft: '0.5rem' }}>
                    hours/night
                  </span>
                </div>
              </div>

              <Slider
                value={[sleepHours * 10]}
                onValueChange={(value) => setSleepHours(value[0] / 10)}
                min={40}
                max={100}
                step={5}
                className="w-full"
              />

              <div className="flex justify-between" style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                <span>4h</span>
                <span>10h</span>
              </div>
            </div>
          </Card>

          {/* Step Days Goal */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(10, 132, 255, 0.1)' }}>
                <Footprints className="w-6 h-6" style={{ color: '#0A84FF' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#2C3639', marginBottom: '0.25rem' }}>
                  Active Days
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                  Days hitting step goal (8k+ steps)
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div 
                  className="inline-block px-6 py-3 rounded-xl mb-4"
                  style={{ backgroundColor: 'rgba(10, 132, 255, 0.08)' }}
                >
                  <span style={{ fontSize: '2.5rem', fontWeight: 500, color: '#0A84FF' }}>
                    {stepDays}
                  </span>
                  <span style={{ fontSize: '1rem', color: '#6B7280', marginLeft: '0.5rem' }}>
                    days
                  </span>
                </div>
              </div>

              <Slider
                value={[stepDays]}
                onValueChange={(value) => setStepDays(value[0])}
                min={0}
                max={7}
                step={1}
                className="w-full"
              />

              <div className="flex justify-between" style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                <span>0 days</span>
                <span>7 days</span>
              </div>

              <div className="pt-4 border-t" style={{ borderColor: 'rgba(44, 54, 57, 0.08)' }}>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', fontStyle: 'italic' }}>
                  This week: aim for {stepDays} days with 8,000+ steps
                </p>
              </div>
            </div>
          </Card>

          {/* Mindfulness Goal */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(125, 212, 176, 0.15)' }}>
                <Brain className="w-6 h-6" style={{ color: '#7DD4B0' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#2C3639', marginBottom: '0.25rem' }}>
                  Mindfulness
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                  Meditation or breathing sessions
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div 
                  className="inline-block px-6 py-3 rounded-xl mb-4"
                  style={{ backgroundColor: 'rgba(125, 212, 176, 0.12)' }}
                >
                  <span style={{ fontSize: '2.5rem', fontWeight: 500, color: '#2C3639' }}>
                    {mindfulnessSessions}
                  </span>
                  <span style={{ fontSize: '1rem', color: '#6B7280', marginLeft: '0.5rem' }}>
                    sessions
                  </span>
                </div>
              </div>

              <Slider
                value={[mindfulnessSessions]}
                onValueChange={(value) => setMindfulnessSessions(value[0])}
                min={0}
                max={14}
                step={1}
                className="w-full"
              />

              <div className="flex justify-between" style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                <span>0</span>
                <span>14</span>
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
            Set Weekly Intentions
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
            Flexible budgets → not pass or fail
          </p>
        </div>
      </div>
    </div>
  );
}
