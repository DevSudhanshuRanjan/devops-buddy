import { useState } from 'react';
import { Copy, Check, Lightbulb, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

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
