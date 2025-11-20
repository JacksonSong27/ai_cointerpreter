# AI Co-Interpreter for Health Data

A React-based prototype for an AI Health Companion that helps users understand and interpret their health data through conversational interactions.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai_cointerpreter
   ```

2. **Navigate to the prototype directory**
   ```bash
   cd prototype
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - The app will be available at `http://localhost:8000`
   - The server will automatically open in your browser

## 📁 Project Structure

```
ai_cointerpreter/
├── prototype/                 # Main React application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ui/           # Reusable UI components
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── ...
│   │   ├── lib/              # Utilities and mock data
│   │   ├── types/            # TypeScript type definitions
│   │   └── guidelines/       # Design guidelines
│   ├── package.json
│   ├── vite.config.ts
│   └── index.html
├── README.md
└── .gitignore
```

## 🎯 Features

### Core Functionality
- **Morning Intention Setting**: Set daily health goals
- **Evening Reflection**: Review and reflect on daily progress
- **Plan Tomorrow**: Capture next-day actions immediately after nightly review
- **Chat Interface**: Conversational AI for health data interpretation
- **Dashboard**: Visual overview of health metrics
- **Weekly Goals Management**: Set and track weekly objectives
- **Weekly Digest**: Comprehensive weekly health reports

### Health Metrics Tracked
- Sleep duration and quality
- Step count and activity levels
- Heart rate monitoring
- Mindfulness sessions
- Active minutes

## 🤖 Chat Bot Responses

The chat interface uses **predefined responses** based on keyword matching, not real AI. It responds to questions like:

- "Did I sleep better after workouts?"
- "How was my heart rate today?"
- "Show me my step trends"
- "When do I sleep best?"

## 🛠️ Available Scripts

```bash
# Start development server (opens http://localhost:8000)
npm run dev

# Build for production
npm run build

# Preview production build output
npm run preview
```

## 🔄 Development Workflow

- Use `npm install` inside `prototype/` after pulling new dependencies.
- Run `npm run dev` to iterate locally; Vite serves the app at `http://localhost:8000`.
- Update `prototype/vite.config.ts` if you need to change the port or open behavior.
- Commit and push changes from the repository root so shared config and docs stay in sync.

## 🎨 Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling and dev server
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **Recharts** for data visualization
- **React Hook Form** for form handling

## 📊 Mock Data

The application uses mock health data generated in `src/lib/mockData.ts`:
- 14 days of randomly generated metrics
- Steps: 5,000-12,000 per day
- Sleep: 5.5-8.5 hours per day
- Heart Rate: 65-85 bpm
- Active Minutes: 20-80 minutes

## 🔧 Configuration

### Port Configuration
By default, the app runs on port 8000. The port is configured in `vite.config.ts`. To change the port, edit the `server.port` value in the configuration file.

### Vite Configuration
The `vite.config.ts` includes:
- React SWC plugin for fast compilation
- Path aliases for cleaner imports
- Build optimization settings

## 📱 Responsive Design

The application is designed to work on:
- Desktop browsers
- Mobile devices
- Tablet screens

## 🎯 Design Philosophy

- **Empathetic and non-judgmental** tone
- **Self-compassion** focused approach
- **Pattern exploration** rather than strict tracking
- **Flexible goals** mindset
- **Curiosity-driven** interactions

## 🚨 Important Notes

- This is a **prototype/demo** application
- Chat responses are **predefined scripts**, not real AI
- Data is **mock/generated**, not real health data
- Designed for **UI/UX demonstration** purposes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for demonstration purposes.


---

**Note**: This is a prototype application designed to demonstrate UI/UX concepts for health data interpretation. It uses mock data and predefined responses for demonstration purposes.
