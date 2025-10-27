import React from 'react';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type Screen = 
  | 'login' 
  | 'home' 
  | 'morningIntention' 
  | 'eveningReflection' 
  | 'chat' 
  | 'weeklyGoals' 
  | 'weeklyDigest';

interface PrototypeNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
}

const screenLabels: Record<Screen, string> = {
  login: '1. Login',
  home: '2. Home',
  morningIntention: '3. Morning Intention',
  eveningReflection: '4. Evening Reflection',
  chat: '5. Chat',
  weeklyGoals: '6. Weekly Goals',
  weeklyDigest: '7. Weekly Digest'
};

const screenFlow: Screen[] = [
  'login',
  'home',
  'morningIntention',
  'eveningReflection',
  'chat',
  'weeklyGoals',
  'weeklyDigest'
];

export function PrototypeNav({ 
  currentScreen, 
  onNavigate,
  canGoBack = true,
  canGoForward = true
}: PrototypeNavProps) {
  const currentIndex = screenFlow.indexOf(currentScreen);
  const prevScreen = currentIndex > 0 ? screenFlow[currentIndex - 1] : null;
  const nextScreen = currentIndex < screenFlow.length - 1 ? screenFlow[currentIndex + 1] : null;

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 border-b"
      style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderColor: 'rgba(44, 54, 57, 0.1)'
      }}
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Back Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => prevScreen && onNavigate(prevScreen)}
          disabled={!canGoBack || !prevScreen}
          className="flex items-center gap-1 px-3"
          style={{ 
            fontSize: '0.75rem',
            height: '32px',
            borderColor: 'rgba(44, 54, 57, 0.1)'
          }}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Screen Indicator with Jump Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex items-center gap-2 px-3 rounded-md hover:bg-accent transition-colors outline-none"
            style={{ 
              fontSize: '0.75rem',
              height: '32px',
              fontWeight: 500,
              color: '#0A84FF',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer'
            }}
          >
            <Menu className="w-4 h-4" />
            {screenLabels[currentScreen]}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            {screenFlow.map((screen) => (
              <DropdownMenuItem
                key={screen}
                onClick={() => onNavigate(screen)}
                style={{
                  backgroundColor: screen === currentScreen ? 'rgba(10, 132, 255, 0.1)' : 'transparent',
                  color: screen === currentScreen ? '#0A84FF' : '#2C3639',
                  fontWeight: screen === currentScreen ? 500 : 400,
                  fontSize: '0.875rem'
                }}
              >
                {screenLabels[screen]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => nextScreen && onNavigate(nextScreen)}
          disabled={!canGoForward || !nextScreen}
          className="flex items-center gap-1 px-3"
          style={{ 
            fontSize: '0.75rem',
            height: '32px',
            borderColor: 'rgba(44, 54, 57, 0.1)'
          }}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Prototype Banner */}
      <div className="max-w-md mx-auto mt-2">
        <div 
          className="px-3 py-1 rounded text-center"
          style={{ 
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            fontSize: '0.625rem',
            color: '#92400E',
            fontWeight: 500
          }}
        >
          🔧 PROTOTYPE MODE - Use nav to test flow
        </div>
      </div>
    </div>
  );
}
