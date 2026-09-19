import React, { useState } from 'react';
import {
  Network,
  Compass,
  BookOpen,
  Terminal,
  Wand2,
  Sparkles,
  LayoutDashboard,
  GraduationCap,
  BookMarked,
  Search,
  Moon,
  Sun,
  Globe,
  Menu,
  X,
  ArrowUpRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActiveView } from '../../types';

export const Navbar: React.FC = () => {
  const {
    activeView,
    navigateTo,
    language,
    toggleLanguage,
    theme,
    toggleTheme,
    setIsCommandPaletteOpen,
    learningPathCapabilityIds,
    setIsLearningPathModalOpen,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isArabic = language === 'ar';

  const navLinks: { id: ActiveView; label: string; icon: React.FC<{ className?: string }> }[] = [
    {
      id: 'home',
      label: isArabic ? 'الرئيسية' : 'Home',
      icon: Compass,
    },
    {
      id: 'map',
      label: isArabic ? 'الخريطة' : 'Map',
      icon: Network,
    },
    {
      id: 'learn',
      label: isArabic ? 'مركز التعلم' : 'Learn',
      icon: GraduationCap,
    },
    {
      id: 'capabilities',
      label: isArabic ? 'القدرات' : 'Capabilities',
      icon: BookOpen,
    },
    {
      id: 'learning-paths',
      label: isArabic ? 'مسارات التعلم' : 'Paths',
      icon: GraduationCap,
    },
    {
      id: 'commands',
      label: isArabic ? 'الأوامر' : 'Commands',
      icon: Terminal,
    },
    {
      id: 'playbooks',
      label: isArabic ? 'أدلة التشغيل' : 'Playbooks',
      icon: BookMarked,
    },
    {
      id: 'generators',
      label: isArabic ? 'المولدات' : 'Generators',
      icon: Wand2,
    },
    {
      id: 'prompt-lab',
      label: isArabic ? 'الموجهات' : 'Prompt Lab',
      icon: Sparkles,
    },
    {
      id: 'dashboard',
      label: isArabic ? 'لوحتي' : 'Dashboard',
      icon: LayoutDashboard,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070B16]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 text-right group cursor-pointer"
            >
              {/* Abstract icon: Brain + Network + Code */}
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-0.5 shadow-lg shadow-purple-950/40 group-hover:shadow-purple-500/20 transition-all">
                <div className="w-full h-full bg-[#0D1424] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                  {/* Subtle neural network lines inside logo */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform"
                  >
                    {/* Neural network nodes & code brackets */}
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeOpacity="0.3" />
                    <circle cx="12" cy="12" r="3" className="fill-purple-500/20 stroke-purple-400" />
                    <path d="m8 10-2 2 2 2" className="stroke-blue-400" />
                    <path d="m16 10 2 2-2 2" className="stroke-blue-400" />
                  </svg>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-bold tracking-tight text-white font-heading">
                    {isArabic ? 'أطلس كلود' : 'Claude Atlas'}
                  </span>
                  <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded font-mono font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    V2.5
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 hidden sm:block font-medium">
                  {isArabic ? 'الموسوعة التفاعلية وخريطة المنظومة' : 'Interactive Knowledge Architecture'}
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => navigateTo(link.id)}
                  id={`nav-link-${link.id}`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Quick search shortcut button */}
            <button
              type="button"
              onClick={() => setIsCommandPaletteOpen(true)}
              id="search-trigger-btn"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs bg-slate-800/70 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-colors cursor-pointer"
              title={isArabic ? 'بحث سريع (Cmd+K)' : 'Quick Search (Cmd+K)'}
            >
              <Search className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden xl:inline">{isArabic ? 'ابحث في المنظومة...' : 'Search architecture...'}</span>
              <kbd className="font-mono text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700/80">
                ⌘K
              </kbd>
            </button>

            {/* Mobile search icon button */}
            <button
              type="button"
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              id="lang-toggle-btn"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-colors cursor-pointer"
              title={isArabic ? 'تبديل اللغة' : 'Toggle Language'}
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{isArabic ? 'EN' : 'عربي'}</span>
            </button>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              id="theme-toggle-btn"
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-colors cursor-pointer"
              title={isArabic ? 'تبديل الوضع الليلي / الفاتح' : 'Toggle Theme'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>

            {/* My Learning Path Trigger */}
            <button
              type="button"
              id="navbar-mypath-btn"
              onClick={() => setIsLearningPathModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-purple-300 hover:text-white bg-purple-950/30 hover:bg-purple-900/40 border border-purple-800/40 transition-colors cursor-pointer"
              title={isArabic ? 'مساري التعليمي' : 'My Learning Path'}
              aria-label={isArabic ? 'مساري التعليمي' : 'My Learning Path'}
            >
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">{isArabic ? 'مساري' : 'My Path'}</span>
              <span className="bg-purple-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold">
                {learningPathCapabilityIds.length}
              </span>
            </button>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => navigateTo('map')}
              id="nav-start-btn"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-md shadow-purple-900/30 transition-all cursor-pointer"
            >
              <span>{isArabic ? 'ابدأ الآن' : 'Get Started'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0D1424]/95 backdrop-blur-lg px-4 pt-2 pb-5 space-y-1 animate-in slide-in-from-top-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  navigateTo(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-right cursor-pointer ${
                  isActive
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
