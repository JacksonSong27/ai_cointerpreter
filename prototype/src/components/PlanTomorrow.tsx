import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Lightbulb, Calendar, TrendingUp, ArrowRight, Lock, Heart, Sun, CheckCircle } from 'lucide-react';
import { DailyForecast } from '../types/health';

interface PlanTomorrowProps {
  forecasts: DailyForecast[];
  morningScenario?: string;
}

interface PlanOption {
  id: string;
  action: string;
  newProbability: number;
}

interface PlanScenario {
  id: string;
  title: string;
  context: string;
  baselineProbability: number;
  options: PlanOption[];
  kriyaSays: string;
}

export function PlanTomorrow({ forecasts, morningScenario }: PlanTomorrowProps) {
  const [selectedOption, setSelectedOption] = useState<PlanOption | null>(null);
  const [locked, setLocked] = useState(false);

  // Plan Tomorrow scenarios that correspond to morning scenarios
  const planScenarios: PlanScenario[] = [
    {
      id: 'A',
      title: 'Scenario A—Weather + Long Meeting',
      context: 'Chance of hitting goal tomorrow: 30%.',
      baselineProbability: 30,
      options: [
        { id: 'A1', action: '15-min lunch walk', newProbability: 65 },
        { id: 'A2', action: '20-min home stretch', newProbability: 85 },
        { id: 'A3', action: 'Sleep +1 hour', newProbability: 78 },
      ],
      kriyaSays: 'Which of these feels doable for tomorrow?'
    },
    {
      id: 'B',
      title: 'Scenario B—Sunny Day + Open Afternoon',
      context: 'Chance of hitting goal tomorrow: 50%.',
      baselineProbability: 50,
      options: [
        { id: 'B1', action: 'Grocery trip on foot', newProbability: 78 },
        { id: 'B2', action: '30-minute park walk', newProbability: 85 },
        { id: 'B3', action: 'Do nothing', newProbability: 50 },
      ],
      kriyaSays: 'What kind of weekend rhythm feels realistic?'
    },
    {
      id: 'C',
      title: 'Scenario C—Heavy Stress + Poor Sleep',
      context: 'Low Sleep Risk (4.2 hours). Chance of hitting goal tomorrow: 25%.',
      baselineProbability: 25,
      options: [
        { id: 'C1', action: 'Sleep +1 hour', newProbability: 48 },
        { id: 'C2', action: '15-min afternoon walk', newProbability: 65 },
      ],
      kriyaSays: 'Would you like me to prioritize low-effort or high-impact tomorrow plans?'
    },
    {
      id: 'D',
      title: 'Scenario D — Weekend + Lots of Errands',
      context: 'Chance of hitting goal tomorrow: 25%. Sleep last night: 4.2 hours.',
      baselineProbability: 25,
      options: [
        { id: 'D1', action: 'Sleep +1 hour', newProbability: 48 },
        { id: 'D2', action: '5-min "wake-up mobility routine"', newProbability: 39 },
        { id: 'D3', action: '15-min afternoon walk', newProbability: 65 },
      ],
      kriyaSays: 'Would you like me to prioritize low-effort or high-impact tomorrow plans?'
    }
  ];

  // Find the matching scenario or default to first one
  const matchedScenario = planScenarios.find(s => s.id === morningScenario) || planScenarios[0];

  const handleLockInOption = () => {
    if (selectedOption) {
      setLocked(true);
      setTimeout(() => {
        setLocked(false);
      }, 2000);
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

      {/* Scenario Connection Notice */}
      {morningScenario && (
        <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>
              This plan corresponds to your <strong>Morning Scenario {morningScenario}</strong>
            </span>
          </div>
        </Card>
      )}

      {/* Current Scenario Card */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3>{matchedScenario.title}</h3>
          </div>
          
          <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
            <p className="text-sm">{matchedScenario.context}</p>
          </div>

          <div className="pt-2">
            <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100">
              Baseline Probability: {matchedScenario.baselineProbability}%
            </Badge>
          </div>
        </div>
      </Card>

      {/* Kriya's Question */}
      <Card className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-emerald-300 dark:border-emerald-700">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
            <Heart className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-sm">Kriya Says:</h4>
            </div>
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {matchedScenario.kriyaSays}
            </p>
          </div>
        </div>
      </Card>

      {/* Action Options */}
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

                  {/* Expanded Details */}
                  {isSelected && (
                    <div className="pt-3 border-t border-purple-200 dark:border-purple-800 space-y-3 animate-in fade-in slide-in-from-top-2">
                      {/* Kriya's Insight for this option */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-2 border-emerald-300 dark:border-emerald-700 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
                            <Heart className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-800 dark:text-gray-200">
                              {isIncrease ? (
                                <>
                                  Great choice! <strong>{option.action}</strong> could boost your chances by {probabilityChange}%. 
                                  This is a compassionate way to work with tomorrow's conditions.
                                </>
                              ) : (
                                <>
                                  Sometimes staying steady is the best plan. <strong>{option.action}</strong> keeps things 
                                  manageable without adding pressure.
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      {selectedOption && !locked && (
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

      {locked && (
        <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white">
              ✓
            </div>
            <div>
              <h4>Plan Saved!</h4>
              <p className="text-sm text-muted-foreground">
                We'll remind you about <strong>{selectedOption?.action}</strong> tomorrow morning. Remember, plans are flexible—you're in control.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Footer Note */}
      <Card className="p-4 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-3">
          <Sun className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-sm italic">
            💫 These are probabilistic forecasts, not certainties. Life is unpredictable, and that's okay! 
            Use these insights to plan compassionately, not rigidly.
          </p>
        </div>
      </Card>
    </div>
  );
}