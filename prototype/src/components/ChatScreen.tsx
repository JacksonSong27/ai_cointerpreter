import React, { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Bot, Send, Lightbulb, TrendingUp, Moon, Activity, Heart } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatScreenProps {
  onBack: () => void;
}

export function ChatScreen({ onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm here to help you understand your health patterns. What would you like to explore?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    "Did I sleep better after workouts?",
    "How was my heart rate today?",
    "Show me my step trends",
    "When do I sleep best?"
  ];

  const quickTopics = [
    { icon: TrendingUp, label: 'Insights', color: '#0A84FF' },
    { icon: Activity, label: 'Activity', color: '#0A84FF' },
    { icon: Moon, label: 'Sleep', color: '#7DD4B0' },
    { icon: Heart, label: 'Heart', color: '#7DD4B0' }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateResponse(text);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('sleep') && lowerQuery.includes('workout')) {
      return "Great question! Looking at your past 2 weeks, you tend to sleep 45 minutes longer on nights following a workout day (avg 7.8h vs 6.9h). Your body seems to respond well to movement—it helps you rest deeper. 💤";
    }
    if (lowerQuery.includes('heart rate')) {
      return "Today your resting heart rate was 62 bpm—right in your normal range of 60-65. Your heart rate was steadiest in the morning and slightly elevated in the afternoon, which is typical for you. Your body's rhythm is consistent! ❤️";
    }
    if (lowerQuery.includes('step') || lowerQuery.includes('trend')) {
      return "Your step count has been trending upward! You averaged 7,200 steps this week, up from 6,500 last week. Tuesdays and Thursdays are your most active days—maybe because of your schedule? 📈";
    }
    if (lowerQuery.includes('when') && lowerQuery.includes('sleep')) {
      return "You sleep best when you go to bed between 10-11pm. On those nights, you average 7.5 hours vs 6.8 hours when you're up past midnight. Your body seems to have a sweet spot for wind-down time. 🌙";
    }
    
    return "I'd love to help you explore that! Based on your data, I can tell you about sleep patterns, activity trends, heart rate, and how they all connect. What specific aspect interests you most?";
  };

  const handleQuickQuestion = (question: string) => {
    handleSend(question);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F7FAFC' }}>
      <div className="flex-1 overflow-hidden flex flex-col max-w-md mx-auto w-full">
        {/* Header */}
        <div className="p-6 bg-white border-b" style={{ borderColor: 'rgba(44, 54, 57, 0.08)' }}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(10, 132, 255, 0.1)' }}>
              <Bot className="w-6 h-6" style={{ color: '#0A84FF' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#2C3639', marginBottom: '0.25rem' }}>
                Ask Your Body
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                A supportive co-interpreter
              </p>
            </div>
          </div>
        </div>

        {/* Quick Topics Bar */}
        {messages.length === 1 && (
          <div className="px-6 py-4 bg-white border-b" style={{ borderColor: 'rgba(44, 54, 57, 0.08)' }}>
            <div className="flex gap-2 overflow-x-auto">
              {quickTopics.map((topic, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 whitespace-nowrap"
                  style={{ 
                    borderColor: 'rgba(44, 54, 57, 0.1)',
                    color: topic.color
                  }}
                >
                  <topic.icon className="w-4 h-4" />
                  {topic.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="px-6 py-4">
            <Card 
              className="p-4 border-none" 
              style={{ background: 'linear-gradient(135deg, rgba(10, 132, 255, 0.05) 0%, rgba(125, 212, 176, 0.05) 100%)' }}
            >
              <div className="flex items-start gap-2 mb-3">
                <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#7DD4B0' }} />
                <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#2C3639' }}>
                  Try asking:
                </p>
              </div>
              <div className="space-y-2">
                {sampleQuestions.map((q, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuickQuestion(q)}
                    className="w-full justify-start text-left h-auto py-2 px-3"
                    style={{ fontSize: '0.875rem', color: '#2C3639' }}
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.slice(1).map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" 
                  style={{ backgroundColor: 'rgba(10, 132, 255, 0.1)' }}
                >
                  <Bot className="w-5 h-5" style={{ color: '#0A84FF' }} />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user' 
                    ? 'bg-white' 
                    : ''
                }`}
                style={{
                  backgroundColor: message.role === 'user' ? '#0A84FF' : '#FFFFFF',
                  color: message.role === 'user' ? '#FFFFFF' : '#2C3639',
                  boxShadow: '0 1px 3px 0 rgba(44, 54, 57, 0.08)',
                  fontSize: '0.875rem',
                  lineHeight: '1.5'
                }}
              >
                {message.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" 
                style={{ backgroundColor: 'rgba(10, 132, 255, 0.1)' }}
              >
                <Bot className="w-5 h-5" style={{ color: '#0A84FF' }} />
              </div>
              <div
                className="rounded-2xl px-4 py-3"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px 0 rgba(44, 54, 57, 0.08)'
                }}
              >
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#7DD4B0' }} />
                  <div className="w-2 h-2 rounded-full animate-pulse delay-75" style={{ backgroundColor: '#7DD4B0' }} />
                  <div className="w-2 h-2 rounded-full animate-pulse delay-150" style={{ backgroundColor: '#7DD4B0' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t" style={{ borderColor: 'rgba(44, 54, 57, 0.08)' }}>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask about your patterns..."
              className="flex-1"
              style={{ 
                backgroundColor: '#F7FAFC',
                border: '1px solid rgba(44, 54, 57, 0.1)',
                fontSize: '0.875rem'
              }}
            />
            <Button
              onClick={() => handleSend(input)}
              className="px-4"
              style={{ 
                backgroundColor: '#0A84FF',
                color: '#FFFFFF'
              }}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p 
            className="text-center mt-3"
            style={{ 
              fontSize: '0.75rem',
              color: '#6B7280',
              fontStyle: 'italic'
            }}
          >
            Not a coach. Not a judge. A co-interpreter.
          </p>
        </div>
      </div>
    </div>
  );
}
