import { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Users, Sparkles, ChevronRight, Lock, GitBranch, Workflow, Container, Ship, BarChart3, Shield, Zap } from 'lucide-react';
import { Badge } from '../components/SharedComponents';

const phrases = ['Scratch.', 'Day One.', 'Zero to Production.'];

function TypewriterText() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setCharIdx(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIdx > 0) {
          setCharIdx(c => c - 1);
        } else {
          setDeleting(false);
          setPhraseIdx(p => (p + 1) % phrases.length);
        }
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
      {phrases[phraseIdx].substring(0, charIdx)}
      <span className="animate-[blink_1s_infinite] text-indigo-400">|</span>
    </span>
  );
}

const features = [
  { icon: '🔀', title: 'Version Control', desc: 'Git & GitHub from zero to advanced', status: 'active' },
  { icon: '⚙️', title: 'CI/CD Pipelines', desc: 'GitHub Actions, Jenkins, ArgoCD', status: 'coming-soon' },
  { icon: '🐳', title: 'Docker & Containers', desc: 'Build, ship, and run anywhere', status: 'coming-soon' },
  { icon: '☸️', title: 'Kubernetes', desc: 'Orchestrate containers at scale', status: 'coming-soon' },
  { icon: '📊', title: 'Monitoring & Observability', desc: 'Prometheus, Grafana, alerting', status: 'coming-soon' },
  { icon: '🔐', title: 'DevSecOps', desc: 'Security embedded in every pipeline', status: 'coming-soon' },
];

const steps = [
  { label: 'Git', status: 'active' },
  { label: 'CI/CD', status: 'locked' },
  { label: 'Docker', status: 'locked' },
  { label: 'Kubernetes', status: 'locked' },
  { label: 'Production', status: 'locked' },
];

export default function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#0A0E1A] text-gray-50 overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0E1A]/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-white">DevOps Buddy</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('dashboard')} className="hidden sm:block text-sm text-gray-400 hover:text-white transition-colors px-3 py-2 cursor-pointer">Sign In</button>
            <button onClick={() => onNavigate('dashboard')} className="text-sm font-medium bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 60%)' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_1s]" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-full px-4 py-1.5 mb-8 animate-[fade-in_0.6s_ease-out]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse-dot_2s_infinite]" />
            <span className="text-sm text-gray-300">🚀 Now in Beta — Free Forever</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6 animate-[fade-in_0.8s_ease-out]">
            Master DevOps from<br />
            <TypewriterText />
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-[fade-in_1s_ease-out]">
            The only structured DevOps learning platform built by engineers, for engineers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-[fade-in_1.2s_ease-out]">
            <button onClick={() => onNavigate('dashboard')}
              className="group px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/25 hover:-translate-y-0.5 flex items-center gap-2 text-lg cursor-pointer">
              Start Learning Free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => onNavigate('module')}
              className="px-8 py-4 border border-gray-600 hover:border-indigo-500 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 text-lg cursor-pointer">
              Explore Modules <ChevronRight size={20} />
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-3 animate-[fade-in_1.4s_ease-out]">
            <div className="flex -space-x-2">
              {['from-blue-400 to-blue-600','from-green-400 to-green-600','from-yellow-400 to-orange-600','from-pink-400 to-rose-600','from-purple-400 to-indigo-600'].map((g,i) => (
                <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${g} border-2 border-[#0A0E1A] flex items-center justify-center text-[10px] text-white font-bold`}>
                  {['JD','AK','MR','SL','TW'][i]}
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-400">👥 Trusted by <span className="text-white font-semibold">12,000+</span> engineers</span>
          </div>
        </div>

        {/* Floating terminal */}
        <div className="hidden lg:block absolute bottom-24 right-12 xl:right-24 animate-[float_6s_ease-in-out_infinite]">
          <div className="w-96 rounded-xl border border-gray-700/50 bg-gray-900/90 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/80 border-b border-gray-700/50">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-gray-500 ml-2 font-mono">terminal</span>
            </div>
            <div className="p-4 font-mono text-sm space-y-1">
              <p className="text-emerald-400">$ git commit -m "feat: launch devops-buddy v1.0"</p>
              <p className="text-gray-400">[main a3f5c12] feat: launch devops-buddy v1.0</p>
              <p className="text-gray-500"> 3 files changed, 127 insertions(+)</p>
              <p className="text-emerald-400 mt-2">$ █</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="relative py-24 px-4" style={{ background: 'linear-gradient(180deg, transparent, rgba(17,24,39,0.5), transparent)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge label="Modules" variant="active" />
            <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-4">Everything you need to master DevOps</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">A structured learning path from version control to production-ready infrastructure.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} onClick={() => f.status === 'active' && onNavigate('module')}
                className={`group relative rounded-xl border p-6 transition-all duration-300 ${f.status === 'active' ? 'border-indigo-500/30 bg-gray-900/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer' : 'border-gray-700/30 bg-gray-900/40 opacity-60'}`}>
                {f.status === 'coming-soon' && (
                  <div className="absolute top-3 right-3">
                    <Lock size={16} className="text-gray-500" />
                  </div>
                )}
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{f.desc}</p>
                <Badge label={f.status === 'active' ? 'Active' : 'Coming Soon'} variant={f.status === 'active' ? 'active' : 'coming-soon'} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Stepper */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge label="Learning Path" variant="active" />
            <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-4">Your journey to DevOps mastery</h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 relative">
            <div className="hidden sm:block absolute top-5 left-[10%] right-[10%] h-0.5 bg-gray-700" />
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-3 transition-all ${step.status === 'active' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-500/20' : 'bg-gray-800 text-gray-500 border border-gray-600'}`}>
                  {step.status === 'active' ? '✓' : <Lock size={14}/>}
                </div>
                <span className={`text-sm font-medium ${step.status === 'active' ? 'text-indigo-400' : 'text-gray-500'}`}>{step.label}</span>
                <span className={`text-[10px] mt-1 ${step.status === 'active' ? 'text-emerald-400' : 'text-gray-600'}`}>
                  {step.status === 'active' ? 'Active' : 'Locked'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="text-sm text-gray-400">© 2025 DevOps Buddy. Built for engineers.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Docs</a>
            <a href="#" className="hover:text-gray-300 transition-colors">GitHub</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Community</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
