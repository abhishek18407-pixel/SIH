# 🏛️ CivicAI — AI-Powered Civic Issue Reporting System

> **Smart India Hackathon (SIH) Project** | **Problem Statement ID:** `SIH260011`

CivicAI is an intelligent, voice-first, and multilingual civic issue reporting and governance platform designed to bridge the gap between citizens and municipal administration. By enabling citizens to report civic grievances through speech or text in regional languages, CivicAI simplifies complaint registration, AI-assisted categorization, and administrative tracking.

---

## 🌟 Key Features

- 🎙️ **Voice-First & Multilingual Reporting**: Record audio complaints in multiple regional languages with real-time speech capture and visual audio controls.
- ✍️ **Interactive Text Reporting**: Input detailed descriptions with character limit validation and multi-language support.
- 🔄 **3-Step Complaint Workflow**:
  1. **Describe**: Choose language & input mode (Voice / Text).
  2. **Review**: Play back audio, inspect text summaries, and modify entries before submission.
  3. **Process**: Prepare data for automated AI transcription, classification, priority scoring, and department routing.
- 📍 **Location & Media Integration**: Infrastructure ready for GPS location auto-detection, interactive map picker, and photo evidence uploads.
- 📊 **Citizen & Admin Interfaces**: Dedicated modules for reporting, tracking complaint status (`/track`), viewing past history (`/my-complaints`), and municipal admin dashboards.
- 🎨 **Modular & Responsive Design**: Designed with standard UI tokens, responsive layouts, accessible state handlers (loaders, empty states, error states), and smooth transitions.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Styling** | Vanilla CSS (CSS Custom Properties & Design Tokens) |
| **Linter** | [Oxlint](https://oxc.rs/docs/tools/oxlint.html) |

---

## 📂 Project Structure

```text
SIH-main/
├── .env.example              # Environment variables template
├── .oxlintrc.json            # Oxlint configuration
├── index.html                # Main HTML entry point
├── package.json              # Project dependencies & npm scripts
├── vite.config.js            # Vite configuration
└── src/
    ├── App.jsx               # Main React application router setup
    ├── main.jsx              # Application entry point
    ├── components/           # Reusable UI Components
    │   ├── citizen/          # Citizen-facing components (VoiceInput, ComplaintReview, etc.)
    │   └── common/           # System-wide components (Button, Card, Navbar, Loader, Modal)
    ├── constants/            # Application constants
    ├── context/              # React Context state management
    ├── hooks/                # Custom React hooks
    ├── layouts/              # Page layouts (Header, Footer, Page Containers)
    ├── pages/                # Page Views
    │   ├── admin/            # Municipal Admin Dashboard & Management pages
    │   └── citizen/          # Citizen pages (Home, Report, Track, My Complaints, About)
    ├── services/             # API services & integration logic
    ├── styles/               # Design tokens, variables, & global styles
    └── utils/                # Helper functions & utilities
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd SIH-main
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Copy `.env.example` to `.env` and fill in the required API endpoints and keys:
   ```bash
   cp .env.example .env
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## ⚙️ Environment Variables

The application configures environment variables prefixed with `VITE_`:

| Variable | Description |
| :--- | :--- |
| `VITE_APP_NAME` | Name of the application (`CivicAI`) |
| `VITE_APP_ENV` | Running environment (`development` / `production`) |
| `VITE_API_BASE_URL` | Backend REST API server URL |
| `VITE_AI_API_KEY` | API key for AI categorization & summary service |
| `VITE_SPEECH_API_KEY` | API key for Speech-to-Text conversion |
| `VITE_TRANSLATION_API_KEY` | API key for multilingual translation service |
| `VITE_MAPS_API_KEY` | API key for maps & geolocation services |

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Bundles the application for production deployment.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs Oxlint to check code quality and syntax standards.

---

## 🎯 SIH Problem Alignment (`SIH260011`)

CivicAI addresses the Smart India Hackathon problem statement by providing:
1. Low-friction voice interface empowering illiterate or non-tech-savvy citizens.
2. Multilingual support ensuring accessibility across diverse linguistic backgrounds.
3. Structured metadata extraction ready for AI categorization, department routing, and automated prioritization.

---

## 📄 License

This project is developed for the Smart India Hackathon (SIH). All rights reserved.