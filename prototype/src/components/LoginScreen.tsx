import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Activity } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app would validate credentials
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pb-8" style={{ backgroundColor: '#F7FAFC' }}>
      <div className="w-full max-w-md">
        {/* App Logo */}
        <div className="flex flex-col items-center mb-12">
          <div 
            className="p-4 rounded-2xl mb-4" 
            style={{ background: 'linear-gradient(135deg, #0A84FF 0%, #96E6C2 100%)' }}
          >
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-center" style={{ fontSize: '1.75rem', fontWeight: 500, color: '#2C3639' }}>
            Ask My Body
          </h1>
        </div>

        <Card className="p-8" style={{ boxShadow: '0 4px 6px -1px rgba(44, 54, 57, 0.08)' }}>
          <h2 className="mb-8" style={{ fontSize: '1.5rem', fontWeight: 500, color: '#2C3639' }}>
            Welcome back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block mb-2"
                style={{ fontSize: '0.875rem', fontWeight: 500, color: '#2C3639' }}
              >
                Email (User ID)
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-12"
                style={{ 
                  backgroundColor: '#F7FAFC',
                  border: '1px solid rgba(44, 54, 57, 0.1)',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block mb-2"
                style={{ fontSize: '0.875rem', fontWeight: 500, color: '#2C3639' }}
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12"
                style={{ 
                  backgroundColor: '#F7FAFC',
                  border: '1px solid rgba(44, 54, 57, 0.1)',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12"
              style={{ 
                backgroundColor: '#0A84FF',
                color: '#FFFFFF',
                fontSize: '1rem',
                fontWeight: 500
              }}
            >
              Continue
            </Button>

            <div className="text-center">
              <a 
                href="#" 
                style={{ 
                  color: '#0A84FF',
                  fontSize: '0.875rem',
                  textDecoration: 'none'
                }}
              >
                Forgot password?
              </a>
            </div>
          </form>
        </Card>

        {/* Caring subtext */}
        <p 
          className="text-center mt-6"
          style={{ 
            fontSize: '0.75rem',
            color: '#6B7280',
            fontStyle: 'italic'
          }}
        >
          You deserve support today
        </p>
      </div>
    </div>
  );
}
