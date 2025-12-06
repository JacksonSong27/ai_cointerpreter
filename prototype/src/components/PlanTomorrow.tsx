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
      title: 'Scenario A—Weather + Long Meeting',
      contextSections: [
        { label: 'Current Status', content: 'Low sleep (6.1 hours) + rainy weather expected' },
        { label: 'Baseline Chance', content: '30% probability of hitting goal' },
        { label: 'Key Factor', content: 'Weather and meeting constraints' }
      ],
      baselineProbability: 30,
      options: [
        { 
          id: 'A1', 
          action: 'Take stairs during workshop break (~600 steps)', 
          newProbability: 55,
          kriyaResponse: 'Using workshop breaks for movement is smart! Even a few flights of stairs can add meaningful steps without disrupting your schedule. It\'s about finding opportunities within your constraints.'
        },
        { 
          id: 'A2', 
          action: 'Indoor walking during rain (~1,500 steps)', 
          newProbability: 65,
          kriyaResponse: 'When weather limits outdoor options, indoor movement is perfect! You can walk hallways, use stairs, or even pace during phone calls. Rain doesn\'t have to stop your movement.'
        },
        { 
          id: 'A3', 
          action: 'Sleep +1 hour tonight (better energy tomorrow)', 
          newProbability: 78,
          kriyaResponse: 'After a short night, prioritizing sleep is wise! Better rest tonight sets you up for more natural movement tomorrow. Sleep is foundational to your health goals.'
        },
      ],
      kriyaSays: 'Which of these works with your schedule and the weather?'
    },
    {
      id: 'B',
      title: 'Scenario B—Sunny Day + Open Afternoon',
      contextSections: [
        { label: 'Current Status', content: 'Good sleep (7.8 hours) + sunny weather + light calendar' },
        { label: 'Baseline Chance', content: '65% probability of hitting goal' },
        { label: 'Key Factor', content: 'Favorable conditions for activity' }
      ],
      baselineProbability: 65,
      options: [
        { 
          id: 'B1', 
          action: 'Take a 20-min outdoor walk (~2,500 steps)', 
          newProbability: 85,
          kriyaResponse: 'A sunny day walk is perfect! The weather is on your side, and with a light calendar, you have the flexibility. This is a great opportunity to enjoy movement naturally.'
        },
        { 
          id: 'B2', 
          action: 'Park farther away and walk to errands (~1,800 steps)', 
          newProbability: 80,
          kriyaResponse: 'With good weather and an open schedule, walking to errands feels natural! It combines practical tasks with movement, and the sunshine makes it enjoyable.'
        },
        { 
          id: 'B3', 
          action: 'Add a lunchtime stroll (~1,500 steps)', 
          newProbability: 75,
          kriyaResponse: 'A lunchtime walk on a sunny day is delightful! It breaks up your day, boosts energy, and takes advantage of the nice weather. Perfect timing with your light calendar!'
        },
      ],
      kriyaSays: 'With good weather and an open schedule, which feels most appealing?'
    },
    {
      id: 'C',
      title: 'Scenario C—Heavy Stress + Poor Sleep',
      contextSections: [
        { label: 'Current Status', content: 'Very low sleep (4.94 hours) + stressed + morning presentation' },
        { label: 'Baseline Chance', content: '25% probability of hitting goal' },
        { label: 'Key Factor', content: 'Critical recovery needed' }
      ],
      baselineProbability: 25,
      options: [
        { 
          id: 'C1', 
          action: 'Sleep +1.5 hours tonight (critical recovery)', 
          newProbability: 48,
          kriyaResponse: 'After such poor sleep, prioritizing recovery is essential! Your body needs rest to function well, especially with a morning presentation. This isn\'t giving up—it\'s setting yourself up for sustainable success.'
        },
        { 
          id: 'C2', 
          action: 'Gentle 10-min walk after presentation (~1,200 steps)', 
          newProbability: 42,
          kriyaResponse: 'A gentle walk after your presentation can help! It\'s light movement that supports your body without demanding too much when you\'re sleep-deprived. Keep it easy and listen to your energy.'
        },
        { 
          id: 'C3', 
          action: '5-min morning mobility routine', 
          newProbability: 35,
          kriyaResponse: 'A gentle morning routine can help ease your body into the day! Just five minutes of easy movement gets your blood flowing without demanding too much when you\'re low on sleep.'
        },
      ],
      kriyaSays: 'With such low sleep and stress, which feels most supportive?'
    },
    {
      id: 'D',
      title: 'Scenario D—Weekend + Lots of Errands',
      contextSections: [
        { label: 'Current Status', content: 'Weekend with planned errands and activities' },
        { label: 'Baseline Chance', content: '55% probability of hitting goal' },
        { label: 'Key Factor', content: 'Weekend activity patterns' }
      ],
      baselineProbability: 55,
      options: [
        { 
          id: 'D1', 
          action: 'Park farther from stores (~800 steps)', 
          newProbability: 72,
          kriyaResponse: 'Parking farther away is a simple way to add movement to your errands! It doesn\'t require extra time, just a small shift in routine. These micro-changes add up naturally throughout your day.'
        },
        { 
          id: 'D2', 
          action: 'Take a 20-min park walk (~2,500 steps)', 
          newProbability: 85,
          kriyaResponse: 'A park walk is perfect for weekends! It combines movement with relaxation and can be a great way to break up errands. Plus, being outside can boost your mood and energy naturally.'
        },
        { 
          id: 'D3', 
          action: 'Walk to nearby errands instead of driving', 
          newProbability: 78,
          kriyaResponse: 'Walking to errands is a wonderful way to integrate movement into your weekend! It\'s practical, sustainable, and doesn\'t feel like "exercise"—just part of your day. Every trip counts!'
        },
      ],
      kriyaSays: 'Which of these feels natural for your weekend?'
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