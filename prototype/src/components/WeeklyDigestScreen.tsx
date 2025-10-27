import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { BookOpen, Award, TrendingUp, Heart, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WeeklyDigestScreenProps {
  onPlanNextWeek: () => void;
  onBack: () => void;
}

export function WeeklyDigestScreen({ onPlanNextWeek, onBack }: WeeklyDigestScreenProps) {
  // Mock data
  const chartData = [
    { date: 'Mon', steps: 6800, sleep: 7.2 },
    { date: 'Tue', steps: 8200, sleep: 7.5 },
    { date: 'Wed', steps: 7100, sleep: 6.8 },
    { date: 'Thu', steps: 9100, sleep: 7.8 },
    { date: 'Fri', steps: 6200, sleep: 7.0 },
    { date: 'Sat', steps: 10500, sleep: 8.2 },
    { date: 'Sun', steps: 5800, sleep: 7.4 }
  ];

  const avgSteps = Math.round(chartData.reduce((sum, d) => sum + d.steps, 0) / 7);
  const avgSleep = (chartData.reduce((sum, d) => sum + d.sleep, 0) / 7).toFixed(1);
  const daysOver8k = chartData.filter(d => d.steps >= 8000).length;
  const daysOver7h = chartData.filter(d => d.sleep >= 7).length;

  return (
    <div className="min-h-screen px-6 pb-8 pt-4" style={{ backgroundColor: '#F7FAFC' }}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(125, 212, 176, 0.15)' }}>
              <BookOpen className="w-6 h-6" style={{ color: '#7DD4B0' }} />
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 500, color: '#2C3639' }}>
              Your Week
            </h1>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
            A narrative of your health journey
          </p>
        </div>

        <div className="space-y-6">
          {/* Weekly Story */}
          <Card 
            className="p-6 border-none" 
            style={{ background: 'linear-gradient(135deg, rgba(10, 132, 255, 0.06) 0%, rgba(125, 212, 176, 0.08) 100%)' }}
          >
            <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#2C3639', marginBottom: '1rem' }}>
              📖 This Week's Story
            </h3>
            <div className="space-y-4" style={{ fontSize: '0.875rem', color: '#2C3639', lineHeight: '1.6' }}>
              <p>
                This week, you averaged <strong>{avgSleep} hours of sleep</strong> per night and walked an average of <strong>{avgSteps.toLocaleString()} steps</strong> daily. Your body showed a consistent pattern—there's a gentle rhythm emerging in how rest and movement dance together.
              </p>
              <p>
                <strong>Your standout moments:</strong> On <strong>Saturday</strong>, you walked {chartData[5].steps.toLocaleString()} steps and slept {chartData[5].sleep} hours—your best day this week! Look at you go! 🌟
              </p>
              <p>
                Here's something beautiful I noticed: your heart rate was steadier on days with more sleep, suggesting your body knows exactly what it needs to recover. This connection between your sleep and cardiovascular health is your body's way of sending you wisdom. Are you listening? 💙
              </p>
            </div>
          </Card>

          {/* Wins This Week */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#2C3639', marginBottom: '1rem' }}>
              🎉 Wins This Week
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <Award className="w-5 h-5 mx-auto mb-2" style={{ color: '#7DD4B0' }} />
                <p style={{ fontSize: '1.5rem', fontWeight: 500, color: '#0A84FF', marginBottom: '0.25rem' }}>
                  {daysOver7h}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  nights 7+ hrs
                </p>
              </Card>

              <Card className="p-4 text-center">
                <TrendingUp className="w-5 h-5 mx-auto mb-2" style={{ color: '#0A84FF' }} />
                <p style={{ fontSize: '1.5rem', fontWeight: 500, color: '#0A84FF', marginBottom: '0.25rem' }}>
                  {daysOver8k}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  days 8k+ steps
                </p>
              </Card>

              <Card className="p-4 text-center">
                <Heart className="w-5 h-5 mx-auto mb-2" style={{ color: '#7DD4B0' }} />
                <p style={{ fontSize: '1.5rem', fontWeight: 500, color: '#0A84FF', marginBottom: '0.25rem' }}>
                  3
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  mindful moments
                </p>
              </Card>
            </div>
          </div>

          {/* Steps Chart */}
          <Card className="p-6">
            <h3 style={{ fontSize: '1rem', fontWeight: 500, color: '#2C3639', marginBottom: '1rem' }}>
              Steps Throughout the Week
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(44, 54, 57, 0.08)" />
                <XAxis dataKey="date" stroke="#6B7280" style={{ fontSize: '0.75rem' }} />
                <YAxis stroke="#6B7280" style={{ fontSize: '0.75rem' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid rgba(44, 54, 57, 0.08)',
                    borderRadius: '0.75rem',
                    fontSize: '0.875rem'
                  }}
                />
                <Bar dataKey="steps" fill="#0A84FF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Sleep Chart */}
          <Card className="p-6">
            <h3 style={{ fontSize: '1rem', fontWeight: 500, color: '#2C3639', marginBottom: '1rem' }}>
              Sleep Patterns
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(44, 54, 57, 0.08)" />
                <XAxis dataKey="date" stroke="#6B7280" style={{ fontSize: '0.75rem' }} />
                <YAxis domain={[0, 10]} stroke="#6B7280" style={{ fontSize: '0.75rem' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid rgba(44, 54, 57, 0.08)',
                    borderRadius: '0.75rem',
                    fontSize: '0.875rem'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sleep" 
                  stroke="#7DD4B0" 
                  strokeWidth={3}
                  dot={{ fill: '#7DD4B0', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Looking Ahead */}
          <Card 
            className="p-6 border-none" 
            style={{ background: 'linear-gradient(135deg, rgba(125, 212, 176, 0.1) 0%, rgba(10, 132, 255, 0.05) 100%)' }}
          >
            <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#2C3639', marginBottom: '0.75rem' }}>
              🌱 Looking Ahead
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#2C3639', marginBottom: '1rem', lineHeight: '1.6' }}>
              Based on your patterns, you seem to thrive when you maintain consistent sleep. Want to play with a gentle intention? Try getting 7+ hours on at least 5 nights next week and see how your body responds. It's an experiment, not a requirement!
            </p>
            <p style={{ fontSize: '0.875rem', color: '#2C3639', fontStyle: 'italic', lineHeight: '1.6' }}>
              ✨ Remember: This is your health journey, and you're the expert on your body. Progress isn't perfection—it's about learning what helps you feel your best.
            </p>
          </Card>

          {/* Reflection Prompt */}
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-3">
              <Calendar className="w-6 h-6 flex-shrink-0" style={{ color: '#0A84FF' }} />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 500, color: '#2C3639', marginBottom: '0.5rem' }}>
                  Reflection Question
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#2C3639', marginBottom: '0.75rem' }}>
                  What was one thing this week that made you feel energized?
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', fontStyle: 'italic' }}>
                  Take a moment to notice what your body is telling you. These insights help you understand your unique patterns.
                </p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <Button
            onClick={onPlanNextWeek}
            className="w-full h-14"
            style={{ 
              backgroundColor: '#0A84FF',
              color: '#FFFFFF',
              fontSize: '1rem',
              fontWeight: 500
            }}
          >
            Plan Next Week
          </Button>
        </div>
      </div>
    </div>
  );
}
