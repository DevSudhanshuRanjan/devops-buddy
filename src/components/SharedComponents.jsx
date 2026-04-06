import { useState } from 'react';
import { Copy, Check, Lightbulb, AlertTriangle, XCircle, CheckCircle, HelpCircle, MessageSquare } from 'lucide-react';

export function CodeBlock({ code, language = 'bash' }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative my-4 rounded-lg border border-[#30363D] border-l-4 border-l-indigo-500 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-400 text-xs">
        <span className="font-mono">{language}</span>
        <button onClick={copy} className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
          {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
        </button>
      </div>
      <pre className="bg-[#0D1117] p-4 overflow-x-auto text-sm text-gray-300 font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function Callout({ variant, body }) {
  const config = {
    tip:     { Icon: CheckCircle, bg: 'bg-emerald-900/30', border: 'border-emerald-500', label: 'Pro Tip', textColor: 'text-emerald-400' },
    warning: { Icon: AlertTriangle, bg: 'bg-amber-900/30', border: 'border-amber-500', label: 'Warning', textColor: 'text-amber-400' },
    mistake: { Icon: XCircle, bg: 'bg-red-900/30', border: 'border-red-500', label: 'Common Mistake', textColor: 'text-red-400' },
    note:    { Icon: Lightbulb, bg: 'bg-indigo-900/30', border: 'border-indigo-500', label: 'Key Note', textColor: 'text-indigo-400' },
  };
  const { Icon, bg, border, label, textColor } = config[variant] || config.note;
  return (
    <div className={`my-4 p-4 rounded-lg border-l-4 ${bg} ${border}`}>
      <p className={`text-sm font-semibold mb-1 flex items-center gap-2 ${textColor}`}><Icon size={16} /> {label}</p>
      <p className="text-gray-300 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

export function DiagramBlock({ title, content }) {
  return (
    <div className="my-4 rounded-lg border border-gray-700 overflow-hidden">
      {title && (
        <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 border-b border-gray-700 font-medium">
          📊 {title}
        </div>
      )}
      <pre className="bg-[#0D1117] p-4 text-sm text-indigo-300 font-mono leading-relaxed overflow-x-auto">
        {content}
      </pre>
    </div>
  );
}

export function ProgressBar({ percent, showLabel = true, className = '' }) {
  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Progress</span>
          <span>{Math.round(percent)}%</span>
        </div>
      )}
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export function Badge({ label, variant = 'beginner' }) {
  const styles = {
    beginner:     'bg-emerald-900/60 text-emerald-300 border-emerald-700',
    intermediate: 'bg-amber-900/60 text-amber-300 border-amber-700',
    advanced:     'bg-red-900/60 text-red-300 border-red-700',
    'coming-soon':'bg-gray-800 text-gray-400 border-gray-600',
    completed:    'bg-indigo-900/60 text-indigo-300 border-indigo-700',
    active:       'bg-indigo-500 text-white border-indigo-400',
  };
  return (
    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium inline-block ${styles[variant] || styles.beginner}`}>
      {label}
    </span>
  );
}
export function QuestionBlock({ question, placeholder = "Type your thoughts here..." }) {
  const [value, setValue] = useState('');
  return (
    <div className="my-6 p-5 rounded-xl bg-indigo-900/10 border border-indigo-500/30 hover:border-indigo-500/50 transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle size={18} className="text-indigo-400" />
        <span className="text-sm font-bold text-indigo-300 uppercase tracking-wider">Thought Exercise</span>
      </div>
      <p className="text-gray-200 font-medium mb-4 text-[15px]">{question}</p>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#0D1117] border border-gray-700 rounded-lg p-3 text-sm text-gray-300 min-h-[100px] focus:outline-none focus:border-indigo-500 transition-colors resize-none"
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-2 text-[10px] text-gray-500 uppercase font-bold tracking-widest pointer-events-none">
          <MessageSquare size={12} /> Self-Reflection
        </div>
      </div>
    </div>
  );
}
