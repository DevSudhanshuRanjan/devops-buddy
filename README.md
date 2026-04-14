# 🚀 DevOps Buddy

DevOps Buddy is an interactive, modern, and engaging web-based learning platform designed to teach DevOps practices like Git, GitHub, continuous integration, and continuous deployment (CI/CD). Built with a highly responsive and sleek dark-mode UI, it guides users through curriculum modules, quizzes, and tracks real-time progress.

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
*(A view of the dashboard highlighting progress bars, streak tracking, and recent activity.)*

### 2. Module & Lessons View
![Lesson View](./public/screenshots/lesson.png)
*(A screenshot showing the lesson reading interface with sidebars and navigation.)*

### 3. Interactive Quiz
![Quiz Interface](./public/screenshots/quiz.png)
*(A view of the quiz test interface and score summaries.)*

---

## 🛠️ Technology Stack

- **Frontend:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **CI/CD:** GitHub Actions & Vercel Auto-deploy

---

## 💻 Running Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (Wait, Version 20 or higher recommended) installed on your system.

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

## 🚀 CI/CD Pipeline

The project features an automated GitHub Actions pipeline located in `.github/workflows/ci.yml` that triggers on all branches.
- **Lint Check:** Automatically lints the code using ESLint to enforce best practices.
- **Build Test:** Validates that the application compiles correctly.
- **Vercel Deployment:** Automatically deploys successfully built changes.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/DevSudhanshuRanjan/devops-buddy/issues).
