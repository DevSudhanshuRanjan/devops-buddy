import { useState, useEffect } from 'react';
import { TopNavBar, Sidebar } from './components/Layout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ModuleOverviewPage from './pages/ModuleOverviewPage';
import LessonViewPage from './pages/LessonViewPage';
import QuizPage from './pages/QuizPage';
import SummaryPage from './pages/SummaryPage';
import ProgressPage from './pages/ProgressPage';

export default function App() {
  const initialPage = window.location.pathname.startsWith('/dashboard') ? 'dashboard' : 'landing';

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    // Remove stale client-side progress state from old builds.
    localStorage.removeItem('devops-buddy-state');

    // OAuth callback includes token in query string; remove it from URL after landing.
    const url = new URL(window.location.href);
    if (url.searchParams.has('token')) {
      url.searchParams.delete('token');
      const search = url.searchParams.toString();
      const nextUrl = `${url.pathname}${search ? `?${search}` : ''}${url.hash}`;
      window.history.replaceState({}, '', nextUrl);
    }
  }, []);

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
