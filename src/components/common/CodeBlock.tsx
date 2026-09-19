import React, { useState } from 'react';
import { Copy, Check, Terminal, FileCode2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  id?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'bash',
  filename,
  id = 'code-block',
  showLineNumbers = false,
}) => {
  const [copied, setCopied] = useState(false);
  const { showToast, language: appLang } = useApp();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      showToast(
        appLang === 'ar' ? 'تم نسخ الكود بنجاح' : 'Code copied to clipboard',
        'success'
      );
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback copy
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      showToast(appLang === 'ar' ? 'تم النسخ' : 'Copied');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div
      id={id}
      className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#0A101D] text-slate-200 my-3 shadow-lg"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0D1424] border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          {language === 'bash' ? (
            <Terminal className="w-4 h-4 text-purple-400" />
          ) : (
            <FileCode2 className="w-4 h-4 text-blue-400" />
          )}
          <span className="font-mono text-slate-300 font-medium">
            {filename || (language ? `${language}` : 'code')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[11px] uppercase font-mono tracking-wider">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            id={`${id}-copy-btn`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer border border-slate-700/60"
            title={appLang === 'ar' ? 'نسخ الكود' : 'Copy code'}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">
                  {appLang === 'ar' ? 'تم النسخ' : 'Copied'}
                </span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>{appLang === 'ar' ? 'نسخ' : 'Copy'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code body */}
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed" dir="ltr">
        {showLineNumbers ? (
          <table className="border-collapse w-full">
            <tbody>
              {lines.map((line, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30">
                  <td className="pr-4 select-none text-slate-600 text-right text-xs align-top w-8">
                    {idx + 1}
                  </td>
                  <td className="whitespace-pre text-slate-200">{line || ' '}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <pre className="whitespace-pre text-slate-200">{code}</pre>
        )}
      </div>
    </div>
  );
};
