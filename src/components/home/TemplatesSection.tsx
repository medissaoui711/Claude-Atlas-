import React, { useState } from 'react';
import {
  FileCode2,
  Copy,
  Check,
  Download,
  Bookmark,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Eye,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TEMPLATES } from '../../data/templates';
import { PracticalTemplate } from '../../types';

export const TemplatesSection: React.FC = () => {
  const {
    navigateTo,
    language,
    showToast,
    savedTemplateIds,
    toggleSaveTemplate,
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<PracticalTemplate | null>(null);

  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const categories = ['all', 'CLAUDE.md', 'Slash Command', 'Skill', 'Subagent', 'Hook', 'Report'];

  const filtered = TEMPLATES.filter((tpl) => {
    if (activeTab === 'all') return true;
    return tpl.category === activeTab;
  });

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    showToast(isArabic ? 'تم نسخ القالب بالكامل بنجاح' : 'Template copied successfully');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (tpl: PracticalTemplate) => {
    const blob = new Blob([tpl.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = tpl.filename.split('/').pop() || 'template.md';
    link.click();
    URL.revokeObjectURL(url);
    showToast(isArabic ? `تم تنزيل ${tpl.filename}` : `Downloaded ${tpl.filename}`);
  };

  return (
    <section className="py-16 border-b border-slate-800/60 bg-[#070B16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8" dir={isArabic ? 'rtl' : 'ltr'}>
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-400 mb-2">
              {isArabic ? 'إنتاجية فورية' : 'Production Ready Recipes'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              {isArabic ? 'قوالب برمجية جاهزة للنسخ والتطبيق' : 'Practical Copy-Paste Templates'}
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              {isArabic
                ? 'مجموعة منتقاة من ملفات الدستور، الأوامر السريعة، والمهارات المعتمدة لمساعدتك على بدء مشروعك بمعايير احترافية.'
                : 'Curated architectural starter files for immediate adoption in your repositories.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('generators')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>{isArabic ? 'أو افتح مولد القوالب التفاعلي (Wizard)' : 'Open Interactive Generator Wizard'}</span>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveTab(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === cat
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-[#0D1424] text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat === 'all' ? (isArabic ? 'كافة القوالب' : 'All Templates') : cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tpl) => {
            const isCopied = copiedId === tpl.id;
            const isSaved = savedTemplateIds.includes(tpl.id);

            return (
              <div
                key={tpl.id}
                className="rounded-2xl bg-[#0D1424] border border-slate-800/80 p-5 flex flex-col justify-between hover:border-purple-500/50 hover:shadow-xl transition-all duration-300"
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                <div>
                  {/* Top Bar: Category & Bookmark */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {tpl.category}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleSaveTemplate(tpl.id)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                          : 'border-slate-800 text-slate-500 hover:text-slate-200'
                      }`}
                      title={isArabic ? 'حفظ في لوحتي' : 'Save to my dashboard'}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-white font-heading mb-1.5">
                    {isArabic ? tpl.title.ar : tpl.title.en}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {isArabic ? tpl.description.ar : tpl.description.en}
                  </p>

                  {/* Filename Target */}
                  <div className="flex items-center gap-2 text-[11px] font-mono text-purple-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 mb-4" dir="ltr">
                    <FileCode2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    <span className="truncate">{tpl.filename}</span>
                  </div>
                </div>

                {/* Bottom Action Controls */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(tpl)}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isArabic ? 'معاينة' : 'Preview'}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleDownload(tpl)}
                      className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                      title={isArabic ? 'تنزيل كملف' : 'Download file'}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopy(tpl.content, tpl.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-purple-600 hover:bg-purple-500 text-white'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{isArabic ? 'تم النسخ!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{isArabic ? 'نسخ القالب' : 'Copy'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-3xl max-h-[85vh] bg-[#0D1424] border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 bg-[#090E1A] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  {isArabic ? previewTemplate.title.ar : previewTemplate.title.en}
                </h3>
                <div className="font-mono text-xs text-purple-400 mt-0.5" dir="ltr">
                  {previewTemplate.filename}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(previewTemplate.content, previewTemplate.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'نسخ' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTemplate(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Code Body */}
            <div className="p-6 overflow-y-auto bg-[#070B16] text-xs font-mono leading-relaxed text-slate-200" dir="ltr">
              <pre className="whitespace-pre-wrap">{previewTemplate.content}</pre>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
