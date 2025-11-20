import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Heart, Sunrise, Sunset, Target, Lightbulb, Info, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';

interface PrototypeWelcomeProps {
  onStart: () => void;
}

export function PrototypeWelcome({ onStart }: PrototypeWelcomeProps) {
  const [step, setStep] = useState(0);

  const welcomeSteps = [
    {
      title: "Welcome to Kriya",
      subtitle: "Protocol A-H Research Study",
      icon: <Heart className="w-12 h-12 text-green-600" />,
      content: (
        <div className="space-y-4">
          <p>
            Thank you for participating in this research study. <strong>Kriya</strong> is your compassionate AI health companion designed to help you explore the connection between your daily intentions and health outcomes.
          </p>
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">Research Prototype</p>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  This is a prototype for research purposes. All data is simulated and for demonstration only.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-medium">Study Focus:</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Testing causal reasoning and attribution features</li>
              <li>• Exploring self-compassion in health tracking</li>
              <li>• Evaluating flexible goal-setting approaches</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "The Three-Act Daily Cycle",
      subtitle: "Your daily journey with Kriya",
      icon: <Target className="w-12 h-12 text-purple-600" />,
      content: (
        <div className="space-y-4">
          <p className="mb-4">
            Kriya follows a natural three-act structure aligned with your day:
          </p>
          
          <Card className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-orange-200">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Sunrise className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="mb-1">Act I: Morning Wager</h4>
                <p className="text-sm text-muted-foreground">
                  Set flexible comfort zones for the day ahead. The AI provides predictions based on your patterns, and you define what feels achievable today.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Sunset className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="mb-1">Act II: Evening Debrief</h4>
                <p className="text-sm text-muted-foreground">
                  Use "Detective Mode" to explore what influenced your day. Reframe outcomes with compassion and celebrate what you learned.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="mb-1">Act III: Plan Tomorrow</h4>
                <p className="text-sm text-muted-foreground">
                  Explore what-if scenarios and plan tomorrow with insight. See how different choices affect your probability of success.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      title: "Getting Started",
      subtitle: "Four scenarios to explore",
      icon: <Lightbulb className="w-12 h-12 text-amber-600" />,
      content: (
        <div className="space-y-4">
          <p className="mb-4">
            In this prototype, you'll experience <strong>four different daily scenarios</strong> that demonstrate how Kriya adapts to various contexts:
          </p>
          
          <div className="grid grid-cols-1 gap-3">
            <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
              <div className="flex items-start gap-3">
                <Badge className="bg-blue-600 text-white shrink-0">A</Badge>
                <div>
                  <h4 className="text-sm mb-1">Rainy Day + Long Meeting</h4>
                  <p className="text-xs text-muted-foreground">
                    Low sleep, challenging weather, busy schedule
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950">
              <div className="flex items-start gap-3">
                <Badge className="bg-amber-600 text-white shrink-0">B</Badge>
                <div>
                  <h4 className="text-sm mb-1">Sunny Day + Open Afternoon</h4>
                  <p className="text-xs text-muted-foreground">
                    Good sleep, nice weather, light schedule
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
              <div className="flex items-start gap-3">
                <Badge className="bg-red-600 text-white shrink-0">C</Badge>
                <div>
                  <h4 className="text-sm mb-1">Heavy Stress + Poor Sleep</h4>
                  <p className="text-xs text-muted-foreground">
                    Very low sleep, important presentation, stressed
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
              <div className="flex items-start gap-3">
                <Badge className="bg-green-600 text-white shrink-0">D</Badge>
                <div>
                  <h4 className="text-sm mb-1">Weekend + Lots of Errands</h4>
                  <p className="text-xs text-muted-foreground">
                    Great sleep, active plans, weekend freedom
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-4 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
            <p className="text-sm italic text-center">
              💫 Pick one to start to see how Kriya's AI adapts its predictions and guidance
            </p>
          </Card>
        </div>
      )
    }
  ];

  const currentStep = welcomeSteps[step];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full p-8 shadow-xl">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {welcomeSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === step
                  ? 'w-8 bg-primary'
                  : index < step
                  ? 'w-2 bg-primary/50'
                  : 'w-2 bg-gray-300 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            {currentStep.icon}
          </div>
          <h2 className="mb-2">{currentStep.title}</h2>
          <p className="text-muted-foreground">{currentStep.subtitle}</p>
        </div>

        <div className="mb-8 h-[420px] overflow-y-auto">
          {currentStep.content}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
          >
            Previous
          </Button>

          <Badge variant="secondary" className="px-3 py-1">
            {step + 1} of {welcomeSteps.length}
          </Badge>

          {step < welcomeSteps.length - 1 ? (
            <Button onClick={() => setStep(step + 1)}>
              Next
            </Button>
          ) : (
            <Button
              onClick={onStart}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              Start Using Kriya
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}