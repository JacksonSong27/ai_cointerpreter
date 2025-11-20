import React, { useEffect, useMemo, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { Lightbulb, Calendar, TrendingUp, Lock, Heart, Sun, CheckCircle, Filter, Sparkles } from 'lucide-react';
import { DailyForecast } from '../types/health';

interface PlanTomorrowProps {
  forecasts: DailyForecast[];
  morningScenario?: string;
}

interface PlanOption {
  id: string;
  action: string;
  newProbability: number;
  effort: 'low' | 'medium' | 'high';
  focus: 'movement' | 'rest' | 'mindset';
  rationale: string;
  isCustom?: boolean;
}

interface PlanScenario {
  id: string;
  title: string;
  context: string;
  baselineProbability: number;
  options: PlanOption[];
  kriyaSays: string;
}

const PLAN_SCENARIOS: PlanScenario[] = [
  {
    id: 'A',
    title: 'Scenario A—Weather + Long Meeting',
    context: 'Chance of hitting goal tomorrow: 30%.',
    baselineProbability: 30,
    options: [
      { id: 'A1', action: '15-min lunch walk', newProbability: 65, effort: 'low', focus: 'movement', rationale: 'Protects the only open block before 5 PM.' },
      { id: 'A2', action: '20-min home stretch', newProbability: 85, effort: 'medium', focus: 'movement', rationale: 'Stacks gentle movement onto your evening routine.' },
      { id: 'A3', action: 'Sleep +1 hour', newProbability: 78, effort: 'low', focus: 'rest', rationale: 'Offsets the 6h night that usually slows you down.' },
    ],
    kriyaSays: 'Which of these feels doable for tomorrow?'
  },
  {
    id: 'B',
    title: 'Scenario B—Sunny Day + Open Afternoon',
    context: 'Chance of hitting goal tomorrow: 50%.',
    baselineProbability: 50,
    options: [
      { id: 'B1', action: 'Grocery trip on foot', newProbability: 78, effort: 'medium', focus: 'movement', rationale: 'Turns errands into a loop you enjoy on sunny days.' },
      { id: 'B2', action: '30-minute park walk', newProbability: 85, effort: 'high', focus: 'movement', rationale: 'Takes advantage of the open afternoon + great weather.' },
      { id: 'B3', action: 'Do nothing', newProbability: 50, effort: 'low', focus: 'mindset', rationale: 'Sometimes steady is best—this keeps expectations gentle.' },
    ],
    kriyaSays: 'What kind of weekend rhythm feels realistic?'
  },
  {
    id: 'C',
    title: 'Scenario C—Heavy Stress + Poor Sleep',
    context: 'Low Sleep Risk (4.2 hours). Chance of hitting goal tomorrow: 25%.',
    baselineProbability: 25,
    options: [
      { id: 'C1', action: 'Sleep +1 hour', newProbability: 48, effort: 'low', focus: 'rest', rationale: 'Raising sleep above 5h stabilizes your energy tomorrow.' },
      { id: 'C2', action: '15-min afternoon walk', newProbability: 65, effort: 'medium', focus: 'movement', rationale: 'Breaks up the stressy afternoon stack.' },
    ],
    kriyaSays: 'Would you like me to prioritize low-effort or high-impact tomorrow plans?'
  },
  {
    id: 'D',
    title: 'Scenario D — Weekend + Lots of Errands',
    context: 'Chance of hitting goal tomorrow: 25%. Sleep last night: 4.2 hours.',
    baselineProbability: 25,
    options: [
      { id: 'D1', action: 'Sleep +1 hour', newProbability: 48, effort: 'low', focus: 'rest', rationale: 'Weekend rest debt shrinks when you bank sleep.' },
      { id: 'D2', action: '5-min "wake-up mobility routine"', newProbability: 39, effort: 'low', focus: 'movement', rationale: 'Signals your body to switch on gently.' },
      { id: 'D3', action: '15-min afternoon walk', newProbability: 65, effort: 'medium', focus: 'movement', rationale: 'Pairs well with errands you already planned.' },
    ],
    kriyaSays: 'Would you like me to prioritize low-effort or high-impact tomorrow plans?'
  }
];

export function PlanTomorrow({ forecasts, morningScenario }: PlanTomorrowProps) {
  // Find the matching scenario or default to first one
  const matchedScenario = PLAN_SCENARIOS.find(s => s.id === morningScenario) || PLAN_SCENARIOS[0];

  const [selectedOption, setSelectedOption] = useState<PlanOption | null>(null);
  const [locked, setLocked] = useState(false);
  const [effortFilter, setEffortFilter] = useState<'all' | 'low' | 'high'>('all');
  const [userOptions, setUserOptions] = useState<PlanOption[]>([]);
  const [customAction, setCustomAction] = useState('');
  const [customFocus, setCustomFocus] = useState<'movement' | 'rest' | 'mindset'>('movement');
  const [customProbability, setCustomProbability] = useState(matchedScenario.baselineProbability);

  useEffect(() => {
    setSelectedOption(null);
    setLocked(false);
    setEffortFilter('all');
    setUserOptions([]);
    setCustomAction('');
    setCustomFocus('movement');
    setCustomProbability(matchedScenario.baselineProbability);
  }, [matchedScenario.id, matchedScenario.baselineProbability]);

  const combinedOptions = useMemo(
    () => [...matchedScenario.options, ...userOptions],
    [matchedScenario, userOptions],
  );

  const filteredOptions = combinedOptions.filter((option) => {
    if (effortFilter === 'low') {
      return option.effort === 'low';
    }
    if (effortFilter === 'high') {
      return option.effort === 'high';
    }
    return true;
  });

  const probabilitySummary = selectedOption?.newProbability ?? matchedScenario.baselineProbability;
  const probabilityChange = probabilitySummary - matchedScenario.baselineProbability;

  const handleLockInOption = () => {
    if (selectedOption) {
      setLocked(true);
      setTimeout(() => {
        setLocked(false);
      }, 2000);
    }
  };

  const handleAddCustomOption = () => {
    if (!customAction.trim()) return;
    const safeProbability = Math.max(
      matchedScenario.baselineProbability,
      Math.min(95, Math.round(customProbability)),
    );
    const customPlan: PlanOption = {
      id: `custom-${Date.now()}`,
      action: customAction.trim(),
      newProbability: safeProbability,
      effort: safeProbability - matchedScenario.baselineProbability > 15 ? 'high' : 'low',
      focus: customFocus,
      rationale: 'Your own experiment — Kriya will learn from it.',
      isCustom: true,
    };
    setUserOptions((prev) => [...prev, customPlan]);
    setCustomAction('');
    setCustomProbability(matchedScenario.baselineProbability);
    setCustomFocus('movement');
    setSelectedOption(customPlan);
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

      {/* Custom Plan Builder */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <div>
            <h3 className="text-base font-semibold">Design your own experiment</h3>
            <p className="text-xs text-muted-foreground">
              Kriya will fold your idea into Detective Mode later.
            </p>
          </div>
        </div>

        <Input
          value={customAction}
          onChange={(e) => setCustomAction(e.target.value)}
          placeholder="e.g., Text Alex to book a co-walk, take stairs after each call..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">Focus</label>
            <select
              value={customFocus}
              onChange={(e) => setCustomFocus(e.target.value as 'movement' | 'rest' | 'mindset')}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="movement">Movement</option>
              <option value="rest">Rest & recovery</option>
              <option value="mindset">Mindset / motivation</option>
            </select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
              <span>Chance if it works</span>
              <span>{customProbability}%</span>
            </div>
            <Slider
              value={[customProbability]}
              min={matchedScenario.baselineProbability}
              max={95}
              step={1}
              onValueChange={(value) => setCustomProbability(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Baseline is {matchedScenario.baselineProbability}% — drag to set how much this plan might help.
            </p>
          </div>
        </div>

        <Button
          onClick={handleAddCustomOption}
          disabled={!customAction.trim()}
          className="w-full"
        >
          Save to list
        </Button>
      </Card>

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
          <div className="pt-4 border-t border-purple-200/70 dark:border-purple-800/70 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Where you stand</span>
              <span className="font-medium">
                {probabilitySummary}% {probabilityChange > 0 && `(${probabilityChange >= 0 ? '+' : ''}${probabilityChange}%)`}
              </span>
            </div>
            <Progress value={probabilitySummary} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {selectedOption
                ? `If ${selectedOption.action.toLowerCase()} happens, tomorrow has ~${selectedOption.newProbability}% chance to hit your goal.`
                : 'Pick a plan below to see how the probability shifts.'}
            </p>
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

      {/* Effort Filter */}
      <Card className="p-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-purple-600" />
            <div>
              <h4 className="text-sm font-medium">How much energy do you have tomorrow?</h4>
              <p className="text-xs text-muted-foreground">
                Toggle to see gentle vs. high-impact ideas (straight from the script prompt).
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Show all' },
              { id: 'low', label: 'Gentle / low-effort' },
              { id: 'high', label: 'High-impact' },
            ].map((option) => (
              <Button
                key={option.id}
                size="sm"
                variant={effortFilter === option.id ? 'default' : 'outline'}
                onClick={() => setEffortFilter(option.id as 'all' | 'low' | 'high')}
              >
                {option.label}
              </Button>
            ))}
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
          {filteredOptions.map((option) => {
            const isSelected = selectedOption?.id === option.id;
            const probabilityChange = option.newProbability - matchedScenario.baselineProbability;
            const isIncrease = probabilityChange > 0;
            const focusLabel =
              option.focus === 'movement'
                ? 'Movement'
                : option.focus === 'rest'
                ? 'Rest & recovery'
                : 'Mindset';

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
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline">
                          {option.effort === 'low'
                            ? 'Gentle'
                            : option.effort === 'high'
                            ? 'High-impact'
                            : 'Steady'}
                        </Badge>
                        <span>Focus: {focusLabel}</span>
                        {option.isCustom && (
                          <Badge className="bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100">
                            Custom
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{option.rationale}</p>
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
          {filteredOptions.length === 0 && (
            <Card className="p-5 text-sm text-muted-foreground">
              No plans match that energy level. Try switching filters or add your own experiment below.
            </Card>
          )}
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