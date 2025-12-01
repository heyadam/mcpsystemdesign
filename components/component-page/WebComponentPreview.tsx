'use client';

import { useEffect, useRef, useState } from 'react';

interface WebComponentPreviewProps {
  code: string;
  className?: string;
}

/**
 * Client component that renders live previews of @mcpsystem/ui web components.
 * Shows a static preview of the HTML code.
 * When @mcpsystem/ui is installed and loaded, components become interactive.
 */
export function WebComponentPreview({ code, className = '' }: WebComponentPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'static'>('loading');

  useEffect(() => {
    // Check if web components are registered
    const checkComponents = () => {
      if (typeof customElements !== 'undefined' && customElements.get('mcp-chat-message')) {
        setStatus('ready');
      } else {
        // Components not loaded - show static preview
        setStatus('static');
      }
    };

    // Small delay to allow any scripts to register components
    const timer = setTimeout(checkComponents, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Render the component HTML
    if (containerRef.current && status !== 'loading') {
      // Extract just the HTML (remove script tags for safety)
      const cleanCode = code.replace(/<script[\s\S]*?<\/script>/gi, '');
      containerRef.current.innerHTML = cleanCode;
    }
  }, [code, status]);

  return (
    <div className={`bg-surface-sunken border border-default rounded-xl overflow-hidden ${className}`}>
      {/* Preview Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-default bg-surface-raised">
        <span className="text-xs font-medium text-muted">Preview</span>
        {status === 'static' && (
          <span className="text-xs text-muted">Static preview</span>
        )}
      </div>

      {/* Preview Area */}
      <div className="p-6">
        <div
          ref={containerRef}
          className="web-component-preview [&>*]:mb-4 [&>*:last-child]:mb-0"
        />
        {status === 'loading' && (
          <div className="flex items-center justify-center py-8 text-muted">
            <svg className="w-5 h-5 animate-spin mr-2" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading preview...
          </div>
        )}
      </div>
    </div>
  );
}
