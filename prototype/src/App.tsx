import { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { MorningIntentionScreen } from './components/MorningIntentionScreen';
import { EveningReflectionScreen } from './components/EveningReflectionScreen';
import { ChatScreen } from './components/ChatScreen';
import { WeeklyGoalsScreen } from './components/WeeklyGoalsScreen';
import { WeeklyDigestScreen } from './components/WeeklyDigestScreen';
import { PrototypeNav } from './components/PrototypeNav';
import { MessageCircle, X } from 'lucide-react';

type Screen = 
  | 'login' 
  | 'home' 
  | 'morningIntention' 
  | 'eveningReflection' 
  | 'chat' 
  | 'weeklyGoals' 
  | 'weeklyDigest';

interface DailyState {
  forecastCompleted: boolean;
  reflectionCompleted: boolean;
  stepsGoal?: number;
  sleepGoal?: number;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [prototypeMode, setPrototypeMode] = useState(true); // Enable prototype navigation
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [dailyState, setDailyState] = useState<DailyState>({
    forecastCompleted: false,
    reflectionCompleted: false
  });

  // Determine time of day (mock - in real app would use actual time)
  const currentHour = new Date().getHours();
  const timeOfDay: 'morning' | 'evening' = currentHour < 17 ? 'morning' : 'evening';

  // Toggle prototype mode with keyboard shortcut (P key)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') {
        setPrototypeMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Handle prototype navigation
  const handlePrototypeNavigate = (screen: Screen) => {
    // Auto-authenticate if navigating away from login
    if (screen !== 'login' && !isAuthenticated) {
      setIsAuthenticated(true);
    }
    // Set mock data for evening reflection if needed
    if (screen === 'eveningReflection' && (!dailyState.stepsGoal || !dailyState.sleepGoal)) {
      setDailyState({
        ...dailyState,
        forecastCompleted: true,
        stepsGoal: 7200,
        sleepGoal: 7.5
      });
    }
    setCurrentScreen(screen);
  };

  // Handle login
  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen('home');
  };

  // Handle morning intention
  const handleSetIntention = () => {
    setCurrentScreen('morningIntention');
  };

  const handleConfirmIntention = (stepsGoal: number, sleepGoal: number) => {
    setDailyState({
      ...dailyState,
      forecastCompleted: true,
      stepsGoal,
      sleepGoal
    });
    setCurrentScreen('home');
  };

  // Handle evening reflection
  const handleReflect = () => {
    setCurrentScreen('eveningReflection');
  };

  const handleSubmitReflection = (reflection: string) => {
    setDailyState({
      ...dailyState,
      reflectionCompleted: true
    });
    console.log('Reflection saved:', reflection);
    setCurrentScreen('home');
  };

  // Handle weekly goals
  const handleWeeklyGoalsConfirm = (goals: { sleep: number; stepDays: number; mindfulness: number }) => {
    console.log('Weekly goals set:', goals);
    setCurrentScreen('home');
  };

  // Handle chat
  const handleOpenChat = () => {
    if (currentScreen === 'chat') {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('chat');
    }
  };

  const handleCloseChat = () => {
    setCurrentScreen('home');
  };

  // Handle weekly digest
  const handlePlanNextWeek = () => {
    setCurrentScreen('weeklyGoals');
  };

  // Back navigation
  const handleBack = () => {
    setCurrentScreen('home');
  };

  // Determine navigation permissions based on current screen
  const getNavPermissions = () => {
    switch (currentScreen) {
      case 'login':
        return { canGoBack: false, canGoForward: true };
      case 'home':
        return { canGoBack: false, canGoForward: true };
      case 'chat':
        return { canGoBack: true, canGoForward: true }; // Never locks
      default:
        return { canGoBack: true, canGoForward: true };
    }
  };

  const { canGoBack, canGoForward } = getNavPermissions();

  // Main app with navigation
  return (
    <div className="relative">
      {/* Prototype Navigation Bar */}
      {prototypeMode && (
        <PrototypeNav
          currentScreen={currentScreen}
          onNavigate={handlePrototypeNavigate}
          canGoBack={canGoBack}
          canGoForward={canGoForward}
        />
      )}

      {/* Add padding to account for fixed nav bar */}
      <div style={{ paddingTop: prototypeMode ? '80px' : '0' }}>
        {/* Render current screen */}
        {currentScreen === 'login' && (
          <LoginScreen onLogin={handleLogin} />
        )}

        {currentScreen === 'home' && (
          <HomeScreen
            timeOfDay={timeOfDay}
            forecastCompleted={dailyState.forecastCompleted}
            reflectionCompleted={dailyState.reflectionCompleted}
            onSetIntention={handleSetIntention}
            onReflect={handleReflect}
            onOpenChat={handleOpenChat}
          />
        )}

        {currentScreen === 'morningIntention' && (
          <MorningIntentionScreen
            onConfirm={handleConfirmIntention}
            onBack={handleBack}
          />
        )}

        {currentScreen === 'eveningReflection' && dailyState.stepsGoal && dailyState.sleepGoal && (
          <EveningReflectionScreen
            stepsGoal={dailyState.stepsGoal}
            sleepGoal={dailyState.sleepGoal}
            onSubmit={handleSubmitReflection}
            onBack={handleBack}
          />
        )}

        {currentScreen === 'chat' && (
          <ChatScreen onBack={handleCloseChat} />
        )}

        {currentScreen === 'weeklyGoals' && (
          <WeeklyGoalsScreen
            onConfirm={handleWeeklyGoalsConfirm}
            onBack={handleBack}
          />
        )}

        {currentScreen === 'weeklyDigest' && (
          <WeeklyDigestScreen
            onPlanNextWeek={handlePlanNextWeek}
            onBack={handleBack}
          />
        )}
      </div>

      {/* Floating Chat Button - Always accessible except when on chat screen */}
      {currentScreen !== 'chat' && currentScreen !== 'login' && (
        <button
          onClick={handleOpenChat}
          className="fixed bottom-6 right-6 p-4 rounded-full transition-all hover:scale-105"
          style={{ 
            background: 'linear-gradient(135deg, #0A84FF 0%, #7DD4B0 100%)',
            boxShadow: '0 4px 12px rgba(10, 132, 255, 0.25)',
            zIndex: 40,
            border: 'none',
            cursor: 'pointer'
          }}
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Prototype Mode Toggle Hint */}
      <div 
        className="fixed bottom-2 left-2 px-3 py-1 rounded-lg"
        style={{ 
          backgroundColor: prototypeMode ? 'rgba(245, 158, 11, 0.15)' : 'rgba(107, 114, 128, 0.1)',
          fontSize: '0.625rem',
          color: prototypeMode ? '#92400E' : '#6B7280',
          fontWeight: 500,
          opacity: 0.7,
          fontFamily: 'monospace'
        }}
      >
        Press <kbd style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.5)', 
          padding: '0 4px', 
          borderRadius: '3px',
          fontWeight: 600
        }}>P</kbd> to toggle prototype nav
      </div>
    </div>
  );
}
