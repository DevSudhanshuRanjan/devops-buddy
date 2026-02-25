import { Award, ArrowRight, Download, Bell, CheckCircle2 } from 'lucide-react';
import { modules, totalLessons } from '../data/lessons';
import { quizQuestions } from '../data/quiz';
import { Badge } from '../components/SharedComponents';

const skills = [
  { label: 'Git Basics', variant: 'completed' },
  { label: 'Branching Pro', variant: 'completed' },
  { label: 'GitHub Ready', variant: 'completed' },
  { label: 'Open Source Contributor', variant: 'completed' },
];

export default function SummaryPage({ onNavigate, completedLessons, quizAnswers }) {
  const mod = modules.git;
  const score = quizQuestions.filter(q => quizAnswers[q.id] === q.correct).length;

  return (
    <div className="max-w-3xl mx-auto animate-[fade-in_0.3s_ease-out]">
      {/* Celebration */}
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 shadow-2xl shadow-indigo-500/30">
          <Award size={40} className="text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">🎉 Module Complete!</h1>
        <p className="text-lg text-gray-400">{mod.title} — Git & GitHub</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900 rounded-xl border border-gray-700/50 p-5 text-center">
          <p className="text-2xl font-bold text-white">{completedLessons.length}</p>
          <p className="text-xs text-gray-500 mt-1">Lessons Completed</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-700/50 p-5 text-center">
          <p className="text-2xl font-bold text-white">{score}/{quizQuestions.length}</p>
          <p className="text-xs text-gray-500 mt-1">Quiz Score</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-700/50 p-5 text-center">
          <p className="text-2xl font-bold text-white">~4 hrs</p>
          <p className="text-xs text-gray-500 mt-1">Time Invested</p>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-gray-900 rounded-xl border border-gray-700/50 p-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">🏆 Skills Earned</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((s, i) => (
            <span key={i} className="flex items-center gap-1.5 bg-indigo-900/40 text-indigo-300 border border-indigo-700/50 rounded-full px-3 py-1.5 text-sm font-medium">
              <CheckCircle2 size={14} className="text-emerald-400" /> {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Section Recap */}
      <div className="bg-gray-900 rounded-xl border border-gray-700/50 p-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4">📚 Module Recap</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {mod.sections.map((sec, i) => {
            const done = sec.lessons.filter(l => completedLessons.includes(l.id)).length;
            return (
              <div key={sec.id} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                <p className="text-[10px] text-gray-500 mb-1">Section {i + 1}</p>
                <p className="text-sm font-medium text-white truncate">{sec.title}</p>
                <p className="text-[10px] text-emerald-400 mt-1">{done}/{sec.lessons.length} ✓</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium py-3 rounded-xl border border-gray-700 transition-all cursor-pointer">
          <Download size={16} /> Download Certificate (Coming Soon)
        </button>

        <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-xl border border-indigo-500/20 p-6 text-center">
          <p className="text-sm text-gray-400 mb-1">Next Module</p>
          <p className="text-xl font-bold text-white mb-3">⚙️ CI/CD Pipelines</p>
          <button className="flex items-center justify-center gap-2 mx-auto bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium px-6 py-2.5 rounded-lg border border-gray-700 transition-all cursor-pointer">
            <Bell size={14} /> Coming Soon — Notify Me
          </button>
        </div>

        <button onClick={() => onNavigate('dashboard')}
          className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-300 py-2 transition-colors cursor-pointer">
          Back to Dashboard <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
