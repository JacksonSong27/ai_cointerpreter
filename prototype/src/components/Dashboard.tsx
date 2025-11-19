import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Activity, Moon, Footprints, Brain } from 'lucide-react';
import { HealthMetric, Goal } from '../types/health';
import { PrototypeQuickStart } from './PrototypeQuickStart';

interface DashboardProps {
  todayData: HealthMetric | null;
  weekData: HealthMetric[];
  goals: Goal[];
  onNavigate?: (tab: string) => void;
}

export function Dashboard({ todayData, weekData, goals, onNavigate }: DashboardProps) {
  const calculateWeeklyProgress = (goal: Goal) => {
    const weekTotal = weekData.reduce((sum, day) => {
      switch (goal.type) {
        case 'sleep':
          return sum + day.sleep;
        case 'steps':
          return sum + (day.steps >= 8000 ? 1 : 0);
        case 'mindfulness':
          return sum + day.mindfulness;
        case 'active':
          return sum + day.activeMinutes;
        default:
          return sum;
      }
    }, 0);
    
    return (weekTotal / goal.weeklyTarget) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Quick Start Guide - Prototype Helper */}
      <PrototypeQuickStart onNavigate={onNavigate || (() => {})} />

      {/* Today's Quick Stats */}
      <div>
        <h2 className="mb-4">Today at a Glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Footprints className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-muted-foreground">Steps</p>
                <p className="text-2xl">{todayData?.steps.toLocaleString() || '—'}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-muted-foreground">Sleep</p>
                <p className="text-2xl">{todayData?.sleep.toFixed(1) || '—'}h</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-muted-foreground">Active</p>
                <p className="text-2xl">{todayData?.activeMinutes || '—'}m</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">
                <Brain className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-muted-foreground">Mindful</p>
                <p className="text-2xl">{todayData?.mindfulness || 0}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Weekly Goals Progress */}
      <div>
        <h2 className="mb-4">This Week's Goals</h2>
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = calculateWeeklyProgress(goal);
            return (
              <Card key={goal.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4>{goal.description}</h4>
                      <p className="text-muted-foreground">Target: {goal.weeklyTarget} {goal.unit}</p>
                    </div>
                    <span className={`px-2 py-1 rounded ${progress >= 100 ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'}`}>
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress value={Math.min(progress, 100)} className="h-2" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Kriya Wisdom */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950 border-purple-200 dark:border-purple-800">
        <div className="text-center space-y-2">
          <p className="italic">
            "Every fluctuation in your health data is a story waiting to be understood."
          </p>
          <p className="text-muted-foreground">
            🌙 Today's surprises become tomorrow's wisdom
          </p>
        </div>
      </Card>
    </div>
  );
}