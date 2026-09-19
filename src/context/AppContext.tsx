import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActiveView, CapabilityCategory, CapabilityNode, Language, ThemeMode } from '../types';
import { CAPABILITIES } from '../data/capabilities';

interface ToastState {
  message: string;
  type: 'success' | 'info';
  visible: boolean;
}

interface AppContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedCapabilityId: string | null;
  setSelectedCapabilityId: (id: string | null) => void;
  selectedCapability: CapabilityNode | null;
  selectAndOpenCapability: (id: string) => void;
  activeCategoryFilter: CapabilityCategory | 'all';
  setActiveCategoryFilter: (cat: CapabilityCategory | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarkedCapabilityIds: string[];
  toggleBookmark: (id: string) => void;
  learningPathCapabilityIds: string[];
  addToLearningPath: (id: string) => void;
  removeFromLearningPath: (id: string) => void;
  isInLearningPath: (id: string) => boolean;
  toggleLearningPath: (id: string) => void;
  isLearningPathModalOpen: boolean;
  setIsLearningPathModalOpen: (open: boolean) => void;
  savedTemplateIds: string[];
  toggleSaveTemplate: (id: string) => void;
  completedUnitIds: string[];
  toggleCompleteUnit: (id: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  toast: ToastState;
  showToast: (message: string, type?: 'success' | 'info') => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  navigateTo: (view: ActiveView, capabilityId?: string) => void;
  isDetailDrawerOpen: boolean;
  setIsDetailDrawerOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>(() => {
    try {
      const path = window.location.pathname.replace(/^\/+/, '');
      if (path === 'learn') return 'learn';
      if (path === 'capabilities') return 'capabilities';
      if (path === 'map') return 'map';
      if (path === 'learning-paths') return 'learning-paths';
      if (path === 'commands') return 'commands';
      if (path === 'playbooks') return 'playbooks';
      if (path === 'prompt-lab') return 'prompt-lab';
      if (path === 'generators') return 'generators';
      if (path === 'dashboard') return 'dashboard';
    } catch {}
    return 'home';
  });
  const [selectedCapabilityId, setSelectedCapabilityId] = useState<string | null>('claude_md');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<CapabilityCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState<boolean>(false);
  const [isLearningPathModalOpen, setIsLearningPathModalOpen] = useState<boolean>(false);

  // Local storage persisted state
  const [learningPathCapabilityIds, setLearningPathCapabilityIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cfw_learning_path');
      return saved ? JSON.parse(saved) : ['claude_md', 'memory', 'skills', 'subagents'];
    } catch {
      return ['claude_md', 'memory', 'skills', 'subagents'];
    }
  });

  const [bookmarkedCapabilityIds, setBookmarkedCapabilityIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cfw_bookmarks');
      return saved ? JSON.parse(saved) : ['claude_md', 'memory', 'subagents'];
    } catch {
      return ['claude_md', 'memory', 'subagents'];
    }
  });

  const [savedTemplateIds, setSavedTemplateIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cfw_saved_templates');
      return saved ? JSON.parse(saved) : ['tpl-nextjs-claude-md', 'tpl-review-pr-command'];
    } catch {
      return ['tpl-nextjs-claude-md', 'tpl-review-pr-command'];
    }
  });

  const [completedUnitIds, setCompletedUnitIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cfw_completed_units');
      return saved ? JSON.parse(saved) : ['u1-1', 'u1-2'];
    } catch {
      return ['u1-1', 'u1-2'];
    }
  });

  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('cfw_lang');
      return (saved as Language) || 'ar';
    } catch {
      return 'ar';
    }
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('cfw_theme');
      return (saved as ThemeMode) || 'dark';
    } catch {
      return 'dark';
    }
  });

  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'success',
    visible: false,
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('cfw_learning_path', JSON.stringify(learningPathCapabilityIds));
    } catch {}
  }, [learningPathCapabilityIds]);

  useEffect(() => {
    try {
      localStorage.setItem('cfw_bookmarks', JSON.stringify(bookmarkedCapabilityIds));
    } catch {}
  }, [bookmarkedCapabilityIds]);

  useEffect(() => {
    try {
      localStorage.setItem('cfw_saved_templates', JSON.stringify(savedTemplateIds));
    } catch {}
  }, [savedTemplateIds]);

  useEffect(() => {
    try {
      localStorage.setItem('cfw_completed_units', JSON.stringify(completedUnitIds));
    } catch {}
  }, [completedUnitIds]);

  useEffect(() => {
    try {
      localStorage.setItem('cfw_lang', language);
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    } catch {}
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem('cfw_theme', theme);
      if (theme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
    } catch {}
  }, [theme]);

  // Global keyboard shortcut for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsDetailDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedCapabilityIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(
        exists
          ? language === 'ar'
            ? 'تمت الإزالة من الإشارات المرجعية'
            : 'Removed from bookmarks'
          : language === 'ar'
          ? 'تمت الإضافة إلى المفضلة'
          : 'Added to bookmarks'
      );
      return updated;
    });
  };

  const isInLearningPath = (id: string) => {
    return learningPathCapabilityIds.includes(id);
  };

  const addToLearningPath = (id: string) => {
    if (!learningPathCapabilityIds.includes(id)) {
      setLearningPathCapabilityIds((prev) => [...prev, id]);
      showToast(
        language === 'ar'
          ? 'تمت إضافة القدرة إلى مسار التعلم الخاص بك'
          : 'Added to your learning path'
      );
    }
  };

  const removeFromLearningPath = (id: string) => {
    setLearningPathCapabilityIds((prev) => prev.filter((item) => item !== id));
    showToast(
      language === 'ar'
        ? 'تمت إزالة القدرة من مسار التعلم'
        : 'Removed from learning path',
      'info'
    );
  };

  const toggleLearningPath = (id: string) => {
    if (learningPathCapabilityIds.includes(id)) {
      removeFromLearningPath(id);
    } else {
      addToLearningPath(id);
    }
  };

  const selectAndOpenCapability = (id: string) => {
    setSelectedCapabilityId(id);
    setIsDetailDrawerOpen(true);
  };

  const toggleSaveTemplate = (id: string) => {
    setSavedTemplateIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(
        exists
          ? language === 'ar'
            ? 'تمت إزالة القالب من المحفوظات'
            : 'Template removed from saved'
          : language === 'ar'
          ? 'تم حفظ القالب في لوحتك'
          : 'Template saved to dashboard'
      );
      return updated;
    });
  };

  const toggleCompleteUnit = (id: string) => {
    setCompletedUnitIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(
        exists
          ? language === 'ar'
            ? 'تم إلغاء تعليم الوحدة كمنجزة'
            : 'Unit marked as incomplete'
          : language === 'ar'
          ? 'أحسنت! تم إكمال هذه الوحدة بنجاح'
          : 'Awesome! Unit marked as completed'
      );
      return updated;
    });
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navigateTo = (view: ActiveView, capabilityId?: string) => {
    setActiveView(view);
    if (capabilityId) {
      setSelectedCapabilityId(capabilityId);
    }
    try {
      const newPath = view === 'home' ? '/' : `/${view}`;
      window.history.pushState(null, '', newPath);
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedCapability =
    CAPABILITIES.find((c) => c.id === selectedCapabilityId) || CAPABILITIES[0];

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedCapabilityId,
        setSelectedCapabilityId,
        selectedCapability,
        selectAndOpenCapability,
        activeCategoryFilter,
        setActiveCategoryFilter,
        searchQuery,
        setSearchQuery,
        bookmarkedCapabilityIds,
        toggleBookmark,
        learningPathCapabilityIds,
        addToLearningPath,
        removeFromLearningPath,
        isInLearningPath,
        toggleLearningPath,
        isLearningPathModalOpen,
        setIsLearningPathModalOpen,
        savedTemplateIds,
        toggleSaveTemplate,
        completedUnitIds,
        toggleCompleteUnit,
        language,
        setLanguage,
        toggleLanguage,
        theme,
        toggleTheme,
        toast,
        showToast,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        navigateTo,
        isDetailDrawerOpen,
        setIsDetailDrawerOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
