import { UserRound, Flame, Trophy, BookOpen, Clock } from 'lucide-react';
import { modules } from '../data/lessons';
import { ProgressBar } from '../components/SharedComponents';

function getModuleProgress(completedLessons) {
  return Object.values(modules).map((module) => {
    const lessons = module.sections.flatMap((section) => section.lessons);
    const total = lessons.length;
    const completed = lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      id: module.id,
      title: module.title,
      icon: module.icon,
      total,
      completed,
      percent,
    };
  });
}

export default function ProfilePage({ user, stats, completedLessons, onNavigate }) {
  const moduleProgress = getModuleProgress(completedLessons);
  const fullyCompletedModules = moduleProgress.filter((module) => module.percent === 100).length;
  const learnedHours = (((stats?.estimatedMinutesSpent || 0) / 60).toFixed(1));

  return (
    <div className="space-y-6 animate-[fade-in_0.3s_ease-out]">
      <div className="bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl border border-indigo-500/20 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.displayName}
              className="w-16 h-16 rounded-full border border-gray-700 object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
              {user?.displayName?.slice(0, 2).toUpperCase() || 'DB'}
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{user?.displayName || 'Engineer'}</h1>
            <p className="text-sm text-gray-400 mt-1">{user?.email || 'No email available'}</p>
            <p className="text-xs text-gray-500 mt-2">Role: {user?.role || 'student'}</p>
          </div>

          <button
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-2 rounded-lg border border-gray-700 text-sm text-gray-300 hover:text-white hover:border-gray-500 transition-colors cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-xl border border-gray-700/50 p-4">
          <UserRound size={18} className="text-indigo-400 mb-2" />
          <p className="text-xl font-bold text-white">{user?.displayName || 'Engineer'}</p>
          <p className="text-xs text-gray-500 mt-0.5">Display Name</p>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-700/50 p-4">
          <Flame size={18} className="text-orange-400 mb-2" />
          <p className="text-xl font-bold text-white">{stats?.currentStreak ?? user?.streak?.current ?? 0}</p>
          <p className="text-xs text-gray-500 mt-0.5">Current Streak</p>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-700/50 p-4">
          <Trophy size={18} className="text-yellow-400 mb-2" />
          <p className="text-xl font-bold text-white">{stats?.longestStreak ?? user?.streak?.longest ?? 0}</p>
          <p className="text-xs text-gray-500 mt-0.5">Longest Streak</p>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-700/50 p-4">
          <BookOpen size={18} className="text-emerald-400 mb-2" />
          <p className="text-xl font-bold text-white">{fullyCompletedModules}</p>
          <p className="text-xs text-gray-500 mt-0.5">Modules Completed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl border border-gray-700/50 p-5">
          <h2 className="text-lg font-bold text-white mb-4">Learning Overview</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Lessons Completed</span>
              <span className="text-white font-semibold">{stats?.completedLessons ?? completedLessons.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Completion</span>
              <span className="text-white font-semibold">{stats?.completionPercent ?? 0}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Estimated Time Learned</span>
              <span className="text-white font-semibold flex items-center gap-1"><Clock size={14} /> {learnedHours} hrs</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Last Activity</span>
              <span className="text-white font-semibold text-xs">{stats?.lastActivityAt ? new Date(stats.lastActivityAt).toLocaleString() : 'No activity yet'}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-700/50 p-5">
          <h2 className="text-lg font-bold text-white mb-4">Module Progress</h2>
          <div className="space-y-4">
            {moduleProgress.map((module) => (
              <div key={module.id}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-300 flex items-center gap-2">
                    <span>{module.icon}</span>
                    {module.title}
                  </span>
                  <span className="text-gray-500">{module.completed}/{module.total}</span>
                </div>
                <ProgressBar percent={module.percent} showLabel={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
