import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Sunrise, Sunset, CheckCircle2, MessageCircle } from 'lucide-react';

interface HomeScreenProps {
  timeOfDay: 'morning' | 'evening';
  forecastCompleted: boolean;
  reflectionCompleted: boolean;
  onSetIntention: () => void;
  onReflect: () => void;
  onOpenChat: () => void;
}

export function HomeScreen({ 
  timeOfDay, 
  forecastCompleted, 
  reflectionCompleted,
  onSetIntention,
  onReflect,
  onOpenChat
}: HomeScreenProps) {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  // Determine which single CTA to show
  const getPrimaryCTA = () => {
    if (!forecastCompleted) {
      return {
        label: "Set Today's Intention",
        action: onSetIntention,
        color: '#0A84FF',
        textColor: '#FFFFFF',
        icon: Sunrise
      };
    }
    
    if (forecastCompleted && !reflectionCompleted) {
      return {
        label: "Reflect on Today",
        action: onReflect,
        color: '#7DD4B0',
        textColor: '#2C3639',
        icon: Sunset
      };
    }
    
    // Both completed
    return {
      label: "Ask My Body",
      action: onOpenChat,
      color: '#0A84FF',
      textColor: '#FFFFFF',
      icon: MessageCircle
    };
  };

  const primaryCTA = getPrimaryCTA();
  const CTAIcon = primaryCTA.icon;

  // Weekly progress dots (mock - shows 3/7 days completed)
  const weekProgress = [true, true, true, false, false, false, false];

  return (
    <div className="min-h-screen px-6 pb-8 pt-4" style={{ backgroundColor: '#F7FAFC' }}>
      <div className="max-w-md mx-auto">
        {/* Date Header */}
        <div className="mb-8">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 500, color: '#2C3639', marginBottom: '0.5rem' }}>
            Today
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
            {currentDate}
          </p>
        </div>

        {/* Weekly Progress Dots */}
        <div className="mb-6 flex items-center gap-3">
          <p style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 500 }}>
            This Week
          </p>
          <div className="flex gap-1.5">
            {weekProgress.map((completed, index) => (
              <div
                key={index}
                className="rounded-full"
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: completed ? '#7DD4B0' : 'rgba(107, 114, 128, 0.2)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Today's Summary Card */}
        <Card 
          className="p-6 mb-6"
          style={{ 
            boxShadow: '0 4px 6px -1px rgba(44, 54, 57, 0.08)',
            background: 'linear-gradient(135deg, rgba(10, 132, 255, 0.03) 0%, rgba(125, 212, 176, 0.03) 100%)',
            borderRadius: '0.75rem',
            border: '1px solid rgba(44, 54, 57, 0.08)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Morning Status */}
            <div className="flex items-start gap-4">
              <div 
                className="p-3 rounded-xl mt-1" 
                style={{ 
                  backgroundColor: forecastCompleted ? 'rgba(125, 212, 176, 0.15)' : 'rgba(10, 132, 255, 0.1)',
                  borderRadius: '0.75rem'
                }}
              >
                <Sunrise className="w-6 h-6" style={{ color: forecastCompleted ? '#7DD4B0' : '#0A84FF' }} />
              </div>
              <div className="flex-1">
                <h3 style={{ fontSize: '1rem', fontWeight: 500, color: '#2C3639', marginBottom: '0.25rem' }}>
                  Morning Intention
                </h3>
                {forecastCompleted ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#7DD4B0' }} />
                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                      Forecast set for today
                    </p>
                  </div>
                ) : (
                  <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    Ready to set your intention
                  </p>
                )}
              </div>
            </div>

            {/* Evening Status */}
            <div className="flex items-start gap-4">
              <div 
                className="p-3 rounded-xl mt-1" 
                style={{ 
                  backgroundColor: reflectionCompleted ? 'rgba(125, 212, 176, 0.15)' : 'rgba(107, 114, 128, 0.1)',
                  borderRadius: '0.75rem'
                }}
              >
                <Sunset className="w-6 h-6" style={{ color: reflectionCompleted ? '#7DD4B0' : '#6B7280' }} />
              </div>
              <div className="flex-1">
                <h3 style={{ fontSize: '1rem', fontWeight: 500, color: '#2C3639', marginBottom: '0.25rem' }}>
                  Evening Reflection
                </h3>
                {reflectionCompleted ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#7DD4B0' }} />
                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                      Today's reflection complete
                    </p>
                  </div>
                ) : forecastCompleted ? (
                  <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    Ready to reflect on today
                  </p>
                ) : (
                  <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    Complete morning intention first
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Single Primary CTA */}
        <Button
          onClick={primaryCTA.action}
          className="w-full"
          style={{ 
            backgroundColor: primaryCTA.color,
            color: primaryCTA.textColor,
            fontSize: '1rem',
            fontWeight: 500,
            height: '3.5rem',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            border: 'none',
            boxShadow: '0 2px 4px rgba(44, 54, 57, 0.1)'
          }}
        >
          <CTAIcon className="w-5 h-5" />
          {primaryCTA.label}
        </Button>

        {/* Contextual encouragement message */}
        {!forecastCompleted && (
          <p 
            className="text-center mt-6"
            style={{ 
              fontSize: '0.875rem',
              color: '#6B7280',
              fontStyle: 'italic',
              lineHeight: '1.5'
            }}
          >
            Take a moment to set your intention—it helps you understand your patterns
          </p>
        )}

        {forecastCompleted && !reflectionCompleted && (
          <p 
            className="text-center mt-6"
            style={{ 
              fontSize: '0.875rem',
              color: '#6B7280',
              fontStyle: 'italic',
              lineHeight: '1.5'
            }}
          >
            Come back this evening to reflect on how your day went
          </p>
        )}

        {forecastCompleted && reflectionCompleted && (
          <p 
            className="text-center mt-6"
            style={{ 
              fontSize: '0.875rem',
              color: '#7DD4B0',
              fontStyle: 'italic',
              lineHeight: '1.5',
              fontWeight: 500
            }}
          >
            ✨ Great work today! Chat with your health companion or rest up for tomorrow
          </p>
        )}
      </div>
    </div>
  );
}
