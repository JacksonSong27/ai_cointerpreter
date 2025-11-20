import { useState, useEffect } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./components/ui/tabs";
import { Dashboard } from "./components/Dashboard";
import { MorningForecast } from "./components/MorningForecast";
import { EveningReflection } from "./components/EveningReflection";
import { ChatInterface } from "./components/ChatInterface";
import { WeeklyDigest } from "./components/WeeklyDigest";
import { GoalsManager } from "./components/GoalsManager";
import { KriyaScenarios } from "./components/KriyaScenarios";
import { KriyaFeatures } from "./components/KriyaFeatures";
import { FloatingChat } from "./components/FloatingChat";
import { PlanTomorrow } from "./components/PlanTomorrow";
import {
  Activity,
  Sunrise,
  Sunset,
  MessageCircle,
  BookOpen,
  Target,
  Users,
  Info,
  Beaker,
  Calendar,
} from "lucide-react";
import {
  generateMockHealthData,
  defaultGoals,
  generateTodayForecast,
} from "./lib/mockData";
import {
  HealthMetric,
  Goal,
  DailyForecast,
} from "./types/health";
import { Badge } from "./components/ui/badge";

export default function App() {
  const [prototypeMode, setPrototypeMode] = useState(true);
  const [healthData, setHealthData] = useState<HealthMetric[]>(
    [],
  );
  const [goals, setGoals] = useState<Goal[]>(defaultGoals);
  const [forecasts, setForecasts] = useState<DailyForecast[]>(
    [],
  );
  const [activeTab, setActiveTab] = useState("dashboard");
  const [morningScenario, setMorningScenario] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Initialize with mock data
    const mockData = generateMockHealthData();
    setHealthData(mockData);

    // Generate today's forecast
    const todayForecasts = generateTodayForecast(mockData);
    setForecasts(todayForecasts);
  }, []);

  const handleSaveForecast = (
    metric: string,
    value: number,
  ) => {
    setForecasts((prev) =>
      prev.map((f) =>
        f.metric === metric ? { ...f, userAdjusted: value } : f,
      ),
    );
  };

  const handleSaveReflection = (
    notes: string,
    mood: string,
  ) => {
    // Simulate adding actual data to forecasts
    const updatedForecasts = forecasts.map((f) => {
      if (!f.actual) {
        // Generate mock "actual" data that's close to but not exactly the prediction
        const variance = (Math.random() - 0.5) * 0.3;
        const predicted = f.userAdjusted || f.predicted;
        return {
          ...f,
          actual:
            f.metric === "sleep"
              ? Math.max(
                  5,
                  Math.min(10, predicted * (1 + variance)),
                )
              : Math.max(
                  3000,
                  Math.min(
                    15000,
                    Math.round(predicted * (1 + variance)),
                  ),
                ),
        };
      }
      return f;
    });
    setForecasts(updatedForecasts);

    // In a real app, would save reflection to database
    console.log("Reflection saved:", { notes, mood });
  };

  const todayData = healthData[healthData.length - 1] || null;
  const weekData = healthData.slice(-7);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Prototype Banner */}
      {prototypeMode && (
        <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
          <div className="container mx-auto flex items-center justify-between max-w-7xl">
            <div className="flex items-center gap-2">
              <Beaker className="w-4 h-4" />
              <span className="text-sm">
                <strong>Research Prototype</strong> - Protocol A-H Study - Simulated Data
              </span>
            </div>
            <button
              onClick={() => setPrototypeMode(false)}
              className="text-xs hover:underline"
            >
              Hide
            </button>
          </div>
        </div>
      )}

      {/* Modern App Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl shadow-lg shadow-green-500/20">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">
                  KRIYA
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Your AI Health Companion
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Tabs Navigation */}
      <div className="hidden md:block border-b border-border bg-card/50 backdrop-blur sticky top-16 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start bg-transparent h-12 p-0 gap-1">
              <TabsTrigger
                value="dashboard"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-4"
              >
                <Activity className="w-4 h-4" />
                <span>Home</span>
              </TabsTrigger>
              <TabsTrigger
                value="morning"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-4"
              >
                <Sunrise className="w-4 h-4" />
                <span>Morning</span>
              </TabsTrigger>
              <TabsTrigger
                value="evening"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-4"
              >
                <Sunset className="w-4 h-4" />
                <span>Evening</span>
              </TabsTrigger>
              <TabsTrigger
                value="plan"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-4"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan</span>
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-4"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger
                value="digest"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-4"
              >
                <BookOpen className="w-4 h-4" />
                <span>Digest</span>
              </TabsTrigger>
              <TabsTrigger
                value="goals"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-4"
              >
                <Target className="w-4 h-4" />
                <span>Goals</span>
              </TabsTrigger>
              <TabsTrigger
                value="scenarios"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-4"
              >
                <Users className="w-4 h-4" />
                <span>Stories</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 md:py-8 pb-24 md:pb-32">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="dashboard" className="mt-0">
            <Dashboard
              todayData={todayData}
              weekData={weekData}
              goals={goals}
              onNavigate={setActiveTab}
            />
          </TabsContent>

          <TabsContent value="morning" className="mt-0">
            <MorningForecast
              forecasts={forecasts}
              onSaveForecast={handleSaveForecast}
              onLockIn={() => setActiveTab("dashboard")}
              goals={goals}
              weekData={weekData}
              scenario={morningScenario}
              setScenario={setMorningScenario}
            />
          </TabsContent>

          <TabsContent value="evening" className="mt-0">
            <EveningReflection
              forecasts={forecasts}
              onSaveReflection={handleSaveReflection}
              morningScenario={morningScenario}
            />
          </TabsContent>

          <TabsContent value="plan" className="mt-0">
            <PlanTomorrow
              forecasts={forecasts}
              morningScenario={morningScenario}
            />
          </TabsContent>

          <TabsContent value="chat" className="mt-0">
            <ChatInterface healthData={healthData} />
          </TabsContent>

          <TabsContent value="digest" className="mt-0">
            <WeeklyDigest weekData={weekData} goals={goals} />
          </TabsContent>

          <TabsContent value="goals" className="mt-0">
            <GoalsManager
              goals={goals}
              onUpdateGoals={setGoals}
            />
          </TabsContent>

          <TabsContent value="scenarios" className="mt-0">
            <KriyaScenarios />
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-lg">
        <div className="grid grid-cols-3 h-16">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === "dashboard"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => setActiveTab("morning")}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === "morning"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            <Sunrise className="w-5 h-5" />
            <span className="text-xs">Morning</span>
          </button>
          <button
            onClick={() => setActiveTab("evening")}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === "evening"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            <Sunset className="w-5 h-5" />
            <span className="text-xs">Evening</span>
          </button>
        </div>
        
        {/* Secondary Navigation - Swipe up to reveal */}
        <div className="border-t border-border bg-muted/30 px-4 py-2">
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setActiveTab("plan")}
              className={`flex items-center gap-2 text-sm transition-colors ${
                activeTab === "plan"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Plan</span>
            </button>
            <button
              onClick={() => setActiveTab("digest")}
              className={`flex items-center gap-2 text-sm transition-colors ${
                activeTab === "digest"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Digest</span>
            </button>
            <button
              onClick={() => setActiveTab("goals")}
              className={`flex items-center gap-2 text-sm transition-colors ${
                activeTab === "goals"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Goals</span>
            </button>
            <button
              onClick={() => setActiveTab("scenarios")}
              className={`flex items-center gap-2 text-sm transition-colors ${
                activeTab === "scenarios"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Stories</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Floating AI Chat */}
      <FloatingChat healthData={healthData} />
    </div>
  );
}