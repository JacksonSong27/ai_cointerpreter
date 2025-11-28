import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Send, Bot, User, Lightbulb, Sparkles, Sunrise, Sunset, Calendar, 
  TrendingUp, TrendingDown, ArrowRight, Target, Heart, Activity,
  MessageSquare, ExternalLink, Brain, HelpCircle, CheckCircle2, XCircle,
  Eye, GitBranch, Zap, AlertCircle, ChevronRight, Plus, Minus
} from 'lucide-react';
import { 
  ChatMessage, QuickAction, DataCard, HealthMetric, DailyForecast,
  ReasoningStep, ReasoningChain, Hypothesis, Pattern, Counterfactual
} from '../types/health';

interface ChatInterfaceProps {
  healthData: HealthMetric[];
  forecasts?: DailyForecast[];
  compact?: boolean;
  resetScroll?: boolean;
  currentPage?: 'dashboard' | 'morning' | 'evening' | 'plan' | 'chat' | 'digest' | 'goals';
  onNavigate?: (page: string) => void;
}

interface EnhancedResponse {
  content: string;
  quickActions?: QuickAction[];
  dataCard?: DataCard;
  suggestedQuestions?: string[];
  reasoningChain?: ReasoningChain;
  hypotheses?: Hypothesis[];
  patterns?: Pattern[];
  counterfactuals?: Counterfactual[];
  requiresUserInput?: boolean;
  uncertainty?: string;
}

export function ChatInterface({ 
  healthData, 
  forecasts = [],
  compact = false, 
  resetScroll,
  currentPage = 'chat',
  onNavigate
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Kriya, your partner in care. I'm here to help you understand *why* your health data fluctuates, not just *what* happened. Ask me anything!",
      timestamp: new Date(),
      suggestedQuestions: getContextualQuestions(currentPage)
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationMemory, setConversationMemory] = useState<string[]>([]);
  const [activeHypotheses, setActiveHypotheses] = useState<Hypothesis[]>([]);
  const [userInsights, setUserInsights] = useState<string[]>([]);
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());
  const [userPreferences, setUserPreferences] = useState<{
    showReasoning: boolean;
    showHypotheses: boolean;
    showPatterns: boolean;
    showCounterfactuals: boolean;
  }>({
    showReasoning: false,
    showHypotheses: false,
    showPatterns: false,
    showCounterfactuals: false
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Get contextual quick questions based on current page
  function getContextualQuestions(page: string): string[] {
    const baseQuestions = [
      "Why do my steps vary so much?",
      "Is it okay that I'm having an off day?",
      "Why did I feel different from what the data shows?"
    ];

    const pageQuestions: Record<string, string[]> = {
      morning: [
        "Why are you predicting such low steps for today?",
        "How should I set my comfort zone?",
        "What factors affect my forecast?"
      ],
      evening: [
        "Why didn't I meet my step goal today?",
        "What caused today's outcome?",
        "How do I reflect on today?"
      ],
      plan: [
        "What's the best plan for tomorrow?",
        "How can I improve my chances?",
        "What if I can't do the plan?"
      ],
      dashboard: [
        "What patterns do you see?",
        "How am I doing this week?",
        "What should I focus on?"
      ]
    };

    return pageQuestions[page] || baseQuestions;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const scrollToTop = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = 0;
      }
    }, 100);
    return () => clearTimeout(scrollToTop);
  }, [resetScroll]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Generate co-interpretation reasoning chain
  const generateReasoningChain = (question: string, topic: string): ReasoningChain => {
    const todayData = healthData[healthData.length - 1];
    const weekData = healthData.slice(-7);
    const avgSteps = weekData.reduce((sum, d) => sum + d.steps, 0) / weekData.length;
    
    const steps: ReasoningStep[] = [];
    
    if (topic === 'missed_goal') {
      steps.push(
        {
          id: 'obs1',
          type: 'observation',
          content: `I see you took ${todayData?.steps || 0} steps today, which is below your comfort zone.`,
          confidence: 'high',
          dataPoints: [`Today's steps: ${todayData?.steps || 0}`]
        },
        {
          id: 'obs2',
          type: 'observation',
          content: `Your sleep last night was ${todayData?.sleep.toFixed(1) || '6.5'} hours, which is below your 7-day average of ${(weekData.reduce((sum, d) => sum + d.sleep, 0) / weekData.length).toFixed(1)} hours.`,
          confidence: 'high',
          dataPoints: [`Sleep: ${todayData?.sleep.toFixed(1)}h`, `Average: ${(weekData.reduce((sum, d) => sum + d.sleep, 0) / weekData.length).toFixed(1)}h`]
        },
        {
          id: 'inf1',
          type: 'inference',
          content: `There's often a correlation between lower sleep and reduced movement the next day.`,
          confidence: 'medium',
          dataPoints: ['Pattern from your history']
        },
        {
          id: 'unc1',
          type: 'uncertainty',
          content: `But I can't see everything—like your stress levels, calendar commitments, or how you felt. What else was happening today?`,
          confidence: 'low',
          requiresUserInput: true
        }
      );
    } else if (topic === 'steps_vary') {
      steps.push(
        {
          id: 'obs1',
          type: 'observation',
          content: `Your steps range from ${Math.min(...weekData.map(d => d.steps))} to ${Math.max(...weekData.map(d => d.steps))} over the past week.`,
          confidence: 'high',
          dataPoints: weekData.map(d => `${d.date}: ${d.steps} steps`)
        },
        {
          id: 'inf1',
          type: 'inference',
          content: `This variation looks natural—weekends tend to be different from weekdays, and weather/energy levels shift.`,
          confidence: 'medium'
        },
        {
          id: 'hyp1',
          type: 'hypothesis',
          content: `I'm wondering if weekends show a different pattern than weekdays. What do you notice?`,
          confidence: 'low',
          requiresUserInput: true
        }
      );
    } else if (topic === 'poor_sleep') {
      const avgSleep = weekData.reduce((sum, d) => sum + d.sleep, 0) / weekData.length;
      steps.push(
        {
          id: 'obs1',
          type: 'observation',
          content: `You slept ${todayData?.sleep.toFixed(1) || '6.5'} hours last night.`,
          confidence: 'high',
          dataPoints: [`Last night: ${todayData?.sleep.toFixed(1) || '6.5'}h`, `Your 7-day average: ${avgSleep.toFixed(1)}h`]
        },
        {
          id: 'obs2',
          type: 'observation',
          content: `Your weekly average is ${avgSleep.toFixed(1)} hours, which ${avgSleep < 7 ? 'is below' : 'meets'} the recommended 7-9 hours.`,
          confidence: 'high',
          dataPoints: [`Average: ${avgSleep.toFixed(1)}h`]
        },
        {
          id: 'inf1',
          type: 'inference',
          content: `Sleep quality can vary even when hours look similar. Restlessness, stress, or environmental factors affect how restful sleep feels.`,
          confidence: 'medium'
        },
        {
          id: 'unc1',
          type: 'uncertainty',
          content: `I can only see the hours, not how you actually felt. Was it restful or restless? What was your experience?`,
          confidence: 'low',
          requiresUserInput: true
        }
      );
    } else if (topic === 'prediction') {
      const stepsForecast = forecasts.find(f => f.metric === 'steps');
      steps.push(
        {
          id: 'obs1',
          type: 'observation',
          content: `I'm forecasting ${stepsForecast?.predicted || 'lower'} steps for today based on patterns I see.`,
          confidence: 'medium',
          dataPoints: stepsForecast ? [`Forecast: ${stepsForecast.predicted} steps`] : []
        },
        {
          id: 'inf1',
          type: 'inference',
          content: `Forecasts are probabilities, not certainties. Your day can unfold differently based on choices and circumstances.`,
          confidence: 'medium'
        },
        {
          id: 'unc1',
          type: 'uncertainty',
          content: `I don't know what's on your calendar, how you're feeling, or what might come up. Your context would help me be more accurate.`,
          confidence: 'low',
          requiresUserInput: true
        }
      );
    }

    return {
      id: Date.now().toString(),
      question,
      steps,
      uncertainty: "I'd love to hear your perspective on this. What feels true to you?",
      openQuestions: ["What patterns do you notice?", "What factors do you think matter most?"]
    };
  };

  // Generate hypotheses for co-exploration
  const generateHypotheses = (topic: string): Hypothesis[] => {
    const todayData = healthData[healthData.length - 1];
    const weekData = healthData.slice(-7);
    const avgSleep = weekData.reduce((sum, d) => sum + d.sleep, 0) / weekData.length;
    
    if (topic === 'missed_goal') {
      return [
        {
          id: 'h1',
          statement: 'Lower sleep last night reduced your energy and movement today',
          confidence: 'medium',
          evidence: [
            `Sleep was ${todayData?.sleep.toFixed(1)}h (below average)`,
            'Historical pattern: low sleep → lower steps next day'
          ],
          alternativeExplanations: [
            'Weather might have been a factor',
            'Calendar commitments could have limited movement',
            'Stress or mood might have played a role'
          ]
        },
        {
          id: 'h2',
          statement: 'Today\'s schedule had fewer movement opportunities',
          confidence: 'low',
          evidence: ['Need your input: What was your day like?'],
          requiresUserInput: true
        }
      ];
    } else if (topic === 'poor_sleep') {
      return [
        {
          id: 'h1',
          statement: 'Stress or anxiety from yesterday affected your sleep quality',
          confidence: 'low',
          evidence: ['Need your input: How were you feeling yesterday evening?'],
          alternativeExplanations: [
            'Late bedtime or screen time before sleep',
            'Environmental factors (noise, temperature, light)',
            'Physical discomfort or pain'
          ],
          requiresUserInput: true
        },
        {
          id: 'h2',
          statement: 'Your sleep schedule shifted later than usual',
          confidence: 'medium',
          evidence: [
            `You slept ${todayData?.sleep.toFixed(1)}h`,
            `Your average is ${avgSleep.toFixed(1)}h`
          ],
          alternativeExplanations: [
            'Evening activities ran late',
            'Work or social commitments',
            'Natural circadian rhythm shift'
          ]
        }
      ];
    }
    
    return [];
  };

  // Generate patterns for collaborative discovery
  const generatePatterns = (topic: string): Pattern[] => {
    const weekData = healthData.slice(-7);
    
    if (topic === 'steps_vary') {
      const weekendSteps = weekData.filter((d, i) => {
        const date = new Date(d.date);
        return date.getDay() === 0 || date.getDay() === 6;
      }).map(d => d.steps);
      
      const weekdaySteps = weekData.filter((d, i) => {
        const date = new Date(d.date);
        return date.getDay() !== 0 && date.getDay() !== 6;
      }).map(d => d.steps);
      
      if (weekendSteps.length > 0 && weekdaySteps.length > 0) {
        const weekendAvg = weekendSteps.reduce((a, b) => a + b, 0) / weekendSteps.length;
        const weekdayAvg = weekdaySteps.reduce((a, b) => a + b, 0) / weekdaySteps.length;
        
        return [
          {
            id: 'p1',
            description: weekendAvg > weekdayAvg 
              ? `Weekends tend to have higher steps (avg ${Math.round(weekendAvg)}) than weekdays (avg ${Math.round(weekdayAvg)})`
              : `Weekdays tend to have higher steps (avg ${Math.round(weekdayAvg)}) than weekends (avg ${Math.round(weekendAvg)})`,
            dataPoints: weekData.map(d => d.steps),
            confidence: 'medium'
          }
        ];
      }
    } else if (topic === 'poor_sleep') {
      const sleepValues = weekData.map(d => d.sleep);
      const minSleep = Math.min(...sleepValues);
      const maxSleep = Math.max(...sleepValues);
      const avgSleep = sleepValues.reduce((a, b) => a + b, 0) / sleepValues.length;
      
      return [
        {
          id: 'p1',
          description: `Your sleep ranges from ${minSleep.toFixed(1)}h to ${maxSleep.toFixed(1)}h, with an average of ${avgSleep.toFixed(1)}h`,
          dataPoints: sleepValues,
          confidence: 'high'
        }
      ];
    }
    
    return [];
  };

  // Generate counterfactual scenarios
  const generateCounterfactuals = (topic: string): Counterfactual[] => {
    const todayData = healthData[healthData.length - 1];
    const weekData = healthData.slice(-7);
    const avgSleep = weekData.reduce((sum, d) => sum + d.sleep, 0) / weekData.length;
    
    if (topic === 'missed_goal') {
      return [
        {
          id: 'cf1',
          question: 'What if you had slept 8 hours instead of ' + todayData?.sleep.toFixed(1) + '?',
          scenario: 'Better sleep recovery',
          predictedOutcome: 'Steps might have been 15-20% higher, based on your patterns',
          confidence: 'medium',
          reasoning: [
            'Your historical data shows sleep quality affects next-day movement',
            '8 hours is closer to your optimal range',
            'Better rest typically supports more activity'
          ]
        },
        {
          id: 'cf2',
          question: 'What if you had taken a 15-minute lunch walk?',
          scenario: 'Added intentional movement',
          predictedOutcome: 'Could have added ~2,000 steps, bringing you closer to your comfort zone',
          confidence: 'high',
          reasoning: [
            'A 15-min walk typically adds 1,500-2,500 steps',
            'This is a low-barrier intervention',
            'Fits into most schedules'
          ]
        }
      ];
    } else if (topic === 'poor_sleep') {
      return [
        {
          id: 'cf1',
          question: 'What if you had gone to bed 30 minutes earlier?',
          scenario: 'Earlier bedtime',
          predictedOutcome: `Might have added ${(0.5).toFixed(1)}-1 hour of sleep, potentially improving rest quality`,
          confidence: 'medium',
          reasoning: [
            'Earlier bedtimes often lead to more total sleep',
            'Your body has more time to complete sleep cycles',
            'Quality can improve with adequate time'
          ]
        },
        {
          id: 'cf2',
          question: 'What if you had reduced screen time before bed?',
          scenario: 'Less blue light exposure',
          predictedOutcome: 'Could improve sleep quality and make sleep feel more restful',
          confidence: 'medium',
          reasoning: [
            'Blue light can disrupt natural sleep hormones',
            'Reducing screens often improves sleep onset',
            'Better sleep quality even with same hours'
          ]
        }
      ];
    }
    
    return [];
  };

  // Enhanced response generator with co-interpretation
  const generateEnhancedResponse = (userQuestion: string): EnhancedResponse => {
    const lowerQ = userQuestion.toLowerCase();
    const todayData = healthData[healthData.length - 1];
    const avgSteps = healthData.slice(-7).reduce((sum, d) => sum + d.steps, 0) / Math.min(7, healthData.length);
    
    // Determine topic - check sleep first to avoid matching "step" in "sleep"
    let topic = '';
    if (lowerQ.includes('sleep') && (lowerQ.includes('poor') || lowerQ.includes('bad') || lowerQ.includes('terrible') || lowerQ.includes('awful'))) {
      topic = 'poor_sleep';
    } else if (lowerQ.includes('step') && (lowerQ.includes('goal') || lowerQ.includes('meet') || lowerQ.includes('miss'))) {
      topic = 'missed_goal';
    } else if (lowerQ.includes('vary') || lowerQ.includes('fluctuate') || lowerQ.includes('pattern')) {
      topic = 'steps_vary';
    } else if (lowerQ.includes('feel') && lowerQ.includes('different')) {
      topic = 'feel_different';
    } else if (lowerQ.includes('predict') || lowerQ.includes('forecast') || lowerQ.includes('low step')) {
      topic = 'prediction';
    } else if (lowerQ.includes('off day') || lowerQ.includes('okay')) {
      topic = 'off_day';
    }

    // Generate co-interpretation components
    const reasoningChain = topic ? generateReasoningChain(userQuestion, topic) : undefined;
    const hypotheses = topic ? generateHypotheses(topic) : [];
    const patterns = topic ? generatePatterns(topic) : [];
    const counterfactuals = topic ? generateCounterfactuals(topic) : [];

    // Enhanced responses with co-interpretation - Expanded with original content + variants
    const responseSets = [
      {
        // Topic 1: Missed step goal - 3 variants
        keywords: ['step', 'goal', 'meet', 'met', 'didn\'t', 'didn', 'not meet', 'miss', 'missed', 'failed', 'achieve', 'reach', 'hit', 'below'],
        responses: [
          {
            content: `From what I can see, today had a few elements that often lower movement—a long meeting block, less sleep than usual, and the rainy afternoon. These aren't 'failures'; they're just parts of the day that shape rhythm. What do you think influenced your day the most?`,
            quickActions: [
              { id: 'nav-evening', label: 'Review Today', action: 'navigate' as const, target: 'evening' },
              { id: 'suggest-plan', label: 'Plan Tomorrow', action: 'navigate' as const, target: 'plan' }
            ],
            reasoningChain,
            hypotheses,
            patterns,
            counterfactuals,
            requiresUserInput: true,
            uncertainty: "I can see the numbers, but I don't know how you felt or what your day was really like. Can you help me understand?",
            suggestedQuestions: [
              'What caused the biggest impact?',
              'How do I bounce back?',
              'Should I adjust my goals?'
            ]
          },
          {
            content: `I notice your steps were lower today. Looking at your patterns, days with less sleep (like last night's ${todayData?.sleep.toFixed(1) || '6.5'} hours) often correlate with reduced movement. This isn't a judgment—it's your body being honest about what it needs.`,
            quickActions: [
              { id: 'ask-sleep', label: 'Tell me about sleep', action: 'suggest' as const, question: 'Why did I sleep so poorly last night?' },
              { id: 'nav-evening', label: 'Evening Reflection', action: 'navigate' as const, target: 'evening' }
            ],
            reasoningChain,
            hypotheses,
            patterns,
            counterfactuals,
            requiresUserInput: true,
            suggestedQuestions: [
              'Why does sleep affect steps?',
              'How can I improve tomorrow?',
              'Is this pattern normal?'
            ]
          },
          {
            content: `Missing a goal can feel disappointing, but remember: your comfort zone is a learning space, not a performance metric. What matters is understanding the 'why' behind today's pattern. Would you like to explore what might have influenced it?`,
            quickActions: [
              { id: 'nav-evening', label: 'Evening Reflection', action: 'navigate', target: 'evening' },
              { id: 'ask-vary', label: 'Why steps vary', action: 'suggest' as const, question: 'Why do my steps vary so much?' }
            ],
            reasoningChain,
            hypotheses,
            patterns,
            counterfactuals,
            requiresUserInput: true,
            suggestedQuestions: [
              'What patterns do you see?',
              'How do I work with my natural rhythm?',
              'Should I change my approach?'
            ]
          }
        ]
      },
      {
        // Topic 2: Low step prediction - 2 variants
        keywords: ['predict', 'predicting', 'prediction', 'forecast', 'low steps', 'low step', 'expecting', 'expect', 'today', 'tomorrow'],
        responses: [
          {
            content: `I noticed you had a short sleep and a busy afternoon ahead. Days like this tend to naturally slow movement. That doesn't mean anything is wrong—it just helps me set a gentle expectation so you don't feel pressured.`,
            quickActions: [
              { id: 'nav-morning', label: 'Set Comfort Zone', action: 'navigate' as const, target: 'morning' },
              { id: 'ask-vary', label: 'Why do steps vary?', action: 'suggest' as const, question: 'Why do my steps vary so much?' }
            ],
            reasoningChain: topic === 'prediction' ? generateReasoningChain(userQuestion, 'prediction') : undefined,
            hypotheses: [],
            patterns: [],
            counterfactuals: [],
            requiresUserInput: true,
            uncertainty: "My forecast is based on limited data. Your context—like how you're feeling or what's on your calendar—would help me be more accurate.",
            suggestedQuestions: [
              'How accurate are your predictions?',
              'What factors affect the forecast?',
              'Can I still hit my goal?'
            ]
          },
          {
            content: `My forecast considers your sleep quality, calendar commitments, and weather patterns. Today's prediction reflects a combination of these factors. Remember, forecasts are probabilities, not certainties—you're always in control.`,
            quickActions: [
              { id: 'nav-morning', label: 'Adjust Forecast', action: 'navigate' as const, target: 'morning' },
              { id: 'nav-plan', label: 'Plan for Success', action: 'navigate' as const, target: 'plan' }
            ],
            reasoningChain: topic === 'prediction' ? generateReasoningChain(userQuestion, 'prediction') : undefined,
            hypotheses: [],
            patterns: [],
            counterfactuals: [],
            requiresUserInput: true,
            suggestedQuestions: [
              'What if I want to exceed the forecast?',
              'How do I improve my chances?',
              'What factors matter most?'
            ]
          }
        ]
      },
      {
        // Topic 3: Poor sleep - 2 variants
        keywords: ['sleep', 'slept', 'sleeping', 'poorly', 'poor', 'bad', 'terrible', 'awful', 'last night', 'night', 'rest', 'tired', 'exhausted'],
        responses: [
          {
            content: `I can't see everything, but I did notice a later-than-usual bedtime and a high-stress marker from your evening. Those patterns often affect sleep. Does that match your sense of the night?`,
            quickActions: [
              { id: 'ask-feel', label: 'How I felt', action: 'suggest' as const, question: 'Why did I feel so differently from what the data shows?' },
              { id: 'nav-plan', label: 'Plan Better Sleep', action: 'navigate' as const, target: 'plan' }
            ],
            reasoningChain: topic === 'poor_sleep' ? generateReasoningChain(userQuestion, 'poor_sleep') : undefined,
            hypotheses: topic === 'poor_sleep' ? generateHypotheses('poor_sleep') : [],
            patterns: topic === 'poor_sleep' ? generatePatterns('poor_sleep') : [],
            counterfactuals: topic === 'poor_sleep' ? generateCounterfactuals('poor_sleep') : [],
            requiresUserInput: true,
            uncertainty: `I can see you slept ${healthData[healthData.length - 1]?.sleep.toFixed(1) || 'X'} hours, but I can't know if it was restful or restless. Your experience is the real data.`,
            suggestedQuestions: [
              'What affects sleep quality?',
              'How can I sleep better?',
              'Is this pattern normal?'
            ]
          },
          {
            content: `Sleep quality matters more than quantity sometimes. Even if the hours look low, how you felt when you woke up tells the real story. What was your experience this morning?`,
            quickActions: [
              { id: 'ask-feel', label: 'Share my experience', action: 'suggest' as const, question: 'Why did I feel so differently from what the data shows?' },
              { id: 'nav-plan', label: 'Improve Sleep', action: 'navigate' as const, target: 'plan' }
            ],
            reasoningChain: topic === 'poor_sleep' ? generateReasoningChain(userQuestion, 'poor_sleep') : undefined,
            hypotheses: topic === 'poor_sleep' ? generateHypotheses('poor_sleep') : [],
            patterns: topic === 'poor_sleep' ? generatePatterns('poor_sleep') : [],
            counterfactuals: topic === 'poor_sleep' ? generateCounterfactuals('poor_sleep') : [],
            requiresUserInput: true,
            suggestedQuestions: [
              'How do I track sleep quality?',
              'What helps with restful sleep?',
              'Why does sleep vary?'
            ]
          }
        ]
      },
      {
        // Topic 4: Steps vary - 2 variants
        keywords: ['vary', 'varies', 'variation', 'fluctuate', 'fluctuation', 'fluctuates', 'change', 'different', 'inconsistent', 'so much', 'why do', 'pattern'],
        responses: [
          {
            content: `It's completely normal for movement to fluctuate. Weekends, weather, meetings, energy, and social plans all weave together. Your pattern looks more human than inconsistent.`,
            quickActions: [
              { id: 'nav-dashboard', label: 'View Patterns', action: 'navigate' as const, target: 'dashboard' },
              { id: 'nav-digest', label: 'Weekly Summary', action: 'navigate' as const, target: 'digest' }
            ],
            reasoningChain,
            hypotheses: [],
            patterns,
            counterfactuals: [],
            requiresUserInput: true,
            suggestedQuestions: [
              'What causes the biggest variations?',
              'Is this pattern normal?',
              'How can I work with my natural rhythm?'
            ]
          },
          {
            content: `Variation isn't inconsistency—it's responsiveness. Your body adapts to different days, energy levels, and contexts. That's actually a sign of a healthy, dynamic relationship with movement.`,
            quickActions: [
              { id: 'nav-dashboard', label: 'See My Patterns', action: 'navigate' as const, target: 'dashboard' },
              { id: 'nav-digest', label: 'Weekly Insights', action: 'navigate' as const, target: 'digest' }
            ],
            reasoningChain,
            hypotheses: [],
            patterns,
            counterfactuals: [],
            requiresUserInput: true,
            suggestedQuestions: [
              'What patterns do you notice?',
              'How do I embrace variation?',
              "What's a healthy range?"
            ]
          }
        ]
      },
      {
        // Topic 5: Feel different from data - 2 variants
        keywords: ['feel', 'feeling', 'felt', 'differently', 'different', 'data', 'show', 'shows', 'number', 'actual', 'reality', 'vs', 'versus', 'emotion', 'emotional'],
        responses: [
          {
            content: `That is the most important question. Data only captures pieces—like hours of sleep—but it misses the quality of your rest or your emotional state. Tell me a bit more about how you felt: was it mental fatigue, physical tiredness, or something else? Your experience is the full story.`,
            quickActions: [
              { id: 'ask-off', label: 'Having an off day', action: 'suggest' as const, question: 'Is it okay that I\'m having an off day?' },
              { id: 'nav-evening', label: 'Reflect on Today', action: 'navigate' as const, target: 'evening' }
            ],
            reasoningChain: undefined,
            hypotheses: [],
            patterns: [],
            counterfactuals: [],
            requiresUserInput: true,
            uncertainty: "I can only see numbers. Your emotional state, stress levels, and lived experience are invisible to me but crucial to understanding.",
            suggestedQuestions: [
              'How do I trust my feelings vs data?',
              'Why does data sometimes feel wrong?',
              'How can I balance both?'
            ]
          },
          {
            content: `Your feelings are valid, even when they don't match the numbers. Data is one lens; your lived experience is another. Both matter. What feels most true to you right now?`,
            quickActions: [
              { id: 'nav-evening', label: 'Reflect on Today', action: 'navigate' as const, target: 'evening' },
              { id: 'ask-off', label: 'Is this normal?', action: 'suggest' as const, question: 'Is it okay that I\'m having an off day?' }
            ],
            reasoningChain: undefined,
            hypotheses: [],
            patterns: [],
            counterfactuals: [],
            requiresUserInput: true,
            suggestedQuestions: [
              'How do I reconcile data and feelings?',
              'What if I feel great but data looks low?',
              'How do I use both insights?'
            ]
          }
        ]
      },
      {
        // Topic 6: Off day - 2 variants
        keywords: ['okay', 'ok', 'off day', 'off', 'bad day', 'fine', 'alright', 'normal', 'struggle', 'struggling', 'hard', 'difficult', 'having'],
        responses: [
          {
            content: `Absolutely. Your rhythms naturally ebb and flow. Off days often happen when sleep, stress, or timing shifts. They're signals, not setbacks.`,
            quickActions: [
              { id: 'nav-plan', label: 'Plan Tomorrow', action: 'navigate' as const, target: 'plan' },
              { id: 'ask-vary', label: 'Why steps vary', action: 'suggest' as const, question: 'Why do my steps vary so much?' }
            ],
            reasoningChain: undefined,
            hypotheses: [],
            patterns: [],
            counterfactuals: [],
            requiresUserInput: false,
            suggestedQuestions: [
              'How do I bounce back?',
              'Should I adjust my goals?',
              'What helps on off days?'
            ]
          },
          {
            content: `Off days are part of the human experience. They're not failures—they're information. What would feel most supportive right now?`,
            quickActions: [
              { id: 'nav-evening', label: 'Evening Reflection', action: 'navigate' as const, target: 'evening' },
              { id: 'nav-plan', label: 'Plan Tomorrow', action: 'navigate' as const, target: 'plan' }
            ],
            reasoningChain: undefined,
            hypotheses: [],
            patterns: [],
            counterfactuals: [],
            requiresUserInput: false,
            suggestedQuestions: [
              'Is it okay to have off days?',
              'How do I recover?',
              'What can I learn from this?'
            ]
          }
        ]
      }
    ];

    // Find matching response set
    for (const set of responseSets) {
      const hasMatch = set.keywords.some(keyword => lowerQ.includes(keyword));
      if (hasMatch) {
        // Randomly select one variant from the set
        const selected = set.responses[Math.floor(Math.random() * set.responses.length)];
        const avgSleep = healthData.slice(-7).reduce((sum, d) => sum + d.sleep, 0) / Math.min(7, healthData.length);
        
        // Generate appropriate data card based on topic
        let dataCard: DataCard | undefined = undefined;
        if (todayData) {
          if (topic === 'poor_sleep' || (lowerQ.includes('sleep') && !lowerQ.includes('step'))) {
            dataCard = {
              title: 'Last Night\'s Sleep',
              value: todayData.sleep.toFixed(1),
              unit: 'hours',
              trend: todayData.sleep < avgSleep ? 'down' : todayData.sleep > avgSleep ? 'up' : 'stable',
              context: `Your 7-day average is ${avgSleep.toFixed(1)} hours`
            };
          } else {
            // Default to steps for step-related questions
            dataCard = {
              title: 'Today\'s Steps',
              value: todayData.steps,
              unit: 'steps',
              trend: todayData.steps < avgSteps ? 'down' : 'up',
              context: `Your 7-day average is ${Math.round(avgSteps)} steps`
            };
          }
        }
        
        return {
          content: selected.content,
          quickActions: selected.quickActions || undefined,
          dataCard: dataCard,
          reasoningChain: selected.reasoningChain,
          hypotheses: selected.hypotheses || hypotheses,
          patterns: selected.patterns || patterns,
          counterfactuals: selected.counterfactuals || counterfactuals,
          requiresUserInput: selected.requiresUserInput || false,
          uncertainty: selected.uncertainty || undefined,
          suggestedQuestions: selected.suggestedQuestions || getContextualQuestions(currentPage)
        };
      }
    }

    // Default response
    return {
      content: `I'm here to help you understand your health patterns. Could you tell me more about what you're curious about?`,
      suggestedQuestions: getContextualQuestions(currentPage)
    };
  };

  const handleQuickAction = (action: QuickAction) => {
    if (action.action === 'navigate' && action.target && onNavigate) {
      onNavigate(action.target);
    } else if (action.action === 'suggest' && action.question) {
      setInput(action.question);
      setTimeout(() => {
        handleSend(action.question);
      }, 300);
    }
  };

  const handleHypothesisValidation = (hypothesisId: string, validated: boolean) => {
    setActiveHypotheses(prev => prev.map(h => 
      h.id === hypothesisId 
        ? { ...h, userValidated: validated, userRejected: !validated }
        : h
    ));
    
    // Add user insight to memory
    const hypothesis = activeHypotheses.find(h => h.id === hypothesisId);
    if (hypothesis) {
      const insight = validated 
        ? `User confirmed: ${hypothesis.statement}`
        : `User rejected: ${hypothesis.statement}`;
      setUserInsights(prev => [...prev, insight]);
      setConversationMemory(prev => [...prev, insight]);
    }
  };

  const handleSend = (overrideInput?: string) => {
    const question = overrideInput || input.trim();
    if (!question) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setConversationMemory(prev => [...prev, question]);
    if (!overrideInput) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const enhanced = generateEnhancedResponse(question);
      
      // Update active hypotheses
      if (enhanced.hypotheses && enhanced.hypotheses.length > 0) {
        setActiveHypotheses(prev => [...prev, ...enhanced.hypotheses!]);
      }
      
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: enhanced.content,
        timestamp: new Date(),
        quickActions: enhanced.quickActions,
        dataCard: enhanced.dataCard,
        suggestedQuestions: enhanced.suggestedQuestions
      };
      
      // Store enhanced data in message (we'll render it separately)
      (aiResponse as any).reasoningChain = enhanced.reasoningChain;
      (aiResponse as any).hypotheses = enhanced.hypotheses;
      (aiResponse as any).patterns = enhanced.patterns;
      (aiResponse as any).counterfactuals = enhanced.counterfactuals;
      (aiResponse as any).requiresUserInput = enhanced.requiresUserInput;
      (aiResponse as any).uncertainty = enhanced.uncertainty;
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSend(question), 100);
  };

  // Render reasoning chain component
  const renderReasoningChain = (chain: ReasoningChain) => {
    return (
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800 mt-3 ml-11 max-w-2xl">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-semibold">How I'm thinking about this:</h4>
          </div>
          <div className="space-y-2">
            {chain.steps.map((step, idx) => (
              <div key={step.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.type === 'observation' ? 'bg-green-100 dark:bg-green-900' :
                    step.type === 'inference' ? 'bg-blue-100 dark:bg-blue-900' :
                    step.type === 'hypothesis' ? 'bg-purple-100 dark:bg-purple-900' :
                    step.type === 'uncertainty' ? 'bg-amber-100 dark:bg-amber-900' :
                    'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    {step.type === 'observation' && <Eye className="w-4 h-4 text-green-600" />}
                    {step.type === 'inference' && <GitBranch className="w-4 h-4 text-blue-600" />}
                    {step.type === 'hypothesis' && <Lightbulb className="w-4 h-4 text-purple-600" />}
                    {step.type === 'uncertainty' && <HelpCircle className="w-4 h-4 text-amber-600" />}
                  </div>
                  {idx < chain.steps.length - 1 && (
                    <div className="w-0.5 h-6 bg-blue-200 dark:bg-blue-800 my-1" />
                  )}
                </div>
                <div className="flex-1 pb-3">
                  <div className="flex items-start justify-between">
                    <p className="text-sm flex-1">{step.content}</p>
                    {step.confidence && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        {step.confidence === 'high' ? 'High' : step.confidence === 'medium' ? 'Medium' : 'Low'} confidence
                      </Badge>
                    )}
                  </div>
                  {step.dataPoints && step.dataPoints.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {step.dataPoints.map((point, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {point}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {step.requiresUserInput && (
                    <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-950 rounded border border-amber-200 dark:border-amber-800">
                      <p className="text-xs text-amber-800 dark:text-amber-200">
                        💭 I need your input here—what do you think?
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {chain.uncertainty && (
            <div className="pt-3 border-t border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                <p className="text-sm text-amber-800 dark:text-amber-200">{chain.uncertainty}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  };

  // Render hypotheses component
  const renderHypotheses = (hypotheses: Hypothesis[]) => {
    return (
      <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800 mt-3 ml-11 max-w-2xl">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-purple-600" />
            <h4 className="text-sm font-semibold">Possible explanations—what do you think?</h4>
          </div>
          {hypotheses.map((hyp) => (
            <div key={hyp.id} className="space-y-2 p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <div className="flex items-start justify-between">
                <p className="text-sm flex-1">{hyp.statement}</p>
                <Badge variant="outline" className="ml-2 text-xs">
                  {hyp.confidence === 'high' ? 'High' : hyp.confidence === 'medium' ? 'Medium' : 'Low'} confidence
                </Badge>
              </div>
              {hyp.evidence && hyp.evidence.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">Evidence:</p>
                  <ul className="text-xs space-y-1">
                    {hyp.evidence.map((ev, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-purple-600 mt-0.5">•</span>
                        <span>{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {hyp.alternativeExplanations && hyp.alternativeExplanations.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">Other possibilities:</p>
                  <ul className="text-xs space-y-1">
                    {hyp.alternativeExplanations.map((alt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-gray-500 mt-0.5">•</span>
                        <span>{alt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleHypothesisValidation(hyp.id, true)}
                  className="text-xs h-7"
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  This resonates
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleHypothesisValidation(hyp.id, false)}
                  className="text-xs h-7"
                >
                  <XCircle className="w-3 h-3 mr-1" />
                  Not quite
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // Render patterns component
  const renderPatterns = (patterns: Pattern[]) => {
    return (
      <Card className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-emerald-200 dark:border-emerald-800 mt-3 ml-11 max-w-2xl">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <h4 className="text-sm font-semibold">Patterns I'm noticing:</h4>
          </div>
          {patterns.map((pattern) => (
            <div key={pattern.id} className="p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <p className="text-sm mb-2">{pattern.description}</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {pattern.confidence === 'high' ? 'High' : pattern.confidence === 'medium' ? 'Medium' : 'Low'} confidence
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs h-6"
                  onClick={() => {
                    // User can confirm or reject pattern
                    setUserInsights(prev => [...prev, `User reviewed pattern: ${pattern.description}`]);
                  }}
                >
                  Does this match your experience?
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // Render counterfactuals component
  const renderCounterfactuals = (counterfactuals: Counterfactual[]) => {
    return (
      <Card className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-orange-200 dark:border-orange-800 mt-3 ml-11 max-w-2xl">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-600" />
            <h4 className="text-sm font-semibold">What if we explored alternatives?</h4>
          </div>
          {counterfactuals.map((cf) => (
            <div key={cf.id} className="p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg space-y-2">
              <p className="text-sm font-medium">{cf.question}</p>
              <div className="text-xs text-muted-foreground">
                <p className="mb-1"><strong>Scenario:</strong> {cf.scenario}</p>
                <p className="mb-1"><strong>Possible outcome:</strong> {cf.predictedOutcome}</p>
                {cf.reasoning && (
                  <div className="mt-2">
                    <p className="mb-1 text-muted-foreground">Reasoning:</p>
                    <ul className="space-y-1">
                      {cf.reasoning.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-orange-600 mt-0.5">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <Badge variant="outline" className="text-xs mt-2">
                {cf.confidence === 'high' ? 'High' : cf.confidence === 'medium' ? 'Medium' : 'Low'} confidence
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  return (
    <div ref={containerRef} className={`flex flex-col ${compact ? 'h-full' : 'h-[calc(100vh-320px)] min-h-[500px]'}`}>
      {/* Header */}
      {!compact && (
        <div className="mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="flex items-center gap-2">
                Chat with Kriya
                <Sparkles className="w-4 h-4 text-yellow-500" />
              </h2>
              <p className="text-muted-foreground">Your compassionate AI health companion</p>
            </div>
          </div>
        </div>
      )}

      {/* 6 Topics - Always Visible */}
      <div className={`${compact ? 'mb-3' : 'mb-4'} flex-shrink-0`}>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-green-600 dark:text-green-400" />
            <p className="text-sm font-medium">6 topics you can ask about:</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {[
              'Missed step goal',
              'Low step prediction',
              'Poor sleep last night',
              'Steps vary so much',
              'Feel different from data',
              'Having an off day'
            ].map((topic, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestedQuestion(`Why ${topic.toLowerCase()}?`)}
                className="flex items-center gap-2 text-left hover:opacity-70 transition-opacity group"
              >
                <span className="text-green-600 dark:text-green-400 text-lg leading-none group-hover:scale-110 transition-transform">•</span>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{topic}</p>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Messages Container */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto space-y-4 mb-4 px-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {messages.map((message) => {
          const reasoningChain = (message as any).reasoningChain as ReasoningChain | undefined;
          const hypotheses = (message as any).hypotheses as Hypothesis[] | undefined;
          const patterns = (message as any).patterns as Pattern[] | undefined;
          const counterfactuals = (message as any).counterfactuals as Counterfactual[] | undefined;
          const requiresUserInput = (message as any).requiresUserInput as boolean | undefined;
          const uncertainty = (message as any).uncertainty as string | undefined;

          return (
            <div key={message.id} className="space-y-3">
              <div className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} max-w-[80%] sm:max-w-[75%]`}>
              <div className={`rounded-2xl px-4 py-3 break-words ${
                message.role === 'user' 
                  ? 'bg-gradient-to-br from-green-600 to-emerald-500 text-white shadow-md' 
                  : 'bg-card border border-border shadow-sm'
              }`}>
                <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
              </div>
              {!compact && (
                <span className="text-xs text-muted-foreground mt-1.5 px-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>

            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-md mt-1">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

              {/* Uncertainty Expression */}
              {message.role === 'assistant' && uncertainty && (
                <div className="flex justify-start ml-11">
                  <Card className="p-3 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 max-w-2xl">
                    <div className="flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                      <p className="text-sm text-amber-800 dark:text-amber-200">{uncertainty}</p>
                    </div>
                  </Card>
                </div>
              )}

              {/* Data Card */}
              {message.role === 'assistant' && message.dataCard && (
                <div className="flex justify-start ml-11">
                  <Card className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800 max-w-sm">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">{message.dataCard.title}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-semibold">{message.dataCard.value}</span>
                        {message.dataCard.unit && <span className="text-sm text-muted-foreground">{message.dataCard.unit}</span>}
                        {message.dataCard.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                        {message.dataCard.trend === 'down' && <TrendingDown className="w-4 h-4 text-amber-600" />}
                      </div>
                      {message.dataCard.context && (
                        <p className="text-xs text-muted-foreground mt-1">{message.dataCard.context}</p>
                      )}
                    </div>
                  </Card>
                </div>
              )}

              {/* Expandable Co-interpretation Options */}
              {message.role === 'assistant' && (reasoningChain || (hypotheses && hypotheses.length > 0) || (patterns && patterns.length > 0) || (counterfactuals && counterfactuals.length > 0)) && (
                <div className="flex justify-start ml-11 mt-2">
                  <Card className="p-3 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900 border-gray-200 dark:border-gray-700 max-w-2xl">
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground mb-2">Want to explore deeper? Choose what you'd like to see:</p>
                      <div className="flex flex-wrap gap-2">
                        {reasoningChain && (
                          <Button
                            size="sm"
                            variant={expandedMessages.has(message.id + '_reasoning') ? "default" : "outline"}
                            onClick={() => {
                              const key = message.id + '_reasoning';
                              setExpandedMessages(prev => {
                                const next = new Set(prev);
                                if (next.has(key)) {
                                  next.delete(key);
                                } else {
                                  next.add(key);
                                }
                                return next;
                              });
                            }}
                            className="text-xs h-7"
                          >
                            <Brain className="w-3 h-3 mr-1" />
                            {expandedMessages.has(message.id + '_reasoning') ? 'Hide' : 'Show'} Reasoning
                          </Button>
                        )}
                        {hypotheses && hypotheses.length > 0 && (
                          <Button
                            size="sm"
                            variant={expandedMessages.has(message.id + '_hypotheses') ? "default" : "outline"}
                            onClick={() => {
                              const key = message.id + '_hypotheses';
                              setExpandedMessages(prev => {
                                const next = new Set(prev);
                                if (next.has(key)) {
                                  next.delete(key);
                                } else {
                                  next.add(key);
                                }
                                return next;
                              });
                            }}
                            className="text-xs h-7"
                          >
                            <Lightbulb className="w-3 h-3 mr-1" />
                            {expandedMessages.has(message.id + '_hypotheses') ? 'Hide' : 'Show'} Hypotheses ({hypotheses.length})
                          </Button>
                        )}
                        {patterns && patterns.length > 0 && (
                          <Button
                            size="sm"
                            variant={expandedMessages.has(message.id + '_patterns') ? "default" : "outline"}
                            onClick={() => {
                              const key = message.id + '_patterns';
                              setExpandedMessages(prev => {
                                const next = new Set(prev);
                                if (next.has(key)) {
                                  next.delete(key);
                                } else {
                                  next.add(key);
                                }
                                return next;
                              });
                            }}
                            className="text-xs h-7"
                          >
                            <Activity className="w-3 h-3 mr-1" />
                            {expandedMessages.has(message.id + '_patterns') ? 'Hide' : 'Show'} Patterns ({patterns.length})
                          </Button>
                        )}
                        {counterfactuals && counterfactuals.length > 0 && (
                          <Button
                            size="sm"
                            variant={expandedMessages.has(message.id + '_counterfactuals') ? "default" : "outline"}
                            onClick={() => {
                              const key = message.id + '_counterfactuals';
                              setExpandedMessages(prev => {
                                const next = new Set(prev);
                                if (next.has(key)) {
                                  next.delete(key);
                                } else {
                                  next.add(key);
                                }
                                return next;
                              });
                            }}
                            className="text-xs h-7"
                          >
                            <Zap className="w-3 h-3 mr-1" />
                            {expandedMessages.has(message.id + '_counterfactuals') ? 'Hide' : 'Show'} What-Ifs ({counterfactuals.length})
                          </Button>
                        )}
                        {(reasoningChain || (hypotheses && hypotheses.length > 0) || (patterns && patterns.length > 0) || (counterfactuals && counterfactuals.length > 0)) && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const keys = [
                                message.id + '_reasoning',
                                message.id + '_hypotheses',
                                message.id + '_patterns',
                                message.id + '_counterfactuals'
                              ];
                              const allExpanded = keys.every(key => expandedMessages.has(key));
                              setExpandedMessages(prev => {
                                const next = new Set(prev);
                                if (allExpanded) {
                                  keys.forEach(key => next.delete(key));
                                } else {
                                  keys.forEach(key => next.add(key));
                                }
                                return next;
                              });
                            }}
                            className="text-xs h-7 text-muted-foreground"
                          >
                            {(() => {
                              const keys = [
                                message.id + '_reasoning',
                                message.id + '_hypotheses',
                                message.id + '_patterns',
                                message.id + '_counterfactuals'
                              ];
                              const allExpanded = keys.every(key => expandedMessages.has(key));
                              return allExpanded ? 'Collapse All' : 'Expand All';
                            })()}
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Reasoning Chain - Only show if expanded */}
              {message.role === 'assistant' && reasoningChain && expandedMessages.has(message.id + '_reasoning') && renderReasoningChain(reasoningChain)}

              {/* Hypotheses - Only show if expanded */}
              {message.role === 'assistant' && hypotheses && hypotheses.length > 0 && expandedMessages.has(message.id + '_hypotheses') && renderHypotheses(hypotheses)}

              {/* Patterns - Only show if expanded */}
              {message.role === 'assistant' && patterns && patterns.length > 0 && expandedMessages.has(message.id + '_patterns') && renderPatterns(patterns)}

              {/* Counterfactuals - Only show if expanded */}
              {message.role === 'assistant' && counterfactuals && counterfactuals.length > 0 && expandedMessages.has(message.id + '_counterfactuals') && renderCounterfactuals(counterfactuals)}

              {/* Quick Actions */}
              {message.role === 'assistant' && message.quickActions && message.quickActions.length > 0 && (
                <div className="flex justify-start ml-11 gap-2 flex-wrap">
                  {message.quickActions.map((action) => (
                    <Button
                      key={action.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action)}
                      className="text-xs h-8 gap-1.5 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950"
                    >
                      {action.icon && <span>{action.icon}</span>}
                      {action.label}
                      {action.action === 'navigate' && <ExternalLink className="w-3 h-3" />}
                    </Button>
                  ))}
                </div>
              )}

              {/* Suggested Questions */}
              {message.role === 'assistant' && message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
                <div className="flex justify-start ml-11 gap-2 flex-wrap">
                  {message.suggestedQuestions.slice(0, 3).map((question, idx) => (
                    <Button
                      key={idx}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs h-8 text-muted-foreground hover:text-foreground hover:bg-green-50 dark:hover:bg-green-950"
                    >
                      <MessageSquare className="w-3 h-3 mr-1" />
                      {question}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md mt-1">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`flex gap-2 flex-shrink-0 ${compact ? 'p-0' : 'pt-4 border-t border-border'}`}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
          placeholder="Ask me about your health..."
          className="flex-1 rounded-full border-2 focus:border-green-500 h-11"
          disabled={isTyping}
        />
        <Button 
          onClick={() => handleSend()} 
          disabled={!input.trim() || isTyping}
          className="rounded-full w-11 h-11 p-0 bg-gradient-to-br from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 shadow-md flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
