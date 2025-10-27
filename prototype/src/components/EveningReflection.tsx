import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Sunset, TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react';
import { DailyForecast } from '../types/health';
import { calculateCalibrationScore, calculateSurpriseIndex } from '../lib/mockData';

interface EveningReflectionProps {
  forecasts: DailyForecast[];
  onSaveReflection: (notes: string, mood: string) => void;
}

export function EveningReflection({ forecasts, onSaveReflection }: EveningReflectionProps) {
  const [reflectionNotes, setReflectionNotes] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  const moods = ['🌟 Great', '😊 Good', '😐 Okay', '😔 Tough', '💪 Resilient'];

  const handleSave = () => {
    if (reflectionNotes.trim() || selectedMood) {
      onSaveReflection(reflectionNotes, selectedMood);
      setReflectionNotes('');
      setSelectedMood('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(125, 212, 176, 0.15)' }}>
          <Sunset className="w-6 h-6" style={{ color: '#7DD4B0' }} />
        </div>
        <div>
          <h2>Evening Check-In</h2>
          <p className="text-muted-foreground">The forecast game results are in! Let's see what your body did today 🎲</p>
        </div>
      </div>

      {/* Results Comparison */}
      <div className="space-y-4">
        {forecasts.map((forecast) => {
          if (!forecast.actual) return null;
          
          const predicted = forecast.userAdjusted || forecast.predicted;
          const actual = forecast.actual;
          const calibration = calculateCalibrationScore(predicted, actual);
          const surprise = calculateSurpriseIndex(predicted, actual);
          const difference = actual - predicted;
          const percentDiff = ((difference / predicted) * 100).toFixed(0);

          return (
            <Card key={forecast.metric} className="p-6">
              <div className="space-y-4">
                <h3 className="capitalize">{forecast.metric}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-xl">
                    <p className="text-muted-foreground mb-1">Your Goal</p>
                    <p className="text-2xl">
                      {forecast.metric === 'sleep' ? predicted.toFixed(1) : predicted.toLocaleString()}
                      {forecast.metric === 'sleep' ? 'h' : ''}
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(10, 132, 255, 0.08)' }}>
                    <p className="text-muted-foreground mb-1">Actual</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl" style={{ color: '#0A84FF' }}>
                        {forecast.metric === 'sleep' ? actual.toFixed(1) : actual.toLocaleString()}
                        {forecast.metric === 'sleep' ? 'h' : ''}
                      </p>
                      {difference > 0 ? (
                        <TrendingUp className="w-5 h-5" style={{ color: '#7DD4B0' }} />
                      ) : difference < 0 ? (
                        <TrendingDown className="w-5 h-5" style={{ color: '#0A84FF' }} />
                      ) : (
                        <Minus className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl space-y-3" style={{ background: 'linear-gradient(135deg, rgba(10, 132, 255, 0.06) 0%, rgba(125, 212, 176, 0.06) 100%)' }}>
                  <h4 className="mb-2">📊 Forecast Game Results</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span>Calibration Points</span>
                      <p className="text-muted-foreground">How accurate was our prediction?</p>
                    </div>
                    <span className="px-3 py-1 rounded-full" style={{ backgroundColor: '#0A84FF', color: '#FFFFFF' }}>
                      {calibration.toFixed(0)}pts
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span>Surprise Index</span>
                      <p className="text-muted-foreground">How much life surprised us!</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" style={{ color: '#7DD4B0' }} />
                      <span className="px-3 py-1 rounded-full" style={{ backgroundColor: '#7DD4B0', color: '#2C3639' }}>
                        {forecast.metric === 'sleep' ? surprise.toFixed(1) : surprise.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-3 mt-3">
                    <p className="italic">
                      {difference > 0 
                        ? `🎉 Your body went beyond expectations by ${Math.abs(Number(percentDiff))}%! What supported you today?`
                        : difference < 0
                        ? `📚 You landed ${Math.abs(Number(percentDiff))}% below the forecast. What did life bring today that we couldn't predict?`
                        : `🎯 Wow! Exactly on target—you and I are in sync!`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Reflection Prompt */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3>Today's Reflection</h3>
            <p className="text-muted-foreground">What helped or hindered today's outcomes?</p>
          </div>

          <div>
            <label className="mb-2 block">How are you feeling about today?</label>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <Button
                  key={mood}
                  variant={selectedMood === mood ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedMood(mood)}
                >
                  {mood}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="reflection">Your thoughts (optional)</label>
            <Textarea
              id="reflection"
              placeholder="e.g., Had a great workout in the morning that energized me... or... Stress from work made it hard to sleep..."
              value={reflectionNotes}
              onChange={(e) => setReflectionNotes(e.target.value)}
              rows={4}
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Reflection
          </Button>
        </div>
      </Card>

      <Card className="p-4 border-none" style={{ background: 'linear-gradient(135deg, rgba(125, 212, 176, 0.12) 0%, rgba(10, 132, 255, 0.06) 100%)' }}>
        <p className="italic text-foreground">
          💚 <strong>Self-compassion reminder:</strong> Every data point is an opportunity to learn, not a grade on your performance. Your body is always doing its best with the resources and circumstances it has. Deviations from forecasts aren't failures—they're insights! What is your body teaching you today? 🌿
        </p>
      </Card>
    </div>
  );
}
