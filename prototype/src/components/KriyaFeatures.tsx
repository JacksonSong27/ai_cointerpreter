import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Sunrise, Sunset, Lightbulb, Activity, Brain, Heart, TrendingUp, Calendar, Sparkles } from 'lucide-react';

export function KriyaFeatures() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-block p-4 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-2xl mb-2">
          <Activity className="w-10 h-10 text-white" />
        </div>
        <h2>Understanding Kriya's 24-Hour Journey</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Kriya guides you through a compassionate daily cycle of prediction, reflection, and causal understanding. 
          Each stage builds on the last to help you discover *why* your health patterns emerge.
        </p>
      </div>

      {/* Three Acts Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Act I */}
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-950 dark:to-pink-950 border-orange-200 dark:border-orange-800">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg">
                <Sunrise className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-orange-500 text-white">Act I</Badge>
            </div>
            <h3>Morning Wager</h3>
            <p className="text-muted-foreground">
              Collaborative goal-setting with AI context awareness and comfort zone planning
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 mt-0.5 text-orange-600" />
                <span>AI analyzes your calendar & context</span>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 mt-0.5 text-orange-600" />
                <span>Set flexible comfort zones (not rigid targets)</span>
              </div>
              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 mt-0.5 text-orange-600" />
                <span>Add personal context tags</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Act II */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 border-purple-200 dark:border-purple-800">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg">
                <Sunset className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-purple-500 text-white">Act II</Badge>
            </div>
            <h3>Evening Debrief</h3>
            <p className="text-muted-foreground">
              Reframing outcomes & collaborative causal attribution (Detective Mode)
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 mt-0.5 text-purple-600" />
                <span>High Surprise indicator (not failure)</span>
              </div>
              <div className="flex items-start gap-2">
                <Brain className="w-4 h-4 mt-0.5 text-purple-600" />
                <span>Detective Mode: multi-select causes</span>
              </div>
              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 mt-0.5 text-purple-600" />
                <span>Grace Points for self-compassion</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Act III */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-blue-500 text-white">Act III</Badge>
            </div>
            <h3>What-If Plan</h3>
            <p className="text-muted-foreground">
              Counterfactual simulation & probability-based planning
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Brain className="w-4 h-4 mt-0.5 text-blue-600" />
                <span>AI links causes to tomorrow's plan</span>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 mt-0.5 text-blue-600" />
                <span>Scenario cards with probabilities</span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 mt-0.5 text-blue-600" />
                <span>Light challenges you can actually keep</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Feature Breakdown */}
      <div className="space-y-6">
        <h3>Core Features</h3>

        {/* Dashboard */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex-shrink-0">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="mb-2">Kriya Hub (Dashboard)</h4>
              <p className="text-muted-foreground mb-4">
                Your continuous health overview with quick access to all journeys
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">
                    <strong>Today's Metrics:</strong> Steps, Sleep, Heart Rate, Mindfulness at-a-glance
                  </p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">
                    <strong>Weekly Progress:</strong> Ring charts and progress bars for weekly intentions
                  </p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">
                    <strong>Entry Points:</strong> Quick navigation to Morning, Evening, Chat, and Digest
                  </p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">
                    <strong>Wisdom Quotes:</strong> Daily compassionate reminders from Kriya
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Chat Interface */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex-shrink-0">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="mb-2">Conversational Co-Interpreter</h4>
              <p className="text-muted-foreground mb-4">
                Natural language Q&A for exploring your health patterns with causal insights
              </p>
              <div className="space-y-2 text-sm">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-muted-foreground mb-1">Example Query:</p>
                  <p className="italic">"Why did my steps drop on Tuesday?"</p>
                  <p className="text-muted-foreground mt-2 mb-1">Kriya's Response:</p>
                  <p>"Looking at your data, Tuesday had your late workshop (from context tags) plus rainy weather. Your HR was also elevated (73 vs usual 68), suggesting stress. Does that feel right to you?"</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Weekly Digest */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex-shrink-0">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="mb-2">Weekly Narrative Digest</h4>
              <p className="text-muted-foreground mb-4">
                Causal storytelling with charts and compassionate framing
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">
                    <strong>Story Arc:</strong> Narrative summary connecting your week's patterns
                  </p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">
                    <strong>Visual Trends:</strong> Line & bar charts showing sleep, steps, activity
                  </p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">
                    <strong>Light Challenges:</strong> Gentle invitations based on discovered patterns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Goals/Intentions */}
        <Card className="p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="mb-2">Flexible Intentions (Not Rigid Goals)</h4>
              <p className="text-muted-foreground mb-4">
                Weekly budgets framed as learning tools, not performance metrics
              </p>
              <div className="space-y-2">
                <Badge variant="secondary">7h average sleep (not "7h every night")</Badge>
                <Badge variant="secondary">8k steps on 4+ days (not "8k daily")</Badge>
                <Badge variant="secondary">2 mindfulness sessions per week</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-3 italic">
                These are invitations for curiosity, not obligations for judgment
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Research Context */}
      <Card className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
        <h3 className="mb-4">Protocol A-H Research Study</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="mb-3">Study Design</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>2-condition crossover field study</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>36-40 participants</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Compares Kriya vs baseline health tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Synthetic Apple Health integration</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3">Research Hypotheses</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span><strong>Engagement:</strong> Causal reasoning increases daily interaction</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span><strong>Agency:</strong> What-If planning boosts perceived control</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span><strong>Stress:</strong> Self-compassion framing reduces health anxiety</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Technical Implementation */}
      <Card className="p-6">
        <h3 className="mb-4">Technical Architecture</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4>Frontend</h4>
            <div className="text-sm space-y-1 text-muted-foreground">
              <p>• React + TypeScript</p>
              <p>• Tailwind CSS styling</p>
              <p>• ShadCN UI components</p>
              <p>• Recharts for visualization</p>
            </div>
          </div>
          <div className="space-y-2">
            <h4>Data Layer</h4>
            <div className="text-sm space-y-1 text-muted-foreground">
              <p>• Mock Apple Health sync</p>
              <p>• TypeScript type system</p>
              <p>• Local state management</p>
              <p>• Real-time causal analysis</p>
            </div>
          </div>
          <div className="space-y-2">
            <h4>AI Features</h4>
            <div className="text-sm space-y-1 text-muted-foreground">
              <p>• Context-aware forecasting</p>
              <p>• Pattern detection</p>
              <p>• Probability simulation</p>
              <p>• Narrative generation</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
