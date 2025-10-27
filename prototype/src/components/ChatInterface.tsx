import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send, Bot, User, Lightbulb } from 'lucide-react';
import { ChatMessage } from '../types/health';
import { HealthMetric } from '../types/health';

interface ChatInterfaceProps {
  healthData: HealthMetric[];
}

export function ChatInterface({ healthData }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your health co-interpreter—think of me as a curious friend who loves exploring patterns with you. 🔍 Ask me anything about your body's story! Want to play a guessing game, explore correlations, or just chat about what you're noticing?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sampleQuestions = [
    "What's my average sleep this week?",
    "Which day did I walk the most?",
    "Show me the connection between sleep and activity",
    "Quiz me: Guess which weekday I slept longest?",
    "Did I sleep better on active days?",
    "Am I meeting my weekly goals?"
  ];

  const generateResponse = (userQuestion: string): string => {
    const lowerQ = userQuestion.toLowerCase();
    
    // Calculate some insights
    const avgSleep = (healthData.reduce((sum, d) => sum + d.sleep, 0) / healthData.length).toFixed(1);
    const avgSteps = Math.round(healthData.reduce((sum, d) => sum + d.steps, 0) / healthData.length);
    const maxStepsDay = healthData.reduce((max, d) => d.steps > max.steps ? d : max);
    const maxSleepDay = healthData.reduce((max, d) => d.sleep > max.sleep ? d : max);
    
    if (lowerQ.includes('sleep') && lowerQ.includes('average')) {
      return `Over the past ${healthData.length} days, you've averaged ${avgSleep} hours of sleep per night. Your best night was ${maxSleepDay.date.split('-').slice(1).join('/')} with ${maxSleepDay.sleep.toFixed(1)} hours. 😴`;
    }
    
    if (lowerQ.includes('walk') || lowerQ.includes('step')) {
      return `Your most active day was ${maxStepsDay.date.split('-').slice(1).join('/')} with ${maxStepsDay.steps.toLocaleString()} steps! On average, you're walking ${avgSteps.toLocaleString()} steps per day. 🚶`;
    }
    
    if (lowerQ.includes('connection') || lowerQ.includes('correlation') || lowerQ.includes('better')) {
      return `Looking at your data, I notice your heart rate tends to be steadier (around 70 bpm) on days when you get 7+ hours of sleep. On days with less sleep, it averages closer to 75-80 bpm. Does that match your experience? 💓`;
    }
    
    if (lowerQ.includes('quiz') || lowerQ.includes('guess') || lowerQ.includes('game')) {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const randomDay = days[Math.floor(Math.random() * days.length)];
      return `🎮 Here's a fun one: Can you guess which day last week you got the most sleep? I'll give you a hint—it wasn't a ${randomDay}! Take a guess, then I'll tell you. (Spoiler: It was ${maxSleepDay.date.split('-').slice(1).join('/')})`;
    }
    
    if (lowerQ.includes('goal')) {
      const sleepGoal = healthData.filter(d => d.sleep >= 7).length;
      const stepsGoal = healthData.filter(d => d.steps >= 8000).length;
      return `This week you hit 7+ hours of sleep on ${sleepGoal} nights and walked 8,000+ steps on ${stepsGoal} days. Remember, these are flexible budgets—you're learning about your patterns, not being graded! 🎯`;
    }
    
    if (lowerQ.includes('workout') || lowerQ.includes('exercise') || lowerQ.includes('active')) {
      return `On days with 40+ active minutes, your sleep quality seems to improve by about 0.5 hours on average. Your body is telling you it loves movement! 💪 Does that resonate with how you feel?`;
    }
    
    // Default reflective response with self-compassion
    return `That's an interesting question! Based on your recent patterns, I see you're averaging ${avgSleep}h sleep and ${avgSteps.toLocaleString()} steps daily. Every data point is a clue about your body's story—what specific patterns are you curious about? Remember, we're exploring together, not judging! 💙`;
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

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInput('');
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-200px)]">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(10, 132, 255, 0.1)' }}>
          <Bot className="w-6 h-6" style={{ color: '#0A84FF' }} />
        </div>
        <div>
          <h2>Ask Your Body</h2>
          <p className="text-muted-foreground">Have a conversation with your health data</p>
        </div>
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <Card className="p-4 mb-4 border-none" style={{ background: 'linear-gradient(135deg, rgba(10, 132, 255, 0.05) 0%, rgba(125, 212, 176, 0.05) 100%)' }}>
          <div className="flex items-start gap-2 mb-3">
            <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#7DD4B0' }} />
            <p>Try asking:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleQuestions.map((q, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                onClick={() => handleQuickQuestion(q)}
                className="justify-start text-left h-auto py-2 px-3"
              >
                {q}
              </Button>
            ))}
          </div>
        </Card>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(10, 132, 255, 0.1)' }}>
                <Bot className="w-5 h-5" style={{ color: '#0A84FF' }} />
              </div>
            )}
            
            <Card className={`p-4 max-w-[80%] ${
              message.role === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card'
            }`}>
              <p>{message.content}</p>
              <p className={`mt-2 ${
                message.role === 'user' 
                  ? 'text-primary-foreground/70' 
                  : 'text-muted-foreground'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </Card>

            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about your health patterns..."
          className="flex-1"
        />
        <Button onClick={handleSend} disabled={!input.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
