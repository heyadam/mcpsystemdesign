'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';

interface LivePreviewProps {
  code: string;
}

export function LivePreview({ code }: LivePreviewProps) {
  const { resolvedTheme } = useTheme();
  const [view, setView] = useState<'preview' | 'code'>('preview');
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');
  const [copied, setCopied] = useState(false);

  // Sync preview theme with global theme when it changes
  useEffect(() => {
    setPreviewTheme(resolvedTheme);
  }, [resolvedTheme]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Detect if this is an overlay component (modal, dropdown, etc.) that uses fixed positioning
  const isOverlay = /className="[^"]*\bfixed\b/.test(code);

  // Clean up HTML comments and convert JSX to HTML
  let cleanCode = code
    .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
    .replace(/className=/g, 'class=') // Convert JSX className to HTML class
    .replace(/strokeLinecap=/g, 'stroke-linecap=') // Convert JSX stroke attributes
    .replace(/strokeLinejoin=/g, 'stroke-linejoin=') // Convert JSX stroke attributes
    .replace(/strokeWidth=\{(\d+)\}/g, 'stroke-width="$1"') // Convert strokeWidth={2} to stroke-width="2"
    .replace(/strokeWidth=/g, 'stroke-width=') // Convert remaining strokeWidth
    .replace(/fillOpacity=/g, 'fill-opacity=') // Convert fillOpacity
    .replace(/strokeOpacity=/g, 'stroke-opacity=') // Convert strokeOpacity
    .trim();

  // For overlay components, replace 'fixed' with 'absolute' so they're contained in the preview
  // This prevents modals and other overlays from taking over the entire viewport
  if (isOverlay) {
    cleanCode = cleanCode.replace(/class="([^"]*)"/g, (match, classes) => {
      // Replace 'fixed' as a standalone word in the class list
      const updatedClasses = classes.replace(/\bfixed\b/g, 'absolute');
      return `class="${updatedClasses}"`;
    });
  }

  return (
    <div className="border border-default rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface-sunken border-b border-default">
        <div className="flex items-center gap-3">
          <div className="inline-flex bg-surface-raised rounded-lg p-0.5 border border-default">
            <button
              onClick={() => setView('preview')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                view === 'preview'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted hover:text-default'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setView('code')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                view === 'code'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted hover:text-default'
              }`}
            >
              Code
            </button>
          </div>
          {view === 'preview' && (
            <div className="inline-flex bg-surface-raised rounded-lg p-0.5 border border-default">
              <button
                onClick={() => setPreviewTheme('light')}
                className={`px-2 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1 ${
                  previewTheme === 'light'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted hover:text-default'
                }`}
                title="Light preview"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>
              <button
                onClick={() => setPreviewTheme('dark')}
                className={`px-2 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1 ${
                  previewTheme === 'dark'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted hover:text-default'
                }`}
                title="Dark preview"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </button>
            </div>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="text-xs text-muted hover:text-default transition-colors flex items-center gap-1"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Content */}
      {view === 'preview' ? (
        <div className={`transition-colors ${
          previewTheme === 'dark'
            ? 'preview-container-dark bg-surface-dark'
            : 'preview-container bg-surface-light'
        } ${isOverlay ? 'relative' : 'p-6'}`}>
          {isOverlay ? (
            <div
              className={`relative min-h-[500px] ${previewTheme === 'dark' ? 'dark' : ''}`}
              dangerouslySetInnerHTML={{ __html: cleanCode }}
            />
          ) : (
            <div
              className={`flex flex-wrap items-center gap-4 ${previewTheme === 'dark' ? 'dark' : ''}`}
              dangerouslySetInnerHTML={{ __html: cleanCode }}
            />
          )}
        </div>
      ) : (
        <div className="bg-surface-raised">
          <pre className="p-4 text-sm text-default overflow-x-auto font-mono">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
