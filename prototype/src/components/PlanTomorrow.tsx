import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Lightbulb, Calendar, TrendingUp, ArrowRight, Lock, Heart, Sun, CheckCircle, Activity, Target, Zap } from 'lucide-react';
import { DailyForecast } from '../types/health';

interface PlanTomorrowProps {
  forecasts: DailyForecast[];
  morningScenario?: string;
  onNavigateToChat?: () => void;
}

interface PlanOption {
  id: string;
  action: string;
  newProbability: number;
  kriyaResponse: string;
}

interface PlanScenario {
  id: string;
  title: string;
  contextSections: { label: string; content: string }[];
  baselineProbability: number;
  options: PlanOption[];
  kriyaSays: string;
}

export function PlanTomorrow({ forecasts, morningScenario, onNavigateToChat }: PlanTomorrowProps) {
  const [selectedOption, setSelectedOption] = useState<PlanOption | null>(null);
  const [selectedPlanContext, setSelectedPlanContext] = useState<string | null>(null);

  // Plan Tomorrow scenarios that correspond to morning scenarios
  const planScenarios: PlanScenario[] = [
    {
      id: 'A',
      title: 'Scenario A—Evening Fatigue',
      contextSections: [
        { label: 'Current Status', content: 'Recent low energy affecting activity' },
        { label: 'Baseline Chance', content: '30% probability of hitting goal' },
        { label: 'Key Factor', content: 'Low energy patterns' }
      ],
      baselineProbability: 30,
      options: [
        { 
          id: 'A1', 
          action: '15-min lunch walk (~2,000 steps)', 
          newProbability: 65,
          kriyaResponse: 'A lunch walk is perfect for breaking up your day! It gets you moving when energy is naturally higher, plus the mental break can boost productivity. Even 15 minutes can add significant steps without feeling like a dedicated workout.'
        },
        { 
          id: 'A2', 
          action: '20-min home stretch', 
          newProbability: 85,
          kriyaResponse: 'Stretching is wonderful self-care! It releases tension, improves circulation, and can help you feel more energized. The best part? You can do it at home in comfortable clothes, making it a low-barrier option when energy is limited.'
        },
        { 
          id: 'A3', 
          action: 'Sleep +1 hour (better energy tomorrow)', 
          newProbability: 78,
          kriyaResponse: 'Prioritizing sleep is one of the most compassionate choices you can make! Extra rest helps your body recover and sets you up for better energy tomorrow. Remember, taking care of your sleep is taking care of your health goals.'
        },
      ],
      kriyaSays: 'Which of these feels doable for tomorrow?'
    },
    {
      id: 'B',
      title: 'Scenario B—Busy Day Tomorrow',
      contextSections: [
        { label: 'Current Status', content: 'Very busy day scheduled' },
        { label: 'Baseline Chance', content: '42% probability of hitting goal' },
        { label: 'Key Factor', content: 'Packed calendar tomorrow' }
      ],
      baselineProbability: 42,
      options: [
        { 
          id: 'B1', 
          action: 'Move meeting to standing desk', 
          newProbability: 60,
          kriyaResponse: 'Standing meetings are a clever way to integrate movement into your busy schedule! You\'re getting work done while being more active. It\'s not about dramatic change—it\'s about finding opportunities within your existing routine.'
        },
        { 
          id: 'B2', 
          action: 'Take stairs for 2–3 short moments (~400 steps)', 
          newProbability: 55,
          kriyaResponse: 'Taking the stairs a few times adds up without requiring a big time commitment! These micro-movements throughout the day are sustainable and don\'t disrupt your packed schedule. Every flight counts!'
        },
        { 
          id: 'B3', 
          action: 'Add 10-min walk after meeting (~1,300 steps)', 
          newProbability: 72,
          kriyaResponse: 'A post-meeting walk is a great transition ritual! It helps you mentally reset while adding meaningful movement. Ten minutes is enough to make a difference without feeling like it\'s eating into your busy day.'
        },
      ],
      kriyaSays: 'I can simulate any option—want to add your own idea too?'
    },
    {
      id: 'C',
      title: 'Scenario C—Heavy Stress + Poor Sleep',
      contextSections: [
        { label: 'Current Status', content: 'Low sleep (4.2 hours)' },
        { label: 'Baseline Chance', content: '25% probability of hitting goal' },
        { label: 'Key Factor', content: 'Sleep recovery needed' }
      ],
      baselineProbability: 25,
      options: [
        { 
          id: 'C1', 
          action: 'Sleep +1 hour (better recovery)', 
          newProbability: 48,
          kriyaResponse: 'After poor sleep, prioritizing recovery is the wisest choice! Your body needs rest to function well. This isn\'t giving up on your goals—it\'s setting yourself up for sustainable success. Sleep is a health metric too!'
        },
        { 
          id: 'C2', 
          action: '15-min afternoon walk (~2,000 steps)', 
          newProbability: 65,
          kriyaResponse: 'An afternoon walk can actually help when you\'re tired! Gentle movement boosts circulation and can give you a natural energy lift. Just keep it easy—this isn\'t about pushing through exhaustion, it\'s about supporting your body.'
        },
      ],
      kriyaSays: 'Would you like me to prioritize low-effort or high-impact tomorrow plans?'
    },
    {
      id: 'D',
      title: 'Scenario D — Low Sleep Risk',
      contextSections: [
        { label: 'Current Status', content: 'Very poor sleep last night (4.2 hours)' },
        { label: 'Baseline Chance', content: '25% probability of hitting goal' },
        { label: 'Key Factor', content: 'Critical recovery needed' }
      ],
      baselineProbability: 25,
      options: [
        { 
          id: 'D1', 
          action: 'Sleep +1 hour (better recovery)', 
          newProbability: 48,
          kriyaResponse: 'With such low sleep, getting more rest is critical! Your body is telling you it needs recovery. Honoring that need is an act of self-compassion. You\'ll be in a much better place to tackle your goals when you\'re rested.'
        },
        { 
          id: 'D2', 
          action: '5-min "wake-up mobility routine"', 
          newProbability: 39,
          kriyaResponse: 'A gentle wake-up routine can help ease your body into the day! Five minutes of easy movement gets your blood flowing without demanding too much when you\'re low on sleep. It\'s about working with your body, not against it.'
        },
        { 
          id: 'D3', 
          action: '15-min afternoon walk (~2,000 steps)', 
          newProbability: 65,
          kriyaResponse: 'An afternoon walk can be surprisingly helpful when you\'re sleep-deprived! The fresh air and gentle movement can provide a natural energy boost. Just remember to keep it light—you\'re supporting yourself, not pushing through exhaustion.'
        },
      ],
      kriyaSays: 'Would you like me to prioritize low-effort or high-impact tomorrow plans?'
    }
  ];

  // Find the matching scenario based on selected context - no default
  const matchedScenario = planScenarios.find(s => s.id === selectedPlanContext);

  const handleLockInOption = () => {
    if (selectedOption && onNavigateToChat) {
      onNavigateToChat();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2>Plan Tomorrow</h2>
          <p className="text-muted-foreground">Explore what-if scenarios for better outcomes</p>
        </div>
      </div>

      {/* Tomorrow's Context Scenario Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3>Tomorrow's Context - Select Your Scenario</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {planScenarios.map((scenario) => (
            <Card
              key={scenario.id}
              className={`p-4 cursor-pointer transition-all ${
                selectedPlanContext === scenario.id
                  ? 'border-2 border-purple-500 bg-purple-50 dark:bg-purple-950/50 shadow-md'
                  : 'border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800'
              }`}
              onClick={() => {
                setSelectedPlanContext(scenario.id);
                setSelectedOption(null); // Reset selected option when changing scenario
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4 className="text-sm mb-1">{scenario.title}</h4>
                  <div className="mt-2">
                    <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 text-xs">
                      Baseline: {scenario.baselineProbability}%
                    </Badge>
                  </div>
                </div>
                {selectedPlanContext === scenario.id && (
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse shrink-0 mt-1"></div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {!selectedPlanContext && (
          <p className="text-sm text-muted-foreground italic text-center">
            👆 Select a scenario to explore tomorrow's action options
          </p>
        )}
      </div>

      {/* Selected Context Details - Show before Kriya Says */}
      {selectedPlanContext && matchedScenario && (
        <div className="space-y-3">
          <h4 className="text-sm text-gray-700 dark:text-gray-300">Here's the context:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {matchedScenario.contextSections.map((section, index) => (
              <Card key={index} className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {section.label === 'Current Status' && <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    {section.label === 'Baseline Chance' && <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    {section.label === 'Key Factor' && <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
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
      )}



      {/* Action Options - Only show when scenario selected */}
      {selectedPlanContext && matchedScenario && (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-purple-600" />
          <h3>Tomorrow's Action Options</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Select an action to see how it could improve your chances
        </p>

        <div className="grid grid-cols-1 gap-4">
          {matchedScenario.options.map((option) => {
            const isSelected = selectedOption?.id === option.id;
            const probabilityChange = option.newProbability - matchedScenario.baselineProbability;
            const isIncrease = probabilityChange > 0;

            return (
              <Card
                key={option.id}
                className={`p-5 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-2 border-purple-500 bg-purple-50 dark:bg-purple-950/50 shadow-md'
                    : 'border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800'
                }`}
                onClick={() => setSelectedOption(option)}
              >
                <div className="space-y-3">
                  {/* Option Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {isSelected && (
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                        )}
                        <h4>{option.action}</h4>
                      </div>
                    </div>

                    {/* Probability Display */}
                    <div className="text-right shrink-0">
                      <div className={`text-2xl ${
                        isIncrease
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {option.newProbability}%
                      </div>
                      {probabilityChange !== 0 && (
                        <Badge
                          className={`mt-1 ${
                            isIncrease
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'
                          }`}
                        >
                          {isIncrease ? '↑' : '='} {isIncrease ? `+${probabilityChange}%` : 'No change'}
                        </Badge>
                      )}
                    </div>
                  </div>


                </div>
              </Card>
            );
          })}
        </div>
      </div>
      )}

      {/* Kriya Says Section - Show when option is selected */}
      {selectedOption && (
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
                {selectedOption.kriyaResponse}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      {selectedPlanContext && selectedOption && (
        <div className="space-y-4">
          <Button
            onClick={handleLockInOption}
            className="w-full h-12 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
          >
            <Lock className="w-5 h-5 mr-2" />
            Lock In This Plan for Tomorrow
          </Button>
        </div>
      )}



      {/* Footer Note */}
      {selectedPlanContext && (
      <Card className="p-4 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-3">
          <Sun className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-sm italic">
            💫 These are probabilistic forecasts, not certainties. Life is unpredictable, and that's okay! 
            Use these insights to plan compassionately, not rigidly.
          </p>
        </div>
      </Card>
      )}
    </div>
  );
}