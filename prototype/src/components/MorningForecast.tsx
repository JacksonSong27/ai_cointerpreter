import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { Sunrise, TrendingUp, Calendar, Cloud, Heart, Plus, Lock, Lightbulb, Target, Award, CheckCircle2, Activity, X, Moon, CalendarDays, CloudRain } from 'lucide-react';
import { DailyForecast, ContextTag, WhatIfScenario, Goal, HealthMetric } from '../types/health';
import { generateContextTags, generateMorningScenarios } from '../lib/mockData';

interface MorningForecastProps {
  forecasts: DailyForecast[];
  onSaveForecast: (metric: string, value: number) => void;
  onLockIn?: () => void;
  goals: Goal[];
  weekData: HealthMetric[];
  scenario?: string;
  setScenario?: (scenario: string) => void;
}

export function MorningForecast({ forecasts, onSaveForecast, onLockIn, goals, weekData, scenario, setScenario }: MorningForecastProps) {
  const [comfortZones, setComfortZones] = useState<Record<string, [number, number]>>({});
  const [contextTags, setContextTags] = useState<ContextTag[]>(generateContextTags());
  const [customTag, setCustomTag] = useState('');
  const [locked, setLocked] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [selectedContext, setSelectedContext] = useState<string | null>(null);
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);
  const [customSignal, setCustomSignal] = useState('');
  
  const baselineProbability = 30;
  const scenarios = generateMorningScenarios(baselineProbability);

  // Context scenarios data
  const contextScenarios = [
    {
      id: 'A',
      title: 'Scenario A—Weather + Long Meeting',
      contextSections: [
        { label: 'Sleep', content: 'Alex only slept 6.1 hours (significantly less than the 7.5-hour baseline)' },
        { label: 'Calendar', content: 'Long 3-hour workshop scheduled' },
        { label: 'Weather', content: 'Rain is expected this afternoon' }
      ],
      aiResponse: 'Good morning! I pulled in your context for today... Based on patterns like these, I\'m forecasting ~6,500 steps today. Let\'s set today\'s Comfort Zone together—what range feels realistic?',
      predictedSteps: 6500,
      predictedSleep: 6.5
    },
    {
      id: 'B',
      title: 'Scenario B—Sunny Day + Open Afternoon',
      contextSections: [
        { label: 'Sleep', content: 'Alex slept well at 7.8 hours' },
        { label: 'Calendar', content: 'Calendar is light—only one 30-minute meeting' },
        { label: 'Weather', content: 'Weather is sunny' }
      ],
      aiResponse: 'Good morning! Today looks pretty open... Given this, I\'m forecasting ~8,900 steps. Where would you like your Comfort Zone to be today?',
      predictedSteps: 8900,
      predictedSleep: 7.5
    },
    {
      id: 'C',
      title: 'Scenario C—Heavy Stress + Poor Sleep',
      contextSections: [
        { label: 'Sleep', content: 'Alex had a rough night (4.94 hours of sleep)' },
        { label: 'Mood', content: 'Tagged mood as "Stressed"' },
        { label: 'Calendar', content: 'Difficult morning presentation is on the schedule' }
      ],
      aiResponse: 'Good morning. I see you slept less than usual and have an important morning presentation... I\'m forecasting ~4,700 steps. Let\'s set a gentle Comfort Zone for today.',
      predictedSteps: 4700,
      predictedSleep: 7.0
    },
    {
      id: 'D',
      title: 'Scenario D — Weekend + Lots of Errands',
      contextSections: [
        { label: 'Day Type', content: 'It\'s Saturday' },
        { label: 'Sleep', content: 'Alex slept 8.3 hours' },
        { label: 'Plans', content: 'Grocery trip and park outing planned (common high-activity weekend items)' }
      ],
      aiResponse: 'Happy Saturday! It looks like a more active day... Based on your past weekends, I forecast ~10,500 steps. Where would you like your Comfort Zone today?',
      predictedSteps: 10500,
      predictedSleep: 8.0
    }
  ];

  // Signal prompts for "Signals you're noticing today"
  const signalPrompts = [
    'Slept well',
    'Feeling tired',
    'Stressed',
    'Energized',
    'Busy schedule',
    'Light day ahead',
    'Weather looks good',
    'Not feeling well',
    'Motivated',
    'Low energy'
  ];

  const handleSignalToggle = (signal: string) => {
    setSelectedSignals(prev =>
      prev.includes(signal)
        ? prev.filter(s => s !== signal)
        : [...prev, signal]
    );
  };

  const handleAddCustomSignal = () => {
    if (customSignal.trim() && !selectedSignals.includes(customSignal.trim())) {
      setSelectedSignals(prev => [...prev, customSignal.trim()]);
      setCustomSignal('');
    }
  };

  const handleContextSelect = (scenarioId: string) => {
    setSelectedContext(scenarioId);
    
    // Save scenario selection to parent component
    if (setScenario) {
      setScenario(scenarioId);
    }
    
    const scenario = contextScenarios.find(s => s.id === scenarioId);
    if (scenario) {
      // Update comfort zones based on selected scenario
      setComfortZones({
        steps: [Math.max(3000, scenario.predictedSteps - 1500), Math.min(15000, scenario.predictedSteps + 1500)],
        sleep: [Math.max(5, scenario.predictedSleep - 0.5), Math.min(10, scenario.predictedSleep + 0.5)]
      });
    }
  };

  const handleComfortZoneChange = (metric: string, values: number[]) => {
    setComfortZones({ ...comfortZones, [metric]: [values[0], values[1]] });
  };

  const handleLockIn = () => {
    // Save all comfort zones as forecasts
    Object.entries(comfortZones).forEach(([metric, [min, max]]) => {
      const midpoint = (min + max) / 2;
      onSaveForecast(metric, midpoint);
    });
    setLocked(true);
    
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Navigate to dashboard after a brief moment
    setTimeout(() => {
      setLocked(false);
      if (onLockIn) {
        onLockIn();
      }
    }, 1500);
  };

  const addCustomTag = () => {
    if (customTag.trim()) {
      const newTag: ContextTag = {
        id: Date.now().toString(),
        label: customTag,
        icon: '✨',
        type: 'custom'
      };
      setContextTags([...contextTags, newTag]);
      setCustomTag('');
    }
  };

  const removeTag = (id: string) => {
    setContextTags(contextTags.filter(tag => tag.id !== id));
  };

  const stepsForecast = forecasts.find(f => f.metric === 'steps');
  const sleepForecast = forecasts.find(f => f.metric === 'sleep');

  // Calculate weekly goal progress
  const calculateWeeklyProgress = (goal: Goal) => {
    if (goal.type === 'sleep') {
      const weekTotal = weekData.reduce((sum, day) => sum + day.sleep, 0);
      return { current: weekTotal, target: goal.weeklyTarget, unit: 'hours' };
    } else if (goal.type === 'steps') {
      const daysOver8k = weekData.filter(day => day.steps >= 8000).length;
      return { current: daysOver8k, target: 4, unit: 'days' }; // Assuming 4 days target
    }
    return { current: 0, target: goal.weeklyTarget, unit: goal.unit };
  };

  const stepsGoal = goals.find(g => g.type === 'steps');
  const sleepGoal = goals.find(g => g.type === 'sleep');
  
  const stepsProgress = stepsGoal ? calculateWeeklyProgress(stepsGoal) : null;
  const sleepProgress = sleepGoal ? calculateWeeklyProgress(sleepGoal) : null;

  // Initialize comfort zones if not set
  if (stepsForecast && !comfortZones.steps) {
    const predicted = stepsForecast.predicted;
    setComfortZones({
      ...comfortZones,
      steps: [Math.max(3000, predicted - 1500), Math.min(15000, predicted + 1500)]
    });
  }
  if (sleepForecast && !comfortZones.sleep) {
    const predicted = sleepForecast.predicted;
    setComfortZones({
      ...comfortZones,
      sleep: [Math.max(5, predicted - 0.5), Math.min(10, predicted + 0.5)]
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg">
          <Sunrise className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2>Morning Wager</h2>
          <p className="text-muted-foreground">Let's collaboratively set today's intentions</p>
        </div>
      </div>

      {/* Context Scenario Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          <h3>Today's Context - Select Your Scenario</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {contextScenarios.map((scenario) => (
            <Card
              key={scenario.id}
              className={`p-4 cursor-pointer transition-all ${
                selectedContext === scenario.id
                  ? 'border-2 border-orange-500 bg-orange-50 dark:bg-orange-950/50 shadow-md'
                  : 'border-2 border-transparent hover:border-orange-200 dark:hover:border-orange-800'
              }`}
              onClick={() => handleContextSelect(scenario.id)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4 className="text-sm">{scenario.title}</h4>
                </div>
                {selectedContext === scenario.id && (
                  <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse shrink-0 mt-1"></div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {!selectedContext && (
          <p className="text-sm text-muted-foreground italic text-center">
            👆 Select a scenario to see Kriya's personalized forecast
          </p>
        )}
      </div>

      {/* Selected Context Details - Show before Kriya Says */}
      {selectedContext && (() => {
        const scenario = contextScenarios.find(s => s.id === selectedContext);
        return scenario ? (
          <div className="space-y-3">
            <h4 className="text-sm text-gray-700 dark:text-gray-300">Here's the context:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {scenario.contextSections.map((section, index) => (
                <Card key={index} className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {section.label === 'Sleep' && <Moon className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                      {section.label === 'Calendar' && <CalendarDays className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                      {section.label === 'Weather' && <CloudRain className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                      {section.label === 'Mood' && <Heart className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                      {section.label === 'Day Type' && <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                      {section.label === 'Plans' && <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                      <h5 className="text-xs text-blue-900 dark:text-blue-100">{section.label}</h5>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {section.content}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : null;
      })()}

      {/* Kriya Says Section - Only show when scenario selected - HIGHLIGHTED */}
      {selectedContext && (() => {
        const scenario = contextScenarios.find(s => s.id === selectedContext);
        return scenario ? (
          <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-2 border-emerald-400 dark:border-emerald-600 shadow-lg ring-4 ring-emerald-100 dark:ring-emerald-900/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
                <Heart className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-base text-emerald-900 dark:text-emerald-100">Kriya Says:</h4>
                </div>
                <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  {scenario.aiResponse}
                </p>
              </div>
            </div>
          </Card>
        ) : null;
      })()}

      {/* Signals You're Noticing Today - Only show when scenario selected */}
      {selectedContext && (
        <Card className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-300 dark:border-amber-700">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-600" />
              <h4 className="text-sm">Signals you're noticing today</h4>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {signalPrompts.map((signal) => (
                <Badge
                  key={signal}
                  variant={selectedSignals.includes(signal) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedSignals.includes(signal)
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'hover:bg-amber-100 dark:hover:bg-amber-900'
                  }`}
                  onClick={() => handleSignalToggle(signal)}
                >
                  {signal}
                </Badge>
              ))}
              
              {/* Display custom signals */}
              {selectedSignals
                .filter(signal => !signalPrompts.includes(signal))
                .map((signal) => (
                  <Badge
                    key={signal}
                    variant="default"
                    className="bg-amber-600 hover:bg-amber-700 text-white cursor-pointer"
                    onClick={() => handleSignalToggle(signal)}
                  >
                    {signal}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
            </div>

            {/* Add custom signal input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add your own signal..."
                value={customSignal}
                onChange={(e) => setCustomSignal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddCustomSignal();
                  }
                }}
                className="flex-1 px-3 py-2 text-sm border border-amber-300 dark:border-amber-700 rounded-md bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Button
                onClick={handleAddCustomSignal}
                size="sm"
                className="bg-amber-600 hover:bg-amber-700"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Only show the rest if a scenario is selected */}
      {selectedContext && (
        <>
          {/* Weekly Goals Progress */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-green-600" />
              <h3>Weekly Goals Progress</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stepsProgress && stepsGoal && (
                <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm">Steps Goal</h4>
                        <p className="text-xs text-muted-foreground">{stepsGoal.description}</p>
                      </div>
                      {stepsProgress.current >= stepsProgress.target && (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-2xl">{stepsProgress.current}</span>
                        <span className="text-muted-foreground">/ {stepsProgress.target} {stepsProgress.unit}</span>
                      </div>
                      <Progress 
                        value={(stepsProgress.current / stepsProgress.target) * 100} 
                        className="h-2"
                      />
                    </div>
                    {stepsForecast && comfortZones.steps && (
                      <div className="bg-white/50 dark:bg-gray-900/50 p-3 rounded-lg">
                        <p className="text-sm">
                          {comfortZones.steps[1] >= 8000 ? (
                            <span className="text-green-700 dark:text-green-400">
                              ✓ Today's plan aims for 8,000+ steps!
                            </span>
                          ) : stepsProgress.current >= stepsProgress.target ? (
                            <span className="text-blue-700 dark:text-blue-400">
                              🎉 You've already hit your weekly goal! Feel free to ease up or push forward.
                            </span>
                          ) : (
                            <span className="text-amber-700 dark:text-amber-400">
                              💡 Consider pushing toward 8,000 steps to stay on track for your weekly goal
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              )}
              
              {sleepProgress && sleepGoal && (
                <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm">Sleep Goal</h4>
                        <p className="text-xs text-muted-foreground">{sleepGoal.description}</p>
                      </div>
                      {sleepProgress.current >= sleepProgress.target && (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-2xl">{sleepProgress.current.toFixed(1)}</span>
                        <span className="text-muted-foreground">/ {sleepProgress.target} {sleepProgress.unit}</span>
                      </div>
                      <Progress 
                        value={(sleepProgress.current / sleepProgress.target) * 100} 
                        className="h-2"
                      />
                    </div>
                    {sleepForecast && comfortZones.sleep && (
                      <div className="bg-white/50 dark:bg-gray-900/50 p-3 rounded-lg">
                        <p className="text-sm">
                          {sleepProgress.current >= sleepProgress.target ? (
                            <span className="text-green-700 dark:text-green-400">
                              🌟 You're on track! Tonight's rest will add to your healthy sleep pattern.
                            </span>
                          ) : (
                            <span className="text-purple-700 dark:text-purple-400">
                              💤 Good sleep tonight helps build toward your {sleepGoal.weeklyTarget}-hour weekly goal
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Steps Forecast with Comfort Zone */}
          {stepsForecast && comfortZones.steps && (
            <Card className="p-6">
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3>Steps - Set Your Comfort Zone</h3>
                    <p className="text-muted-foreground">Define a range you feel good about today</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <p className="text-muted-foreground mb-2">Kriya Baseline Prediction</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl">
                      {selectedContext 
                        ? contextScenarios.find(s => s.id === selectedContext)?.predictedSteps.toLocaleString()
                        : stepsForecast.predicted.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">steps</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Based on your patterns and today's context
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Quick Select Options */}
                  <div className="space-y-2">
                    <span className="text-sm">Quick Select Your Comfort Zone:</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Card 
                        className={`p-4 cursor-pointer transition-all border-2 ${
                          comfortZones.steps[0] === Math.floor(contextScenarios.find(s => s.id === selectedContext)!.predictedSteps * 0.7) && 
                          comfortZones.steps[1] === Math.floor(contextScenarios.find(s => s.id === selectedContext)!.predictedSteps * 0.9)
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                            : 'border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700'
                        }`}
                        onClick={() => {
                          const predicted = contextScenarios.find(s => s.id === selectedContext)!.predictedSteps;
                          handleComfortZoneChange('steps', [Math.floor(predicted * 0.7), Math.floor(predicted * 0.9)]);
                        }}
                      >
                        <div className="text-center space-y-1">
                          <h5 className="text-sm">Gentle</h5>
                          <p className="text-xs text-muted-foreground">
                            {Math.floor(contextScenarios.find(s => s.id === selectedContext)!.predictedSteps * 0.7).toLocaleString()} - {Math.floor(contextScenarios.find(s => s.id === selectedContext)!.predictedSteps * 0.9).toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">Low pressure day</p>
                        </div>
                      </Card>
                      
                      <Card 
                        className={`p-4 cursor-pointer transition-all border-2 ${
                          comfortZones.steps[0] === Math.floor(contextScenarios.find(s => s.id === selectedContext)!.predictedSteps * 0.85) && 
                          comfortZones.steps[1] === Math.floor(contextScenarios.find(s => s.id === selectedContext)!.predictedSteps * 1.15)
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                            : 'border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700'
                        }`}
                        onClick={() => {
                          const predicted = contextScenarios.find(s => s.id === selectedContext)!.predictedSteps;
                          handleComfortZoneChange('steps', [Math.floor(predicted * 0.85), Math.floor(predicted * 1.15)]);
                        }}
                      >
                        <div className="text-center space-y-1">
                          <h5 className="text-sm">Moderate</h5>
                          <p className="text-xs text-muted-foreground">
                            {Math.floor(contextScenarios.find(s => s.id === selectedContext)!.predictedSteps * 0.85).toLocaleString()} - {Math.floor(contextScenarios.find(s => s.id === selectedContext)!.predictedSteps * 1.15).toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">Balanced approach</p>
                        </div>
                      </Card>
                      
                      <Card 
                        className={`p-4 cursor-pointer transition-all border-2 ${
                          comfortZones.steps[0] === Math.floor(contextScenarios.find(s => s.id === selectedContext)!.predictedSteps * 1.0) && 
                          comfortZones.steps[1] === Math.floor(contextScenarios.find(s => s.id === selectedContext)!.predictedSteps * 1.3)
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                            : 'border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700'
                        }`}
                        onClick={() => {
                          const predicted = contextScenarios.find(s => s.id === selectedContext)!.predictedSteps;
                          handleComfortZoneChange('steps', [Math.floor(predicted * 1.0), Math.floor(predicted * 1.3)]);
                        }}
                      >
                        <div className="text-center space-y-1">
                          <h5 className="text-sm">Ambitious</h5>
                          <p className="text-xs text-muted-foreground">
                            {Math.floor(contextScenarios.find(s => s.id === selectedContext)!.predictedSteps * 1.0).toLocaleString()} - {Math.floor(contextScenarios.find(s => s.id === selectedContext)!.predictedSteps * 1.3).toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">Stretch goal</p>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Custom Slider */}
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-sm">Or customize your range:</span>
                      <span className="text-blue-600 dark:text-blue-400">
                        {comfortZones.steps[0].toLocaleString()} - {comfortZones.steps[1].toLocaleString()} steps
                      </span>
                    </div>
                    <Slider
                      value={comfortZones.steps}
                      onValueChange={(values) => handleComfortZoneChange('steps', values)}
                      min={3000}
                      max={15000}
                      step={500}
                      minStepsBetweenThumbs={1000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>3,000</span>
                      <span>15,000</span>
                    </div>
                  </div>

                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">
                      💡 This range gives you flexibility while staying accountable to your intentions
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Sleep Forecast with Comfort Zone */}
          {sleepForecast && comfortZones.sleep && (
            <Card className="p-6">
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3>Sleep - Tonight's Comfort Zone</h3>
                    <p className="text-muted-foreground">What feels achievable for tonight?</p>
                  </div>
                  <Heart className="w-5 h-5 text-purple-500" />
                </div>

                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                  <p className="text-muted-foreground mb-2">Kriya Baseline Prediction</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl">{sleepForecast.predicted.toFixed(1)}</span>
                    <span className="text-muted-foreground">hours</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your typical duration this week
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Quick Select Options for Sleep */}
                  <div className="space-y-2">
                    <span className="text-sm">Quick Select Your Comfort Zone:</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Card 
                        className={`p-4 cursor-pointer transition-all border-2 ${
                          comfortZones.sleep[0] === 6.0 && comfortZones.sleep[1] === 7.0
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-950' 
                            : 'border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700'
                        }`}
                        onClick={() => handleComfortZoneChange('sleep', [6.0, 7.0])}
                      >
                        <div className="text-center space-y-1">
                          <h5 className="text-sm">Gentle</h5>
                          <p className="text-xs text-muted-foreground">6.0 - 7.0 hours</p>
                          <p className="text-xs text-muted-foreground">Rest when you can</p>
                        </div>
                      </Card>
                      
                      <Card 
                        className={`p-4 cursor-pointer transition-all border-2 ${
                          comfortZones.sleep[0] === 7.0 && comfortZones.sleep[1] === 8.0
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-950' 
                            : 'border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700'
                        }`}
                        onClick={() => handleComfortZoneChange('sleep', [7.0, 8.0])}
                      >
                        <div className="text-center space-y-1">
                          <h5 className="text-sm">Moderate</h5>
                          <p className="text-xs text-muted-foreground">7.0 - 8.0 hours</p>
                          <p className="text-xs text-muted-foreground">Healthy baseline</p>
                        </div>
                      </Card>
                      
                      <Card 
                        className={`p-4 cursor-pointer transition-all border-2 ${
                          comfortZones.sleep[0] === 8.0 && comfortZones.sleep[1] === 9.0
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-950' 
                            : 'border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700'
                        }`}
                        onClick={() => handleComfortZoneChange('sleep', [8.0, 9.0])}
                      >
                        <div className="text-center space-y-1">
                          <h5 className="text-sm">Ambitious</h5>
                          <p className="text-xs text-muted-foreground">8.0 - 9.0 hours</p>
                          <p className="text-xs text-muted-foreground">Prioritizing rest</p>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Custom Slider */}
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-sm">Or customize your range:</span>
                      <span className="text-purple-600 dark:text-purple-400">
                        {comfortZones.sleep[0].toFixed(1)} - {comfortZones.sleep[1].toFixed(1)} hours
                      </span>
                    </div>
                    <Slider
                      value={comfortZones.sleep}
                      onValueChange={(values) => handleComfortZoneChange('sleep', values)}
                      min={5}
                      max={10}
                      step={0.5}
                      minStepsBetweenThumbs={0.5}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>5h</span>
                      <span>10h</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Lock In Button */}
          <Button 
            onClick={handleLockIn} 
            className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            disabled={locked}
          >
            {locked ? (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Day Started! ✨
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Lock In Today's Plan
              </>
            )}
          </Button>

          {locked && (
            <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800 animate-in fade-in slide-in-from-bottom-2">
              <p className="text-center">
                🌟 Your intentions are set! Remember, this is a compassionate experiment, not a rigid contract.
              </p>
            </Card>
          )}

          <Card className="p-4 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
            <p className="italic text-center">
              💫 Comfort zones are learning spaces, not performance metrics
            </p>
          </Card>
        </>
      )}
    </div>
  );
}