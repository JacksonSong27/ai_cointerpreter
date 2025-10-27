# Ask My Body - Design System Guidelines

## Project Overview
AI-powered health companion app that integrates with Apple Health data for research study Protocol A-H. Emphasizes self-compassion, flexible goals (budgets not targets), and reframes health deviations as insights rather than failures.

## Visual Style
Minimal, modern, soft health tech aesthetic focused on calm and compassion.

## Color Palette

### Primary Colors
- **Blue #0A84FF** - Primary accent for actions, data visualization, active states
- **Mint #7DD4B0** - Secondary accent for success, calm highlights, sleep-related metrics

### Neutrals
- **Background #F7FAFC** - Soft mist background for the entire app
- **Cards #FFFFFF** - Pure white cards with soft shadows
- **Text #2C3639** - Charcoal for primary text
- **Muted Text #6B7280** - For secondary information

### Color Behavior by Screen
| Screen | Accent Color | Meaning |
|--------|-------------|---------|
| Home | Blue+Mint small | Neutral pivot |
| Morning | Blue primary | Motivation |
| Evening | Mint accents | Compassion + learning |
| Chat | Mostly neutrals | Focus on messages |
| Weekly Digest | Mint highlights | Wins and patterns |
| Weekly Goals | Blue actions | Setting fresh intentions |

**Rule**: One accent focus per screen → reduces cognitive overload

### Usage Guidelines
- Use Blue (#0A84FF) for: Steps, activity, primary buttons, interactive elements
- Use Mint (#7DD4B0) for: Sleep, mindfulness, success states, gentle highlights
- Avoid harsh reds or warning colors - use softer amber (#F59E0B) if needed
- Gradients should be subtle: `linear-gradient(135deg, rgba(10, 132, 255, 0.05) 0%, rgba(125, 212, 176, 0.05) 100%)`

## Typography
- System fonts: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'`
- Font smoothing enabled for clarity
- Calm, readable hierarchy

## Components
- **Rounded Corners**: 0.75rem (12px) for cards and buttons
- **Soft Shadows**: `0 1px 3px 0 rgba(44, 54, 57, 0.05)`
- **Icon Backgrounds**: Use colored backgrounds with 10-15% opacity
- **Borders**: Very subtle `rgba(44, 54, 57, 0.08)`

## Tone & Voice
- Empathetic and non-judgmental
- Friendly wellness coach rather than medical authority
- Celebrate small wins, frame deviations as insights
- Use playful language ("forecast game", "curiosity", "patterns")
- Self-compassion reminders throughout

## Daily Interaction Cycle

Every day has **2 required actions**:
1. **Morning** — Set Today's Intention
2. **Evening** — Reflect on Today

Chat is **optional anytime**.

### 🏠 Home Screen (Daily Anchor)

**Shows only ONE task at a time**, based on what's done:

- If morning incomplete → button: **"Set Today's Intention"**
- If morning done but reflection not yet → button: **"Reflect on Today"**
- If both done → button: **"Ask My Body"**

**Always shows:**
- Current day
- Tiny indication of weekly goal progress (mint dots)

**Always available:**
- 👉 Floating Chat button (bottom right)

✅ Guided, ✅ Zero confusion, ✅ No long menus

### 🌅 Morning — Set Today's Intention Screen

**Action**: Confirm prediction

User can:
- ✅ Adjust goal using slider/buttons
- ✅ Read prediction insight
- ✅ Submit intention

**🔒 After submitting:**
- User **cannot return to change it**
- → Ensures prediction integrity for scoring
- → Aligns with study protocol

**Next screen**: Home updates to evening task

### 🌙 Evening — Reveal + Reflection Screen

**Action**: Submit today's reflection

User sees:
- Actual vs forecast visual
- Playful score badges (calibration + surprise index)
- Text field: "What affected your outcome today?"

**🔒 After submit:**
- Lock all reflection content from edits
- Save raw + narrative data

**Next screen:**
- → Home shows chat mode
- → Or if final day of week → Weekly digest unlocks 🎉

### 💬 Chat — Conversational Co-Interpreter

**Always accessible:**
- Floating chat button from all screens

Chat can show:
- ✅ Suggested insights
- ✅ Trivia ("Guess which day you slept longest?")
- ✅ Interactive mini-card data

**Chat does not unlock or replace the daily required tasks** (prevents distraction)

## Weekly Cycle

**Weekly = 7-day loop** (Start: Sunday or Monday – consistent per study)

### 📅 Weekly Digest unlocks only when:
- ✔ Last evening reflection of the week is submitted OR
- ✔ New week starts automatically (90% of users forget on last night)

**Digest navigation:**
- ✅ Users can scroll up/down
- ✅ Cannot edit previous week's data
- ✅ Encouraged to move forward → Next Week Goals

**Final CTA**: Set New Week's Intentions

### 🎯 Weekly Goals — Behavior

- Slider to set sleep / steps / mindfulness budgets
- Live number change
- Mint reinforces "progress, not perfection"

**After submit** → Home (Morning intention if morning)

## Goal Communication & Behavior

The app uses specific language to communicate the relationship between weekly goals and daily intentions, ensuring users always feel supported.

### How the App Should Communicate This

**Weekly goal screen:**
> "This is your flexible weekly target. You can reach it in different ways each day."

**Daily morning screen:**
> "Today's intention helps you move toward your weekly goal."

**Weekly digest:**
> "You hit your goal on 4 days — success!"

The language ensures users always feel supported.

### What Happens in the UI

| Behavior | Weekly Affects Daily | Daily Affects Weekly |
|----------|---------------------|---------------------|
| Setting goals | Daily slider auto-suggestions stay realistic | Mint "✓ day completed" dots |
| Progress display | Show "2 of 4 days completed" | Weekly digest evaluation |
| Motivation | Future-focused ("You got this") | Learning-focused ("See pattern") |

**No judgment. No strict fail states. Just pattern awareness.**

### Simple Math Logic (Backend)

**Weekly Goal Example: Sleep average = 7 hours**

Daily contributes:
```
Weekly Sleep Average = (sum of each day's sleep) / 7
```

**Weekly Goal Example: Steps goal = 4 days**

Daily contributes:
```
If Daily Steps >= Daily Goal → Mark as Goal Day ✅
Else → Neutral, not a failure
```

**Evening Reflection Scoring:**

*Calibration Points (0-100 scale):*
- Measures prediction accuracy across both steps and sleep
- Formula: `100 - error_percentage` for each metric, then averaged
- Example: If forecast was 7000 steps and actual was 8100 steps:
  - Error = |8100 - 7000| / 7000 = 15.7%
  - Calibration = 100 - 15.7 = 84.3 points
- Higher score = more accurate prediction

*Surprise Index (0-100%):*
- Shows combined deviation from predictions
- Average of percentage errors from both metrics
- Higher number = more unexpected outcomes
- Example: 15.7% steps error + 2% sleep error = ~9% surprise index

*Dynamic Interpretation:*
- ≥85 calibration: "Excellent forecast"
- ≥70 calibration: "Pretty good sync"
- ≥30% surprise: "Life threw some surprises"
- Otherwise: "Your body had different plans"

## What Stays Editable vs Locked

| Screen | Editable? | Why |
|--------|-----------|-----|
| Login | ✅ | Correction allowed |
| Weekly Goals | ✅ until next week starts | Flexibility mindset |
| Morning Intention | ❌ after submit | Avoid cheating |
| Evening Reflection | ❌ after submit | Maintain fidelity |
| Chat | Always open | Learning & curiosity |
| Weekly Digest | View only | Preserve report integrity |

✅ This maintains honest behavior and clean research data.

## What Happens if User Skips a Step?

| Scenario | App Response |
|----------|--------------|
| Skips morning intention | Evening asks intention first OR default prediction auto-applied |
| Skips reflection | Reminder card appears next morning |
| Misses multiple days | App enters "gentle recovery mode" (resume today) |
| Joins mid-week | Week count continues normally |

✅ Always supportive, never punitive

## Complete Interaction Flow Summary

```
Login/Signup
    ↓
Home (Decide what's next)
    ↓ Morning → Set Intention → Lock    ← Back disabled after submit
    ↓
Home (Evening pending)
    ↓ Evening Reflection → Lock
    ↓
Home (both done)
    ↓
Chat (optional anytime)
    ↓
Weekly Digest (if end of week)
    ↓
Set Next Week Intentions
    ↓
Repeat Daily Flow
```

## Navigation Flow

The app follows a linear daily flow with locked screens after submission:

### Daily Flow Screens
1. **Login** - Welcome back with caring subtext
2. **Home** - Today's summary with ONE time-based CTA (morning/evening/chat)
3. **Morning Intention** - Set daily goals with AI forecast (locks after confirm)
4. **Evening Reflection** - Review actual vs forecast, playful scoring (locks after submit)
5. **Chat** - Always accessible via floating button, never locks

### Weekly Flow Screens
6. **Weekly Goals** - Set flexible weekly budgets (sleep, steps, mindfulness)
7. **Weekly Digest** - Narrative insights with charts and reflections

### Navigation Rules
- One cognitive task per page
- Linear flow to promote habit formation
- Floating chat button always accessible (bottom-right)
- Screens lock after submission to prevent re-editing
- Back navigation allowed before submission

## Prototype Testing Features

**Prototype Navigation Bar** (top of screen):
- Shows current screen name and number (e.g., "2. Home")
- **Back button** - Navigate to previous screen (disabled on Login/Home per flow rules)
- **Next button** - Skip to next screen for testing
- **Screen menu** (center) - Jump to any screen directly for testing
- **Banner** - "PROTOTYPE MODE" indicator

**Navigation Permissions by Screen:**
- Login: ❌ Back, ✅ Next
- Home: ❌ Back, ✅ Next (linear entry point)
- Morning/Evening/Weekly: ✅ Back, ✅ Next
- Chat: ✅ Back, ✅ Next (never locks)
- Weekly Digest: ✅ Back, ✅ Next

**Keyboard Shortcut:**
- Press **P** to toggle prototype navigation bar on/off
- When off, experience the app as users would see it
- Hint shown in bottom-left corner

## Research Protocol Features
1. **Flexible Goals** - Framed as budgets, not rigid targets
2. **Morning Forecast** - AI predictions with user adjustment
3. **Evening Reflection** - Playful scoring (calibration points, surprise index)
4. **Conversational Chat** - Curious, supportive AI co-interpreter
5. **Weekly Digest** - Narrative storytelling of health patterns

## Important Implementation Notes

- Some base components may have styling (e.g., gap/typography) baked in as defaults
- **Always explicitly set** styling information from guidelines in React code to override defaults
- Maintain consistent rounded corners (0.75rem), shadows, and color usage
- Test all locked/unlocked states carefully
- Preserve the compassionate, non-judgmental tone in all copy
