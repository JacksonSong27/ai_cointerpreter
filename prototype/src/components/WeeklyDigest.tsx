import { Card } from './ui/card';
import { BookOpen, TrendingUp, Award, Calendar, Heart } from 'lucide-react';
import { HealthMetric, Goal } from '../types/health';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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
    active: d.activeMinutes
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(125, 212, 176, 0.15)' }}>
          <BookOpen className="w-6 h-6" style={{ color: '#7DD4B0' }} />
        </div>
        <div>
          <h2>Your Week in Review</h2>
          <p className="text-muted-foreground">A narrative of your health journey</p>
        </div>
      </div>

      {/* Weekly Story */}
      <Card className="p-6 border-none" style={{ background: 'linear-gradient(135deg, rgba(10, 132, 255, 0.06) 0%, rgba(125, 212, 176, 0.08) 100%)' }}>
        <h3 className="mb-4">📖 This Week's Story</h3>
        <div className="space-y-4 text-foreground">
          <p>
            This week, you averaged <strong>{avgSleep} hours of sleep</strong> per night and walked an average of <strong>{avgSteps.toLocaleString()} steps</strong> daily. Your body showed a consistent pattern—there's a gentle rhythm emerging in how rest and movement dance together.
          </p>
          <p>
            <strong>Your standout moments:</strong> On <strong>{new Date(bestSleepDay.date).toLocaleDateString('en-US', { weekday: 'long' })}</strong>, you gifted yourself {bestSleepDay.sleep.toFixed(1)} hours of sleep—your longest this week! Your most active day was <strong>{new Date(mostActiveDay.date).toLocaleDateString('en-US', { weekday: 'long' })}</strong> with {mostActiveDay.steps.toLocaleString()} steps—look at you go! 🌟
          </p>
          <p>
            Here's something beautiful I noticed: your heart rate was steadier on days with more sleep, suggesting your body knows exactly what it needs to recover. This connection between your sleep and cardiovascular health is your body's way of sending you wisdom. Are you listening? 💙
          </p>
        </div>
      </Card>

      {/* Key Achievements */}
      <div>
        <h3 className="mb-4">This Week's Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5" style={{ color: '#7DD4B0' }} />
              <h4>Sleep Wins</h4>
            </div>
            <p className="text-2xl mb-1" style={{ color: '#0A84FF' }}>{daysOver7hSleep}</p>
            <p className="text-muted-foreground">nights with 7+ hours</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5" style={{ color: '#0A84FF' }} />
              <h4>Active Days</h4>
            </div>
            <p className="text-2xl mb-1" style={{ color: '#0A84FF' }}>{daysOver8kSteps}</p>
            <p className="text-muted-foreground">days hitting 8k+ steps</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-5 h-5" style={{ color: '#7DD4B0' }} />
              <h4>Mindfulness</h4>
            </div>
            <p className="text-2xl mb-1" style={{ color: '#0A84FF' }}>{totalMindfulness}</p>
            <p className="text-muted-foreground">sessions completed</p>
          </Card>
        </div>
      </div>

      {/* Activity Trends */}
      <Card className="p-6">
        <h3 className="mb-4">Steps Throughout the Week</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(44, 54, 57, 0.08)" />
            <XAxis dataKey="date" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid rgba(44, 54, 57, 0.08)',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgba(44, 54, 57, 0.1)'
              }}
            />
            <Bar dataKey="steps" fill="#0A84FF" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Sleep Trends */}
      <Card className="p-6">
        <h3 className="mb-4">Sleep Patterns</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(44, 54, 57, 0.08)" />
            <XAxis dataKey="date" stroke="#6B7280" />
            <YAxis domain={[0, 10]} stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid rgba(44, 54, 57, 0.08)',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgba(44, 54, 57, 0.1)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="sleep" 
              stroke="#7DD4B0" 
              strokeWidth={3} 
              name="Hours" 
              dot={{ fill: '#7DD4B0', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Reflective Prompt */}
      <Card className="p-6 border-none" style={{ background: 'linear-gradient(135deg, rgba(150, 230, 194, 0.1) 0%, rgba(10, 132, 255, 0.05) 100%)' }}>
        <h3 className="mb-3">🌱 Looking Ahead (A Playful Challenge)</h3>
        <p className="mb-4 text-foreground">
          Based on your patterns, you seem to thrive when you maintain consistent sleep. Want to play with a gentle intention? Try getting 7+ hours on at least 5 nights next week and see how your body responds. It's an experiment, not a requirement!
        </p>
        <p className="italic text-foreground">
          ✨ Remember: This is your health journey, and you're the expert on your body. Progress isn't perfection—it's about learning what helps you feel your best. Every week is a new chapter in your story.
        </p>
      </Card>

      {/* Weekly Reflection Question */}
      <Card className="p-6 border-none" style={{ background: 'linear-gradient(135deg, rgba(10, 132, 255, 0.08) 0%, rgba(150, 230, 194, 0.06) 100%)' }}>
        <div className="flex items-start gap-3">
          <Calendar className="w-6 h-6 flex-shrink-0" style={{ color: '#0A84FF' }} />
          <div>
            <h4 className="mb-2">Reflection Question</h4>
            <p className="mb-3">What was one thing this week that made you feel energized?</p>
            <p className="italic text-muted-foreground">
              Take a moment to notice what your body is telling you. These insights help you understand your unique patterns.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
