import { Flame, BookOpen, Clock, Activity, ArrowRight, Lock, CheckCircle2, GitBranch, ChevronRight } from 'lucide-react';
import { modules, totalLessons } from '../data/lessons';
import { ProgressBar, Badge } from '../components/SharedComponents';

const comingSoonModules = [];

export default function DashboardPage({ onNavigate, completedLessons }) {
  const percent = Math.round((completedLessons.length / totalLessons) * 100);
  const streak = Math.max(3, Math.min(completedLessons.length, 7));

  const recentActivity = [
    ...(completedLessons.includes('l1') ? [{ title: 'What is Version Control?', time: '2 hours ago', id: 'l1' }] : []),
    ...(completedLessons.includes('l2') ? [{ title: 'Introduction to Git', time: '1 hour ago', id: 'l2' }] : []),
    ...(completedLessons.includes('l3') ? [{ title: 'Installing Git', time: '30 minutes ago', id: 'l3' }] : []),
  ];
  if (recentActivity.length === 0) {
    recentActivity.push({ title: 'Start your first lesson!', time: 'Get started now', id: null });
  }

  const stats = [
    { icon: Flame, label: 'Day Streak', value: `${streak}-day`, color: 'text-orange-400' },
    { icon: BookOpen, label: 'Lessons Completed', value: completedLessons.length, color: 'text-indigo-400' },
    { icon: Clock, label: 'Hours Learned', value: `~${(completedLessons.length * 0.12).toFixed(1)} hrs`, color: 'text-emerald-400' },
    { icon: Activity, label: 'Current Module', value: 'Git', color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-6 animate-[fade-in_0.3s_ease-out]">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl border border-indigo-500/20 p-6">
        <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Engineer 👋</h1>
        <p className="text-gray-400 text-sm">Keep up the momentum! You're making great progress.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-gray-900 rounded-xl border border-gray-700/50 p-4 hover:border-gray-600 transition-colors">
            <s.icon size={20} className={`${s.color} mb-2`} />
            <p className="text-xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Active Module Card */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Your Modules</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {Object.values(modules).map((mod, index) => {
            const modTotal = mod.sections.flatMap(s => s.lessons).length;
            const modCompleted = mod.sections.flatMap(s => s.lessons).filter(l => completedLessons.includes(l.id)).length;
            const modPercent = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;
            
            return (
              <div key={mod.id} className={`bg-gray-900 rounded-xl border border-gray-700/50 border-l-4 ${index === 0 ? 'border-l-indigo-500' : 'border-l-emerald-500'} p-5 hover:-translate-y-0.5 transition-all duration-200 col-span-1`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{mod.icon}</span>
                    <div>
                      <h3 className="text-base font-bold text-white">{mod.title}</h3>
                      <p className="text-xs text-gray-400">{mod.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mod.badges && mod.badges.map((b, i) => (
                    <Badge key={i} label={b.label} variant={b.variant} />
                  ))}
                </div>
                <ProgressBar percent={modPercent} />
                <p className="text-xs text-gray-500 mt-2">{modCompleted} of {modTotal} lessons completed</p>
                <button onClick={() => onNavigate('module')}
                  className={`mt-4 w-full flex items-center justify-center gap-2 ${index === 0 ? 'bg-indigo-500 hover:bg-indigo-600 shadow-indigo-500/20' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'} text-white text-sm font-medium py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg cursor-pointer`}>
                  {modCompleted > 0 ? 'Continue Learning' : 'Start Learning'} <ArrowRight size={16} />
                </button>
              </div>
            );
          })}

          {comingSoonModules.map((m, i) => (
            <div key={i} className="bg-gray-900 rounded-xl border border-gray-700/50 p-5 opacity-50 relative">
              <div className="absolute top-3 right-3"><Lock size={16} className="text-gray-600" /></div>
              <span className="text-2xl block mb-2">{m.icon}</span>
              <h3 className="text-base font-bold text-white mb-1">{m.title}</h3>
              <p className="text-xs text-gray-400 mb-3">{m.desc}</p>
              <Badge label="Coming Soon" variant="coming-soon" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Recent Activity</h2>
        <div className="bg-gray-900 rounded-xl border border-gray-700/50 divide-y divide-gray-800">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-500" />
                <span className="text-sm text-gray-200">{a.title}</span>
              </div>
              <span className="text-xs text-gray-500">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
