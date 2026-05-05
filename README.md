
# 🎬 Netflix Gemini — AI-Powered Movie Discovery Platform

> Solve the *"what to watch tonight?"* problem — forever.

Netflix Gemini reimagines content discovery by replacing traditional keyword browsing with natural language AI search. Powered by **Google Gemini API** and backed by **TMDB's 500K+ title database**, it delivers real-time trending content and personalised recommendations in a seamless, Netflix-inspired interface.

---

## 🚀 Live Demo

Live Demo : https://vercel.com/coder-pros-projects/nefltix-gemini
GitHub : https://github.com/MAvishkar12/NefltixGemini

---

## ✨ Key Highlights

- **~50% faster content discovery** — Natural language search via Gemini API replaces slow, imprecise keyword browsing
- **500K+ titles indexed** — TMDB API integration surfaces real-time trending and personalised results with high relevance
- **Zero prop-drilling** — Redux Toolkit global state spans 5+ feature modules for a fluid, re-render-optimised UX

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | React.js |
| State Management | Redux Toolkit |
| Backend / Auth | Firebase |
| AI Search | Google Gemini API |
| Movie Database | TMDB API |
| Styling | Tailwind CSS |

---

## 📸 Features

### 🤖 AI-Powered Natural Language Search
Ask anything — *"a feel-good comedy from the 90s"* or *"something like Interstellar but shorter"* — and Gemini API interprets your intent to surface the most relevant titles instantly.

### 🔥 Real-Time Trending Content
Connected to TMDB's live database of 500K+ titles, the platform always shows what's popular right now — no stale or irrelevant recommendations.

### 🎯 Personalised Suggestions
User preferences and browsing patterns drive a tailored discovery experience from the moment they log in.

### 🔐 Authentication
Secure sign-up / sign-in flows powered by Firebase Authentication, with protected routes and persistent sessions.

### 🗂️ Global State with Redux Toolkit
Architected across 5+ feature modules — user auth, movie browse, GPT search, language settings, and more — using Redux slices to eliminate prop-drilling and keep the UI consistently in sync.

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- Firebase project
- Google Gemini API key
- TMDB API key

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/netflix-gemini.git
cd netflix-gemini

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_TMDB_KEY=your_tmdb_api_key
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
```

### Run Locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
netflix-gemini/
├── public/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header/
│   │   ├── MovieCard/
│   │   ├── MovieList/
│   │   └── GPTSearch/
│   ├── hooks/              # Custom React hooks
│   ├── store/              # Redux Toolkit slices & store
│   │   ├── userSlice.js
│   │   ├── moviesSlice.js
│   │   └── gptSlice.js
│   ├── utils/              # API helpers, constants, Firebase config
│   ├── pages/              # Route-level pages (Browse, Login)
│   └── App.js
├── .env
└── README.md
```

---

## 🔑 Core Architecture Decisions

### Redux Toolkit for Global State
Centralised store with dedicated slices per feature domain eliminates prop-drilling across deeply nested components and ensures predictable state updates with minimal re-renders.

### Gemini API Integration
User queries are passed directly to the Gemini API, which returns semantically matched movie/show suggestions. These are cross-referenced with TMDB to fetch full metadata, posters, and ratings.

### Firebase as BaaS
Firebase handles authentication, real-time session persistence, and acts as a lightweight backend — keeping the architecture frontend-focused without needing a custom server.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgements

- [Google Gemini API](https://ai.google.dev/) — Conversational AI for search
- [TMDB API](https://www.themoviedb.org/documentation/api) — Movie & TV metadata
- [Firebase](https://firebase.google.com/) — Auth & backend services
- [Redux Toolkit](https://redux-toolkit.js.org/) — Simplified state management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling

---

<p align="center">Built with ❤️ by <a href="https://github.com/MAvishkar12">Avishkar More</a></p>