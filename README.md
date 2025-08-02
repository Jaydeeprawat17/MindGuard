# 🧠 MindGuard – AI-Powered Mental Health Companion

> *"Because every mind deserves protection."*

MindGuard is an AI-powered emotional safety platform designed to detect early signs of depression or suicidal thoughts and offer real-time support, insights, and emergency assistance. Built with empathy and technology, MindGuard helps users track their mental health, reflect on their emotions, and reach out before it's too late.

---
## 📽️ Demo Video (Optional but Encouraged)
[👉 Watch the 2-minute demo here](#) *(https://youtu.be/XlGjlovC3T0)*

## 🌟 Features

### 📝 Mood Journal
- Write or speak about your day.
- Log emotional reflections securely and privately.

### 🤖 AI Emotion & Risk Detection
- Uses sentiment/emotion analysis to detect sadness, anxiety, and suicidal language.
- Warns users if high-risk language is detected.

### 📈 Mood Tracker Dashboard
- Visualizes emotional trends over days and weeks.
- Identifies patterns like “7-day sadness streak” or “emotional dips.”

### 💬 Safe-Space Chatbot
- Friendly AI chat companion for talking, calming, and grounding.
- Offers support, affirmations, and resources.

### 🚨 Emergency Mode
- If a high-risk pattern is detected:
  - Shows helpline resources
  - Triggers alerts (optional simulation)
  - Offers immediate grounding activities

### 🧘 Wellness Toolbox
- Breathing exercises
- Sleep sounds
- Motivational prompts and affirmations

---

## 🛠️ Tech Stack

| Layer         | Tech Used                         |
|---------------|-----------------------------------|
| **Frontend**  | React, Tailwind CSS, Framer Motion |
| **Backend**   | Node.js, Express, MongoDB          |
| **AI/NLP**    | Hugging Face Transformers (e.g., DistilBERT for emotion/sentiment) |
| **Voice Input** | Web Speech API (browser-based)   |
| **Deployment**| Vercel / Render / Netlify (frontend), Railway / Cyclic (backend) |

---

## 🚀 How It Works

1. **User writes or speaks** their journal entry.
2. **AI analyzes** text using emotion & sentiment models.
3. **Mood data is visualized** over time (graphs).
4. **If risk detected**, user is warned and offered emergency options.
5. **Wellness tools** and chatbot offer continued emotional support.

---

## 📦 Installation (Local Setup)

```bash
# 1. Clone the repo
git clone https://github.com/Jaydeeprawat17/MindGuard.git
cd MindGuard

# 2. Install dependencies
npm install

# 3. Start the frontend
npm run dev

# 4. (Optional) For backend API
cd backend
npm install
npm run dev
