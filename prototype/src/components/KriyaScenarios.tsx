import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Calendar, Users, TrendingUp, Heart, Brain, Moon, Footprints, Award, Sparkles, Target, Clock } from 'lucide-react';

export function KriyaScenarios() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-2">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2>Kriya in Action</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore how Kriya helps different users understand their health patterns through compassionate causal reasoning
        </p>
      </div>

      <Tabs defaultValue="sarah" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="sarah">Sarah</TabsTrigger>
          <TabsTrigger value="james">James</TabsTrigger>
          <TabsTrigger value="maya">Maya</TabsTrigger>
          <TabsTrigger value="alex">Alex</TabsTrigger>
        </TabsList>

        {/* Scenario 1: Sarah - Shift Worker */}
        <TabsContent value="sarah" className="space-y-4 mt-6">
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-500 rounded-full">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3>Sarah, 28 - Night Shift Nurse</h3>
                <p className="text-muted-foreground mt-2">
                  Rotating schedule makes sleep tracking confusing
                </p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Moon className="w-5 h-5 text-purple-500" />
                <h4>The Challenge</h4>
              </div>
              <p className="text-muted-foreground mb-4">
                Sarah's sleep varies wildly (4-9 hours). Traditional apps make her feel like she's "failing" when work requires night shifts.
              </p>
              <Badge variant="outline" className="mb-2">High Variability</Badge>
              <Badge variant="outline" className="mb-2">Shift Work</Badge>
              <Badge variant="outline">Guilt & Stress</Badge>
            </Card>

            <Card className="p-5 border-2 border-green-500 bg-green-50 dark:bg-green-950">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-green-600" />
                <h4>Kriya's Approach</h4>
              </div>
              <p className="text-muted-foreground mb-4">
                Kriya reframes: "Your body adapts remarkably to shift work. On night-shift days, you averaged 5.2h but quality was steady. Detective Mode revealed coffee after 6pm correlated with restless sleep."
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Grace points for unavoidable constraints</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>What-If: "Skip evening coffee → +35% better sleep quality"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Weekly digest celebrates consistency *within her constraints*</span>
                </li>
              </ul>
            </Card>
          </div>

          <Card className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-amber-600" />
              <h4>Outcome After 4 Weeks</h4>
            </div>
            <p className="italic">
              "I used to dread looking at my sleep data. Now I understand why some nights are hard, and I've found small tweaks that work within my schedule. Kriya doesn't judge—it helps me be my own detective."
            </p>
          </Card>
        </TabsContent>

        {/* Scenario 2: James - Chronic Pain Manager */}
        <TabsContent value="james" className="space-y-4 mt-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500 rounded-full">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3>James, 42 - Living with Chronic Back Pain</h3>
                <p className="text-muted-foreground mt-2">
                  Needs to balance activity with pain management
                </p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Footprints className="w-5 h-5 text-blue-500" />
                <h4>The Challenge</h4>
              </div>
              <p className="text-muted-foreground mb-4">
                James can't hit 10k steps without triggering pain flares. Traditional fitness apps feel demotivating and ignore his unique needs.
              </p>
              <Badge variant="outline" className="mb-2">Chronic Condition</Badge>
              <Badge variant="outline" className="mb-2">Pain Sensitivity</Badge>
              <Badge variant="outline">Frustration</Badge>
            </Card>

            <Card className="p-5 border-2 border-green-500 bg-green-50 dark:bg-green-950">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-green-600" />
                <h4>Kriya's Approach</h4>
              </div>
              <p className="text-muted-foreground mb-4">
                Morning forecast suggests: "Comfort zone: 3,500-5,000 steps (your sustainable range)." Detective Mode helps James notice: "Days with gentle stretching → 20% less pain, better sleep."
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Personalized baselines respect his body's limits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>What-If scenarios focus on quality over quantity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Celebrates micro-wins: "5 days within comfort zone!"</span>
                </li>
              </ul>
            </Card>
          </div>

          <Card className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h4>Outcome After 4 Weeks</h4>
            </div>
            <p className="italic">
              "For the first time, a health app meets me where I am. Kriya helped me discover that 15-min morning walks + evening stretches is my sweet spot—without triggering flares."
            </p>
          </Card>
        </TabsContent>

        {/* Scenario 3: Maya - Anxious Achiever */}
        <TabsContent value="maya" className="space-y-4 mt-6">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500 rounded-full">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3>Maya, 35 - Perfectionist Entrepreneur</h3>
                <p className="text-muted-foreground mt-2">
                  High achiever struggling with burnout
                </p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                <h4>The Challenge</h4>
              </div>
              <p className="text-muted-foreground mb-4">
                Maya obsesses over hitting 100% of goals. Misses one target → spiral of self-criticism. Heart rate data shows chronic stress.
              </p>
              <Badge variant="outline" className="mb-2">Perfectionism</Badge>
              <Badge variant="outline" className="mb-2">Burnout Risk</Badge>
              <Badge variant="outline">Self-Criticism</Badge>
            </Card>

            <Card className="p-5 border-2 border-green-500 bg-green-50 dark:bg-green-950">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-green-600" />
                <h4>Kriya's Approach</h4>
              </div>
              <p className="text-muted-foreground mb-4">
                Kriya reframes: "High surprise isn't failure—it's curiosity fuel." Detective Mode reveals: "Back-to-back meetings → elevated HR, poor sleep." Grace points become self-compassion practice.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Comfort zones replace rigid targets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>What-If: "Block 30-min lunch break → 40% stress reduction"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Weekly digest celebrates *learning*, not just outcomes</span>
                </li>
              </ul>
            </Card>
          </div>

          <Card className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h4>Outcome After 4 Weeks</h4>
            </div>
            <p className="italic">
              "I thought I needed more discipline. Kriya taught me I needed more self-compassion. Now I see 'off' days as data points, not moral failures. My resting HR dropped 8 bpm."
            </p>
          </Card>
        </TabsContent>

        {/* Scenario 4: Alex - Inconsistent Beginner */}
        <TabsContent value="alex" className="space-y-4 mt-6">
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-500 rounded-full">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3>Alex, 24 - Recent Grad with ADHD</h3>
                <p className="text-muted-foreground mt-2">
                  Struggles with consistency and routine
                </p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-amber-500" />
                <h4>The Challenge</h4>
              </div>
              <p className="text-muted-foreground mb-4">
                Alex forgets to track, gets hyperfocused on work, and feels overwhelmed by complex health apps. Needs simple, forgiving system.
              </p>
              <Badge variant="outline" className="mb-2">ADHD</Badge>
              <Badge variant="outline" className="mb-2">Low Consistency</Badge>
              <Badge variant="outline">Overwhelmed</Badge>
            </Card>

            <Card className="p-5 border-2 border-green-500 bg-green-50 dark:bg-green-950">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-muted-foreground mb-4">
                Kriya auto-syncs Apple Health data (no manual logging). Morning forecasts are quick (2 min). Detective Mode makes patterns visible: "Hyperfocus days → you skip meals → poor sleep."
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Zero manual input required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>What-If: "Set phone alarm for lunch → +2h sleep gain"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Grace points for "forgot to check app" days</span>
                </li>
              </ul>
            </Card>
          </div>

          <Card className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-blue-600" />
              <h4>Outcome After 4 Weeks</h4>
            </div>
            <p className="italic">
              "Other apps felt like homework. Kriya is like having a non-judgmental friend who notices patterns I miss. The What-If scenarios actually stick because they're tiny and specific."
            </p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Key Features Summary */}
      <Card className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
        <h3 className="mb-4">What Makes Kriya Different</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <h4>Causal Understanding</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Detective Mode helps you discover *why* patterns emerge, not just what happened
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-600" />
              <h4>Self-Compassion First</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Grace points and comfort zones replace judgment with curiosity
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h4>Actionable Simulations</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              What-If scenarios show probable outcomes before you commit
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
