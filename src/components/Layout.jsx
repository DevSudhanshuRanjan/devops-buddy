import { useState } from 'react';
import { Search, Bell, Menu, X, ChevronDown, ChevronRight, Home, BookOpen, BarChart3, Settings, CheckCircle2, Circle, LogOut, Zap } from 'lucide-react';
import { modules } from '../data/lessons';
import { ProgressBar } from './SharedComponents';

export function TopNavBar({ onNavigate, currentPage, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 z-40 flex items-center justify-between px-4 lg:px-6 transition-all duration-300">
      <div className="flex items-center gap-3">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
          {mobileMenuOpen ? <X size={20}/> : <Menu size={20}/>}
        </button>
        <div className="hidden sm:flex items-center gap-2 bg-gray-800/50 rounded-lg px-3 py-2 border border-gray-700/50 w-64">
          <Search size={16} className="text-gray-500" />
          <input type="text" placeholder="Search lessons..." className="bg-transparent text-sm text-gray-300 placeholder-gray-500 outline-none w-full" readOnly />
          <kbd className="text-[10px] text-gray-500 bg-gray-700/50 px-1.5 py-0.5 rounded border border-gray-600">⌘K</kbd>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
        </button>
        <div className="h-8 w-px bg-gray-700" />
        <button onClick={() => onNavigate('dashboard')} className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 rounded-lg px-2 py-1.5 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">DB</div>
          <span className="hidden sm:block text-sm text-gray-300 font-medium">Engineer</span>
        </button>
      </div>
    </header>
  );
}

export function Sidebar({ onNavigate, currentPage, currentLesson, completedLessons, sidebarCollapsed, setSidebarCollapsed, mobileMenuOpen, setMobileMenuOpen }) {
  const [expandedSections, setExpandedSections] = useState({ sec1: true });
  const mod = modules.git;

  const toggleSection = (secId) => {
    setExpandedSections(prev => ({ ...prev, [secId]: !prev[secId] }));
  };

  const completedCount = completedLessons.length;
  const totalLessons = mod.sections.reduce((sum, s) => sum + s.lessons.length, 0);
  const percent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'module', label: 'Modules', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
  ];

  const sidebarClasses = mobileMenuOpen
    ? 'fixed inset-y-0 left-0 z-50 w-64 translate-x-0'
    : 'fixed inset-y-0 left-0 z-50 w-64 -translate-x-full lg:translate-x-0';

  return (
    <>
      {mobileMenuOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />}
      <aside className={`${sidebarClasses} bg-gray-900 border-r border-gray-700/50 flex flex-col transition-transform duration-300`}>
        <div className="p-4 border-b border-gray-700/50">
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2.5 cursor-pointer group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">DevOps Buddy</h1>
              <p className="text-[10px] text-gray-500 -mt-0.5">Learn DevOps the right way</p>
            </div>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${currentPage === item.id ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
              <item.icon size={18} />
              {item.label}
            </button>
          ))}

          <div className="pt-3 pb-1 px-3">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Current Module</p>
          </div>
          <div className="px-2 py-2 bg-gray-800/50 rounded-lg border border-gray-700/30 mx-1">
            <div className="flex items-center gap-2 px-1 mb-2">
              <span className="text-base">{mod.icon}</span>
              <span className="text-sm font-semibold text-gray-200">{mod.title}</span>
            </div>
            <ProgressBar percent={percent} showLabel={false} className="px-1" />
            <p className="text-[10px] text-gray-500 mt-1.5 px-1">{completedCount}/{totalLessons} lessons</p>
          </div>

          <div className="pt-2 space-y-0.5">
            {mod.sections.map(section => {
              const secCompleted = section.lessons.filter(l => completedLessons.includes(l.id)).length;
              const isExpanded = expandedSections[section.id];
              return (
                <div key={section.id}>
                  <button onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 transition-all cursor-pointer">
                    <span className="flex items-center gap-2 truncate">
                      {isExpanded ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}
                      <span className="truncate">{section.title}</span>
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${secCompleted === section.lessons.length ? 'bg-emerald-900/50 text-emerald-400' : 'bg-gray-700/50 text-gray-500'}`}>
                      {secCompleted}/{section.lessons.length}
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="ml-4 pl-3 border-l border-gray-700/50 space-y-0.5 mb-1">
                      {section.lessons.map(lesson => {
                        const isComplete = completedLessons.includes(lesson.id);
                        const isActive = currentLesson === lesson.id;
                        return (
                          <button key={lesson.id} onClick={() => { onNavigate('lesson', lesson.id); setMobileMenuOpen(false); }}
                            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-all cursor-pointer ${isActive ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20' : isComplete ? 'text-emerald-400 hover:bg-gray-800/50' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'}`}>
                            {isComplete ? <CheckCircle2 size={14} className="text-emerald-500 shrink-0" /> : <Circle size={14} className="shrink-0 opacity-40" />}
                            <span className="truncate">{lesson.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        <div className="p-3 border-t border-gray-700/50">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors cursor-pointer">
            <Settings size={18} />
            Settings
          </button>
        </div>
      </aside>
    </>
  );
}
