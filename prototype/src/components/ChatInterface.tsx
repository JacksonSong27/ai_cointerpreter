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
  resetScroll?: boolean;
}

export function ChatInterface({ healthData, compact = false, resetScroll }: ChatInterfaceProps) {
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
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to top when component mounts or when resetScroll changes
  useEffect(() => {
    // Use setTimeout to ensure DOM is ready
    const scrollToTop = setTimeout(() => {
      // Scroll the main window to top first
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Then scroll the container into view
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
      
      // Finally reset the messages container scroll
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = 0;
      }
    }, 100);

    return () => clearTimeout(scrollToTop);
  }, [resetScroll]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userQuestion: string): string => {
    const lowerQ = userQuestion.toLowerCase();
    
    // Define the 6 responses with their keyword sets and specific question patterns
    const responses = [
      {
        keywords: ['step', 'goal', 'meet', 'hit', 'reach', 'miss', 'didn\'t', 'didn\'t meet', 'not meet', 'failed', 'achieve', 'why didn\'t', 'why did i not'],
        questionPatterns: ['why.*step.*goal', 'why.*didn.*step', 'why.*not.*step', 'why.*miss.*step'],
        response: `From what I can see, today had a few elements that often lower movement—a long meeting block, less sleep than usual, and the rainy afternoon. These aren't 'failures'; they're just parts of the day that shape rhythm. What do you think influenced your day the most?`
      },
      {
        keywords: ['predict', 'predicting', 'prediction', 'forecast', 'low.*step', 'expecting.*low', 'why.*predict.*low', 'why.*low.*step'],
        questionPatterns: ['why.*predict.*low', 'why.*low.*step', 'why.*predicting.*low'],
        response: `I noticed you had a short sleep and a busy afternoon ahead. Days like this tend to naturally slow movement. That doesn't mean anything is wrong—it just helps me set a gentle expectation so you don't feel pressured.`
      },
      {
        keywords: ['sleep', 'slept', 'sleeping', 'poor', 'poorly', 'bad.*sleep', 'terrible.*sleep', 'awful.*sleep', 'why.*sleep.*poor', 'why.*sleep.*bad', 'why.*sleep.*poorly'],
        questionPatterns: ['why.*sleep.*poor', 'why.*sleep.*bad', 'why.*sleep.*poorly', 'why.*did.*sleep'],
        response: `I can't see everything, but I did notice a later-than-usual bedtime and a high-stress marker from your evening. Those patterns often affect sleep. Does that match your sense of the night?`
      },
      {
        keywords: ['vary', 'varies', 'fluctuate', 'fluctuation', 'change', 'different', 'inconsistent', 'why.*step.*vary', 'why.*step.*change', 'why.*step.*different'],
        questionPatterns: ['why.*step.*vary', 'why.*step.*change', 'why.*step.*different', 'why.*step.*fluctuate'],
        response: `It's completely normal for movement to fluctuate. Weekends, weather, meetings, energy, and social plans all weave together. Your pattern looks more human than inconsistent.`
      },
      {
        keywords: ['feel', 'feeling', 'felt', 'emotion', 'data', 'show', 'shows', 'number', 'actual', 'reality', 'differently', 'different.*data', 'why.*feel.*different'],
        questionPatterns: ['why.*feel.*different', 'why.*feel.*differently', 'why.*feel.*data', 'why.*feel.*show'],
        response: `That is the most important question. Data only captures pieces—like hours of sleep—but it misses the quality of your rest or your emotional state. Tell me a bit more about how you felt: was it mental fatigue, physical tiredness, or something else? Your experience is the full story.`
      },
      {
        keywords: ['off.*day', 'bad.*day', 'okay', 'ok', 'fine', 'is it ok', 'is it okay', 'off day', 'struggle', 'struggling', 'hard', 'difficult'],
        questionPatterns: ['is it ok.*off', 'is it okay.*off', 'ok.*off.*day', 'okay.*off.*day'],
        response: `Absolutely. Your rhythms naturally ebb and flow. Off days often happen when sleep, stress, or timing shifts. They're signals, not setbacks.`
      }
    ];
    
    // First check for specific question patterns (more precise matching)
    for (const { questionPatterns, response } of responses) {
      if (questionPatterns) {
        for (const pattern of questionPatterns) {
          const regex = new RegExp(pattern, 'i');
          if (regex.test(userQuestion)) {
            return response;
          }
        }
      }
    }
    
    // If no pattern match, calculate match score for each response based on keywords
    const scores = responses.map(({ keywords, response }) => {
      let score = 0;
      keywords.forEach(keyword => {
        // Check if keyword appears as a whole word or phrase
        const keywordRegex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (keywordRegex.test(lowerQ)) {
          score += 2; // Higher weight for whole word matches
        } else if (lowerQ.includes(keyword)) {
          score += 1; // Lower weight for partial matches
        }
      });
      return { score, response };
    });
    
    // Sort by score and return the best match
    scores.sort((a, b) => b.score - a.score);
    
    // If there's at least one keyword match, return that response
    if (scores[0].score > 0) {
      return scores[0].response;
    }
    
    // If no keywords match at all, return a default helpful response
    return `I'm here to help you understand your health patterns. Could you tell me more about what you're curious about?`;
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
            <p className="text-sm">6 topics you can ask about:</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400 text-lg leading-none">•</span>
              <p className="text-sm text-muted-foreground">Missing step goals</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400 text-lg leading-none">•</span>
              <p className="text-sm text-muted-foreground">Low step predictions</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400 text-lg leading-none">•</span>
              <p className="text-sm text-muted-foreground">Poor sleep nights</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400 text-lg leading-none">•</span>
              <p className="text-sm text-muted-foreground">Metric fluctuations</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400 text-lg leading-none">•</span>
              <p className="text-sm text-muted-foreground">Data vs feelings</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400 text-lg leading-none">•</span>
              <p className="text-sm text-muted-foreground">Having off days</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Messages Container */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto space-y-4 mb-4 px-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
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
        ))}
        
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
          onClick={handleSend} 
          disabled={!input.trim() || isTyping}
          className="rounded-full w-11 h-11 p-0 bg-gradient-to-br from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 shadow-md flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
