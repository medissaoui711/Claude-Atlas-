import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast.visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0D1424]/95 backdrop-blur-md border border-purple-500/30 text-slate-100 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
      style={{ maxWidth: '90vw' }}
    >
      {toast.type === 'success' ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
      ) : (
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />
      )}
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  );
};
