import { Card } from './ui/card';
import { BookOpen, TrendingUp, Award, Calendar, Heart, Activity } from 'lucide-react';
import { HealthMetric, Goal } from '../types/health';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Area,
  AreaChart,
  ComposedChart,
  ReferenceLine
} from 'recharts';

interface WeeklyDigestProps {
  weekData: HealthMetric[];
  goals: Goal[];
}

export function WeeklyDigest({ weekData, goals }: WeeklyDigestProps) {
  // Calculate insights
  const avgSleep = (weekData.reduce((sum, d) => sum + d.sleep, 0) / weekData.length).toFixed(1);
  const avgSteps = Math.round(weekData.reduce((sum, d) => sum + d.steps, 0) / weekData.length);
  const totalMindfulness = weekData.reduce((sum, d) => sum + d.mindfulness, 0);
  const daysOver8kSteps = weekData.filter(d => d.steps >= 8000).length;
  const daysOver7hSleep = weekData.filter(d => d.sleep >= 7).length;
  
  const bestSleepDay = weekData.reduce((max, d) => d.sleep > max.sleep ? d : max);
  const mostActiveDay = weekData.reduce((max, d) => d.steps > max.steps ? d : max);

  const chartData = weekData.map(d => ({
    date: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
    steps: d.steps,
    sleep: d.sleep,
    active: d.activeMinutes,
    heartRate: d.heartRate
  }));

  // Custom tooltip for better data presentation
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2>Kriya's Weekly Digest</h2>
          <p className="text-muted-foreground">Your health story with causal insights</p>
        </div>
      </div>

      {/* Weekly Story */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
        <h3 className="mb-4">This Week's Story</h3>
        <div className="space-y-4">
          <p>
            This week, you averaged <strong>{avgSleep} hours of sleep</strong> per night and walked an average of <strong>{avgSteps.toLocaleString()} steps</strong> daily. Your body showed a consistent pattern of moving more on days when you got better rest.
          </p>
          <p>
            Your standout moments: On <strong>{new Date(bestSleepDay.date).toLocaleDateString('en-US', { weekday: 'long' })}</strong>, you had your best sleep at {bestSleepDay.sleep.toFixed(1)} hours. Your most active day was <strong>{new Date(mostActiveDay.date).toLocaleDateString('en-US', { weekday: 'long' })}</strong> with {mostActiveDay.steps.toLocaleString()} steps.
          </p>
          <p>
            Interestingly, your heart rate was steadier on days with more sleep, suggesting your body recovers well when given adequate rest. This shows a beautiful connection between your sleep and cardiovascular health. 💙
          </p>
        </div>
      </Card>

      {/* Key Achievements */}
      <div>
        <h3 className="mb-4">This Week's Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h4>Sleep Wins</h4>
            </div>
            <p className="text-2xl mb-1">{daysOver7hSleep}</p>
            <p className="text-muted-foreground">nights with 7+ hours</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <h4>Active Days</h4>
            </div>
            <p className="text-2xl mb-1">{daysOver8kSteps}</p>
            <p className="text-muted-foreground">days hitting 8k+ steps</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-5 h-5 text-pink-500" />
              <h4>Mindfulness</h4>
            </div>
            <p className="text-2xl mb-1">{totalMindfulness}</p>
            <p className="text-muted-foreground">sessions completed</p>
          </Card>
        </div>
      </div>

      {/* Activity Trends */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3>Activity & Movement Trends</h3>
            <p className="text-sm text-muted-foreground">Your daily steps and active minutes this week</p>
          </div>
          <Activity className="w-5 h-5 text-primary" />
        </div>
        <ResponsiveContainer width="100%" height={340}>
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
            <defs>
              <linearGradient id="stepsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2d7a4f" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#2d7a4f" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#52b788" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#52b788" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#d4edda" opacity={0.6} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#5a7a67', fontSize: 12 }}
              axisLine={{ stroke: '#a8d5ba' }}
            />
            <YAxis 
              tick={{ fill: '#5a7a67', fontSize: 12 }}
              axisLine={{ stroke: '#a8d5ba' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            <ReferenceLine 
              y={8000} 
              stroke="#2d7a4f" 
              strokeDasharray="5 5" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="steps" 
              fill="url(#stepsGradient)" 
              stroke="#2d7a4f" 
              strokeWidth={3}
              name="Steps"
              dot={{ fill: '#2d7a4f', r: 5, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7, strokeWidth: 2, stroke: '#fff' }}
            />
            <Line 
              type="monotone" 
              dataKey="active" 
              stroke="#f59e0b" 
              strokeWidth={3}
              dot={{ fill: '#f59e0b', r: 5, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7, strokeWidth: 2, stroke: '#fff' }}
              name="Active Minutes"
            />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-between mt-2 px-2">
          <span className="text-xs text-muted-foreground">📊 Daily Activity Tracking</span>
          <span className="text-xs font-medium text-primary">Goal: 8,000 steps</span>
        </div>
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            💪 Your active minutes show when you're truly engaged in movement throughout the day!
          </p>
        </div>
      </Card>

      {/* Sleep & Recovery Trends */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3>Sleep & Recovery</h3>
          <Heart className="w-5 h-5 text-pink-500" />
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={chartData} margin={{ top: 20, right: 50, bottom: 5, left: 10 }}>
            <defs>
              <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" opacity={0.6} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#5a7a67', fontSize: 12 }}
              axisLine={{ stroke: '#a8d5ba' }}
            />
            <YAxis 
              yAxisId="left"
              domain={[0, 10]} 
              tick={{ fill: '#1e40af', fontSize: 12, fontWeight: 600 }}
              axisLine={{ stroke: '#3b82f6' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              domain={[50, 90]}
              tick={{ fill: '#ec4899', fontSize: 12, fontWeight: 600 }}
              axisLine={{ stroke: '#ec4899' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            <ReferenceLine 
              y={7} 
              yAxisId="left"
              stroke="#3b82f6" 
              strokeDasharray="5 5" 
              strokeWidth={2}
            />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="sleep" 
              fill="url(#sleepGradient)" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="Sleep (hours)"
              dot={{ fill: '#3b82f6', r: 6, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, strokeWidth: 2, stroke: '#fff' }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="heartRate" 
              stroke="#ec4899" 
              strokeWidth={3}
              dot={{ fill: '#ec4899', r: 5, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7, strokeWidth: 2, stroke: '#fff' }}
              name="Resting HR"
            />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-between mt-2 px-2">
          <div className="flex items-center gap-4">
            <span className="text-xs text-blue-600 font-medium">← Sleep Hours</span>
            <span className="text-xs text-pink-600 font-medium">Heart Rate (bpm) →</span>
          </div>
          <span className="text-xs font-medium text-primary">Goal: 7 hours</span>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            💡 Notice how your heart rate tends to be lower on days with better sleep - this shows your body recovering well!
          </p>
        </div>
      </Card>

      {/* Kriya's Insight */}
      <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800">
        <h3 className="mb-3">Kriya's Light Challenge</h3>
        <p className="mb-4">
          Based on your patterns, you seem to thrive when you maintain consistent sleep. I notice your step count naturally increases on well-rested days. Want to explore this connection more intentionally next week?
        </p>
        <p className="italic">
          ✨ Remember: These are invitations for exploration, not obligations. Your body knows what it needs.
        </p>
      </Card>

      {/* Weekly Reflection Question */}
      <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="mb-3">Weekly Reflection</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/80 backdrop-blur rounded-lg border border-primary/10">
                <p className="font-medium text-primary mb-2">What energized you this week?</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Think about moments when you felt alive, engaged, or truly present. These clues help you understand what nourishes you.
                </p>
                <textarea 
                  placeholder="Maybe it was a morning walk, a good conversation, or simply a peaceful moment..."
                  className="w-full min-h-[100px] p-3 rounded-lg border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-white/60 rounded-lg border border-primary/10">
                  <p className="text-sm font-medium text-foreground mb-1">💭 Consider:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• What activities gave you energy?</li>
                    <li>• When did you feel most like yourself?</li>
                    <li>• What patterns do you notice?</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-white/60 rounded-lg border border-primary/10">
                  <p className="text-sm font-medium text-foreground mb-1">🌱 Remember:</p>
                  <p className="text-xs text-muted-foreground">
                    There's no right answer. This is about self-discovery, not self-judgment. Your insights matter.
                  </p>
                </div>
              </div>

              <button className="w-full md:w-auto px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                Save Reflection
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}