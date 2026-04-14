# 🚀 DevOps Buddy

DevOps Buddy is an interactive, modern, and engaging web-based learning platform designed to teach DevOps practices like Git, GitHub, continuous integration, and continuous deployment (CI/CD). Built with a highly responsive and sleek dark-mode UI, it guides users through curriculum modules, quizzes, and tracks real-time progress.

## 👥 Team
- **Sudhanshu Ranjan** — Frontend & Backend Development, Deployment
- **Vaishnavi Joshi** — CI/CD Pipeline, GitHub Actions, Documentation

## 🎯 Features

- **Interactive Modules & Lessons:** Bite-sized lessons covering essential DevOps concepts.
- **Real-Time Progress Tracking:** Tracks day streaks, completed lessons, and study time. Dynamic circular progress bars and module visualizations.
- **Quizzes & Summaries:** Built-in quizzes to test knowledge retention. Post-module completion summaries.
- **Modern UI/UX:** Built with a beautiful dark theme, using Tailwind CSS and Lucide React icons.
- **CI/CD Integrated:** Fully configured GitHub Actions pipeline for linting, testing, and automated deployment.

---

## 📸 Screenshots

*(Replace the paths with your actual screenshot images once added)*

### 1. Dashboard Overview
![Dashboard View](./public/screenshots/dashboard.png)

### 2. Module & Lessons View
![Lesson View](./public/screenshots/lesson.png)

### 3. Interactive Quiz
![Quiz Interface](./public/screenshots/quiz.png)

---

## 🛠️ Technology Stack

| Tool | Purpose |
|----------------|----------------------------|
| Frontend | React 19, Tailwind CSS v4, Lucide React, Vite |
| GitHub Actions| CI/CD automation |
| Vercel | Frontend deployment |
| Node.js | Runtime environment |
| Git | Version control |
| GitHub Secrets| Secure credential storage |

---

## 🚀 CI/CD Pipeline Explanation
This project uses GitHub Actions for automated CI/CD.

### Pipeline Stages:
| Stage | Description | Trigger |
|--------|------------------------------------------|-----------------|
| Build | Install dependencies, compile project | Every push/PR on all branches |
| Test | Run tests and lint checks | After build |
| Deploy | Notify deployment (Vercel auto-deploys) | Only on main |

### Git Workflow
- `main` branch: production-ready code only
- `feature/*` branches: development work
- All changes merged via Pull Requests
- Minimum 5 commits with meaningful messages

---

## 💻 Running Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (Version 20 or higher recommended) installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DevSudhanshuRanjan/devops-buddy.git
   cd devops-buddy
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 💡 Challenges Faced
1. **Pipeline Execution Blocked:** Solved a typo with the GitHub Actions directory (`.github/workflow` converted to `workflows`).
2. **Node.js Backward Compatibility:** Found out modern tools like Vite and Tailwind v4 crash with older Node instances; fixed CI execution under Node v24.
3. **Rigorous Linters Enforcement:** Eliminated 12 unused variables across components to strictly pass GitHub Actions integration checks natively.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/DevSudhanshuRanjan/devops-buddy/issues).
