'use client';

import { useEffect, useRef, useState } from 'react';

interface WebComponentPreviewProps {
  code: string;
  className?: string;
}

// Track if the web components script has been loaded
let scriptLoaded = false;
let scriptLoading = false;
const loadCallbacks: (() => void)[] = [];

/**
 * Load the @mcpsystem/ui web components script
 */
function loadWebComponentsScript(): Promise<void> {
  return new Promise((resolve) => {
    if (scriptLoaded) {
      resolve();
      return;
    }

    loadCallbacks.push(resolve);

    if (scriptLoading) {
      return;
    }

    scriptLoading = true;

    const script = document.createElement('script');
    script.type = 'module';
    script.src = '/mcp-ui.min.js';
    script.onload = () => {
      scriptLoaded = true;
      scriptLoading = false;
      // Give custom elements time to register
      setTimeout(() => {
        loadCallbacks.forEach((cb) => cb());
        loadCallbacks.length = 0;
      }, 50);
    };
    script.onerror = () => {
      scriptLoading = false;
      // Still resolve to show static content
      loadCallbacks.forEach((cb) => cb());
      loadCallbacks.length = 0;
    };
    document.head.appendChild(script);
  });
}

/**
 * Renders live previews of @mcpsystem/ui web components.
 * Loads the component library and renders the actual web components.
 */
export function WebComponentPreview({ code, className = '' }: WebComponentPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(scriptLoaded);
  const lastCodeRef = useRef<string>('');

  useEffect(() => {
    loadWebComponentsScript().then(() => {
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (containerRef.current && isLoaded && code !== lastCodeRef.current) {
      // Remove script tags for safety
      const cleanCode = code.replace(/<script[\s\S]*?<\/script>/gi, '');
      containerRef.current.innerHTML = cleanCode;
      lastCodeRef.current = code;
    }
  }, [code, isLoaded]);

  return (
    <div className={`bg-surface-sunken border border-default rounded-xl overflow-hidden ${className}`}>
      {/* Preview Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-default bg-surface-raised">
        <span className="text-xs font-medium text-muted">Preview</span>
        {isLoaded && (
          <span className="text-xs text-success-foreground">Live</span>
        )}
      </div>

      {/* Preview Area */}
      <div className="p-6">
        {!isLoaded ? (
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
            Loading components...
          </div>
        ) : (
          <div
            ref={containerRef}
            className="web-component-preview space-y-4"
          />
        )}
      </div>
    </div>
  );
}
