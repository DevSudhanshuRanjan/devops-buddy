import { ChevronRight, ArrowLeft, ArrowRight, CheckCircle2, Clock, BookOpen } from 'lucide-react';
import { modules, allLessons } from '../data/lessons';
import { CodeBlock, Callout, DiagramBlock, Badge } from '../components/SharedComponents';

function ContentRenderer({ block }) {
  switch (block.type) {
    case 'concept':
      return <p className="text-gray-300 leading-relaxed my-4 text-[15px]">{block.body}</p>;
    case 'analogy':
      return (
        <div className="my-4 p-4 rounded-lg bg-purple-900/20 border-l-4 border-purple-500">
          <p className="text-sm font-semibold text-purple-400 mb-1">💡 Analogy</p>
          <p className="text-gray-300 text-sm leading-relaxed">{block.body}</p>
        </div>
      );
    case 'code':
      return <CodeBlock code={block.code} language={block.language} />;
    case 'diagram':
      return <DiagramBlock title={block.title} content={block.content} />;
    case 'callout':
      return <Callout variant={block.variant} body={block.body} />;
    case 'note':
      return <Callout variant="note" body={block.body} />;
    case 'summary':
      return (
        <div className="my-6 p-5 rounded-xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20">
          <p className="text-sm font-bold text-indigo-400 mb-3">📋 Key Takeaways</p>
          <ul className="space-y-2">
            {block.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return <p className="text-gray-300 text-sm my-2">{block.body || ''}</p>;
  }
}

export default function LessonViewPage({ lessonId, onNavigate, completedLessons, onComplete }) {
  const mod = modules.git;
  let currentLesson = null;
  let currentSection = null;
  for (const sec of mod.sections) {
    const found = sec.lessons.find(l => l.id === lessonId);
    if (found) { currentLesson = found; currentSection = sec; break; }
  }
  if (!currentLesson) return <div className="text-gray-400 p-8">Lesson not found.</div>;

  const lessonIdx = allLessons.findIndex(l => l.id === lessonId);
  const prevLesson = lessonIdx > 0 ? allLessons[lessonIdx - 1] : null;
  const nextLesson = lessonIdx < allLessons.length - 1 ? allLessons[lessonIdx + 1] : null;
  const isCompleted = completedLessons.includes(lessonId);

  return (
    <div className="animate-[fade-in_0.3s_ease-out]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 flex-wrap">
        <button onClick={() => onNavigate('module')} className="hover:text-gray-300 transition-colors cursor-pointer">Modules</button>
        <ChevronRight size={12} />
        <button onClick={() => onNavigate('module')} className="hover:text-gray-300 transition-colors cursor-pointer">{mod.title}</button>
        <ChevronRight size={12} />
        <span className="text-gray-400">{currentSection.title}</span>
        <ChevronRight size={12} />
        <span className="text-gray-300">{currentLesson.title}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{currentLesson.title}</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <Clock size={14} />
            <span>~{currentLesson.duration} read</span>
          </div>
          <Badge label={currentLesson.difficulty} variant={currentLesson.difficulty === 'Beginner' ? 'beginner' : currentLesson.difficulty === 'Intermediate' ? 'intermediate' : 'advanced'} />
          <span className="text-xs text-gray-500">Lesson {lessonIdx + 1} of {allLessons.length}</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl">
        {currentLesson.content.map((block, i) => (
          <ContentRenderer key={i} block={block} />
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevLesson ? (
          <button onClick={() => onNavigate('lesson', prevLesson.id)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white px-4 py-2.5 rounded-lg border border-gray-700 hover:border-gray-500 transition-all cursor-pointer">
            <ArrowLeft size={16} /> {prevLesson.title}
          </button>
        ) : <div />}

        <button onClick={() => onComplete(lessonId)} disabled={isCompleted}
          className={`flex items-center gap-2 text-sm font-medium px-6 py-2.5 rounded-lg transition-all cursor-pointer ${isCompleted ? 'bg-emerald-500/20 text-emerald-400 cursor-default' : 'bg-indigo-500 hover:bg-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-500/20'}`}>
          <CheckCircle2 size={16} />
          {isCompleted ? 'Completed ✓' : 'Mark as Complete'}
        </button>

        {nextLesson ? (
          <button onClick={() => onNavigate('lesson', nextLesson.id)}
            className="flex items-center gap-2 text-sm font-medium bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-indigo-500/20 cursor-pointer">
            {nextLesson.title} <ArrowRight size={16} />
          </button>
        ) : (
          <button onClick={() => onNavigate('quiz')}
            className="flex items-center gap-2 text-sm font-medium bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-indigo-500/20 cursor-pointer">
            Take Quiz <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
