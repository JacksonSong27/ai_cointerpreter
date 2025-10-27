import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Activity, Moon, Footprints, Brain } from 'lucide-react';
import { HealthMetric, Goal } from '../types/health';

interface DashboardProps {
  todayData: HealthMetric | null;
  weekData: HealthMetric[];
  goals: Goal[];
}

export function Dashboard({ todayData, weekData, goals }: DashboardProps) {
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
      {/* Today's Quick Stats */}
      <div>
        <h2 className="mb-4">Today at a Glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(10, 132, 255, 0.1)' }}>
                <Footprints className="w-5 h-5" style={{ color: '#0A84FF' }} />
              </div>
              <div>
                <p className="text-muted-foreground">Steps</p>
                <p className="text-2xl">{todayData?.steps.toLocaleString() || '—'}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(125, 212, 176, 0.15)' }}>
                <Moon className="w-5 h-5" style={{ color: '#7DD4B0' }} />
              </div>
              <div>
                <p className="text-muted-foreground">Sleep</p>
                <p className="text-2xl">{todayData?.sleep.toFixed(1) || '—'}h</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(10, 132, 255, 0.1)' }}>
                <Activity className="w-5 h-5" style={{ color: '#0A84FF' }} />
              </div>
              <div>
                <p className="text-muted-foreground">Active</p>
                <p className="text-2xl">{todayData?.activeMinutes || '—'}m</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(125, 212, 176, 0.15)' }}>
                <Brain className="w-5 h-5" style={{ color: '#7DD4B0' }} />
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
                    <span 
                      className="px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: progress >= 100 ? 'rgba(125, 212, 176, 0.2)' : 'rgba(10, 132, 255, 0.1)',
                        color: progress >= 100 ? '#2C3639' : '#0A84FF'
                      }}
                    >
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

      {/* Motivational Message */}
      <Card className="p-6 border-none" style={{ background: 'linear-gradient(135deg, rgba(10, 132, 255, 0.08) 0%, rgba(125, 212, 176, 0.08) 100%)' }}>
        <p className="text-center italic text-foreground">
          "Your body is telling its story through data. Let's listen together with curiosity and compassion—not judgment. Every pattern is a clue, every deviation is an insight. 💙"
        </p>
      </Card>
    </div>
  );
}
