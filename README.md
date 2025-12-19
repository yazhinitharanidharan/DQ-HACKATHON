🚀 Nexi – Chronos AI Personal Assistant

Nexi is a smart productivity application powered by Chronos AI, a personal AI assistant designed to help users manage tasks, schedules, emails, and meetings efficiently.
The system combines a modern Expo (React Native) frontend, intelligent AI logic, and automation workflows to create a seamless personal secretary experience.

✨ Key Features
🧠 Chronos AI (Personal Assistant)

Conversational AI interface

Adds tasks using natural language

Answers questions about workload and task count

Gives motivational and productivity-focused responses

Smart intent detection (add task, change priority, ask status)

✅ Task Management

Add, complete, and track tasks

Priority levels: High / Normal

Difficulty detection: Easy / Medium / Hard

Task strike-off when completed

Productivity streak & focus score

Cognitive overload detection with AI insights

📅 Calendar (Planned Extension)

Schedule-based workflow planning

Future integration with meetings and reminders

✉️ Email Agent (Automation)

Trigger email workflows via UI

Integrated with n8n automation

AI-assisted email prioritization

Auto-label important emails

Auto-reply for urgent messages

🤝 Meetings Module

Meeting Analyzer (separate page)

Document / Meeting Brief Generator (separate page)

Clean navigation without cluttering the tab bar

🧩 Tech Stack
Frontend

Expo (React Native)

Expo Router

TypeScript

Context API (Global State Management)

Backend / AI

Node.js / Python (API endpoints)

OpenAI (via backend)

Local intent logic fallback (offline-safe)

Automation

n8n Cloud

Gmail Trigger & Webhooks

AI-powered email classification

📂 Project Structure
nexi-app/
│
├── app/
│   ├── (tabs)/
│   │   ├── tasks.tsx
│   │   ├── calendar.tsx
│   │   ├── email.tsx
│   │   ├── meeting.tsx
│   │   └── chronos.tsx
│   │
│   ├── meeting/
│   │   ├── analyzer.tsx
│   │   └── briefer.tsx
│   │
│   ├── login.tsx
│   └── _layout.tsx
│
├── context/
│   └── TaskContext.tsx
│
├── assets/
│   └── images/
│
└── README.md

🧠 How Chronos AI Works

User enters a message

Chronos checks:

Task intent (add / update / count)

Priority or focus intent

If matched → handled locally (fast)

Otherwise → forwarded to AI backend

AI response returned to UI

Tasks are synced globally via Context API

This hybrid approach ensures:

⚡ Fast responses

🔐 Offline safety

🤖 Real AI intelligence when available

▶️ How to Run the Project
1️⃣ Install dependencies
npm install

2️⃣ Start Expo
npx expo start

3️⃣ Run on:

Web

Android Emulator

Physical Device (Expo Go)

🔐 Environment Notes

AI API keys are handled in the backend

n8n workflows must be ACTIVE

Webhooks are securely triggered from the app

🌱 Future Enhancements

Voice input for Chronos

Smart meeting summaries

Calendar-task auto syncing

Notification reminders

Multi-user authentication

Cloud task storage

👥 Team & Hackathon

This project was built as part of a hackathon, focusing on:

Real-world productivity problems

AI + automation integration

Clean UX with scalable architecture

🏁 Conclusion

Nexi with Chronos AI is more than a to-do app —
it’s a personal productivity companion that thinks, organizes, and assists intelligently.
