import { useState } from 'react';
import { MessageCircle, X, Minimize2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ChatInterface } from './ChatInterface';
import { HealthMetric } from '../types/health';

interface FloatingChatProps {
  healthData: HealthMetric[];
}

export function FloatingChat({ healthData }: FloatingChatProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 md:bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-500 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group animate-in fade-in zoom-in"
          aria-label="Open chat"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-white"></span>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Chat with Kriya
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 md:bottom-6 right-6 z-50 w-[calc(100vw-48px)] max-w-md animate-in slide-in-from-bottom-8 fade-in duration-300 md:w-[420px]">
          <Card className="flex flex-col shadow-2xl border-2 border-green-500/20 overflow-hidden rounded-2xl" 
                style={{ height: 'min(600px, calc(100vh - 200px))' }}>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-green-600 to-emerald-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white">Kriya</h3>
                  <p className="text-xs text-white/80">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-hidden p-4 bg-gradient-to-b from-green-50/30 to-transparent">
              <ChatInterface healthData={healthData} compact={true} />
            </div>
          </Card>
        </div>
      )}

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}