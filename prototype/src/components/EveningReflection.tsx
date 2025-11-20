import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { Sunset, TrendingUp, TrendingDown, Sparkles, Search, Lightbulb, Target, Heart, Lock, Sunrise, Calendar, PieChart } from 'lucide-react';
import { DailyForecast, AttributionCause, WhatIfScenario } from '../types/health';
import { calculateCalibrationScore, calculateSurpriseIndex, generateWhatIfScenarios, generateEveningScenarios } from '../lib/mockData';

interface EveningReflectionProps {
  forecasts: DailyForecast[];
  onSaveReflection: (notes: string, mood: string) => void;
  morningScenario?: string; // The scenario selected in the morning (A, B, C, or D)
}

type ReflectionStage = 'reveal' | 'detective' | 'whatif' | 'complete';

export function EveningReflection({ forecasts, onSaveReflection, morningScenario }: EveningReflectionProps) {
  const [stage, setStage] = useState<ReflectionStage>('reveal');
  const [reflectionNotes, setReflectionNotes] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [attributions, setAttributions] = useState<AttributionCause[]>([
    { id: '1', label: 'Late meeting', selected: false },
    { id: '2', label: 'Heavy rain / bad weather', selected: false },
    { id: '3', label: 'Less than 6h sleep last night', selected: false },
    { id: '4', label: 'Feeling stressed or anxious', selected: false },
    { id: '5', label: 'Unexpected schedule change', selected: false },
  ]);
  const [customCause, setCustomCause] = useState('');
  const [gracePointUsed, setGracePointUsed] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<WhatIfScenario | null>(null);

  const moods = ['🌟 Great', '😊 Good', '😐 Okay', '😔 Tough', '💪 Resilient'];

  const toggleAttribution = (id: string) => {
    setAttributions(attributions.map(attr => 
      attr.id === id ? { ...attr, selected: !attr.selected } : attr
    ));
  };

  const addCustomCause = () => {
    if (customCause.trim()) {
      const newCause: AttributionCause = {
        id: Date.now().toString(),
        label: customCause,
        selected: true,
        userInput: customCause
      };
      setAttributions([...attributions, newCause]);
      setCustomCause('');
    }
  };

  const handleContinueToWhatIf = () => {
    setStage('whatif');
  };

  const handleSubmitReflection = () => {
    // Just save the reflection, don't navigate
    onSaveReflection(reflectionNotes, selectedMood);
    setStage('complete');
  };

  // Calculate metrics for primary forecast (steps)
  const stepsForecast = forecasts.find(f => f.metric === 'steps');
  const predicted = stepsForecast?.userAdjusted || stepsForecast?.predicted || 6500;
  const actual = stepsForecast?.actual || 4510;
  const surprise = stepsForecast ? calculateSurpriseIndex(predicted, actual) : 0;
  const calibration = stepsForecast ? calculateCalibrationScore(predicted, actual) : 0;
  const difference = actual - predicted;
  const isHighSurprise = Math.abs(difference) > predicted * 0.2; // 20% deviation

  // Generate scenarios
  const baselineProbability = 30;
  const scenarios = generateWhatIfScenarios('steps', baselineProbability);

  // Evening scenarios that correspond to morning scenarios
  const eveningScenarios = [
    {
      id: 'A',
      title: 'Scenario A—Underperforming + Rain + Late Meeting',
      context: 'Comfort Zone: 5,800–7,200. Actual: 4,510.',
      aiResponse: 'That\'s a High Surprise (+75). Let\'s explore what might have caused today\'s dip: Your workshop ran 90 minutes late; Heavy rain started at 3 PM... Which of these do you think played the biggest role?',
      comfortZone: [5800, 7200],
      actual: 4510,
      surpriseLevel: 75,
      causes: [
        { label: 'Workshop ran long', weight: 40, detail: 'Blocked your usual afternoon walk' },
        { label: 'Heavy rain', weight: 25, detail: 'Cuts outdoor movement by 1.2k steps for you' },
        { label: 'Low sleep carryover', weight: 10, detail: 'Energy dips after <6h nights' },
        { label: 'Other factors', weight: 25, detail: 'Use Detective Mode to tag what fits' },
      ],
    },
    {
      id: 'B',
      title: 'Scenario B—Overperforming + Sunshine + Errands',
      context: 'Comfort Zone: 7,000–8,500. Actual: 11,230.',
      aiResponse: 'That\'s a Positive Surprise! (+65) Your movement was higher than expected. Possible reasons: You walked to multiple errands; Sunny weather encouraged extra activity... Which factor feels most true for your day?',
      comfortZone: [7000, 8500],
      actual: 11230,
      surpriseLevel: 65,
      causes: [
        { label: 'Errand chaining', weight: 30, detail: 'Three stops = +2k incidental steps' },
        { label: 'Sunny weather', weight: 20, detail: 'You average 15% more movement on clear days' },
        { label: 'Open afternoon', weight: 25, detail: 'Calendar gaps invite spontaneous walks' },
        { label: 'Mood boost', weight: 25, detail: 'Tagged “energized” this morning' },
      ],
    },
    {
      id: 'C',
      title: 'Scenario C—Flat Activity + Stress + No Outdoor Time',
      context: 'Comfort Zone: 6,000–7,000. Actual: 3,220.',
      aiResponse: 'That\'s a Moderate Surprise (+40). Possible causes: You tagged \'Stress\' in the afternoon; Calendar shows 5 straight hours of desk work... What feels like the X-Factor today?',
      comfortZone: [6000, 7000],
      actual: 3220,
      surpriseLevel: 40,
      causes: [
        { label: 'Desk marathon', weight: 35, detail: '5h seated block removes your walking loop' },
        { label: 'Stress flag', weight: 25, detail: 'Stress days = slower pace + fewer breaks' },
        { label: 'Skipped outdoor time', weight: 20, detail: 'You usually log 1k steps outside' },
        { label: 'Other context', weight: 20, detail: 'Add notes so I can learn what shifted' },
      ],
    },
    {
      id: 'D',
      title: 'Scenario D—Great Sleep but Low Steps',
      context: 'Comfort Zone: 7,500–8,500. Actual: 5,120.',
      aiResponse: 'Interesting—this is a Curious Surprise (+55). Even though you slept well, your activity was lower... Patterns like these often happen when: You work from home all day; You take long calls without moving... Which resonates most with your experience today?',
      comfortZone: [7500, 8500],
      actual: 5120,
      surpriseLevel: 55,
      causes: [
        { label: 'WFH flow', weight: 35, detail: 'Home days average 2k fewer steps' },
        { label: 'Long calls', weight: 20, detail: 'Two 60-min calls overlap movement windows' },
        { label: 'Weekend comedown', weight: 15, detail: 'After active days you often reset lower' },
        { label: 'Other signals', weight: 30, detail: 'Layer your own explanation below' },
      ],
    }
  ];

  // Get the evening scenario that matches the morning scenario
  const matchedEveningScenario = morningScenario 
    ? eveningScenarios.find(s => s.id === morningScenario)
    : eveningScenarios[0]; // Default to Scenario A if no morning scenario selected

  // Act II: Outcome Reveal & Detective Mode
  if (stage === 'reveal' || stage === 'detective') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
            <Sunset className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2>Evening Debrief</h2>
            <p className="text-muted-foreground">
              {stage === 'reveal' ? 'How did today unfold?' : 'Detective Mode - What caused today\'s outcome?'}
            </p>
          </div>
        </div>

        {/* Outcome Reveal */}
        {stage === 'reveal' && (
          <>
            {/* Morning Prediction Recap */}
            <Card className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sunrise className="w-5 h-5 text-amber-600" />
                  <h3>This Morning's Prediction</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {forecasts.map((forecast) => (
                    <div key={forecast.metric} className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1 capitalize">{forecast.metric}</p>
                      <p className="text-2xl">{forecast.metric === 'sleep' 
                        ? `${(forecast.userAdjusted || forecast.predicted).toFixed(1)}h` 
                        : `${(forecast.userAdjusted || forecast.predicted).toLocaleString()}`}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Your comfort zone midpoint</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic text-center pt-2">
                  Now let's see how the day unfolded...
                </p>
              </div>
            </Card>

            <Card className="p-6 border-2 border-purple-200 dark:border-purple-800">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3>Steps Today</h3>
                  {isHighSurprise && (
                    <Badge className="bg-amber-500 text-white">
                      <Sparkles className="w-3 h-3 mr-1" />
                      High Surprise
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-muted-foreground mb-1">Your Comfort Zone</p>
                    <p className="text-2xl">{predicted.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground mt-1">midpoint</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 p-4 rounded-lg">
                    <p className="text-muted-foreground mb-1">Actual</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl">{actual.toLocaleString()}</p>
                      {difference < 0 && <TrendingDown className="w-5 h-5 text-amber-600" />}
                    </div>
                    <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                      {Math.abs(difference).toLocaleString()} below target
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 p-4 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Unexpectedness Score</span>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full">
                        +{Math.round((surprise / predicted) * 100)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-purple-200 dark:border-purple-800">
                    <p className="italic text-center">
                      {isHighSurprise 
                        ? "😲 Not a failure — a learning moment! Let's understand what happened."
                        : "🎯 Close to your comfort zone. Still worth exploring the 'why'!"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Evening Scenario Display */}
            {matchedEveningScenario && (
              <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-indigo-200 dark:border-indigo-800">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <h4>{matchedEveningScenario.title}</h4>
                  </div>
                  
                  {/* Context Display */}
                  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Context:</strong> {matchedEveningScenario.context}
                    </p>
                  </div>
                  
                  {/* AI Response Box */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-200 dark:border-green-800 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
                        <Heart className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm mb-2">Kriya Says:</h5>
                        <p className="text-sm leading-relaxed">
                          {matchedEveningScenario.aiResponse}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {matchedEveningScenario?.causes && (
              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-purple-600" />
                  <h4 className="text-sm uppercase tracking-wide text-muted-foreground">
                    Surprise breakdown
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Kriya weighed today&apos;s context to guess what nudged your steps. Use this as a starting hypothesis.
                </p>
                <div className="space-y-3">
                  {matchedEveningScenario.causes.map((cause) => (
                    <div key={cause.label}>
                      <div className="flex items-center justify-between text-sm">
                        <span>{cause.label}</span>
                        <span className="text-muted-foreground">{cause.weight}%</span>
                      </div>
                      <Progress value={cause.weight} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">{cause.detail}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Not seeing your reason? Tag it in Detective Mode so future explanations feel more tailored.
                </p>
              </Card>
            )}

            <Button 
              onClick={() => {
                setStage('detective');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
            >
              <Search className="w-5 h-5 mr-2" />
              Enter Detective Mode
            </Button>
          </>
        )}

        {/* Detective Mode */}
        {stage === 'detective' && (
          <>
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 border-purple-200 dark:border-purple-800">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h3>What likely influenced today's outcome?</h3>
                </div>
                <p className="text-muted-foreground">
                  Select all that apply. This helps Kriya understand patterns over time.
                </p>

                <div className="space-y-3">
                  {attributions.map(attr => (
                    <div key={attr.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
                      <Checkbox 
                        id={attr.id}
                        checked={attr.selected}
                        onCheckedChange={() => toggleAttribution(attr.id)}
                      />
                      <label htmlFor={attr.id} className="flex-1 cursor-pointer">
                        {attr.label}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Add your own cause..."
                    value={customCause}
                    onChange={(e) => setCustomCause(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCustomCause()}
                    className="flex-1 px-3 py-2 rounded-md border bg-background"
                  />
                  <Button variant="outline" onClick={addCustomCause}>
                    Add
                  </Button>
                </div>
              </div>
            </Card>

            {/* Mood Check */}
            <Card className="p-6">
              <div className="space-y-4">
                <h4>How are you feeling about today?</h4>
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
            </Card>

            {/* Grace Point */}
            <Card className="p-5 border-2 border-green-200 dark:border-green-800">
              <div className="flex items-start gap-4">
                <Heart className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" />
                <div className="flex-1">
                  <h4>Add Grace Point for Today</h4>
                  <p className="text-muted-foreground mt-1">
                    Sometimes life happens. Give yourself compassion and move forward with curiosity.
                  </p>
                  <Button
                    variant={gracePointUsed ? 'default' : 'outline'}
                    className="mt-3"
                    onClick={() => setGracePointUsed(!gracePointUsed)}
                  >
                    {gracePointUsed ? '✓ Grace Point Added' : 'Add Grace Point'}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Notes */}
            <Card className="p-6">
              <div className="space-y-3">
                <label>Additional Reflections (optional)</label>
                <Textarea
                  placeholder="Any other thoughts about today? Patterns you noticed?"
                  value={reflectionNotes}
                  onChange={(e) => setReflectionNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </Card>

            <Button 
              onClick={handleSubmitReflection}
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Submit
            </Button>
          </>
        )}
      </div>
    );
  }

  // Act III: What-If Planning
  if (stage === 'whatif') {
    const selectedCauses = attributions.filter(a => a.selected);
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2>What-If Plan</h2>
            <p className="text-muted-foreground">Let's create tomorrow's success conditions</p>
          </div>
        </div>

        {/* AI Causal Link */}
        <Card className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
          <div className="space-y-3">
            <h4>Kriya's Analysis</h4>
            <p className="text-muted-foreground">
              {selectedCauses.length > 0 
                ? `Based on your selected causes (${selectedCauses.map(c => c.label).join(', ')}), tomorrow may have similar challenges. Let's plan proactively.`
                : "Let's explore what could help tomorrow go smoothly."
              }
            </p>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span>Baseline probability of hitting goal</span>
                <Badge variant="outline" className="text-lg">
                  {baselineProbability}%
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Scenario Cards */}
        <div className="space-y-4">
          <h4>Choose a Light Challenge for Tomorrow</h4>
          
          {scenarios.map((scenario) => {
            const newProbability = baselineProbability + scenario.probabilityIncrease;
            const isSelected = selectedScenario?.id === scenario.id;
            
            return (
              <Card 
                key={scenario.id}
                className={`p-5 cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-2 border-blue-500 bg-blue-50 dark:bg-blue-950' 
                    : 'hover:border-blue-300 dark:hover:border-blue-700'
                }`}
                onClick={() => setSelectedScenario(scenario)}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4>{scenario.title}</h4>
                        <Badge variant={scenario.effortLevel === 'light' ? 'secondary' : 'outline'}>
                          {scenario.effortLevel}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-1">{scenario.description}</p>
                    </div>
                    {isSelected && (
                      <Target className="w-5 h-5 text-blue-600" />
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span>Success probability</span>
                      <span className="text-green-600 dark:text-green-400">
                        {newProbability}% <span className="text-sm">(+{scenario.probabilityIncrease}%)</span>
                      </span>
                    </div>
                    {scenario.sleepImpact && scenario.sleepImpact !== 'none' && (
                      <div className="flex items-center gap-2 text-sm">
                        <Heart className="w-4 h-4" />
                        <span>
                          {scenario.sleepImpact === 'positive' 
                            ? 'May also improve sleep quality' 
                            : 'Minimal sleep impact'
                          }
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>📋 Action:</span>
                    <span className="italic">{scenario.action}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Lock In or Skip */}
        <div className="space-y-3">
          <Button 
            onClick={handleLockInScenario}
            disabled={!selectedScenario}
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white disabled:opacity-50"
          >
            <Lock className="w-5 h-5 mr-2" />
            {selectedScenario 
              ? `Lock In: ${selectedScenario.title}` 
              : 'Select a scenario to continue'
            }
          </Button>
          
          <Button 
            onClick={() => setStage('complete')}
            variant="ghost"
            className="w-full"
          >
            Maybe Later
          </Button>
        </div>

        <Card className="p-4 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
          <p className="text-center italic">
            💡 These are gentle experiments, not obligations. Choose what feels right for you.
          </p>
        </Card>
      </div>
    );
  }

  // Complete Stage
  return (
    <div className="space-y-6 flex items-center justify-center min-h-[60vh]">
      <Card className="p-10 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950 border-2 border-green-300 dark:border-green-700 text-center max-w-2xl mx-auto shadow-lg">
        <div className="space-y-6">
          <div className="inline-block p-5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          
          <div className="space-y-3">
            <h2>✨ Reflection Complete ✨</h2>
            <p className="text-muted-foreground text-lg">
              Thank you for taking time to reflect on today
            </p>
          </div>
          
          {gracePointUsed && (
            <div className="inline-block">
              <Badge className="bg-green-600 text-white px-4 py-2 text-sm">
                <Heart className="w-4 h-4 mr-2" />
                Grace Point Added — You showed yourself compassion
              </Badge>
            </div>
          )}
          
          <div className="py-4">
            <div className="h-px bg-gradient-to-r from-transparent via-green-300 to-transparent dark:via-green-700" />
          </div>
          
          <div className="space-y-3">
            <p className="text-lg italic text-green-700 dark:text-green-300">
              "Today's surprises became tomorrow's wisdom 🌙"
            </p>
          </div>

          <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-900 border-blue-200 dark:border-blue-700 mt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h4>Ready to plan tomorrow?</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Navigate to the <strong className="text-blue-600 dark:text-blue-400">Plan</strong> tab above to set up tomorrow's What-If scenarios and boost your success probability
              </p>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
}