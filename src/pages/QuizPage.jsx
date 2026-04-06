import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';
import { quizQuestions } from '../data/quiz';

export default function QuizPage({ onNavigate, quizAnswers, setQuizAnswers, quizSubmitted, setQuizSubmitted }) {
  const handleSelect = (qId, option) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const allAnswered = quizQuestions.every(q => quizAnswers[q.id]);
  const score = quizQuestions.filter(q => quizAnswers[q.id] === q.correct).length;

  const handleSubmit = () => {
    if (!allAnswered) return;
    setQuizSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const optionLetter = (opt) => opt.charAt(0);

  return (
    <div className="max-w-3xl mx-auto animate-[fade-in_0.3s_ease-out]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">DevOps Master Quiz</h1>
        <p className="text-gray-400 text-sm">Test your knowledge across all modules. Answer all {quizQuestions.length} questions to submit.</p>
      </div>

      {/* Score Banner */}
      {quizSubmitted && (
        <div className={`mb-8 p-6 rounded-2xl border ${score >= 7 ? 'bg-emerald-900/20 border-emerald-500/30' : score >= 5 ? 'bg-amber-900/20 border-amber-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
          <div className="text-center">
            <p className="text-4xl font-black text-white mb-1">{score} / {quizQuestions.length}</p>
            <p className={`text-sm font-medium ${score >= 7 ? 'text-emerald-400' : score >= 5 ? 'text-amber-400' : 'text-red-400'}`}>
              {score >= 9 ? '🏆 Outstanding!' : score >= 7 ? '🎉 Great job!' : score >= 5 ? '👍 Good effort!' : '📚 Keep studying!'}
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <button onClick={handleRetake}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-500 transition-all cursor-pointer">
                <RotateCcw size={14} /> Retake Quiz
              </button>
              {score >= 7 && (
                <button onClick={() => onNavigate('summary')}
                  className="flex items-center gap-2 text-sm font-medium bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg transition-all cursor-pointer">
                  View Summary <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {quizQuestions.map((q, qi) => {
          const selected = quizAnswers[q.id];
          const isCorrect = selected === q.correct;
          return (
            <div key={q.id} className={`bg-gray-900 rounded-xl border p-5 transition-all ${quizSubmitted ? (isCorrect ? 'border-emerald-500/30' : 'border-red-500/30') : 'border-gray-700/50'}`}>
              <div className="flex items-start gap-3 mb-4">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-800 text-xs font-bold text-gray-400 shrink-0">{qi + 1}</span>
                <p className="text-white font-medium text-[15px] leading-relaxed">{q.question}</p>
              </div>

              <div className="space-y-2 ml-10">
                {q.options.map((opt) => {
                  const letter = optionLetter(opt);
                  const isSelected = selected === letter;
                  const isCorrectOpt = letter === q.correct;

                  let optClass = 'border-gray-700/50 hover:border-gray-500 hover:bg-gray-800/50';
                  if (quizSubmitted) {
                    if (isCorrectOpt) optClass = 'border-emerald-500/50 bg-emerald-900/20';
                    else if (isSelected && !isCorrectOpt) optClass = 'border-red-500/50 bg-red-900/20';
                    else optClass = 'border-gray-700/30 opacity-50';
                  } else if (isSelected) {
                    optClass = 'border-indigo-500/50 bg-indigo-900/20';
                  }

                  return (
                    <button key={opt} onClick={() => handleSelect(q.id, letter)}
                      className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg border text-sm transition-all cursor-pointer ${optClass}`}>
                      <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${isSelected ? 'bg-indigo-500 border-indigo-400 text-white' : 'border-gray-600 text-gray-500'}`}>
                        {quizSubmitted && isCorrectOpt ? <CheckCircle2 size={14} className="text-emerald-400" /> : quizSubmitted && isSelected && !isCorrectOpt ? <XCircle size={14} className="text-red-400" /> : letter}
                      </span>
                      <span className={`${quizSubmitted && isCorrectOpt ? 'text-emerald-300' : quizSubmitted && isSelected && !isCorrectOpt ? 'text-red-300' : 'text-gray-300'}`}>
                        {opt.substring(3)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="mt-4 ml-10 p-3 rounded-lg bg-gray-800/50 border border-gray-700/30">
                  <p className="text-xs font-semibold text-indigo-400 mb-1 flex items-center gap-1"><HelpCircle size={12} /> Explanation</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit */}
      {!quizSubmitted && (
        <div className="mt-8 flex justify-center">
          <button onClick={handleSubmit} disabled={!allAnswered}
            className={`flex items-center gap-2 text-base font-semibold px-8 py-3.5 rounded-xl transition-all cursor-pointer ${allAnswered ? 'bg-indigo-500 hover:bg-indigo-600 text-white hover:shadow-xl hover:shadow-indigo-500/25' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}>
            Submit Quiz ({Object.keys(quizAnswers).length}/{quizQuestions.length} answered)
          </button>
        </div>
      )}
    </div>
  );
}
