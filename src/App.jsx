import { useState, useEffect } from 'react';
import { TopNavBar, Sidebar } from './components/Layout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ModuleOverviewPage from './pages/ModuleOverviewPage';
import LessonViewPage from './pages/LessonViewPage';
import QuizPage from './pages/QuizPage';
import SummaryPage from './pages/SummaryPage';
import ProgressPage from './pages/ProgressPage';

function loadState() {
  try {
    const saved = localStorage.getItem('devops-buddy-state');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return null;
}

export default function App() {
  const saved = loadState();
  const [currentPage, setCurrentPage] = useState(saved?.currentPage || 'landing');
  const [currentLesson, setCurrentLesson] = useState(saved?.currentLesson || null);
  const [completedLessons, setCompletedLessons] = useState(saved?.completedLessons || []);
  const [quizAnswers, setQuizAnswers] = useState(saved?.quizAnswers || {});
  const [quizSubmitted, setQuizSubmitted] = useState(saved?.quizSubmitted || false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem('devops-buddy-state', JSON.stringify({
        currentPage, currentLesson, completedLessons, quizAnswers, quizSubmitted
      }));
    } catch (e) {}
  }, [currentPage, currentLesson, completedLessons, quizAnswers, quizSubmitted]);

  const navigate = (page, lessonId = null) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentPage(page);
      if (lessonId) setCurrentLesson(lessonId);
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setFadeIn(true);
    }, 150);
  };

  const completeLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
  };

  // Landing page has its own layout
  if (currentPage === 'landing') {
    return <LandingPage onNavigate={navigate} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={navigate} completedLessons={completedLessons} />;
      case 'module':
        return <ModuleOverviewPage onNavigate={navigate} completedLessons={completedLessons} />;
      case 'lesson':
        return <LessonViewPage lessonId={currentLesson} onNavigate={navigate} completedLessons={completedLessons} onComplete={completeLesson} />;
      case 'quiz':
        return <QuizPage onNavigate={navigate} quizAnswers={quizAnswers} setQuizAnswers={setQuizAnswers} quizSubmitted={quizSubmitted} setQuizSubmitted={setQuizSubmitted} />;
      case 'summary':
        return <SummaryPage onNavigate={navigate} completedLessons={completedLessons} quizAnswers={quizAnswers} />;
      case 'progress':
        return <ProgressPage completedLessons={completedLessons} />;
      default:
        return <DashboardPage onNavigate={navigate} completedLessons={completedLessons} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-gray-50 font-sans">
      <Sidebar
        onNavigate={navigate}
        currentPage={currentPage}
        currentLesson={currentLesson}
        completedLessons={completedLessons}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <TopNavBar
        onNavigate={navigate}
        currentPage={currentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className={`lg:ml-64 pt-16 min-h-screen transition-opacity duration-200 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
