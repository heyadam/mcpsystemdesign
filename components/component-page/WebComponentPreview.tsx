'use client';

interface WebComponentPreviewProps {
  code: string;
  className?: string;
}

/**
 * Parse web component code and render a visual preview.
 * This creates styled mockups that show what the components look like.
 */
export function WebComponentPreview({ code, className = '' }: WebComponentPreviewProps) {
  const previews = parseWebComponentCode(code);

  return (
    <div className={`bg-surface-sunken border border-default rounded-xl overflow-hidden ${className}`}>
      {/* Preview Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-default bg-surface-raised">
        <span className="text-xs font-medium text-muted">Preview</span>
      </div>

      {/* Preview Area */}
      <div className="p-6 space-y-4">
        {previews.map((preview, index) => (
          <div key={index}>{preview}</div>
        ))}
      </div>
    </div>
  );
}

/**
 * Parse web component HTML and return React elements for preview
 */
function parseWebComponentCode(code: string): React.ReactNode[] {
  const previews: React.ReactNode[] = [];

  // Match mcp-chat-message elements
  const chatMessageRegex = /<mcp-chat-message([^>]*)>([\s\S]*?)<\/mcp-chat-message>/gi;
  let match;

  while ((match = chatMessageRegex.exec(code)) !== null) {
    const attrs = match[1];
    const content = match[2].trim();
    const role = attrs.match(/role=["']([^"']+)["']/)?.[1] || 'assistant';
    const name = attrs.match(/name=["']([^"']+)["']/)?.[1];
    const timestamp = attrs.match(/timestamp=["']([^"']+)["']/)?.[1];

    previews.push(
      <ChatMessagePreview
        key={previews.length}
        role={role as 'user' | 'assistant' | 'system'}
        name={name}
        timestamp={timestamp}
      >
        {content}
      </ChatMessagePreview>
    );
  }

  // Match mcp-typing-indicator
  const typingRegex = /<mcp-typing-indicator([^>]*)(?:\/>|><\/mcp-typing-indicator>)/gi;
  while ((match = typingRegex.exec(code)) !== null) {
    const attrs = match[1];
    const variant = attrs.match(/variant=["']([^"']+)["']/)?.[1] || 'bubble';
    const size = attrs.match(/size=["']([^"']+)["']/)?.[1] || 'md';

    previews.push(
      <TypingIndicatorPreview
        key={previews.length}
        variant={variant as 'bubble' | 'minimal'}
        size={size as 'sm' | 'md' | 'lg'}
      />
    );
  }

  // Match mcp-code-block
  const codeBlockRegex = /<mcp-code-block([^>]*)>([\s\S]*?)<\/mcp-code-block>/gi;
  while ((match = codeBlockRegex.exec(code)) !== null) {
    const attrs = match[1];
    const content = match[2].trim();
    const language = attrs.match(/language=["']([^"']+)["']/)?.[1];
    const showLineNumbers = attrs.includes('show-line-numbers');

    previews.push(
      <CodeBlockPreview
        key={previews.length}
        language={language}
        showLineNumbers={showLineNumbers}
      >
        {content}
      </CodeBlockPreview>
    );
  }

  // Match mcp-message-input
  const inputRegex = /<mcp-message-input([^>]*)(?:\/>|><\/mcp-message-input>)/gi;
  while ((match = inputRegex.exec(code)) !== null) {
    const attrs = match[1];
    const placeholder = attrs.match(/placeholder=["']([^"']+)["']/)?.[1] || 'Type a message...';
    const showCount = attrs.includes('show-count');
    const maxLength = attrs.match(/max-length=["']([^"']+)["']/)?.[1];

    previews.push(
      <MessageInputPreview
        key={previews.length}
        placeholder={placeholder}
        showCount={showCount}
        maxLength={maxLength ? parseInt(maxLength) : undefined}
      />
    );
  }

  // Match mcp-streaming-text
  const streamingRegex = /<mcp-streaming-text([^>]*)(?:\/>|><\/mcp-streaming-text>)/gi;
  while ((match = streamingRegex.exec(code)) !== null) {
    const attrs = match[1];
    const text = attrs.match(/text=["']([^"']+)["']/)?.[1] || '';

    previews.push(
      <StreamingTextPreview key={previews.length} text={text} />
    );
  }

  // Match mcp-token-counter
  const tokenRegex = /<mcp-token-counter([^>]*)(?:\/>|><\/mcp-token-counter>)/gi;
  while ((match = tokenRegex.exec(code)) !== null) {
    const attrs = match[1];
    const used = parseInt(attrs.match(/used=["']([^"']+)["']/)?.[1] || '0');
    const limit = parseInt(attrs.match(/limit=["']([^"']+)["']/)?.[1] || '4096');
    const showLabel = attrs.includes('show-label');

    previews.push(
      <TokenCounterPreview
        key={previews.length}
        used={used}
        limit={limit}
        showLabel={showLabel}
      />
    );
  }

  // If no components found, return placeholder
  if (previews.length === 0) {
    previews.push(
      <div key="empty" className="text-muted text-sm italic">
        Preview not available for this example
      </div>
    );
  }

  return previews;
}

// ============ Preview Components ============

function ChatMessagePreview({
  role,
  name,
  timestamp,
  children
}: {
  role: 'user' | 'assistant' | 'system';
  name?: string;
  timestamp?: string;
  children: React.ReactNode;
}) {
  const isUser = role === 'user';
  const isSystem = role === 'system';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : ''}`}>
        {name && (
          <div className={`text-xs text-muted mb-1 ${isUser ? 'text-right' : ''}`}>
            {name}
          </div>
        )}
        <div
          className={`rounded-2xl px-4 py-2 ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : isSystem
              ? 'bg-surface-hover text-muted italic'
              : 'bg-surface-raised text-default border border-default'
          }`}
        >
          {children}
        </div>
        {timestamp && (
          <div className={`text-xs text-muted mt-1 ${isUser ? 'text-right' : ''}`}>
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
}

function TypingIndicatorPreview({
  variant = 'bubble',
  size = 'md'
}: {
  variant?: 'bubble' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
}) {
  const dotSizes = { sm: 'w-1.5 h-1.5', md: 'w-2 h-2', lg: 'w-2.5 h-2.5' };
  const dotSize = dotSizes[size];

  return (
    <div className={`inline-flex items-center gap-1 ${variant === 'bubble' ? 'bg-surface-raised border border-default rounded-full px-4 py-2' : ''}`}>
      <span className={`${dotSize} bg-muted rounded-full animate-bounce`} style={{ animationDelay: '0ms' }} />
      <span className={`${dotSize} bg-muted rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
      <span className={`${dotSize} bg-muted rounded-full animate-bounce`} style={{ animationDelay: '300ms' }} />
    </div>
  );
}

function CodeBlockPreview({
  language,
  showLineNumbers,
  children
}: {
  language?: string;
  showLineNumbers?: boolean;
  children: React.ReactNode;
}) {
  const lines = String(children).split('\n');

  return (
    <div className="bg-[#1e1e1e] rounded-lg overflow-hidden">
      {language && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#3d3d3d]">
          <span className="text-xs text-[#888]">{language}</span>
          <button className="text-xs text-[#888] hover:text-white">Copy</button>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-[#d4d4d4]">
          {showLineNumbers ? (
            <code>
              {lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="text-[#666] select-none w-8 text-right mr-4">{i + 1}</span>
                  <span>{line}</span>
                </div>
              ))}
            </code>
          ) : (
            <code>{children}</code>
          )}
        </pre>
      </div>
    </div>
  );
}

function MessageInputPreview({
  placeholder,
  showCount,
  maxLength
}: {
  placeholder?: string;
  showCount?: boolean;
  maxLength?: number;
}) {
  return (
    <div className="flex items-end gap-2 p-3 bg-surface-raised border border-default rounded-xl">
      <div className="flex-1">
        <div className="min-h-[44px] px-3 py-2 text-muted text-sm">
          {placeholder}
        </div>
        {showCount && maxLength && (
          <div className="text-xs text-muted text-right mt-1">
            0 / {maxLength}
          </div>
        )}
      </div>
      <button className="p-2 rounded-lg bg-primary text-primary-foreground">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </div>
  );
}

function StreamingTextPreview({ text }: { text: string }) {
  return (
    <div className="text-default">
      {text}
      <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse" />
    </div>
  );
}

function TokenCounterPreview({
  used,
  limit,
  showLabel
}: {
  used: number;
  limit: number;
  showLabel?: boolean;
}) {
  const percentage = Math.min((used / limit) * 100, 100);
  const isWarning = percentage >= 80;
  const isError = percentage >= 100;

  return (
    <div className="space-y-1">
      {showLabel && (
        <div className="flex justify-between text-xs text-muted">
          <span>Tokens</span>
          <span>{used.toLocaleString()} / {limit.toLocaleString()}</span>
        </div>
      )}
      <div className="h-1.5 bg-surface-hover rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            isError ? 'bg-error' : isWarning ? 'bg-warning' : 'bg-primary'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
