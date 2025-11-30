import type { Component } from './types';

export const components: Component[] = [
  // ============ BASE ============
  {
    name: "Colors",
    slug: "colors",
    description: "Color palette and design tokens for the design system.",
    category: "Base",
    usageNote: "// Use Tailwind color classes: bg-gray-900, text-info-emphasis, etc.",
    tailwind: true,
    overview: {
      introduction: "Our color system includes neutral grays and semantic accent colors. All colors are designed to work in both light and dark modes with sufficient contrast ratios.",
      whenToUse: [
        "Gray scale for text hierarchy and UI surfaces",
        "Accent colors for semantic states and branding",
        "Maintain WCAG AA contrast standards",
        "Consider dark mode when choosing combinations"
      ]
    },
    props: [],
    examples: [
      {
        title: "Color Tokens",
        code: `<!-- This page has a custom layout - visit /components/colors to see the full color palette -->`,
        description: "Interactive color swatches with click-to-copy functionality"
      }
    ],
    relatedComponents: ["Typography"]
  },
  {
    name: "Typography",
    slug: "typography",
    description: "Typography scale and text styles for the design system.",
    category: "Base",
    usageNote: "// Use Tailwind typography classes: text-3xl, font-semibold, etc.",
    tailwind: true,
    overview: {
      introduction: "Our typography system uses Inter for interface text and JetBrains Mono for code. The scale includes 8 predefined styles from Display to Caption.",
      whenToUse: [
        "Display for hero headlines",
        "H1-H3 for content hierarchy",
        "Body for paragraphs and general text",
        "Small and Caption for metadata"
      ]
    },
    props: [],
    examples: [
      {
        title: "Typography Styles",
        code: `<!-- This page has a custom layout - visit /components/typography to see all typography styles -->`,
        description: "Complete typography scale with live examples and specifications"
      }
    ],
    relatedComponents: ["Colors"]
  },
  // ============ ACTIONS ============
  {
    name: "Button",
    slug: "button",
    description: "Minimal button with subtle hover states and clean typography.",
    category: "Actions",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    overview: {
      introduction: "Buttons allow users to trigger actions with a single tap. They are the primary way for users to interact with your application.",
      whenToUse: [
        "To trigger an action or event",
        "To submit a form",
        "To navigate to another page",
        "To confirm or cancel an action"
      ]
    },
    guidelines: {
      dos: [
        "Use clear, action-oriented labels",
        "Use primary variant for the main action on a page",
        "Keep button text concise (1-3 words)",
        "Use consistent button styling throughout your app"
      ],
      donts: [
        "Don't use more than one primary button in a single view",
        "Don't use vague labels like 'Click here'",
        "Don't disable buttons without explaining why",
        "Don't use buttons for navigation when a link would suffice"
      ],
      accessibility: [
        "Use semantic <button> element for actions",
        "Provide aria-label for icon-only buttons",
        "Ensure sufficient color contrast",
        "Make sure buttons are keyboard accessible"
      ]
    },
    specs: {
      variants: [
        { name: "Primary", classes: "bg-primary text-primary-foreground hover:bg-primary-hover" },
        { name: "Secondary", classes: "bg-surface-hover text-default" },
        { name: "Outline", classes: "bg-surface-raised text-default border border-default hover:bg-surface-hover hover:border-emphasis" },
        { name: "Ghost", classes: "text-muted hover:bg-surface-hover hover:text-default" },
        { name: "Danger", classes: "bg-error-emphasis text-white hover:opacity-90" }
      ],
      sizes: [
        { name: "Small", classes: "h-8 px-3 rounded-md text-xs" },
        { name: "Medium", classes: "h-10 px-4 rounded-lg text-sm", description: "Default size" },
        { name: "Large", classes: "h-12 px-6 rounded-lg text-base" }
      ],
      states: [
        { name: "Disabled", classes: "opacity-70 cursor-not-allowed", description: "Add disabled attribute to button" },
        { name: "Loading", classes: "opacity-70 cursor-not-allowed", description: "Add spinner SVG and disabled attribute" }
      ]
    },
    examples: [
      {
        title: "Primary",
        code: `<button className="h-10 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
  Deploy
</button>`,
        preview: "primary"
      },
      {
        title: "Secondary",
        code: `<button className="h-10 px-4 bg-surface-hover text-default rounded-lg text-sm font-medium hover:bg-surface-hover transition-colors">
  Cancel
</button>`,
        preview: "secondary"
      },
      {
        title: "Outline",
        code: `<button className="h-10 px-4 bg-surface-raised text-default border border-default rounded-lg text-sm font-medium hover:bg-surface-hover hover:border-emphasis transition-colors">
  Settings
</button>`,
        preview: "outline"
      },
      {
        title: "Ghost",
        code: `<button className="h-10 px-4 text-muted rounded-lg text-sm font-medium hover:bg-surface-hover hover:text-default transition-colors">
  Learn more
</button>`,
        preview: "ghost"
      },
      {
        title: "Danger",
        code: `<button className="h-10 px-4 bg-error-emphasis text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors">
  Delete
</button>`,
        preview: "danger"
      },
      {
        title: "With Icon",
        code: `<button className="h-10 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
  Add New
</button>`,
        preview: "icon"
      },
      {
        title: "Loading",
        code: `<button className="h-10 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium inline-flex items-center gap-2 opacity-70 cursor-not-allowed" disabled>
  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
  Processing...
</button>`,
        preview: "loading"
      },
      {
        title: "Sizes",
        code: `<button className="h-8 px-3 bg-primary text-primary-foreground rounded-md text-xs font-medium">Small</button>
<button className="h-10 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Medium</button>
<button className="h-12 px-6 bg-primary text-primary-foreground rounded-lg text-base font-medium">Large</button>`,
        preview: "sizes"
      }
    ],
    relatedComponents: ["IconButton", "ButtonGroup", "Link"]
  },
  {
    name: "IconButton",
    slug: "icon-button",
    description: "Square button for icon-only actions.",
    category: "Actions",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "variant", type: "'default' | 'ghost' | 'danger'", required: false, default: "'default'", description: "Visual style" },
      { name: "size", type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: "Button size" },
      { name: "label", type: "string", required: true, description: "Accessible label for screen readers" }
    ],
    examples: [
      {
        title: "Variants",
        code: `<button className="w-10 h-10 flex items-center justify-center bg-surface-raised border border-default rounded-lg hover:bg-surface-hover transition-colors" aria-label="Settings">
  <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
</button>
<button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-hover transition-colors" aria-label="Close">
  <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
</button>
<button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-error text-error-emphasis transition-colors" aria-label="Delete">
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
</button>`,
        preview: "variants"
      }
    ],
    relatedComponents: ["Button", "ButtonGroup"]
  },
  {
    name: "ButtonGroup",
    slug: "button-group",
    description: "Group of connected buttons for related actions.",
    category: "Actions",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "attached", type: "boolean", required: false, default: "true", description: "Attach buttons together" }
    ],
    examples: [
      {
        title: "Default",
        code: `<div className="inline-flex rounded-lg border border-default divide-x divide-default">
  <button className="px-4 py-2 text-sm font-medium text-default bg-surface-raised hover:bg-surface-hover first:rounded-l-lg">Left</button>
  <button className="px-4 py-2 text-sm font-medium text-default bg-surface-hover hover:bg-surface-hover">Center</button>
  <button className="px-4 py-2 text-sm font-medium text-default bg-surface-raised hover:bg-surface-hover last:rounded-r-lg">Right</button>
</div>`,
        preview: "default"
      }
    ],
    relatedComponents: ["Button", "IconButton"]
  },

  // ============ FORMS ============
  {
    name: "Input",
    slug: "input",
    description: "Clean text input with focus ring and error states.",
    category: "Forms",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    overview: {
      introduction: "Text inputs allow users to enter and edit text. They are the foundation of forms and data entry.",
      whenToUse: [
        "For single-line text entry",
        "For email, password, or number input",
        "When you need user input in a form"
      ]
    },
    guidelines: {
      dos: [
        "Always provide a visible label",
        "Use placeholder text sparingly",
        "Show clear error states with helpful messages",
        "Match input width to expected content length"
      ],
      donts: [
        "Don't use placeholder text as a label",
        "Don't make inputs too wide or too narrow",
        "Don't hide required field indicators"
      ],
      accessibility: [
        "Associate labels with inputs using for/id",
        "Use aria-describedby for helper/error text",
        "Ensure error states are announced to screen readers"
      ]
    },
    specs: {
      variants: [
        { name: "Default", classes: "bg-surface-raised border border-default text-default placeholder:text-subtle focus:ring-primary" },
        { name: "Error", classes: "bg-surface-raised border border-error-border text-default focus:ring-error-emphasis" },
        { name: "Disabled", classes: "bg-surface-sunken border border-default text-muted cursor-not-allowed" }
      ],
      sizes: [
        { name: "Small", classes: "h-8 px-2 text-xs rounded-md" },
        { name: "Medium", classes: "h-10 px-3 text-sm rounded-lg", description: "Default size" },
        { name: "Large", classes: "h-12 px-4 text-base rounded-lg" }
      ],
      states: [
        { name: "Focus", classes: "focus:outline-none focus:ring-2 focus:border-transparent" }
      ]
    },
    examples: [
      {
        title: "Default",
        code: `<input
  type="text"
  placeholder="Enter your name"
  className="h-10 w-full px-3 bg-surface-raised border border-default rounded-lg text-sm text-default placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
/>`,
        preview: "default"
      },
      {
        title: "With Label & Helper",
        code: `<div className="space-y-2">
  <label className="text-sm font-medium text-default">Email address</label>
  <input
    type="email"
    placeholder="you@example.com"
    className="h-10 w-full px-3 bg-surface-raised border border-default rounded-lg text-sm text-default placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
  />
  <p className="text-sm text-muted">We'll never share your email.</p>
</div>`,
        preview: "with-label"
      },
      {
        title: "Error State",
        code: `<div className="space-y-2">
  <label className="text-sm font-medium text-default">Email</label>
  <input
    type="email"
    value="invalid-email"
    className="h-10 w-full px-3 bg-surface-raised border border-error-border rounded-lg text-sm text-default focus:outline-none focus:ring-2 focus:ring-error-emphasis focus:border-transparent"
  />
  <p className="text-sm text-error-emphasis">Please enter a valid email address.</p>
</div>`,
        preview: "error"
      },
      {
        title: "With Icon",
        code: `<div className="relative">
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
  <input
    type="text"
    placeholder="Search..."
    className="h-10 w-full pl-10 pr-3 bg-surface-raised border border-default rounded-lg text-sm text-default placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary"
  />
</div>`,
        preview: "with-icon"
      },
      {
        title: "Disabled",
        code: `<input
  type="text"
  value="Disabled input"
  disabled
  className="h-10 w-full px-3 bg-surface-sunken border border-default rounded-lg text-sm text-muted cursor-not-allowed"
/>`,
        preview: "disabled"
      }
    ],
    relatedComponents: ["Textarea", "Select", "FormGroup"]
  },
  {
    name: "Textarea",
    slug: "textarea",
    description: "Multi-line text input for longer content.",
    category: "Forms",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "placeholder", type: "string", required: false, description: "Placeholder text" },
      { name: "rows", type: "number", required: false, default: "4", description: "Number of visible rows" },
      { name: "resize", type: "'none' | 'vertical' | 'horizontal' | 'both'", required: false, default: "'vertical'", description: "Resize behavior" },
      { name: "error", type: "boolean", required: false, default: "false", description: "Error state" }
    ],
    examples: [
      {
        title: "Default",
        code: `<textarea
  placeholder="Enter your message..."
  rows="4"
  className="w-full px-3 py-2 bg-surface-raised border border-default rounded-lg text-sm text-default placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
></textarea>`,
        preview: "default"
      },
      {
        title: "With Character Count",
        code: `<div className="space-y-2">
  <label className="text-sm font-medium text-default">Bio</label>
  <textarea
    placeholder="Tell us about yourself..."
    rows="3"
    maxLength="200"
    className="w-full px-3 py-2 bg-surface-raised border border-default rounded-lg text-sm text-default placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary resize-none"
  ></textarea>
  <p className="text-xs text-subtle text-right">0 / 200</p>
</div>`,
        preview: "character-count"
      }
    ],
    relatedComponents: ["Input", "FormGroup"]
  },
  {
    name: "Select",
    slug: "select",
    description: "Dropdown select input for choosing from options.",
    category: "Forms",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "options", type: "Array<{ value: string; label: string }>", required: true, description: "Select options" },
      { name: "placeholder", type: "string", required: false, description: "Placeholder text" },
      { name: "disabled", type: "boolean", required: false, default: "false", description: "Disabled state" },
      { name: "error", type: "boolean", required: false, default: "false", description: "Error state" }
    ],
    examples: [
      {
        title: "Default",
        code: `<div className="relative">
  <select className="h-10 w-full px-3 pr-10 bg-surface-raised border border-default rounded-lg text-sm text-default appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer">
    <option value="">Select an option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
</div>`,
        preview: "default"
      },
      {
        title: "With Label",
        code: `<div className="space-y-2">
  <label className="text-sm font-medium text-default">Country</label>
  <div className="relative">
    <select className="h-10 w-full px-3 pr-10 bg-surface-raised border border-default rounded-lg text-sm text-default appearance-none focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer">
      <option value="">Select country</option>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
    </select>
    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
  </div>
</div>`,
        preview: "with-label"
      }
    ],
    relatedComponents: ["Input", "Dropdown", "FormGroup"]
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    description: "Checkbox input for boolean or multiple selections.",
    category: "Forms",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "checked", type: "boolean", required: false, default: "false", description: "Checked state" },
      { name: "indeterminate", type: "boolean", required: false, default: "false", description: "Indeterminate state" },
      { name: "disabled", type: "boolean", required: false, default: "false", description: "Disabled state" },
      { name: "label", type: "string", required: false, description: "Label text" }
    ],
    examples: [
      {
        title: "States",
        code: `<!-- Unchecked -->
<label className="flex items-center gap-3 cursor-pointer">
  <input type="checkbox" className="w-4 h-4 rounded border-muted text-primary bg-surface-raised focus:ring-primary focus:ring-offset-0" />
  <span className="text-sm text-default">Unchecked</span>
</label>

<!-- Checked -->
<label className="flex items-center gap-3 cursor-pointer">
  <input type="checkbox" checked className="w-4 h-4 rounded border-muted text-primary bg-surface-raised focus:ring-primary focus:ring-offset-0" />
  <span className="text-sm text-default">Checked</span>
</label>

<!-- Disabled -->
<label className="flex items-center gap-3 cursor-not-allowed">
  <input type="checkbox" disabled className="w-4 h-4 rounded border-default text-subtle" />
  <span className="text-sm text-subtle">Disabled</span>
</label>`,
        preview: "states"
      },
      {
        title: "With Description",
        code: `<label className="flex items-start gap-3 cursor-pointer">
  <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-muted text-primary bg-surface-raised focus:ring-primary" />
  <div>
    <span className="text-sm font-medium text-default">Marketing emails</span>
    <p className="text-sm text-muted">Receive emails about new products and features.</p>
  </div>
</label>`,
        preview: "with-description"
      }
    ],
    relatedComponents: ["Radio", "Toggle", "FormGroup"]
  },
  {
    name: "Radio",
    slug: "radio",
    description: "Radio button for single selection from multiple options.",
    category: "Forms",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "checked", type: "boolean", required: false, default: "false", description: "Checked state" },
      { name: "disabled", type: "boolean", required: false, default: "false", description: "Disabled state" },
      { name: "label", type: "string", required: false, description: "Label text" }
    ],
    examples: [
      {
        title: "Radio Group",
        code: `<fieldset className="space-y-3">
  <legend className="text-sm font-medium text-default">Notification preference</legend>
  <label className="flex items-center gap-3 cursor-pointer">
    <input type="radio" name="notification" value="all" checked className="w-4 h-4 border-muted text-primary bg-surface-raised focus:ring-primary" />
    <span className="text-sm text-default">All notifications</span>
  </label>
  <label className="flex items-center gap-3 cursor-pointer">
    <input type="radio" name="notification" value="mentions" className="w-4 h-4 border-muted text-primary bg-surface-raised focus:ring-primary" />
    <span className="text-sm text-default">Mentions only</span>
  </label>
  <label className="flex items-center gap-3 cursor-pointer">
    <input type="radio" name="notification" value="none" className="w-4 h-4 border-muted text-primary bg-surface-raised focus:ring-primary" />
    <span className="text-sm text-default">None</span>
  </label>
</fieldset>`,
        preview: "group"
      },
      {
        title: "Card Selection",
        code: `<div className="grid grid-cols-3 gap-3">
  <label className="relative cursor-pointer">
    <input type="radio" name="plan" value="starter" className="peer sr-only" />
    <div className="p-4 bg-surface-raised border border-default rounded-xl peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary transition-all">
      <p className="font-medium text-default">Starter</p>
      <p className="text-sm text-muted">$9/mo</p>
    </div>
  </label>
  <label className="relative cursor-pointer">
    <input type="radio" name="plan" value="pro" className="peer sr-only" checked />
    <div className="p-4 bg-surface-raised border border-default rounded-xl peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary transition-all">
      <p className="font-medium text-default">Pro</p>
      <p className="text-sm text-muted">$29/mo</p>
    </div>
  </label>
  <label className="relative cursor-pointer">
    <input type="radio" name="plan" value="enterprise" className="peer sr-only" />
    <div className="p-4 bg-surface-raised border border-default rounded-xl peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary transition-all">
      <p className="font-medium text-default">Enterprise</p>
      <p className="text-sm text-muted">Custom</p>
    </div>
  </label>
</div>`,
        preview: "cards"
      }
    ],
    relatedComponents: ["Checkbox", "Select", "FormGroup"]
  },
  {
    name: "Toggle",
    slug: "toggle",
    description: "Accessible toggle switch for boolean settings.",
    category: "Forms",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "checked", type: "boolean", required: false, default: "false", description: "Checked state" },
      { name: "disabled", type: "boolean", required: false, default: "false", description: "Disabled state" },
      { name: "size", type: "'sm' | 'md'", required: false, default: "'md'", description: "Toggle size" }
    ],
    examples: [
      {
        title: "States",
        code: `<!-- Off -->
<button className="w-11 h-6 bg-surface-hover rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-surface">
  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform" />
</button>

<!-- On -->
<button className="w-11 h-6 bg-primary rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-surface">
  <span className="absolute left-1 top-1 w-4 h-4 bg-surface-raised rounded-full shadow-sm transition-transform translate-x-5" />
</button>`,
        preview: "states"
      },
      {
        title: "With Label",
        code: `<label className="flex items-center justify-between cursor-pointer">
  <div>
    <p className="text-sm font-medium text-default">Dark mode</p>
    <p className="text-sm text-muted">Use dark theme across the app</p>
  </div>
  <button className="w-11 h-6 bg-primary rounded-full relative transition-colors ml-4">
    <span className="absolute left-1 top-1 w-4 h-4 bg-surface-raised rounded-full shadow-sm transition-transform translate-x-5" />
  </button>
</label>`,
        preview: "with-label"
      },
    ],
    relatedComponents: ["Checkbox", "Radio"]
  },
  {
    name: "FormGroup",
    slug: "form-group",
    description: "Container for form fields with label and helper text.",
    category: "Forms",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "label", type: "string", required: false, description: "Field label" },
      { name: "helper", type: "string", required: false, description: "Helper text" },
      { name: "error", type: "string", required: false, description: "Error message" },
      { name: "required", type: "boolean", required: false, default: "false", description: "Required field indicator" }
    ],
    examples: [
      {
        title: "Complete Form",
        code: `<form className="space-y-6">
  <div className="space-y-2">
    <label className="text-sm font-medium text-default">Full name <span className="text-error-emphasis">*</span></label>
    <input type="text" className="h-10 w-full px-3 bg-surface-raised border border-default rounded-lg text-sm text-default focus:outline-none focus:ring-2 focus:ring-primary" />
  </div>

  <div className="space-y-2">
    <label className="text-sm font-medium text-default">Email <span className="text-error-emphasis">*</span></label>
    <input type="email" className="h-10 w-full px-3 bg-surface-raised border border-default rounded-lg text-sm text-default focus:outline-none focus:ring-2 focus:ring-primary" />
    <p className="text-sm text-muted">We'll use this for account notifications.</p>
  </div>

  <div className="space-y-2">
    <label className="text-sm font-medium text-default">Password</label>
    <input type="password" className="h-10 w-full px-3 bg-surface-raised border border-error-border rounded-lg text-sm text-default focus:outline-none focus:ring-2 focus:ring-error-emphasis" />
    <p className="text-sm text-error-emphasis">Password must be at least 8 characters.</p>
  </div>

  <button type="submit" className="h-10 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover">
    Create account
  </button>
</form>`,
        preview: "complete"
      }
    ],
    relatedComponents: ["Input", "Select", "Checkbox"]
  },
  {
    name: "FileUpload",
    slug: "file-upload",
    description: "File upload input with drag and drop support.",
    category: "Forms",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "accept", type: "string", required: false, description: "Accepted file types" },
      { name: "multiple", type: "boolean", required: false, default: "false", description: "Allow multiple files" },
      { name: "maxSize", type: "number", required: false, description: "Max file size in bytes" }
    ],
    examples: [
      {
        title: "Drop Zone",
        code: `<div className="border-2 border-dashed border-default rounded-xl p-8 text-center hover:border-emphasis transition-colors cursor-pointer">
  <svg className="w-10 h-10 text-subtle mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
  <p className="mt-4 text-sm text-muted">
    <span className="font-medium text-default">Click to upload</span> or drag and drop
  </p>
  <p className="mt-1 text-xs text-muted">PNG, JPG, GIF up to 10MB</p>
  <input type="file" className="hidden" />
</div>`,
        preview: "dropzone"
      },
      {
        title: "Compact",
        code: `<label className="inline-flex items-center gap-2 h-10 px-4 bg-surface-raised border border-default rounded-lg text-sm font-medium text-default hover:bg-surface-hover cursor-pointer transition-colors">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
  Attach file
  <input type="file" className="hidden" />
</label>`,
        preview: "compact"
      }
    ],
    relatedComponents: ["Input", "Button"]
  },

  // ============ DATA DISPLAY ============
  {
    name: "Table",
    slug: "table",
    description: "Data table for displaying structured information.",
    category: "Data Display",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "columns", type: "Array<{ key: string; header: string; sortable?: boolean }>", required: true, description: "Column definitions" },
      { name: "data", type: "Array<Record<string, any>>", required: true, description: "Table data" },
      { name: "striped", type: "boolean", required: false, default: "false", description: "Striped rows" },
      { name: "hoverable", type: "boolean", required: false, default: "true", description: "Row hover effect" }
    ],
    examples: [
      {
        title: "Default",
        code: `<div className="border border-default rounded-xl overflow-hidden">
  <table className="w-full">
    <thead className="bg-surface-sunken border-b border-default">
      <tr>
        <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Name</th>
        <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
        <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Role</th>
        <th className="px-4 py-3 text-right text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-default bg-surface-raised">
      <tr className="hover:bg-surface-hover">
        <td className="px-4 py-3 text-sm text-default">John Doe</td>
        <td className="px-4 py-3"><span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-success text-success-foreground">Active</span></td>
        <td className="px-4 py-3 text-sm text-muted">Admin</td>
        <td className="px-4 py-3 text-right text-sm"><button className="text-muted hover:text-default">Edit</button></td>
      </tr>
      <tr className="hover:bg-surface-hover">
        <td className="px-4 py-3 text-sm text-default">Jane Smith</td>
        <td className="px-4 py-3"><span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-surface-hover text-muted">Pending</span></td>
        <td className="px-4 py-3 text-sm text-muted">User</td>
        <td className="px-4 py-3 text-right text-sm"><button className="text-muted hover:text-default">Edit</button></td>
      </tr>
    </tbody>
  </table>
</div>`,
        preview: "default"
      }
    ],
    relatedComponents: ["Card", "Pagination"]
  },
  {
    name: "Badge",
    slug: "badge",
    description: "Small status indicator with semantic colors.",
    category: "Data Display",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    overview: {
      introduction: "Badges are used to highlight status, categories, or counts in a compact visual form.",
      whenToUse: [
        "To display status (active, pending, error)",
        "To show counts or quantities",
        "To categorize or label items"
      ]
    },
    specs: {
      variants: [
        { name: "Default", classes: "bg-surface-hover text-default" },
        { name: "Success", classes: "bg-success text-success-foreground" },
        { name: "Warning", classes: "bg-warning text-warning-foreground" },
        { name: "Error", classes: "bg-error text-error-foreground" },
        { name: "Info", classes: "bg-info text-info-foreground" }
      ],
      sizes: [
        { name: "Small", classes: "px-2 py-0.5 text-xs" },
        { name: "Medium", classes: "px-2.5 py-0.5 text-xs", description: "Default size" }
      ]
    },
    examples: [
      {
        title: "Variants",
        code: `<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-surface-hover text-default">Default</span>
<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-success text-success-foreground">Success</span>
<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-warning text-warning-foreground">Warning</span>
<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-error text-error-foreground">Error</span>
<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-info text-info-foreground">Info</span>`,
        preview: "variants"
      },
      {
        title: "With Dot",
        code: `<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full bg-success text-success-foreground">
  <span className="w-1.5 h-1.5 bg-success-emphasis rounded-full"></span>
  Online
</span>
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full bg-surface-hover text-muted">
  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
  Offline
</span>
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full bg-warning text-warning-foreground">
  <span className="w-1.5 h-1.5 bg-warning-emphasis rounded-full animate-pulse"></span>
  Processing
</span>`,
        preview: "with-dot"
      }
    ],
    relatedComponents: ["Avatar", "Alert"]
  },
  {
    name: "Avatar",
    slug: "avatar",
    description: "User avatar with image, initials, or icon fallback.",
    category: "Data Display",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "src", type: "string", required: false, description: "Image URL" },
      { name: "alt", type: "string", required: false, description: "Alt text for image" },
      { name: "fallback", type: "string", required: false, description: "Fallback initials (1-2 chars)" },
      { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", required: false, default: "'md'", description: "Avatar size" }
    ],
    examples: [
      {
        title: "Sizes",
        code: `<div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-[10px] font-medium">A</div>
<div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-xs font-medium">AB</div>
<div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-sm font-medium">CD</div>
<div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-base font-medium">EF</div>
<div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-lg font-medium">GH</div>`,
        preview: "sizes"
      },
      {
        title: "Avatar Group",
        code: `<div className="flex items-center -space-x-2">
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium ring-2 ring-white">A</div>
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-medium ring-2 ring-white">B</div>
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-medium ring-2 ring-white">C</div>
  <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center text-muted text-xs font-medium ring-2 ring-white">+5</div>
</div>`,
        preview: "group"
      },
      {
        title: "With Status",
        code: `<div className="relative inline-block">
  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-sm font-medium">JD</div>
  <span className="absolute bottom-0 right-0 w-3 h-3 bg-success-emphasis rounded-full ring-2 ring-white"></span>
</div>`,
        preview: "with-status"
      }
    ],
    relatedComponents: ["Badge"]
  },
  {
    name: "Card",
    slug: "card",
    description: "Versatile container for grouping related content.",
    category: "Data Display",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    overview: {
      introduction: "Cards are containers that group related content and actions. They provide a consistent way to display information.",
      whenToUse: [
        "To group related information",
        "For content previews",
        "For clickable/interactive content blocks",
        "For dashboard widgets and stats"
      ]
    },
    specs: {
      variants: [
        { name: "Default", classes: "bg-surface-raised border border-default rounded-xl" },
        { name: "Outlined", classes: "bg-transparent border border-default rounded-xl" },
        { name: "Elevated", classes: "bg-surface-raised rounded-xl shadow-md" },
        { name: "Interactive", classes: "hover:border-emphasis hover:shadow-md cursor-pointer transition-all", description: "Add to any variant for hover effects" }
      ],
      sizes: [
        { name: "Small", classes: "p-4" },
        { name: "Medium", classes: "p-6", description: "Default padding" },
        { name: "Large", classes: "p-8" }
      ]
    },
    examples: [
      {
        title: "Default",
        code: `<div className="p-6 bg-surface-raised border border-default rounded-xl">
  <h3 className="font-semibold text-default">Card Title</h3>
  <p className="mt-2 text-sm text-muted">This is a basic card with default styling.</p>
</div>`,
        preview: "default"
      },
      {
        title: "Interactive",
        code: `<div className="p-6 bg-surface-raised border border-default rounded-xl hover:border-emphasis hover:shadow-md dark:hover:shadow-gray-900/50 transition-all cursor-pointer">
  <h3 className="font-semibold text-default">Interactive Card</h3>
  <p className="mt-2 text-sm text-muted">Hover to see the shadow effect.</p>
</div>`,
        preview: "interactive"
      },
      {
        title: "With Header & Footer",
        code: `<div className="bg-surface-raised border border-default rounded-xl overflow-hidden">
  <div className="px-6 py-4 border-b border-default">
    <h3 className="font-semibold text-default">Card Header</h3>
  </div>
  <div className="px-6 py-4">
    <p className="text-sm text-muted">Card body content goes here. You can put any content inside.</p>
  </div>
  <div className="px-6 py-4 bg-surface-sunken border-t border-default">
    <button className="text-sm font-medium text-muted hover:text-default">View details →</button>
  </div>
</div>`,
        preview: "with-sections"
      },
      {
        title: "Stats Card",
        code: `<div className="p-6 bg-surface-raised border border-default rounded-xl">
  <p className="text-sm font-medium text-muted">Total Revenue</p>
  <p className="mt-2 text-3xl font-semibold text-default">$45,231.89</p>
  <p className="mt-2 text-sm text-success-foreground">↑ 20.1% from last month</p>
</div>`,
        preview: "stats"
      }
    ],
    relatedComponents: ["Table", "DescriptionList"]
  },
  {
    name: "EmptyState",
    slug: "empty-state",
    description: "Placeholder for empty or missing content.",
    category: "Data Display",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "icon", type: "ReactNode", required: false, description: "Icon element" },
      { name: "title", type: "string", required: true, description: "Title text" },
      { name: "description", type: "string", required: false, description: "Description text" },
      { name: "action", type: "ReactNode", required: false, description: "Action button or link" }
    ],
    examples: [
      {
        title: "Default",
        code: `<div className="text-center py-12">
  <svg className="w-12 h-12 text-subtle mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
  <h3 className="mt-4 text-sm font-medium text-default">No documents</h3>
  <p className="mt-2 text-sm text-muted">Get started by creating a new document.</p>
  <button className="mt-4 h-9 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover">
    Create document
  </button>
</div>`,
        preview: "default"
      }
    ],
    relatedComponents: ["Card", "Skeleton"]
  },
  {
    name: "CodeBlock",
    slug: "code-block",
    description: "Syntax-highlighted code display with copy button.",
    category: "Data Display",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "code", type: "string", required: true, description: "Code content" },
      { name: "language", type: "string", required: false, description: "Language for syntax highlighting" },
      { name: "showLineNumbers", type: "boolean", required: false, default: "false", description: "Show line numbers" },
      { name: "copyable", type: "boolean", required: false, default: "true", description: "Show copy button" }
    ],
    examples: [
      {
        title: "Default",
        code: `<div className="relative bg-gray-950 rounded-xl overflow-hidden">
  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
    <span className="text-xs text-gray-500">example.tsx</span>
    <button className="text-xs text-gray-500 hover:text-white transition-colors">Copy</button>
  </div>
  <pre className="p-4 text-sm text-gray-300 overflow-x-auto font-mono"><code>const greeting = "Hello, World!";
console.log(greeting);</code></pre>
</div>`,
        preview: "default"
      },
      {
        title: "Inline Code",
        code: `<p className="text-sm text-default">
  Run <code className="px-1.5 py-0.5 bg-surface-hover rounded text-sm font-mono text-default">npm install</code> to install dependencies.
</p>`,
        preview: "inline"
      }
    ],
    relatedComponents: ["Card"]
  },

  // ============ NAVIGATION ============
  {
    name: "Tabs",
    slug: "tabs",
    description: "Tabbed navigation for switching between views.",
    category: "Navigation",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "items", type: "Array<{ label: string; value: string; disabled?: boolean }>", required: true, description: "Tab items" },
      { name: "value", type: "string", required: true, description: "Active tab value" },
      { name: "variant", type: "'default' | 'pills' | 'underline'", required: false, default: "'default'", description: "Tab style variant" }
    ],
    examples: [
      {
        title: "Pills",
        code: `<div className="inline-flex bg-surface-hover rounded-lg p-1">
  <button className="px-4 py-2 text-sm font-medium bg-surface-raised text-default rounded-md shadow-sm">Overview</button>
  <button className="px-4 py-2 text-sm font-medium text-muted hover:text-default transition-colors">Analytics</button>
  <button className="px-4 py-2 text-sm font-medium text-muted hover:text-default transition-colors">Settings</button>
</div>`,
        preview: "pills"
      },
      {
        title: "Underline",
        code: `<div className="border-b border-default">
  <nav className="flex gap-8">
    <button className="py-3 text-sm font-medium text-default border-b-2 border-primary">Overview</button>
    <button className="py-3 text-sm font-medium text-muted hover:text-default border-b-2 border-transparent">Analytics</button>
    <button className="py-3 text-sm font-medium text-muted hover:text-default border-b-2 border-transparent">Settings</button>
  </nav>
</div>`,
        preview: "underline"
      },
    ],
    relatedComponents: ["Breadcrumb", "Sidebar"]
  },
  {
    name: "Breadcrumb",
    slug: "breadcrumb",
    description: "Navigation breadcrumbs showing page hierarchy.",
    category: "Navigation",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "items", type: "Array<{ label: string; href?: string }>", required: true, description: "Breadcrumb items" },
      { name: "separator", type: "ReactNode", required: false, default: "'/'", description: "Item separator" }
    ],
    examples: [
      {
        title: "Default",
        code: `<nav className="flex items-center gap-2 text-sm">
  <a href="#" className="text-muted hover:text-default transition-colors">Home</a>
  <span className="text-subtle">/</span>
  <a href="#" className="text-muted hover:text-default transition-colors">Products</a>
  <span className="text-subtle">/</span>
  <span className="text-default font-medium">Headphones</span>
</nav>`,
        preview: "default"
      }
    ],
    relatedComponents: ["Tabs", "Pagination"]
  },
  {
    name: "Pagination",
    slug: "pagination",
    description: "Navigation for paginated content.",
    category: "Navigation",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "currentPage", type: "number", required: true, description: "Current page number" },
      { name: "totalPages", type: "number", required: true, description: "Total number of pages" },
      { name: "onPageChange", type: "(page: number) => void", required: true, description: "Page change handler" }
    ],
    examples: [
      {
        title: "Default",
        code: `<nav className="flex items-center gap-1">
  <button className="w-9 h-9 flex items-center justify-center rounded-lg text-subtle hover:bg-surface-hover disabled:opacity-50" disabled>
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
  </button>
  <button className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium bg-primary text-primary-foreground">1</button>
  <button className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium text-muted hover:bg-surface-hover">2</button>
  <button className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium text-muted hover:bg-surface-hover">3</button>
  <span className="w-9 h-9 flex items-center justify-center text-subtle">...</span>
  <button className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium text-muted hover:bg-surface-hover">10</button>
  <button className="w-9 h-9 flex items-center justify-center rounded-lg text-muted hover:bg-surface-hover">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
  </button>
</nav>`,
        preview: "default"
      }
    ],
    relatedComponents: ["Table", "Breadcrumb"]
  },
  {
    name: "Sidebar",
    slug: "sidebar",
    description: "Vertical navigation sidebar with sections and items.",
    category: "Navigation",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "items", type: "Array<{ label: string; href: string; icon?: ReactNode; active?: boolean }>", required: true, description: "Navigation items" },
      { name: "collapsed", type: "boolean", required: false, default: "false", description: "Collapsed state" }
    ],
    examples: [
      {
        title: "Default",
        code: `<aside className="w-64 bg-surface-raised border-r border-default h-screen">
  <div className="p-4 border-b border-default">
    <span className="font-semibold text-default">Dashboard</span>
  </div>
  <nav className="p-2 space-y-1">
    <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-default bg-surface-hover rounded-lg">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
      Home
    </a>
    <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted hover:bg-surface-hover rounded-lg">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
      Analytics
    </a>
    <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted hover:bg-surface-hover rounded-lg">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      Users
    </a>
  </nav>
</aside>`,
        preview: "default"
      }
    ],
    relatedComponents: ["Tabs"]
  },

  // ============ FEEDBACK ============
  {
    name: "Alert",
    slug: "alert",
    description: "Contextual feedback messages for user actions.",
    category: "Feedback",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    overview: {
      introduction: "Alerts provide contextual feedback messages for typical user actions with semantic variants.",
      whenToUse: [
        "To display important information",
        "To show success, warning, or error messages",
        "When the user needs to be aware of something"
      ]
    },
    specs: {
      variants: [
        { name: "Info", classes: "bg-info border border-info-border text-info-foreground" },
        { name: "Success", classes: "bg-success border border-success-border text-success-foreground" },
        { name: "Warning", classes: "bg-warning border border-warning-border text-warning-foreground" },
        { name: "Error", classes: "bg-error border border-error-border text-error-foreground" }
      ]
    },
    examples: [
      {
        title: "Variants",
        code: `<!-- Info -->
<div className="p-4 bg-info border border-info-border rounded-lg">
  <div className="flex gap-3">
    <svg className="w-5 h-5 text-info-emphasis shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <div>
      <p className="text-sm font-medium text-info-foreground">Information</p>
      <p className="mt-1 text-sm text-info-foreground">A new software update is available.</p>
    </div>
  </div>
</div>

<!-- Success -->
<div className="p-4 bg-success border border-success-border rounded-lg">
  <div className="flex gap-3">
    <svg className="w-5 h-5 text-success-emphasis shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <div>
      <p className="text-sm font-medium text-success-foreground">Success</p>
      <p className="mt-1 text-sm text-success-foreground">Your changes have been saved.</p>
    </div>
  </div>
</div>

<!-- Warning -->
<div className="p-4 bg-warning border border-warning-border rounded-lg">
  <div className="flex gap-3">
    <svg className="w-5 h-5 text-warning-emphasis shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <div>
      <p className="text-sm font-medium text-warning-foreground">Warning</p>
      <p className="mt-1 text-sm text-warning-foreground">Your trial expires in 3 days.</p>
    </div>
  </div>
</div>

<!-- Error -->
<div className="p-4 bg-error border border-error-border rounded-lg">
  <div className="flex gap-3">
    <svg className="w-5 h-5 text-error-emphasis shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <div>
      <p className="text-sm font-medium text-error-foreground">Error</p>
      <p className="mt-1 text-sm text-error-foreground">There was an error processing your request.</p>
    </div>
  </div>
</div>`,
        preview: "variants"
      }
    ],
    relatedComponents: ["Toast", "Badge"]
  },
  {
    name: "Toast",
    slug: "toast",
    description: "Brief notification messages that auto-dismiss.",
    category: "Feedback",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "variant", type: "'default' | 'success' | 'error'", required: false, default: "'default'", description: "Toast variant" },
      { name: "title", type: "string", required: true, description: "Toast title" },
      { name: "description", type: "string", required: false, description: "Toast description" },
      { name: "duration", type: "number", required: false, default: "5000", description: "Auto-dismiss duration (ms)" }
    ],
    examples: [
      {
        title: "Variants",
        code: `<!-- Default -->
<div className="max-w-sm p-4 bg-surface-raised border border-default rounded-xl shadow-lg dark:shadow-black/50">
  <div className="flex items-start gap-3">
    <div className="flex-1">
      <p className="text-sm font-medium text-default">Scheduled: Meeting</p>
      <p className="mt-1 text-sm text-muted">Friday, February 10 at 5:57 PM</p>
    </div>
    <button className="text-subtle hover:text-default">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
  </div>
</div>

<!-- Success -->
<div className="max-w-sm p-4 bg-surface-raised border border-default rounded-xl shadow-lg dark:shadow-black/50">
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
      <svg className="w-4 h-4 text-success-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
    </div>
    <p className="text-sm font-medium text-default">Successfully saved!</p>
  </div>
</div>`,
        preview: "variants"
      }
    ],
    relatedComponents: ["Alert"]
  },
  {
    name: "Progress",
    slug: "progress",
    description: "Visual indicator for task completion progress.",
    category: "Feedback",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "value", type: "number", required: true, description: "Progress value (0-100)" },
      { name: "size", type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: "Progress bar height" },
      { name: "showLabel", type: "boolean", required: false, default: "false", description: "Show percentage label" }
    ],
    examples: [
      {
        title: "Default",
        code: `<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span className="text-default">Progress</span>
    <span className="text-muted">75%</span>
  </div>
  <div className="h-2 bg-surface-hover rounded-full overflow-hidden">
    <div className="h-full bg-primary rounded-full transition-all duration-300" style="width: 75%"></div>
  </div>
</div>`,
        preview: "default"
      },
      {
        title: "Sizes",
        code: `<div className="h-1 bg-surface-hover rounded-full overflow-hidden">
  <div className="h-full bg-primary rounded-full" style="width: 60%"></div>
</div>
<div className="h-2 bg-surface-hover rounded-full overflow-hidden">
  <div className="h-full bg-primary rounded-full" style="width: 60%"></div>
</div>
<div className="h-3 bg-surface-hover rounded-full overflow-hidden">
  <div className="h-full bg-primary rounded-full" style="width: 60%"></div>
</div>`,
        preview: "sizes"
      }
    ],
    relatedComponents: ["Spinner", "Skeleton"]
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    description: "Placeholder loading state for content.",
    category: "Feedback",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "variant", type: "'text' | 'circular' | 'rectangular'", required: false, default: "'text'", description: "Skeleton shape" },
      { name: "width", type: "string | number", required: false, description: "Custom width" },
      { name: "height", type: "string | number", required: false, description: "Custom height" }
    ],
    examples: [
      {
        title: "Content Loading",
        code: `<div className="space-y-4">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-surface-hover rounded-full animate-pulse"></div>
    <div className="space-y-2">
      <div className="h-4 w-32 bg-surface-hover rounded animate-pulse"></div>
      <div className="h-3 w-24 bg-surface-hover rounded animate-pulse"></div>
    </div>
  </div>
  <div className="space-y-2">
    <div className="h-4 w-full bg-surface-hover rounded animate-pulse"></div>
    <div className="h-4 w-full bg-surface-hover rounded animate-pulse"></div>
    <div className="h-4 w-3/4 bg-surface-hover rounded animate-pulse"></div>
  </div>
</div>`,
        preview: "content"
      },
      {
        title: "Card Loading",
        code: `<div className="p-6 bg-surface-raised border border-default rounded-xl">
  <div className="h-40 bg-surface-hover rounded-lg animate-pulse"></div>
  <div className="mt-4 space-y-2">
    <div className="h-5 w-2/3 bg-surface-hover rounded animate-pulse"></div>
    <div className="h-4 w-full bg-surface-hover rounded animate-pulse"></div>
    <div className="h-4 w-1/2 bg-surface-hover rounded animate-pulse"></div>
  </div>
</div>`,
        preview: "card"
      }
    ],
    relatedComponents: ["Spinner", "Progress"]
  },
  {
    name: "Spinner",
    slug: "spinner",
    description: "Loading indicator with smooth animation.",
    category: "Feedback",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "size", type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: "Spinner size" },
      { name: "color", type: "string", required: false, default: "'currentColor'", description: "Spinner color" }
    ],
    examples: [
      {
        title: "Sizes",
        code: `<svg className="w-4 h-4 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
</svg>

<svg className="w-6 h-6 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
</svg>

<svg className="w-8 h-8 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
</svg>`,
        preview: "sizes"
      }
    ],
    relatedComponents: ["Skeleton", "Progress", "Button"]
  },

  // ============ OVERLAY ============
  {
    name: "Modal",
    slug: "modal",
    description: "Dialog overlay for focused user interactions.",
    category: "Overlays",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    overview: {
      introduction: "Modals focus user attention on a single task or piece of information, blocking interaction with the rest of the page.",
      whenToUse: [
        "For critical confirmations",
        "For forms that need focus",
        "For important notices that require acknowledgment"
      ]
    },
    guidelines: {
      dos: [
        "Use clear action buttons",
        "Provide a way to close the modal",
        "Keep content focused and minimal"
      ],
      donts: [
        "Don't nest modals within modals",
        "Don't use for minor interactions",
        "Don't make modals too large"
      ],
      accessibility: [
        "Trap focus within the modal",
        "Close on Escape key press",
        "Return focus to trigger on close"
      ]
    },
    props: [
      { name: "open", type: "boolean", required: true, description: "Open state" },
      { name: "onClose", type: "() => void", required: true, description: "Close handler" },
      { name: "title", type: "string", required: false, description: "Modal title" },
      { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", required: false, default: "'md'", description: "Modal width" }
    ],
    examples: [
      {
        title: "Default",
        code: `<!-- Backdrop -->
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>

<!-- Modal -->
<div className="fixed inset-0 flex items-center justify-center p-4">
  <div className="w-full max-w-md bg-surface-raised rounded-2xl shadow-xl dark:shadow-black/50">
    <div className="flex items-center justify-between px-6 py-4 border-b border-default">
      <h2 className="text-lg font-semibold text-default">Modal Title</h2>
      <button className="text-subtle hover:text-default">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
    <div className="px-6 py-4">
      <p className="text-sm text-muted">Modal content goes here. You can put any content inside.</p>
    </div>
    <div className="flex justify-end gap-3 px-6 py-4 border-t border-default">
      <button className="h-10 px-4 text-sm font-medium text-muted hover:bg-surface-hover rounded-lg">Cancel</button>
      <button className="h-10 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover">Confirm</button>
    </div>
  </div>
</div>`,
        preview: "default"
      },
      {
        title: "Confirmation",
        code: `<div className="w-full max-w-sm bg-surface-raised rounded-2xl shadow-xl dark:shadow-black/50 p-6 text-center">
  <div className="w-12 h-12 bg-error rounded-full flex items-center justify-center mx-auto">
    <svg className="w-6 h-6 text-error-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  </div>
  <h3 className="mt-4 text-lg font-semibold text-default">Delete item?</h3>
  <p className="mt-2 text-sm text-muted">This action cannot be undone. This will permanently delete the item.</p>
  <div className="mt-6 flex gap-3">
    <button className="flex-1 h-10 px-4 text-sm font-medium text-muted border border-default rounded-lg hover:bg-surface-hover">Cancel</button>
    <button className="flex-1 h-10 px-4 bg-error-emphasis text-white rounded-lg text-sm font-medium hover:opacity-90">Delete</button>
  </div>
</div>`,
        preview: "confirmation"
      },
    ],
    relatedComponents: ["Dropdown", "Alert"]
  },
  {
    name: "Dropdown",
    slug: "dropdown",
    description: "Floating menu for actions or navigation.",
    category: "Overlays",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "trigger", type: "ReactNode", required: true, description: "Trigger element" },
      { name: "items", type: "Array<{ label: string; onClick: () => void; icon?: ReactNode; danger?: boolean }>", required: true, description: "Menu items" },
      { name: "align", type: "'start' | 'end'", required: false, default: "'start'", description: "Menu alignment" }
    ],
    examples: [
      {
        title: "Default",
        code: `<div className="relative inline-block">
  <button className="h-10 px-4 bg-surface-raised border border-default rounded-lg text-sm font-medium text-default hover:bg-surface-hover inline-flex items-center gap-2">
    Options
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
  </button>

  <!-- Dropdown Menu -->
  <div className="absolute top-full left-0 mt-1 w-48 bg-surface-raised border border-default rounded-xl shadow-lg dark:shadow-black/50 py-1 z-10">
    <button className="w-full px-4 py-2 text-left text-sm text-default hover:bg-surface-hover flex items-center gap-3">
      <svg className="w-4 h-4 text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
      Edit
    </button>
    <button className="w-full px-4 py-2 text-left text-sm text-default hover:bg-surface-hover flex items-center gap-3">
      <svg className="w-4 h-4 text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
      Duplicate
    </button>
    <div className="my-1 border-t border-default"></div>
    <button className="w-full px-4 py-2 text-left text-sm text-error-foreground hover:bg-error flex items-center gap-3">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
      Delete
    </button>
  </div>
</div>`,
        preview: "default"
      },
    ],
    relatedComponents: ["Modal", "Tooltip", "Select"]
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    description: "Contextual information on hover.",
    category: "Overlays",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "content", type: "string | ReactNode", required: true, description: "Tooltip content" },
      { name: "position", type: "'top' | 'bottom' | 'left' | 'right'", required: false, default: "'top'", description: "Tooltip position" },
      { name: "delay", type: "number", required: false, default: "200", description: "Show delay (ms)" }
    ],
    examples: [
      {
        title: "Positions",
        code: `<!-- Top (default) -->
<div className="relative inline-block group">
  <button className="px-4 py-2 bg-surface-hover rounded-lg text-sm text-default">Hover me</button>
  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-primary text-primary-foreground text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
    Tooltip text
    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary"></div>
  </div>
</div>`,
        preview: "positions"
      }
    ],
    relatedComponents: ["Dropdown"]
  },

  // ============ LAYOUT ============
  {
    name: "Divider",
    slug: "divider",
    description: "Visual separator between content sections.",
    category: "Layout",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "orientation", type: "'horizontal' | 'vertical'", required: false, default: "'horizontal'", description: "Divider orientation" },
      { name: "label", type: "string", required: false, description: "Optional center label" }
    ],
    examples: [
      {
        title: "Default",
        code: `<hr className="border-default" />`,
        preview: "default"
      },
      {
        title: "With Label",
        code: `<div className="flex items-center gap-4">
  <hr className="flex-1 border-default" />
  <span className="text-sm text-muted">or</span>
  <hr className="flex-1 border-default" />
</div>`,
        preview: "with-label"
      },
      {
        title: "Vertical",
        code: `<div className="flex items-center gap-4 h-8">
  <span className="text-sm text-default">Item 1</span>
  <div className="w-px h-full bg-surface-hover"></div>
  <span className="text-sm text-default">Item 2</span>
  <div className="w-px h-full bg-surface-hover"></div>
  <span className="text-sm text-default">Item 3</span>
</div>`,
        preview: "vertical"
      }
    ],
    relatedComponents: ["Container"]
  },
  {
    name: "Container",
    slug: "container",
    description: "Responsive container for page content.",
    category: "Layout",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "size", type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", required: false, default: "'lg'", description: "Max width" },
      { name: "padding", type: "boolean", required: false, default: "true", description: "Horizontal padding" }
    ],
    examples: [
      {
        title: "Sizes",
        code: `<!-- Small (640px) -->
<div className="max-w-screen-sm mx-auto px-4">Content</div>

<!-- Medium (768px) -->
<div className="max-w-screen-md mx-auto px-4">Content</div>

<!-- Large (1024px) -->
<div className="max-w-screen-lg mx-auto px-4">Content</div>

<!-- XL (1280px) -->
<div className="max-w-screen-xl mx-auto px-4">Content</div>

<!-- Full -->
<div className="w-full px-4">Content</div>`,
        preview: "sizes"
      }
    ],
    relatedComponents: ["Card", "Divider"]
  },

  // ============ AI ============
  {
    name: "Typing Indicator",
    slug: "typing-indicator",
    description: "Animated indicator showing the AI assistant is generating a response.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "variant", type: "'dots' | 'text' | 'skeleton'", required: false, default: "'dots'", description: "Indicator style" },
      { name: "label", type: "string", required: false, description: "Optional text label (e.g., 'Claude is thinking...')" }
    ],
    examples: [
      {
        title: "Dots",
        code: `<div className="flex items-start gap-3">
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium shrink-0">AI</div>
  <div className="px-4 py-3 bg-surface-raised border border-default rounded-2xl rounded-bl-md">
    <div className="flex items-center gap-1">
      <span className="w-2 h-2 bg-text-subtle rounded-full animate-bounce" style="animation-delay: 0ms"></span>
      <span className="w-2 h-2 bg-text-subtle rounded-full animate-bounce" style="animation-delay: 150ms"></span>
      <span className="w-2 h-2 bg-text-subtle rounded-full animate-bounce" style="animation-delay: 300ms"></span>
    </div>
  </div>
</div>`,
        preview: "dots"
      },
      {
        title: "With Text",
        code: `<div className="flex items-start gap-3">
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium shrink-0">AI</div>
  <div className="px-4 py-3 bg-surface-raised border border-default rounded-2xl rounded-bl-md">
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted">Thinking</span>
      <div className="flex items-center gap-1">
        <span className="w-1.5 h-1.5 bg-text-subtle rounded-full animate-bounce" style="animation-delay: 0ms"></span>
        <span className="w-1.5 h-1.5 bg-text-subtle rounded-full animate-bounce" style="animation-delay: 150ms"></span>
        <span className="w-1.5 h-1.5 bg-text-subtle rounded-full animate-bounce" style="animation-delay: 300ms"></span>
      </div>
    </div>
  </div>
</div>`,
        preview: "with-text"
      },
      {
        title: "Skeleton",
        code: `<div className="flex items-start gap-3">
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium shrink-0">AI</div>
  <div className="px-4 py-3 bg-surface-raised border border-default rounded-2xl rounded-bl-md space-y-2 min-w-[200px]">
    <div className="h-3 w-full bg-surface-hover rounded animate-pulse"></div>
    <div className="h-3 w-3/4 bg-surface-hover rounded animate-pulse"></div>
  </div>
</div>`,
        preview: "skeleton"
      }
    ],
    relatedComponents: ["ChatMessage", "Avatar", "Skeleton"]
  },
  {
    name: "File Attachment",
    slug: "file-attachment",
    description: "Display attached files with preview, upload progress, and status indicators.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "filename", type: "string", required: true, description: "File name to display" },
      { name: "size", type: "number", required: false, description: "File size in bytes" },
      { name: "status", type: "'uploading' | 'complete' | 'error'", required: false, default: "'complete'", description: "Upload status" },
      { name: "progress", type: "number", required: false, description: "Upload progress (0-100)" },
      { name: "previewUrl", type: "string", required: false, description: "Image preview URL" },
      { name: "removable", type: "boolean", required: false, default: "true", description: "Show remove button" },
      { name: "onRemove", type: "() => void", required: false, description: "Remove button click handler" }
    ],
    examples: [
      {
        title: "Complete",
        code: `<div className="inline-flex items-center gap-3 px-3 py-2 bg-surface-hover border border-default rounded-lg max-w-xs">
  <div className="w-10 h-10 bg-info rounded-lg flex items-center justify-center shrink-0">
    <svg className="w-5 h-5 text-info-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
  </div>
  <div className="flex-1 min-w-0">
    <p className="text-sm font-medium text-default truncate">document.pdf</p>
    <p className="text-xs text-muted">245 KB</p>
  </div>
  <button className="p-1 text-subtle hover:text-default hover:bg-surface-hover rounded transition-colors" aria-label="Remove">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
  </button>
</div>`,
        preview: "complete"
      },
      {
        title: "Uploading",
        code: `<div className="inline-flex items-center gap-3 px-3 py-2 bg-surface-hover border border-default rounded-lg max-w-xs">
  <div className="w-10 h-10 bg-surface-raised border border-default rounded-lg flex items-center justify-center shrink-0">
    <svg className="w-5 h-5 text-muted animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  </div>
  <div className="flex-1 min-w-0">
    <p className="text-sm font-medium text-default truncate">image.png</p>
    <div className="mt-1 h-1.5 bg-surface-raised rounded-full overflow-hidden">
      <div className="h-full bg-primary rounded-full transition-all" style="width: 65%"></div>
    </div>
  </div>
  <button className="p-1 text-subtle hover:text-default hover:bg-surface-hover rounded transition-colors" aria-label="Cancel">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
  </button>
</div>`,
        preview: "uploading"
      },
      {
        title: "Image Preview",
        code: `<div className="inline-flex items-center gap-3 px-3 py-2 bg-surface-hover border border-default rounded-lg max-w-xs">
  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-surface-raised">
    <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500"></div>
  </div>
  <div className="flex-1 min-w-0">
    <p className="text-sm font-medium text-default truncate">screenshot.png</p>
    <p className="text-xs text-muted">1.2 MB</p>
  </div>
  <button className="p-1 text-subtle hover:text-default hover:bg-surface-hover rounded transition-colors" aria-label="Remove">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
  </button>
</div>`,
        preview: "image-preview"
      }
    ],
    relatedComponents: ["MessageInput", "ChatMessage", "Progress", "Badge"]
  },
  {
    name: "AI Code Block",
    slug: "ai-code-block",
    description: "Syntax-highlighted code block optimized for AI chat with copy button, language indicator, and streaming support.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "code", type: "string", required: true, description: "Code content to display" },
      { name: "language", type: "string", required: false, default: "'plaintext'", description: "Programming language for syntax highlighting" },
      { name: "filename", type: "string", required: false, description: "Optional filename to display in header" },
      { name: "copyable", type: "boolean", required: false, default: "true", description: "Show copy button" }
    ],
    examples: [
      {
        title: "Default",
        code: `<div className="bg-gray-950 rounded-xl overflow-hidden">
  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
    <span className="text-xs text-gray-500">typescript</span>
    <button className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
      Copy
    </button>
  </div>
  <pre className="p-4 text-sm text-gray-300 overflow-x-auto font-mono"><code>function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));</code></pre>
</div>`,
        preview: "default"
      },
      {
        title: "With Filename",
        code: `<div className="bg-gray-950 rounded-xl overflow-hidden">
  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
    <div className="flex items-center gap-2">
      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
      <span className="text-xs text-gray-500">utils/helpers.ts</span>
    </div>
    <button className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
      Copy
    </button>
  </div>
  <pre className="p-4 text-sm text-gray-300 overflow-x-auto font-mono"><code>export const formatDate = (date: Date) => {
  return date.toLocaleDateString();
};</code></pre>
</div>`,
        preview: "with-filename"
      },
      {
        title: "Copied State",
        code: `<div className="bg-gray-950 rounded-xl overflow-hidden">
  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
    <span className="text-xs text-gray-500">javascript</span>
    <span className="inline-flex items-center gap-1.5 text-xs text-success-emphasis">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      Copied!
    </span>
  </div>
  <pre className="p-4 text-sm text-gray-300 overflow-x-auto font-mono"><code>const data = await fetch('/api/data');</code></pre>
</div>`,
        preview: "copied"
      }
    ],
    relatedComponents: ["ChatMessage", "ArtifactPanel", "MessageActions", "CodeBlock"]
  },
  {
    name: "Message Actions",
    slug: "message-actions",
    description: "Action buttons for chat messages including copy, regenerate, edit, and feedback.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "role", type: "'user' | 'assistant'", required: true, description: "Message role determines available actions" },
      { name: "onCopy", type: "() => void", required: false, description: "Copy button click handler" },
      { name: "onRegenerate", type: "() => void", required: false, description: "Regenerate button click handler (assistant only)" },
      { name: "onEdit", type: "() => void", required: false, description: "Edit button click handler (user only)" },
      { name: "onFeedback", type: "(type: 'positive' | 'negative') => void", required: false, description: "Feedback button click handler" },
      { name: "feedbackState", type: "'none' | 'positive' | 'negative'", required: false, default: "'none'", description: "Current feedback state" }
    ],
    examples: [
      {
        title: "Assistant Actions",
        code: `<div className="flex items-center gap-1">
  <button className="p-1.5 text-subtle hover:text-default hover:bg-surface-hover rounded-md transition-colors" aria-label="Copy">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
  </button>
  <button className="p-1.5 text-subtle hover:text-default hover:bg-surface-hover rounded-md transition-colors" aria-label="Regenerate">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
  </button>
  <div className="w-px h-4 bg-surface-hover mx-1"></div>
  <button className="p-1.5 text-subtle hover:text-success-emphasis hover:bg-success rounded-md transition-colors" aria-label="Good response">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
  </button>
  <button className="p-1.5 text-subtle hover:text-error-emphasis hover:bg-error rounded-md transition-colors" aria-label="Bad response">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" /></svg>
  </button>
</div>`,
        preview: "assistant"
      },
      {
        title: "User Actions",
        code: `<div className="flex items-center gap-1">
  <button className="p-1.5 text-subtle hover:text-default hover:bg-surface-hover rounded-md transition-colors" aria-label="Copy">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
  </button>
  <button className="p-1.5 text-subtle hover:text-default hover:bg-surface-hover rounded-md transition-colors" aria-label="Edit">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
  </button>
</div>`,
        preview: "user"
      },
      {
        title: "With Feedback Given",
        code: `<div className="flex items-center gap-1">
  <button className="p-1.5 text-subtle hover:text-default hover:bg-surface-hover rounded-md transition-colors" aria-label="Copy">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
  </button>
  <button className="p-1.5 text-subtle hover:text-default hover:bg-surface-hover rounded-md transition-colors" aria-label="Regenerate">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
  </button>
  <div className="w-px h-4 bg-surface-hover mx-1"></div>
  <button className="p-1.5 bg-success text-success-emphasis rounded-md" aria-label="Good response">
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
  </button>
  <button className="p-1.5 text-subtle hover:text-error-emphasis hover:bg-error rounded-md transition-colors" aria-label="Bad response">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" /></svg>
  </button>
</div>`,
        preview: "feedback-given"
      }
    ],
    relatedComponents: ["ChatMessage", "IconButton", "Dropdown", "Tooltip"]
  },
  {
    name: "Chat Message",
    slug: "chat-message",
    description: "Individual message bubble for AI chat interfaces with support for user and assistant roles.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "role", type: "'user' | 'assistant'", required: true, description: "Message sender role" },
      { name: "content", type: "string", required: true, description: "Message content (supports markdown)" },
      { name: "avatar", type: "ReactNode | string", required: false, description: "Avatar element or image URL" },
      { name: "timestamp", type: "string", required: false, description: "Message timestamp" }
    ],
    examples: [
      {
        title: "User Message",
        code: `<div className="flex justify-end">
  <div className="max-w-[80%] flex flex-col items-end gap-1">
    <div className="px-4 py-3 bg-primary text-primary-foreground rounded-2xl rounded-br-md">
      <p className="text-sm">Can you help me write a function to sort an array?</p>
    </div>
    <span className="text-xs text-subtle px-2">2:34 PM</span>
  </div>
</div>`,
        preview: "user"
      },
      {
        title: "Assistant Message",
        code: `<div className="flex items-start gap-3">
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium shrink-0">AI</div>
  <div className="max-w-[80%] flex flex-col gap-1">
    <div className="px-4 py-3 bg-surface-raised border border-default rounded-2xl rounded-bl-md">
      <p className="text-sm text-default">Sure! Here's a simple function to sort an array in JavaScript:</p>
    </div>
    <div className="flex items-center gap-2 px-2">
      <span className="text-xs text-subtle">2:34 PM</span>
      <div className="flex items-center gap-1">
        <button className="p-1 text-subtle hover:text-default rounded" aria-label="Copy">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
        </button>
        <button className="p-1 text-subtle hover:text-default rounded" aria-label="Regenerate">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </button>
      </div>
    </div>
  </div>
</div>`,
        preview: "assistant"
      },
      {
        title: "With Code Block",
        code: `<div className="flex items-start gap-3">
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium shrink-0">AI</div>
  <div className="max-w-[80%] flex flex-col gap-2">
    <div className="px-4 py-3 bg-surface-raised border border-default rounded-2xl rounded-bl-md">
      <p className="text-sm text-default mb-3">Here's the sorting function:</p>
      <div className="bg-gray-950 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-800">
          <span className="text-xs text-gray-500">javascript</span>
          <button className="text-xs text-gray-500 hover:text-white">Copy</button>
        </div>
        <pre className="p-3 text-sm text-gray-300 font-mono"><code>function sortArray(arr) {
  return arr.sort((a, b) => a - b);
}</code></pre>
      </div>
    </div>
  </div>
</div>`,
        preview: "with-code"
      }
    ],
    relatedComponents: ["AICodeBlock", "FileAttachment", "MessageActions", "TypingIndicator", "Avatar"]
  },
  {
    name: "Message Input",
    slug: "message-input",
    description: "Compose and send messages with auto-resizing textarea, attachments, and send button.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "value", type: "string", required: false, description: "Controlled input value" },
      { name: "placeholder", type: "string", required: false, default: "'Send a message...'", description: "Placeholder text" },
      { name: "disabled", type: "boolean", required: false, default: "false", description: "Disable input" },
      { name: "loading", type: "boolean", required: false, default: "false", description: "Show loading state on send" },
      { name: "onSend", type: "(content: string) => void", required: false, description: "Send button click handler" },
      { name: "onChange", type: "(value: string) => void", required: false, description: "Input change handler" },
      { name: "onAttach", type: "() => void", required: false, description: "Attachment button click handler" }
    ],
    examples: [
      {
        title: "Default",
        code: `<div className="bg-surface-raised border border-default rounded-xl p-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-shadow">
  <div className="flex items-end gap-2">
    <button className="p-2 text-subtle hover:text-default hover:bg-surface-hover rounded-lg transition-colors shrink-0" aria-label="Attach file">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
    </button>
    <textarea
      placeholder="Send a message..."
      rows="1"
      className="flex-1 bg-transparent text-sm text-default placeholder:text-subtle resize-none focus:outline-none py-2"
    ></textarea>
    <button className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors shrink-0" aria-label="Send">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
    </button>
  </div>
</div>`,
        preview: "default"
      },
      {
        title: "With Attachments",
        code: `<div className="bg-surface-raised border border-default rounded-xl p-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-shadow">
  <div className="flex gap-2 mb-2 px-2">
    <div className="inline-flex items-center gap-2 px-2 py-1 bg-surface-hover border border-default rounded-lg">
      <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
      <span className="text-xs text-default">document.pdf</span>
      <button className="text-subtle hover:text-default" aria-label="Remove">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  </div>
  <div className="flex items-end gap-2">
    <button className="p-2 text-subtle hover:text-default hover:bg-surface-hover rounded-lg transition-colors shrink-0" aria-label="Attach file">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
    </button>
    <textarea
      placeholder="Send a message..."
      rows="1"
      className="flex-1 bg-transparent text-sm text-default placeholder:text-subtle resize-none focus:outline-none py-2"
    >Analyze this document for key insights</textarea>
    <button className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors shrink-0" aria-label="Send">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
    </button>
  </div>
</div>`,
        preview: "with-attachments"
      },
      {
        title: "Loading",
        code: `<div className="bg-surface-raised border border-default rounded-xl p-2">
  <div className="flex items-end gap-2">
    <button className="p-2 text-subtle rounded-lg shrink-0 opacity-50 cursor-not-allowed" aria-label="Attach file" disabled>
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
    </button>
    <textarea
      placeholder="Send a message..."
      rows="1"
      disabled
      className="flex-1 bg-transparent text-sm text-muted placeholder:text-subtle resize-none focus:outline-none py-2 cursor-not-allowed"
    ></textarea>
    <button className="p-2 bg-primary text-primary-foreground rounded-lg shrink-0 opacity-70 cursor-not-allowed" disabled aria-label="Sending">
      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    </button>
  </div>
</div>`,
        preview: "loading"
      }
    ],
    relatedComponents: ["FileAttachment", "ChatMessage", "Button", "Textarea"]
  },
  {
    name: "Conversation List",
    slug: "conversation-list",
    description: "Sidebar list of conversation threads with active state, previews, and timestamps.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "conversations", type: "Array<{ id: string; title: string; preview?: string; timestamp?: string }>", required: true, description: "Array of conversation items" },
      { name: "activeId", type: "string", required: false, description: "Currently active conversation ID" },
      { name: "onSelect", type: "(id: string) => void", required: true, description: "Conversation click handler" },
      { name: "variant", type: "'default' | 'compact'", required: false, default: "'default'", description: "List density" }
    ],
    examples: [
      {
        title: "Default",
        code: `<div className="w-72 bg-surface-raised border-r border-default h-full">
  <div className="p-4 border-b border-default">
    <button className="w-full h-10 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center justify-center gap-2">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
      New chat
    </button>
  </div>
  <nav className="p-2 space-y-1">
    <button className="w-full text-left px-3 py-3 bg-surface-hover rounded-lg">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-default truncate">React component help</span>
        <span className="text-xs text-subtle shrink-0 ml-2">2m</span>
      </div>
      <p className="text-xs text-muted truncate">Can you help me write a function to...</p>
    </button>
    <button className="w-full text-left px-3 py-3 hover:bg-surface-hover rounded-lg transition-colors">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-default truncate">API design review</span>
        <span className="text-xs text-subtle shrink-0 ml-2">1h</span>
      </div>
      <p className="text-xs text-muted truncate">I'd like you to review this REST API...</p>
    </button>
    <button className="w-full text-left px-3 py-3 hover:bg-surface-hover rounded-lg transition-colors">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-default truncate">Database optimization</span>
        <span className="text-xs text-subtle shrink-0 ml-2">2d</span>
      </div>
      <p className="text-xs text-muted truncate">My queries are running slowly...</p>
    </button>
  </nav>
</div>`,
        preview: "default"
      },
      {
        title: "Compact",
        code: `<div className="w-64 bg-surface-raised border-r border-default">
  <nav className="p-2 space-y-0.5">
    <button className="w-full text-left px-3 py-2 bg-surface-hover rounded-lg flex items-center justify-between">
      <span className="text-sm text-default truncate">React component help</span>
      <span className="text-xs text-subtle shrink-0 ml-2">2m</span>
    </button>
    <button className="w-full text-left px-3 py-2 hover:bg-surface-hover rounded-lg transition-colors flex items-center justify-between">
      <span className="text-sm text-default truncate">API design review</span>
      <span className="text-xs text-subtle shrink-0 ml-2">1h</span>
    </button>
    <button className="w-full text-left px-3 py-2 hover:bg-surface-hover rounded-lg transition-colors flex items-center justify-between">
      <span className="text-sm text-default truncate">Database optimization</span>
      <span className="text-xs text-subtle shrink-0 ml-2">2d</span>
    </button>
  </nav>
</div>`,
        preview: "compact"
      }
    ],
    relatedComponents: ["ChatMessage", "Avatar", "Badge", "Sidebar"]
  },
  {
    name: "Artifact Panel",
    slug: "artifact-panel",
    description: "Side panel for viewing and interacting with AI-generated artifacts like code, documents, and previews.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "open", type: "boolean", required: true, description: "Panel visibility" },
      { name: "onClose", type: "() => void", required: true, description: "Close button click handler" },
      { name: "title", type: "string", required: true, description: "Artifact title" },
      { name: "code", type: "string", required: false, description: "Code content" },
      { name: "language", type: "string", required: false, description: "Code language" },
      { name: "preview", type: "ReactNode", required: false, description: "Preview content" },
      { name: "onDownload", type: "() => void", required: false, description: "Download button click handler" },
      { name: "onCopy", type: "() => void", required: false, description: "Copy button click handler" }
    ],
    examples: [
      {
        title: "Code Artifact",
        code: `<div className="fixed right-0 top-0 h-full w-[500px] bg-surface-raised border-l border-default shadow-xl dark:shadow-black/50 flex flex-col">
  <div className="flex items-center justify-between px-4 py-3 border-b border-default bg-surface-sunken">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-info rounded-lg flex items-center justify-center">
        <svg className="w-4 h-4 text-info-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
      </div>
      <div>
        <h3 className="text-sm font-medium text-default">sortArray.ts</h3>
        <p className="text-xs text-muted">TypeScript</p>
      </div>
    </div>
    <div className="flex items-center gap-1">
      <button className="p-2 text-subtle hover:text-default hover:bg-surface-hover rounded-lg transition-colors" aria-label="Copy">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
      </button>
      <button className="p-2 text-subtle hover:text-default hover:bg-surface-hover rounded-lg transition-colors" aria-label="Download">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
      </button>
      <button className="p-2 text-subtle hover:text-default hover:bg-surface-hover rounded-lg transition-colors" aria-label="Close">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  </div>
  <div className="flex-1 overflow-auto bg-gray-950">
    <pre className="p-4 text-sm text-gray-300 font-mono"><code>function sortArray&lt;T&gt;(
  arr: T[],
  compareFn?: (a: T, b: T) =&gt; number
): T[] {
  return [...arr].sort(compareFn);
}

// Usage
const numbers = [3, 1, 4, 1, 5];
const sorted = sortArray(numbers);
console.log(sorted); // [1, 1, 3, 4, 5]</code></pre>
  </div>
</div>`,
        preview: "code"
      },
      {
        title: "With View Toggle",
        code: `<div className="fixed right-0 top-0 h-full w-[500px] bg-surface-raised border-l border-default shadow-xl dark:shadow-black/50 flex flex-col">
  <div className="flex items-center justify-between px-4 py-3 border-b border-default bg-surface-sunken">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
        <svg className="w-4 h-4 text-success-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
      </div>
      <h3 className="text-sm font-medium text-default">Interactive Chart</h3>
    </div>
    <button className="p-2 text-subtle hover:text-default hover:bg-surface-hover rounded-lg transition-colors" aria-label="Close">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
  </div>
  <div className="px-4 py-2 border-b border-default">
    <div className="inline-flex bg-surface-hover rounded-lg p-1">
      <button className="px-3 py-1.5 text-xs font-medium bg-surface-raised text-default rounded-md shadow-sm">Preview</button>
      <button className="px-3 py-1.5 text-xs font-medium text-muted hover:text-default transition-colors">Code</button>
    </div>
  </div>
  <div className="flex-1 overflow-auto p-4">
    <div className="w-full h-64 bg-surface-hover rounded-lg flex items-center justify-center text-muted text-sm">
      [Chart Preview]
    </div>
  </div>
</div>`,
        preview: "with-toggle"
      }
    ],
    relatedComponents: ["AICodeBlock", "ChatMessage", "Tabs", "Modal"]
  },
  {
    name: "Model Selector",
    slug: "model-selector",
    description: "Dropdown to switch between AI models with capability indicators.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "models", type: "Array<{ id: string; name: string; description?: string; capabilities?: string[] }>", required: true, description: "Available models" },
      { name: "value", type: "string", required: true, description: "Selected model ID" },
      { name: "onChange", type: "(modelId: string) => void", required: true, description: "Model change handler" }
    ],
    examples: [
      {
        title: "Default",
        code: `<div className="relative inline-block">
  <button className="h-10 px-4 bg-surface-raised border border-default rounded-lg text-sm font-medium text-default hover:bg-surface-hover inline-flex items-center gap-2 transition-colors">
    <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    Claude 3.5 Sonnet
    <svg className="w-4 h-4 text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
  </button>
</div>`,
        preview: "default"
      },
      {
        title: "Dropdown Open",
        code: `<div className="relative inline-block">
  <button className="h-10 px-4 bg-surface-raised border border-primary rounded-lg text-sm font-medium text-default inline-flex items-center gap-2 ring-2 ring-primary">
    <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    Claude 3.5 Sonnet
    <svg className="w-4 h-4 text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
  </button>
  <div className="absolute top-full left-0 mt-1 w-72 bg-surface-raised border border-default rounded-xl shadow-lg dark:shadow-black/50 py-1 z-10">
    <button className="w-full px-4 py-3 text-left hover:bg-surface-hover transition-colors bg-surface-hover">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-default">Claude 3.5 Sonnet</span>
        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
      </div>
      <p className="text-xs text-muted mt-0.5">Best for most tasks, fast and capable</p>
    </button>
    <button className="w-full px-4 py-3 text-left hover:bg-surface-hover transition-colors">
      <span className="text-sm font-medium text-default">Claude 3 Opus</span>
      <p className="text-xs text-muted mt-0.5">Most powerful, best for complex reasoning</p>
    </button>
    <button className="w-full px-4 py-3 text-left hover:bg-surface-hover transition-colors">
      <span className="text-sm font-medium text-default">Claude 3 Haiku</span>
      <p className="text-xs text-muted mt-0.5">Fastest, best for simple tasks</p>
    </button>
  </div>
</div>`,
        preview: "dropdown-open"
      }
    ],
    relatedComponents: ["Dropdown", "Select", "MessageInput"]
  },
  {
    name: "Token Counter",
    slug: "token-counter",
    description: "Display token usage and remaining capacity with visual progress indicator.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "used", type: "number", required: true, description: "Tokens used" },
      { name: "limit", type: "number", required: true, description: "Token limit" },
      { name: "variant", type: "'compact' | 'detailed'", required: false, default: "'compact'", description: "Display variant" }
    ],
    examples: [
      {
        title: "Compact",
        code: `<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-hover rounded-lg">
  <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
  <span className="text-xs text-muted">2,450 / 4,096 tokens</span>
</div>`,
        preview: "compact"
      },
      {
        title: "With Progress",
        code: `<div className="w-48 p-3 bg-surface-raised border border-default rounded-lg">
  <div className="flex items-center justify-between mb-2">
    <span className="text-xs font-medium text-default">Token Usage</span>
    <span className="text-xs text-muted">60%</span>
  </div>
  <div className="h-1.5 bg-surface-hover rounded-full overflow-hidden">
    <div className="h-full bg-primary rounded-full transition-all" style="width: 60%"></div>
  </div>
  <p className="text-xs text-muted mt-2">2,450 / 4,096 tokens</p>
</div>`,
        preview: "with-progress"
      },
      {
        title: "Warning State",
        code: `<div className="w-48 p-3 bg-surface-raised border border-warning-border rounded-lg">
  <div className="flex items-center justify-between mb-2">
    <span className="text-xs font-medium text-warning-foreground">Token Usage</span>
    <span className="text-xs text-warning-foreground">92%</span>
  </div>
  <div className="h-1.5 bg-surface-hover rounded-full overflow-hidden">
    <div className="h-full bg-warning-emphasis rounded-full transition-all" style="width: 92%"></div>
  </div>
  <p className="text-xs text-warning-foreground mt-2">3,768 / 4,096 tokens</p>
</div>`,
        preview: "warning"
      }
    ],
    relatedComponents: ["Progress", "Badge", "MessageInput"]
  },
  {
    name: "Regenerate Button",
    slug: "regenerate-button",
    description: "Button to retry generating an AI response with loading state.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "onClick", type: "() => void", required: true, description: "Click handler" },
      { name: "loading", type: "boolean", required: false, default: "false", description: "Loading state" },
      { name: "variant", type: "'icon' | 'text' | 'both'", required: false, default: "'icon'", description: "Display variant" }
    ],
    examples: [
      {
        title: "Icon Only",
        code: `<button className="p-2 text-subtle hover:text-default hover:bg-surface-hover rounded-lg transition-colors" aria-label="Regenerate response">
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
</button>`,
        preview: "icon"
      },
      {
        title: "With Text",
        code: `<button className="h-9 px-3 text-sm text-muted hover:text-default hover:bg-surface-hover rounded-lg transition-colors inline-flex items-center gap-2">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
  Regenerate
</button>`,
        preview: "with-text"
      },
      {
        title: "Loading",
        code: `<button className="h-9 px-3 text-sm text-muted rounded-lg inline-flex items-center gap-2 opacity-70 cursor-not-allowed" disabled>
  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
  Regenerating...
</button>`,
        preview: "loading"
      }
    ],
    relatedComponents: ["MessageActions", "IconButton", "ChatMessage"]
  },
  {
    name: "Stop Generation",
    slug: "stop-generation",
    description: "Button to halt AI response generation mid-stream.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "onClick", type: "() => void", required: true, description: "Click handler" },
      { name: "variant", type: "'icon' | 'text' | 'both'", required: false, default: "'both'", description: "Display variant" }
    ],
    examples: [
      {
        title: "Default",
        code: `<button className="h-10 px-4 bg-surface-raised border border-default rounded-lg text-sm font-medium text-default hover:bg-surface-hover transition-colors inline-flex items-center gap-2">
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="1" /></svg>
  Stop generating
</button>`,
        preview: "default"
      },
      {
        title: "Icon Only",
        code: `<button className="w-10 h-10 bg-surface-raised border border-default rounded-full flex items-center justify-center hover:bg-surface-hover transition-colors" aria-label="Stop generating">
  <svg className="w-4 h-4 text-default" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="1" /></svg>
</button>`,
        preview: "icon"
      },
      {
        title: "Inline with Typing",
        code: `<div className="flex items-center gap-3">
  <div className="flex items-center gap-1">
    <span className="w-2 h-2 bg-text-subtle rounded-full animate-bounce" style="animation-delay: 0ms"></span>
    <span className="w-2 h-2 bg-text-subtle rounded-full animate-bounce" style="animation-delay: 150ms"></span>
    <span className="w-2 h-2 bg-text-subtle rounded-full animate-bounce" style="animation-delay: 300ms"></span>
  </div>
  <button className="text-xs text-muted hover:text-default transition-colors">Stop</button>
</div>`,
        preview: "inline"
      }
    ],
    relatedComponents: ["TypingIndicator", "MessageInput", "Button"]
  },
  {
    name: "Streaming Cursor",
    slug: "streaming-cursor",
    description: "Animated cursor indicator showing AI is actively writing text.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "variant", type: "'block' | 'line' | 'underscore'", required: false, default: "'block'", description: "Cursor style" }
    ],
    examples: [
      {
        title: "Block Cursor",
        code: `<div className="text-sm text-default">
  The quick brown fox jumps over the lazy<span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-pulse"></span>
</div>`,
        preview: "block"
      },
      {
        title: "Line Cursor",
        code: `<div className="text-sm text-default">
  The quick brown fox jumps over the lazy<span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse"></span>
</div>`,
        preview: "line"
      },
      {
        title: "In Message",
        code: `<div className="px-4 py-3 bg-surface-raised border border-default rounded-2xl rounded-bl-md max-w-md">
  <p className="text-sm text-default">Here's a simple function to sort an array in JavaScript. You can use the built-in sort method<span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-pulse"></span></p>
</div>`,
        preview: "in-message"
      }
    ],
    relatedComponents: ["ChatMessage", "TypingIndicator", "AICodeBlock"]
  },
  {
    name: "Suggested Prompts",
    slug: "suggested-prompts",
    description: "Starter questions and prompt chips to help users begin conversations.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "prompts", type: "Array<{ label: string; prompt: string; icon?: ReactNode }>", required: true, description: "Prompt suggestions" },
      { name: "onSelect", type: "(prompt: string) => void", required: true, description: "Prompt selection handler" },
      { name: "variant", type: "'chips' | 'cards' | 'list'", required: false, default: "'chips'", description: "Display variant" }
    ],
    examples: [
      {
        title: "Chips",
        code: `<div className="flex flex-wrap gap-2">
  <button className="px-4 py-2 bg-surface-hover border border-default rounded-full text-sm text-default hover:bg-surface-raised hover:border-emphasis transition-colors">
    Write a poem about coding
  </button>
  <button className="px-4 py-2 bg-surface-hover border border-default rounded-full text-sm text-default hover:bg-surface-raised hover:border-emphasis transition-colors">
    Explain quantum computing
  </button>
  <button className="px-4 py-2 bg-surface-hover border border-default rounded-full text-sm text-default hover:bg-surface-raised hover:border-emphasis transition-colors">
    Debug my code
  </button>
  <button className="px-4 py-2 bg-surface-hover border border-default rounded-full text-sm text-default hover:bg-surface-raised hover:border-emphasis transition-colors">
    Plan a trip to Japan
  </button>
</div>`,
        preview: "chips"
      },
      {
        title: "Cards",
        code: `<div className="grid grid-cols-2 gap-3">
  <button className="p-4 bg-surface-raised border border-default rounded-xl text-left hover:border-emphasis hover:shadow-md dark:hover:shadow-black/30 transition-all">
    <div className="w-8 h-8 bg-info rounded-lg flex items-center justify-center mb-3">
      <svg className="w-4 h-4 text-info-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    </div>
    <p className="text-sm font-medium text-default">Brainstorm ideas</p>
    <p className="text-xs text-muted mt-1">Generate creative concepts</p>
  </button>
  <button className="p-4 bg-surface-raised border border-default rounded-xl text-left hover:border-emphasis hover:shadow-md dark:hover:shadow-black/30 transition-all">
    <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center mb-3">
      <svg className="w-4 h-4 text-success-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    </div>
    <p className="text-sm font-medium text-default">Review my work</p>
    <p className="text-xs text-muted mt-1">Get feedback on documents</p>
  </button>
</div>`,
        preview: "cards"
      }
    ],
    relatedComponents: ["MessageInput", "ChatMessage", "Badge"]
  },
  {
    name: "Citation Card",
    slug: "citation-card",
    description: "Display sources and references cited by the AI in responses.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "title", type: "string", required: true, description: "Source title" },
      { name: "url", type: "string", required: false, description: "Source URL" },
      { name: "snippet", type: "string", required: false, description: "Quoted excerpt" },
      { name: "index", type: "number", required: false, description: "Citation number" }
    ],
    examples: [
      {
        title: "Inline Citation",
        code: `<span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-info rounded text-xs font-medium text-info-foreground cursor-pointer hover:bg-info-border transition-colors">
  <span>[1]</span>
</span>`,
        preview: "inline"
      },
      {
        title: "Citation Card",
        code: `<div className="p-3 bg-surface-raised border border-default rounded-lg max-w-sm hover:border-emphasis transition-colors cursor-pointer">
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 bg-surface-hover rounded flex items-center justify-center shrink-0">
      <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-info-foreground bg-info px-1.5 py-0.5 rounded">[1]</span>
        <p className="text-sm font-medium text-default truncate">React Documentation</p>
      </div>
      <p className="text-xs text-muted mt-1 truncate">https://react.dev/learn</p>
    </div>
  </div>
</div>`,
        preview: "card"
      },
      {
        title: "With Snippet",
        code: `<div className="p-4 bg-surface-raised border border-default rounded-xl max-w-md">
  <div className="flex items-center gap-2 mb-2">
    <span className="text-xs font-medium text-info-foreground bg-info px-1.5 py-0.5 rounded">[2]</span>
    <p className="text-sm font-medium text-default">MDN Web Docs</p>
  </div>
  <p className="text-sm text-muted italic">"The Array.prototype.sort() method sorts the elements of an array in place and returns the sorted array."</p>
  <a href="#" className="text-xs text-info-emphasis hover:underline mt-2 inline-block">developer.mozilla.org →</a>
</div>`,
        preview: "with-snippet"
      }
    ],
    relatedComponents: ["ChatMessage", "Card", "Badge"]
  },
  {
    name: "AI Error State",
    slug: "ai-error-state",
    description: "Error displays for rate limits, API errors, and content warnings.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "type", type: "'rate-limit' | 'api-error' | 'content-warning'", required: true, description: "Error type" },
      { name: "title", type: "string", required: false, description: "Custom error title" },
      { name: "message", type: "string", required: false, description: "Error description" },
      { name: "onRetry", type: "() => void", required: false, description: "Retry handler" }
    ],
    examples: [
      {
        title: "Rate Limit",
        code: `<div className="p-4 bg-warning border border-warning-border rounded-xl">
  <div className="flex gap-3">
    <svg className="w-5 h-5 text-warning-emphasis shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <div className="flex-1">
      <p className="text-sm font-medium text-warning-foreground">Rate limit exceeded</p>
      <p className="text-sm text-warning-foreground mt-1">You've sent too many messages. Please wait 30 seconds before trying again.</p>
      <button className="mt-3 h-8 px-3 bg-warning-emphasis text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity">
        Retry in 30s
      </button>
    </div>
  </div>
</div>`,
        preview: "rate-limit"
      },
      {
        title: "API Error",
        code: `<div className="p-4 bg-error border border-error-border rounded-xl">
  <div className="flex gap-3">
    <svg className="w-5 h-5 text-error-emphasis shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <div className="flex-1">
      <p className="text-sm font-medium text-error-foreground">Something went wrong</p>
      <p className="text-sm text-error-foreground mt-1">We couldn't generate a response. Please try again.</p>
      <button className="mt-3 h-8 px-3 bg-error-emphasis text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        Retry
      </button>
    </div>
  </div>
</div>`,
        preview: "api-error"
      },
      {
        title: "Content Warning",
        code: `<div className="p-4 bg-surface-raised border border-default rounded-xl">
  <div className="flex gap-3">
    <svg className="w-5 h-5 text-muted shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <div className="flex-1">
      <p className="text-sm font-medium text-default">Content filtered</p>
      <p className="text-sm text-muted mt-1">This response was filtered due to content policy guidelines. Please rephrase your request.</p>
    </div>
  </div>
</div>`,
        preview: "content-warning"
      }
    ],
    relatedComponents: ["Alert", "ChatMessage", "Toast"]
  },
  {
    name: "System Prompt Editor",
    slug: "system-prompt-editor",
    description: "Editor to customize AI behavior and instructions.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "value", type: "string", required: true, description: "System prompt content" },
      { name: "onChange", type: "(value: string) => void", required: true, description: "Change handler" },
      { name: "placeholder", type: "string", required: false, description: "Placeholder text" },
      { name: "presets", type: "Array<{ name: string; prompt: string }>", required: false, description: "Preset prompts" }
    ],
    examples: [
      {
        title: "Default",
        code: `<div className="p-4 bg-surface-raised border border-default rounded-xl">
  <div className="flex items-center justify-between mb-3">
    <label className="text-sm font-medium text-default">System Prompt</label>
    <span className="text-xs text-muted">245 / 2000</span>
  </div>
  <textarea
    placeholder="You are a helpful assistant..."
    rows="4"
    className="w-full px-3 py-2 bg-surface-sunken border border-default rounded-lg text-sm text-default placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
  >You are a helpful coding assistant. Provide clear, concise answers with code examples when appropriate. Always explain your reasoning.</textarea>
  <p className="text-xs text-muted mt-2">Customize how the AI behaves and responds.</p>
</div>`,
        preview: "default"
      },
      {
        title: "With Presets",
        code: `<div className="p-4 bg-surface-raised border border-default rounded-xl">
  <div className="flex items-center justify-between mb-3">
    <label className="text-sm font-medium text-default">System Prompt</label>
    <div className="relative">
      <button className="text-xs text-info-emphasis hover:underline inline-flex items-center gap-1">
        Load preset
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
    </div>
  </div>
  <div className="flex gap-2 mb-3">
    <button className="px-2 py-1 bg-surface-hover text-xs text-default rounded-md hover:bg-surface-sunken transition-colors">Code Assistant</button>
    <button className="px-2 py-1 bg-surface-hover text-xs text-default rounded-md hover:bg-surface-sunken transition-colors">Writing Helper</button>
    <button className="px-2 py-1 bg-surface-hover text-xs text-default rounded-md hover:bg-surface-sunken transition-colors">Translator</button>
  </div>
  <textarea
    rows="4"
    className="w-full px-3 py-2 bg-surface-sunken border border-default rounded-lg text-sm text-default focus:outline-none focus:ring-2 focus:ring-primary resize-none"
  >You are an expert code reviewer. Analyze code for bugs, performance issues, and best practices.</textarea>
</div>`,
        preview: "with-presets"
      }
    ],
    relatedComponents: ["Textarea", "ModelSelector", "Dropdown"]
  },
  {
    name: "Temperature Slider",
    slug: "temperature-slider",
    description: "Slider to adjust AI creativity and randomness settings.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "value", type: "number", required: true, description: "Temperature value (0-2)" },
      { name: "onChange", type: "(value: number) => void", required: true, description: "Change handler" }
    ],
    examples: [
      {
        title: "Default",
        code: `<div className="w-64 p-4 bg-surface-raised border border-default rounded-xl">
  <div className="flex items-center justify-between mb-3">
    <label className="text-sm font-medium text-default">Temperature</label>
    <span className="text-sm font-mono text-muted">0.7</span>
  </div>
  <input
    type="range"
    min="0"
    max="2"
    step="0.1"
    value="0.7"
    className="w-full h-2 bg-surface-hover rounded-full appearance-none cursor-pointer accent-primary"
  />
  <div className="flex justify-between mt-2">
    <span className="text-xs text-muted">Precise</span>
    <span className="text-xs text-muted">Creative</span>
  </div>
</div>`,
        preview: "default"
      },
      {
        title: "With Description",
        code: `<div className="w-72 p-4 bg-surface-raised border border-default rounded-xl">
  <div className="flex items-center justify-between mb-1">
    <label className="text-sm font-medium text-default">Temperature</label>
    <span className="text-sm font-mono text-primary font-medium">1.2</span>
  </div>
  <p className="text-xs text-muted mb-3">Higher values = more creative, lower = more focused</p>
  <input
    type="range"
    min="0"
    max="2"
    step="0.1"
    value="1.2"
    className="w-full h-2 bg-surface-hover rounded-full appearance-none cursor-pointer accent-primary"
  />
  <div className="flex justify-between mt-2 text-xs">
    <span className="text-info-emphasis">0 - Deterministic</span>
    <span className="text-warning-emphasis">2 - Random</span>
  </div>
</div>`,
        preview: "with-description"
      }
    ],
    relatedComponents: ["ModelSelector", "SystemPromptEditor", "Progress"]
  },
  {
    name: "Context Indicator",
    slug: "context-indicator",
    description: "Shows what files, documents, or context the AI is currently using.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "items", type: "Array<{ type: 'file' | 'url' | 'text'; name: string; size?: string }>", required: true, description: "Context items" },
      { name: "variant", type: "'inline' | 'expanded'", required: false, default: "'inline'", description: "Display variant" },
      { name: "onRemove", type: "(index: number) => void", required: false, description: "Remove item handler" }
    ],
    examples: [
      {
        title: "Inline",
        code: `<div className="flex items-center gap-2 text-xs text-muted">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
  <span>Using context from:</span>
  <span className="text-default font-medium">README.md</span>
  <span>+2 more</span>
</div>`,
        preview: "inline"
      },
      {
        title: "Expanded",
        code: `<div className="p-3 bg-surface-sunken border border-default rounded-lg">
  <div className="flex items-center gap-2 mb-2">
    <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    <span className="text-xs font-medium text-default">Context</span>
  </div>
  <div className="space-y-1.5">
    <div className="flex items-center justify-between px-2 py-1.5 bg-surface-raised rounded">
      <div className="flex items-center gap-2">
        <svg className="w-3.5 h-3.5 text-info-emphasis" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        <span className="text-xs text-default">README.md</span>
      </div>
      <button className="text-subtle hover:text-default"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
    </div>
    <div className="flex items-center justify-between px-2 py-1.5 bg-surface-raised rounded">
      <div className="flex items-center gap-2">
        <svg className="w-3.5 h-3.5 text-success-emphasis" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
        <span className="text-xs text-default">index.ts</span>
      </div>
      <button className="text-subtle hover:text-default"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
    </div>
  </div>
</div>`,
        preview: "expanded"
      }
    ],
    relatedComponents: ["FileAttachment", "Badge", "MessageInput"]
  },
  {
    name: "Voice Input Button",
    slug: "voice-input-button",
    description: "Button to trigger speech-to-text input for hands-free messaging.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "onStart", type: "() => void", required: true, description: "Recording start handler" },
      { name: "onStop", type: "(transcript: string) => void", required: true, description: "Recording stop handler" },
      { name: "isRecording", type: "boolean", required: false, default: "false", description: "Recording state" }
    ],
    examples: [
      {
        title: "Default",
        code: `<button className="p-2 text-subtle hover:text-default hover:bg-surface-hover rounded-lg transition-colors" aria-label="Voice input">
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
</button>`,
        preview: "default"
      },
      {
        title: "Recording",
        code: `<button className="p-2 bg-error text-error-foreground rounded-lg animate-pulse" aria-label="Stop recording">
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
</button>`,
        preview: "recording"
      },
      {
        title: "With Waveform",
        code: `<div className="flex items-center gap-3 px-4 py-2 bg-error rounded-lg">
  <button className="p-1" aria-label="Stop recording">
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="1" /></svg>
  </button>
  <div className="flex items-center gap-0.5 h-6">
    <span className="w-1 h-3 bg-white rounded-full animate-pulse" style="animation-delay: 0ms"></span>
    <span className="w-1 h-5 bg-white rounded-full animate-pulse" style="animation-delay: 100ms"></span>
    <span className="w-1 h-4 bg-white rounded-full animate-pulse" style="animation-delay: 200ms"></span>
    <span className="w-1 h-6 bg-white rounded-full animate-pulse" style="animation-delay: 300ms"></span>
    <span className="w-1 h-3 bg-white rounded-full animate-pulse" style="animation-delay: 400ms"></span>
  </div>
  <span className="text-sm text-white font-medium">0:03</span>
</div>`,
        preview: "with-waveform"
      }
    ],
    relatedComponents: ["MessageInput", "IconButton", "Button"]
  },
  {
    name: "Image Upload Zone",
    slug: "image-upload-zone",
    description: "Multi-modal input area for uploading images to AI conversations.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "onUpload", type: "(files: File[]) => void", required: true, description: "Upload handler" }
    ],
    examples: [
      {
        title: "Default",
        code: `<div className="border-2 border-dashed border-default rounded-xl p-8 text-center hover:border-emphasis hover:bg-surface-hover transition-all cursor-pointer">
  <svg className="w-10 h-10 text-subtle mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
  <p className="mt-4 text-sm text-muted">
    <span className="font-medium text-default">Click to upload</span> or drag and drop
  </p>
  <p className="mt-1 text-xs text-subtle">PNG, JPG, GIF, WebP up to 10MB</p>
</div>`,
        preview: "default"
      },
      {
        title: "With Previews",
        code: `<div className="space-y-4">
  <div className="grid grid-cols-3 gap-3">
    <div className="relative aspect-square rounded-lg overflow-hidden bg-surface-hover">
      <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500"></div>
      <button className="absolute top-1 right-1 p-1 bg-surface-overlay rounded-full text-white hover:bg-black/70 transition-colors">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
    <div className="relative aspect-square rounded-lg overflow-hidden bg-surface-hover">
      <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500"></div>
      <button className="absolute top-1 right-1 p-1 bg-surface-overlay rounded-full text-white hover:bg-black/70 transition-colors">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
    <div className="aspect-square border-2 border-dashed border-default rounded-lg flex items-center justify-center hover:border-emphasis hover:bg-surface-hover transition-all cursor-pointer">
      <svg className="w-6 h-6 text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
    </div>
  </div>
</div>`,
        preview: "with-previews"
      }
    ],
    relatedComponents: ["FileUpload", "FileAttachment", "MessageInput"]
  },
  {
    name: "Export Share Menu",
    slug: "export-share-menu",
    description: "Menu for exporting and sharing conversation content.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "onExport", type: "(format: 'pdf' | 'markdown' | 'json' | 'text') => void", required: true, description: "Export handler" },
      { name: "onShare", type: "(method: 'link' | 'email') => void", required: false, description: "Share handler" }
    ],
    examples: [
      {
        title: "Dropdown Menu",
        code: `<div className="relative inline-block">
  <button className="h-9 px-3 bg-surface-raised border border-default rounded-lg text-sm text-default hover:bg-surface-hover inline-flex items-center gap-2 transition-colors">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
    Share
  </button>
  <div className="absolute top-full right-0 mt-1 w-48 bg-surface-raised border border-default rounded-xl shadow-lg dark:shadow-black/50 py-1 z-10">
    <div className="px-3 py-1.5 text-xs font-medium text-muted uppercase">Export as</div>
    <button className="w-full px-4 py-2 text-left text-sm text-default hover:bg-surface-hover flex items-center gap-3">
      <svg className="w-4 h-4 text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
      Markdown
    </button>
    <button className="w-full px-4 py-2 text-left text-sm text-default hover:bg-surface-hover flex items-center gap-3">
      <svg className="w-4 h-4 text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
      PDF
    </button>
    <button className="w-full px-4 py-2 text-left text-sm text-default hover:bg-surface-hover flex items-center gap-3">
      <svg className="w-4 h-4 text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
      JSON
    </button>
    <div className="my-1 border-t border-default"></div>
    <div className="px-3 py-1.5 text-xs font-medium text-muted uppercase">Share</div>
    <button className="w-full px-4 py-2 text-left text-sm text-default hover:bg-surface-hover flex items-center gap-3">
      <svg className="w-4 h-4 text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
      Copy link
    </button>
  </div>
</div>`,
        preview: "dropdown"
      },
      {
        title: "Button Group",
        code: `<div className="inline-flex rounded-lg border border-default divide-x divide-default">
  <button className="px-3 py-2 text-sm text-default bg-surface-raised hover:bg-surface-hover first:rounded-l-lg inline-flex items-center gap-2">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
    Export
  </button>
  <button className="px-3 py-2 text-sm text-default bg-surface-raised hover:bg-surface-hover last:rounded-r-lg inline-flex items-center gap-2">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
    Share
  </button>
</div>`,
        preview: "button-group"
      }
    ],
    relatedComponents: ["Dropdown", "ButtonGroup", "ConversationList"]
  },
  {
    name: "Conversation Search",
    slug: "conversation-search",
    description: "Search bar to find messages within conversation history.",
    category: "AI",
    usageNote: "<!-- Tailwind CSS pattern - copy the HTML/classes below -->",
    tailwind: true,
    props: [
      { name: "value", type: "string", required: false, description: "Search query" },
      { name: "onChange", type: "(value: string) => void", required: true, description: "Query change handler" },
      { name: "onSearch", type: "(query: string) => void", required: false, description: "Search submit handler" },
      { name: "results", type: "Array<{ id: string; preview: string; timestamp: string }>", required: false, description: "Search results" },
      { name: "placeholder", type: "string", required: false, default: "'Search conversations...'", description: "Placeholder text" }
    ],
    examples: [
      {
        title: "Default",
        code: `<div className="relative">
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
  <input
    type="text"
    placeholder="Search conversations..."
    className="w-full h-10 pl-10 pr-4 bg-surface-raised border border-default rounded-lg text-sm text-default placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
  />
</div>`,
        preview: "default"
      },
      {
        title: "With Results",
        code: `<div className="w-80">
  <div className="relative">
    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    <input
      type="text"
      value="sorting array"
      className="w-full h-10 pl-10 pr-4 bg-surface-raised border border-primary rounded-lg text-sm text-default focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
  <div className="mt-2 bg-surface-raised border border-default rounded-xl shadow-lg dark:shadow-black/50 overflow-hidden">
    <div className="px-3 py-2 text-xs text-muted border-b border-default">3 results</div>
    <button className="w-full px-3 py-3 text-left hover:bg-surface-hover transition-colors border-b border-default">
      <p className="text-sm text-default truncate">How do I <mark className="bg-warning px-0.5 rounded">sort</mark> an <mark className="bg-warning px-0.5 rounded">array</mark> in JS?</p>
      <p className="text-xs text-muted mt-1">Today at 2:34 PM</p>
    </button>
    <button className="w-full px-3 py-3 text-left hover:bg-surface-hover transition-colors border-b border-default">
      <p className="text-sm text-default truncate">Here's a function to <mark className="bg-warning px-0.5 rounded">sort</mark> the <mark className="bg-warning px-0.5 rounded">array</mark>...</p>
      <p className="text-xs text-muted mt-1">Today at 2:35 PM</p>
    </button>
    <button className="w-full px-3 py-3 text-left hover:bg-surface-hover transition-colors">
      <p className="text-sm text-default truncate">Custom <mark className="bg-warning px-0.5 rounded">sorting</mark> with compare function</p>
      <p className="text-xs text-muted mt-1">Yesterday at 10:15 AM</p>
    </button>
  </div>
</div>`,
        preview: "with-results"
      }
    ],
    relatedComponents: ["ConversationList", "Input", "ChatMessage"]
  }
];
