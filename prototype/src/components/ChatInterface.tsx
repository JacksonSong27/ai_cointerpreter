import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send, Bot, User, Lightbulb, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types/health';
import { HealthMetric } from '../types/health';

interface ChatInterfaceProps {
  healthData: HealthMetric[];
  compact?: boolean;
}

export function ChatInterface({ healthData, compact = false }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Kriya, your compassionate health companion. I'm here to help you understand *why* your health data fluctuates, not just *what* happened. Ask me anything!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sampleQuestions = [
    "Why did my sleep improve this week?",
    "How do comfort zones work?",
    "Tell me about my weekly goals"
  ];

  const generateResponse = (userQuestion: string): string => {
    const lowerQ = userQuestion.toLowerCase();
    
    // Calculate some insights
    const avgSleep = (healthData.reduce((sum, d) => sum + d.sleep, 0) / healthData.length).toFixed(1);
    const avgSteps = Math.round(healthData.reduce((sum, d) => sum + d.steps, 0) / healthData.length);
    const maxStepsDay = healthData.reduce((max, d) => d.steps > max.steps ? d : max);
    const maxSleepDay = healthData.reduce((max, d) => d.sleep > max.sleep ? d : max);
    
    // Kriya-specific feature questions
    if (lowerQ.includes('comfort zone') || lowerQ.includes('comfort-zone')) {
      return `Great question! Comfort zones are Kriya's alternative to rigid daily goals. Instead of a single target, you set a flexible range based on what feels achievable today.\\n\\n✨ The AI predicts a baseline, then shows you a comfortable range\\n🎯 You can adjust based on your energy, schedule, and context\\n💫 This reduces pressure and encourages self-compassion\\n\\nTry the Morning Wager tab to see it in action!`;
    }
    
    if (lowerQ.includes('morning') && (lowerQ.includes('wager') || lowerQ.includes('forecast'))) {
      return `The Morning Wager is Act I of your daily cycle! 🌅\\n\\nEach morning, Kriya provides:\\n📊 AI predictions based on your patterns\\n🎯 Flexible comfort zones (not rigid targets)\\n🏷️ Context tags to track special circumstances\\n💡 Weekly goal progress to guide your day\\n\\nIt's about setting intentions with compassion, not demanding perfection!`;
    }
    
    if (lowerQ.includes('detective') || lowerQ.includes('evening') || lowerQ.includes('debrief')) {
      return `Detective Mode is part of your Evening Debrief (Act III)! 🔍\\n\\nIt helps you:\\n🎯 Compare predictions vs. reality\\n🤔 Explore *why* outcomes varied\\n💭 Reframe with self-compassion\\n✨ Plan what-if scenarios for tomorrow\\n\\nThe goal is curiosity, not judgment. Check out the Evening tab!`;
    }
    
    if (lowerQ.includes('goal') || lowerQ.includes('weekly') || lowerQ.includes('target')) {
      const sleepGoal = healthData.filter(d => d.sleep >= 7).length;
      const stepsGoal = healthData.filter(d => d.steps >= 8000).length;
      return `Your weekly goals provide gentle guidance without daily pressure! 🎯\\n\\nCurrent progress:\\n😴 Sleep (7+ hrs): ${sleepGoal}/${healthData.length} nights\\n🚶 Steps (8K+): ${stepsGoal}/${healthData.length} days\\n\\nKriya connects your daily predictions to these weekly targets, showing how today's comfort zone helps you achieve long-term consistency. Visit the Goals tab to customize them!`;
    }
    
    if (lowerQ.includes('grace') || lowerQ.includes('compassion')) {
      return `Grace Points embody Kriya's self-compassion philosophy! 💚\\n\\nThey remind you that:\\n🌟 Tough days happen to everyone\\n💪 Context matters (stress, sleep, meetings)\\n🎯 Long-term patterns beat daily perfection\\n✨ Being kind to yourself is productive\\n\\nWhen you "use" a grace point, you acknowledge a hard day without self-judgment.`;
    }
    
    if (lowerQ.includes('what-if') || lowerQ.includes('what if') || lowerQ.includes('scenario')) {
      return `What-If Planning helps you make informed decisions! 💡\\n\\nYou can explore:\\n📊 How a 15-min walk affects step goals\\n😴 Impact of earlier bedtime on sleep\\n⚡ Trade-offs between activities\\n🎯 Probability-based suggestions\\n\\nIt's not about rigid plans—it's about understanding your options and choosing compassionately.`;
    }
    
    if (lowerQ.includes('three-act') || lowerQ.includes('three act') || lowerQ.includes('cycle')) {
      return `Kriya's Three-Act Daily Cycle mirrors your natural rhythm:\\n\\n🌅 Act I: Morning Wager - Set flexible comfort zones\\n☀️ Throughout Day: Track & Adjust - Live dashboard with what-ifs\\n🌆 Act III: Evening Debrief - Reflect with Detective Mode\\n\\nEach act builds on the last, creating a compassionate cycle of intention, action, and reflection!`;
    }
    
    // Data-specific questions
    if (lowerQ.includes('sleep') && (lowerQ.includes('improve') || lowerQ.includes('better'))) {
      return `Great question! Looking at your recent data, I notice your sleep improved on nights after days with 40+ active minutes. Your body seems to respond well to daytime movement. You averaged ${avgSleep}h of sleep this week. 🌙`;
    }
    
    if (lowerQ.includes('step') || lowerQ.includes('walk') || lowerQ.includes('activity')) {
      return `Your step count tends to be highest mid-week and lower on weekends. Your most active day was ${maxStepsDay.date.split('-').slice(1).join('/')} with ${maxStepsDay.steps.toLocaleString()} steps! Average: ${avgSteps.toLocaleString()} steps/day. 🚶‍♀️`;
    }
    
    if (lowerQ.includes('pattern') || lowerQ.includes('connection') || lowerQ.includes('correlation')) {
      return `I'm noticing a few patterns in your data:\\n\\n📊 On days with 8,000+ steps, you tend to sleep 30-45 minutes longer\\n💓 Your resting heart rate is more stable when you maintain consistent sleep\\n✨ Active days (40+ mins) correlate with better next-day energy\\n\\nWhat would you like to explore deeper?`;
    }
    
    if (lowerQ.includes('focus') || lowerQ.includes('should')) {
      const sleepGoal = healthData.filter(d => d.sleep >= 7).length;
      const stepsGoal = healthData.filter(d => d.steps >= 8000).length;
      return `Based on your patterns, I'd suggest focusing on consistency rather than intensity. You're hitting your sleep goal ${sleepGoal}/${healthData.length} nights and step goal ${stepsGoal}/${healthData.length} days. Small daily habits tend to compound! 🎯`;
    }
    
    if (lowerQ.includes('workout') || lowerQ.includes('exercise')) {
      return `Your active minutes data shows you tend to move more on weekdays. On days with 40+ active minutes, you sleep about 0.5 hours more on average. Your body responds positively to movement! 💪`;
    }
    
    // Help and general questions
    if (lowerQ.includes('help') || lowerQ.includes('how') || lowerQ.includes('use')) {
      return `I'm here to help! Here's what you can ask me about:\\n\\n💭 Your health data & patterns\\n🎯 How Kriya features work (comfort zones, detective mode, etc.)\\n📊 Weekly goals and progress\\n💡 What-if scenarios and planning\\n🌟 Self-compassion and grace points\\n\\nWhat would you like to know more about?`;
    }
    
    // Default compassionate response
    return `That's a thoughtful question! Your recent data shows you're averaging ${avgSleep}h sleep and ${avgSteps.toLocaleString()} steps daily. Remember, health is about patterns and trends, not perfection. What specific aspect would you like to explore? 🌟`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1200);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    // Auto-send after a brief moment
    setTimeout(() => {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: question,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: generateResponse(question),
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1200);
    }, 300);
  };

  return (
    <div className={`flex flex-col ${compact ? 'h-full' : 'h-full max-h-[calc(100vh-200px)]'}`}>
      {!compact && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
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

      {/* Quick Questions - Only show initially */}
      {messages.length === 1 && (
        <div className={`${compact ? 'mb-3' : 'mb-4'}`}>
          <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-green-600" />
              <p className="text-sm">Quick questions to get started:</p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {sampleQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q)}
                  className="text-left text-sm p-3 rounded-lg bg-white hover:bg-green-100 border border-green-200 hover:border-green-300 transition-all duration-200 hover:shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Messages Container */}
      <div className={`flex-1 overflow-y-auto ${compact ? 'px-2 space-y-3 mb-3' : 'space-y-4 mb-4'}`}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
              <div className={`rounded-2xl px-4 py-3 ${
                message.role === 'user' 
                  ? 'bg-gradient-to-br from-green-600 to-emerald-500 text-white shadow-md' 
                  : 'bg-card border border-border shadow-sm'
              }`}>
                <p className="whitespace-pre-line">{message.content}</p>
              </div>
              <span className={`text-xs text-muted-foreground mt-1 px-2 ${compact ? 'hidden' : ''}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md">
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
      <div className={`flex gap-2 ${compact ? 'p-0' : 'pt-3 border-t'}`}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
          placeholder="Ask me about your health..."
          className="flex-1 rounded-full border-2 focus:border-green-500"
          disabled={isTyping}
        />
        <Button 
          onClick={handleSend} 
          disabled={!input.trim() || isTyping}
          className="rounded-full w-10 h-10 p-0 bg-gradient-to-br from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 shadow-md"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}