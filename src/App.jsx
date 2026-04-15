import { useState, useEffect } from 'react';
import { TopNavBar, Sidebar } from './components/Layout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ModuleOverviewPage from './pages/ModuleOverviewPage';
import LessonViewPage from './pages/LessonViewPage';
import QuizPage from './pages/QuizPage';
import SummaryPage from './pages/SummaryPage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';
import { modules } from './data/lessons';
import { apiFetch } from './lib/api';

const pageByPath = {
  '/dashboard': 'dashboard',
  '/module': 'module',
  '/lesson': 'lesson',
  '/quiz': 'quiz',
  '/summary': 'summary',
  '/progress': 'progress',
  '/profile': 'profile',
};

function getInitialPage() {
  return pageByPath[window.location.pathname] || 'landing';
}

function getPathFromPage(page) {
  return page === 'landing' ? '/' : `/${page}`;
}

function getLessonContext(lessonId) {
  for (const module of Object.values(modules)) {
    for (const section of module.sections) {
      const lesson = section.lessons.find((item) => item.id === lessonId);
      if (lesson) {
        return {
          lessonId: lesson.id,
          sectionId: section.id,
          moduleId: module.id,
        };
      }
    }
  }

  return null;
}

export default function App() {
  const initialPage = getInitialPage();

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [profileStats, setProfileStats] = useState(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
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

  const fetchProgressStats = async (userId) => {
    try {
      const statsData = await apiFetch(`/api/progress/${userId}/stats`);
      setProfileStats(statsData.stats);
    } catch (error) {
      if (error.status !== 404) {
        console.error('Failed to fetch stats:', error.message);
      }
      setProfileStats(null);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const bootstrapSession = async () => {
      try {
        const me = await apiFetch('/auth/me');
        if (!isMounted) return;

        const activeUser = me.user;
        setUser(activeUser);

        try {
          const progressData = await apiFetch(`/api/progress/${activeUser._id}`);
          if (!isMounted) return;
          const completed = (progressData.progress?.completedLessons || []).map((lesson) => lesson.lessonId);
          setCompletedLessons(completed);
        } catch (error) {
          if (error.status !== 404) {
            console.error('Failed to fetch progress:', error.message);
          }
          setCompletedLessons([]);
        }

        await fetchProgressStats(activeUser._id);
      } catch {
        if (!isMounted) return;
        setUser(null);
        setCompletedLessons([]);
        setProfileStats(null);
        if (initialPage !== 'landing') {
          setCurrentPage('landing');
          window.history.replaceState({}, '', '/');
        }
      } finally {
        if (isMounted) {
          setIsSessionLoading(false);
        }
      }
    };

    bootstrapSession();

    return () => {
      isMounted = false;
    };
  }, [initialPage]);

  const navigate = (page, lessonId = null) => {
    if (!user && page !== 'landing') {
      setCurrentPage('landing');
      window.history.replaceState({}, '', '/');
      return;
    }

    setFadeIn(false);
    setTimeout(() => {
      setCurrentPage(page);
      if (lessonId) setCurrentLesson(lessonId);
      else setCurrentLesson(null);
      setMobileMenuOpen(false);
      window.history.replaceState({}, '', getPathFromPage(page));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setFadeIn(true);
    }, 150);
  };

  const completeLesson = async (lessonId) => {
    if (!user || completedLessons.includes(lessonId)) return;

    const context = getLessonContext(lessonId);
    if (!context) return;

    try {
      const result = await apiFetch(`/api/progress/${user._id}/complete`, {
        method: 'POST',
        body: JSON.stringify(context),
      });

      const completed = (result.progress?.completedLessons || []).map((lesson) => lesson.lessonId);
      setCompletedLessons(completed);
      await fetchProgressStats(user._id);
    } catch (error) {
      console.error('Failed to save progress:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout request failed:', error.message);
    }

    setUser(null);
    setProfileStats(null);
    setCompletedLessons([]);
    setCurrentLesson(null);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setCurrentPage('landing');
    window.history.replaceState({}, '', '/');
  };

  // Landing page has its own layout
  if (isSessionLoading && currentPage !== 'landing') {
    return (
      <div className="min-h-screen bg-[#0A0E1A] text-gray-300 flex items-center justify-center">
        Loading your dashboard...
      </div>
    );
  }

  if (currentPage === 'landing' || !user) {
    return <LandingPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={navigate} completedLessons={completedLessons} user={user} stats={profileStats} />;
      case 'module':
        return <ModuleOverviewPage onNavigate={navigate} completedLessons={completedLessons} />;
      case 'lesson':
        return <LessonViewPage lessonId={currentLesson} onNavigate={navigate} completedLessons={completedLessons} onComplete={completeLesson} />;
      case 'quiz':
        return <QuizPage onNavigate={navigate} quizAnswers={quizAnswers} setQuizAnswers={setQuizAnswers} quizSubmitted={quizSubmitted} setQuizSubmitted={setQuizSubmitted} />;
      case 'summary':
        return <SummaryPage onNavigate={navigate} completedLessons={completedLessons} quizAnswers={quizAnswers} />;
      case 'progress':
        return <ProgressPage completedLessons={completedLessons} stats={profileStats} />;
      case 'profile':
        return <ProfilePage user={user} stats={profileStats} completedLessons={completedLessons} onNavigate={navigate} />;
      default:
        return <DashboardPage onNavigate={navigate} completedLessons={completedLessons} user={user} stats={profileStats} />;
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
        user={user}
        onLogout={handleLogout}
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
