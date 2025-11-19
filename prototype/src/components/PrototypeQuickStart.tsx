import { Card } from './ui/card';
import { Button } from './ui/button';
import { Sunrise, Sunset, Target, X } from 'lucide-react';
import { useState } from 'react';

interface PrototypeQuickStartProps {
  onNavigate: (tab: string) => void;
}

export function PrototypeQuickStart({ onNavigate }: PrototypeQuickStartProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 border-2 border-blue-200 dark:border-blue-800 relative">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 p-1 hover:bg-background/50 rounded-full transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="space-y-4">
        <div>
          <h3 className="mb-1">🎯 Quick Start Guide</h3>
          <p className="text-sm text-muted-foreground">
            Welcome to your Kriya prototype! Here's how to explore the three-act daily cycle:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => onNavigate('morning')}
            className="text-left p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg border border-orange-200 dark:border-orange-800 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Sunrise className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-sm">1. Morning Wager</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              Set your comfort zones and see AI predictions for today
            </p>
            <div className="mt-2 text-xs text-orange-600 dark:text-orange-400 group-hover:underline">
              Go to Morning →
            </div>
          </button>

          <button
            onClick={() => onNavigate('evening')}
            className="text-left p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg border border-purple-200 dark:border-purple-800 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Sunset className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-sm">2. Evening Debrief</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              Use Detective Mode to reflect on your day with compassion
            </p>
            <div className="mt-2 text-xs text-purple-600 dark:text-purple-400 group-hover:underline">
              Go to Evening →
            </div>
          </button>

          <button
            onClick={() => onNavigate('goals')}
            className="text-left p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg border border-green-200 dark:border-green-800 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-600 rounded-lg">
                <Target className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-sm">3. Check Goals</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              Review your weekly progress and adjust your targets
            </p>
            <div className="mt-2 text-xs text-green-600 dark:text-green-400 group-hover:underline">
              View Goals →
            </div>
          </button>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground italic">
            💡 Tip: All data is simulated for this research prototype
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDismissed(true)}
            className="text-xs"
          >
            Got it, hide this
          </Button>
        </div>
      </div>
    </Card>
  );
}