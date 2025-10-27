import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Sunrise, TrendingUp, Edit2, Check } from 'lucide-react';
import { DailyForecast } from '../types/health';

interface MorningForecastProps {
  forecasts: DailyForecast[];
  onSaveForecast: (metric: string, value: number) => void;
}

export function MorningForecast({ forecasts, onSaveForecast }: MorningForecastProps) {
  const [editingMetric, setEditingMetric] = useState<string | null>(null);
  const [adjustedValues, setAdjustedValues] = useState<Record<string, number>>({});

  const handleAdjust = (metric: string, value: number) => {
    setAdjustedValues({ ...adjustedValues, [metric]: value });
  };

  const handleSave = (metric: string) => {
    const value = adjustedValues[metric];
    if (value !== undefined) {
      onSaveForecast(metric, value);
    }
    setEditingMetric(null);
  };

  const stepsForecast = forecasts.find(f => f.metric === 'steps');
  const sleepForecast = forecasts.find(f => f.metric === 'sleep');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(10, 132, 255, 0.1)' }}>
          <Sunrise className="w-6 h-6" style={{ color: '#0A84FF' }} />
        </div>
        <div>
          <h2>Good Morning!</h2>
          <p className="text-muted-foreground">Let's set your flexible intentions for today based on what your body's been telling us</p>
        </div>
      </div>

      <Card className="p-4 border-none" style={{ background: 'linear-gradient(135deg, rgba(10, 132, 255, 0.05) 0%, rgba(125, 212, 176, 0.05) 100%)' }}>
        <p className="italic text-foreground">
          🎯 <strong>How it works:</strong> I'll suggest a forecast based on your patterns. You can accept it or adjust it to create today's intention. Tonight, we'll see how close we got—it's a curiosity game, not a test!
        </p>
      </Card>

      {/* Steps Forecast */}
      {stepsForecast && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3>Steps Forecast</h3>
                <p className="text-muted-foreground">Based on your average from the past week</p>
              </div>
              <TrendingUp className="w-5 h-5" style={{ color: '#0A84FF' }} />
            </div>

            <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(10, 132, 255, 0.08)' }}>
              <p className="text-muted-foreground mb-2">My Prediction (based on your past week)</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl" style={{ color: '#0A84FF' }}>{stepsForecast.predicted.toLocaleString()}</span>
                <span className="text-muted-foreground">steps</span>
              </div>
              <p className="text-muted-foreground mt-2 italic">
                This is your average from the past 7 days—but every day is unique!
              </p>
            </div>

            {editingMetric === 'steps' ? (
              <div className="space-y-4">
                <div>
                  <p className="mb-3">Your goal for today:</p>
                  <Slider
                    value={[adjustedValues.steps || stepsForecast.predicted]}
                    onValueChange={([value]) => handleAdjust('steps', value)}
                    min={3000}
                    max={15000}
                    step={500}
                    className="mb-2"
                  />
                  <p className="text-center">{(adjustedValues.steps || stepsForecast.predicted).toLocaleString()} steps</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleSave('steps')} className="flex-1">
                    <Check className="w-4 h-4 mr-2" />
                    Save Goal
                  </Button>
                  <Button variant="outline" onClick={() => setEditingMetric(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground">Your goal</p>
                  <p>{stepsForecast.userAdjusted?.toLocaleString() || stepsForecast.predicted.toLocaleString()} steps</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingMetric('steps');
                    setAdjustedValues({ ...adjustedValues, steps: stepsForecast.userAdjusted || stepsForecast.predicted });
                  }}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Adjust
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Sleep Forecast */}
      {sleepForecast && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3>Sleep Forecast (Tonight)</h3>
                <p className="text-muted-foreground">Your typical sleep duration lately</p>
              </div>
              <TrendingUp className="w-5 h-5" style={{ color: '#7DD4B0' }} />
            </div>

            <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(125, 212, 176, 0.12)' }}>
              <p className="text-muted-foreground mb-2">My Prediction (based on your past week)</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl" style={{ color: '#2C3639' }}>{sleepForecast.predicted.toFixed(1)}</span>
                <span className="text-muted-foreground">hours</span>
              </div>
              <p className="text-muted-foreground mt-2 italic">
                This is your recent sleep pattern—what feels right for tonight?
              </p>
            </div>

            {editingMetric === 'sleep' ? (
              <div className="space-y-4">
                <div>
                  <p className="mb-3">Your goal for tonight:</p>
                  <Slider
                    value={[adjustedValues.sleep || sleepForecast.predicted]}
                    onValueChange={([value]) => handleAdjust('sleep', Math.round(value * 10) / 10)}
                    min={5}
                    max={10}
                    step={0.5}
                    className="mb-2"
                  />
                  <p className="text-center">{(adjustedValues.sleep || sleepForecast.predicted).toFixed(1)} hours</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleSave('sleep')} className="flex-1">
                    <Check className="w-4 h-4 mr-2" />
                    Save Goal
                  </Button>
                  <Button variant="outline" onClick={() => setEditingMetric(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground">Your goal</p>
                  <p>{sleepForecast.userAdjusted?.toFixed(1) || sleepForecast.predicted.toFixed(1)} hours</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingMetric('sleep');
                    setAdjustedValues({ ...adjustedValues, sleep: sleepForecast.userAdjusted || sleepForecast.predicted });
                  }}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Adjust
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      <Card className="p-4 border-none" style={{ background: 'linear-gradient(135deg, rgba(125, 212, 176, 0.1) 0%, rgba(10, 132, 255, 0.05) 100%)' }}>
        <p className="italic text-foreground">
          💡 <strong>Compassion first:</strong> These are flexible intentions, not rigid rules. Your body's needs vary day by day—listen to what feels right today. The forecast is a starting point for curiosity, not a test you need to pass! 🌻
        </p>
      </Card>
    </div>
  );
}
