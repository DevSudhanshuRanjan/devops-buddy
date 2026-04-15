import { Flame, CheckCircle2, Clock, BookOpen } from 'lucide-react';
import { modules, allLessons, totalLessons } from '../data/lessons';
import { ProgressBar } from '../components/SharedComponents';

export default function ProgressPage({ completedLessons, stats }) {
  const mod = modules.git;
  const completedCount = stats?.completedLessons ?? completedLessons.length;
  const totalCount = stats?.totalLessons ?? totalLessons;
  const percent = stats?.completionPercent ?? (totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0);
  const remaining = Math.max(0, totalCount - completedCount);
  const spentMinutes = stats?.estimatedMinutesSpent ?? completedCount * 7;
  const estHoursLeft = (remaining * 0.12).toFixed(1);
  const streak = stats?.currentStreak ?? Math.max(1, Math.min(completedCount, 7));

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  const mockTimes = ['Today, 2:30 PM', 'Today, 1:15 PM', 'Today, 12:00 PM', 'Yesterday, 6:45 PM', 'Yesterday, 5:20 PM', 'Yesterday, 4:00 PM', '2 days ago', '2 days ago', '3 days ago', '3 days ago', '3 days ago', '4 days ago', '4 days ago', '4 days ago', '5 days ago', '5 days ago', '5 days ago', '6 days ago', '6 days ago', '6 days ago', '7 days ago'];

  return (
    <div className="space-y-6 animate-[fade-in_0.3s_ease-out]">
      <h1 className="text-2xl font-bold text-white">Your Progress</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Circular Progress */}
        <div className="bg-gray-900 rounded-xl border border-gray-700/50 p-8 flex flex-col items-center justify-center">
          <div className="relative w-44 h-44 mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r={radius} fill="none" stroke="#374151" strokeWidth="8" />
              <circle cx="80" cy="80" r={radius} fill="none" stroke="url(#progressGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000" />
              <defs>
                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">{percent}%</span>
              <span className="text-xs text-gray-500">Complete</span>
            </div>
          </div>
          <p className="text-sm text-gray-400">{completedCount} of {totalCount} lessons</p>
          <div className="flex items-center gap-2 mt-3 bg-orange-900/20 px-3 py-1.5 rounded-full border border-orange-700/30">
            <Flame size={16} className="text-orange-400" />
            <span className="text-sm font-medium text-orange-300">{streak}-day streak</span>
          </div>
        </div>

        {/* Stats + Time */}
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-xl border border-gray-700/50 p-5">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={16} className="text-indigo-400" />
              <span className="text-sm font-medium text-white">Time Invested</span>
            </div>
            <p className="text-2xl font-bold text-white ml-6">~{(spentMinutes / 60).toFixed(1)} hrs</p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-700/50 p-5">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen size={16} className="text-emerald-400" />
              <span className="text-sm font-medium text-white">Remaining</span>
            </div>
            <p className="text-2xl font-bold text-white ml-6">{remaining} lessons</p>
            <p className="text-xs text-gray-500 ml-6">~{estHoursLeft} hrs estimated</p>
          </div>
        </div>

        {/* Section Bars */}
        <div className="bg-gray-900 rounded-xl border border-gray-700/50 p-5">
          <h3 className="text-sm font-bold text-white mb-4">Section Breakdown</h3>
          <div className="space-y-4">
            {mod.sections.map((sec) => {
              const done = sec.lessons.filter(l => completedLessons.includes(l.id)).length;
              const secPct = sec.lessons.length > 0 ? Math.round((done / sec.lessons.length) * 100) : 0;
              return (
                <div key={sec.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400 truncate pr-2">{sec.title}</span>
                    <span className="text-gray-500 shrink-0">{done}/{sec.lessons.length}</span>
                  </div>
                  <ProgressBar percent={secPct} showLabel={false} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Completed Lessons List */}
      <div className="bg-gray-900 rounded-xl border border-gray-700/50 p-5">
        <h3 className="text-sm font-bold text-white mb-4">Completed Lessons</h3>
        {completedLessons.length === 0 ? (
          <p className="text-sm text-gray-500">No lessons completed yet. Start learning!</p>
        ) : (
          <div className="space-y-1">
            {completedLessons.map((lId, i) => {
              const lesson = allLessons.find(l => l.id === lId);
              if (!lesson) return null;
              return (
                <div key={lId} className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span className="text-sm text-gray-300">{lesson.title}</span>
                  </div>
                  <span className="text-[10px] text-gray-600 shrink-0">{mockTimes[i] || 'Earlier'}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
