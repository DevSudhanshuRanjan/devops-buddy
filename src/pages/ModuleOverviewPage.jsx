import { ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { modules, totalLessons } from '../data/lessons';
import { ProgressBar, Badge } from '../components/SharedComponents';

export default function ModuleOverviewPage({ onNavigate, completedLessons }) {
  const mod = modules.git;
  const percent = Math.round((completedLessons.length / totalLessons) * 100);

  const findFirstIncomplete = (section) => {
    return section.lessons.find(l => !completedLessons.includes(l.id));
  };

  return (
    <div className="space-y-6 animate-[fade-in_0.3s_ease-out]">
      {/* Module Header */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent rounded-2xl border border-indigo-500/20 p-6">
        <div className="flex items-start gap-4">
          <span className="text-4xl">{mod.icon}</span>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-1">{mod.title}</h1>
            <p className="text-gray-400 text-sm mb-4">{mod.description}</p>
            <div className="max-w-md">
              <ProgressBar percent={percent} />
            </div>
            <p className="text-xs text-gray-500 mt-2">{completedLessons.length} of {totalLessons} lessons completed · ~4 hours total</p>
          </div>
        </div>
      </div>

      {/* Section Cards */}
      <div className="space-y-4">
        {mod.sections.map((section, si) => {
          const secCompleted = section.lessons.filter(l => completedLessons.includes(l.id)).length;
          const secTotal = section.lessons.length;
          const secPercent = secTotal > 0 ? Math.round((secCompleted / secTotal) * 100) : 0;
          const firstIncomplete = findFirstIncomplete(section);
          const isAllDone = secCompleted === secTotal;

          return (
            <div key={section.id} className={`bg-gray-900 rounded-xl border p-5 transition-all duration-200 hover:-translate-y-0.5 ${isAllDone ? 'border-emerald-500/30' : 'border-gray-700/50'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500 font-medium">Section {si + 1}</span>
                    {isAllDone && <Badge label="Completed" variant="completed" />}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{section.title}</h3>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-xs text-gray-400">{secTotal} lessons</span>
                    <span className="text-xs text-gray-500">·</span>
                    <span className={`text-xs ${isAllDone ? 'text-emerald-400' : 'text-gray-400'}`}>{secCompleted}/{secTotal} completed</span>
                  </div>
                  <div className="max-w-xs">
                    <ProgressBar percent={secPercent} showLabel={false} />
                  </div>
                </div>
                <div>
                  {firstIncomplete ? (
                    <button onClick={() => onNavigate('lesson', firstIncomplete.id)}
                      className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/20 cursor-pointer whitespace-nowrap">
                      {secCompleted > 0 ? 'Continue' : 'Start'} <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 text-sm font-medium px-5 py-2.5 rounded-lg cursor-default whitespace-nowrap">
                      <CheckCircle2 size={16} /> Done
                    </button>
                  )}
                </div>
              </div>

              {/* Lesson list */}
              <div className="mt-4 pt-4 border-t border-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {section.lessons.map(lesson => {
                  const done = completedLessons.includes(lesson.id);
                  return (
                    <button key={lesson.id} onClick={() => onNavigate('lesson', lesson.id)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-colors cursor-pointer ${done ? 'text-emerald-400 hover:bg-emerald-900/20' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}>
                      {done ? <CheckCircle2 size={15} className="text-emerald-500 shrink-0" /> : <Circle size={15} className="opacity-30 shrink-0" />}
                      <span className="truncate">{lesson.title}</span>
                      <span className="ml-auto text-[10px] text-gray-600 shrink-0">{lesson.duration}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
