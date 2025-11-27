'use client';

import { useState } from 'react';

interface LivePreviewProps {
  code: string;
}

export function LivePreview({ code }: LivePreviewProps) {
  const [view, setView] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Clean up HTML comments and convert JSX to HTML
  const cleanCode = code
    .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
    .replace(/className=/g, 'class=') // Convert JSX className to HTML class
    .replace(/strokeLinecap=/g, 'stroke-linecap=') // Convert JSX stroke attributes
    .replace(/strokeLinejoin=/g, 'stroke-linejoin=') // Convert JSX stroke attributes
    .replace(/strokeWidth=\{(\d+)\}/g, 'stroke-width="$1"') // Convert strokeWidth={2} to stroke-width="2"
    .replace(/strokeWidth=/g, 'stroke-width=') // Convert remaining strokeWidth
    .replace(/fillOpacity=/g, 'fill-opacity=') // Convert fillOpacity
    .replace(/strokeOpacity=/g, 'stroke-opacity=') // Convert strokeOpacity
    .trim();

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="inline-flex bg-white rounded-lg p-0.5 border border-gray-200">
          <button
            onClick={() => setView('preview')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              view === 'preview'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setView('code')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              view === 'code'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Code
          </button>
        </div>
        <button
          onClick={copyToClipboard}
          className="text-xs text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
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
        <div className="p-6 bg-white">
          <div
            className="flex flex-wrap items-center gap-4"
            dangerouslySetInnerHTML={{ __html: cleanCode }}
          />
        </div>
      ) : (
        <div className="bg-gray-950">
          <pre className="p-4 text-sm text-gray-300 overflow-x-auto font-mono">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
