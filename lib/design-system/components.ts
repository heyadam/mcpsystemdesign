import type { Component } from './types';

export const components: Component[] = [
  // ============ ACTIONS ============
  {
    name: "Button",
    slug: "button",
    description: "Minimal button with subtle hover states and clean typography.",
    category: "Actions",
    importStatement: "import { Button } from '@minimal/ui'",
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
      variants: ["primary", "secondary", "outline", "ghost", "danger"],
      sizes: ["sm", "md", "lg"],
      states: ["default", "hover", "active", "focus", "disabled", "loading"]
    },
    props: [
      { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'", required: false, default: "'primary'", description: "Visual style" },
      { name: "size", type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: "Button size" },
      { name: "disabled", type: "boolean", required: false, default: "false", description: "Disabled state" },
      { name: "loading", type: "boolean", required: false, default: "false", description: "Loading state with spinner" },
      { name: "icon", type: "ReactNode", required: false, description: "Optional icon element" },
      { name: "fullWidth", type: "boolean", required: false, default: "false", description: "Full width button" }
    ],
    examples: [
      {
        title: "Primary",
        code: `<button className="h-10 px-4 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
  Deploy
</button>`,
        preview: "primary"
      },
      {
        title: "Secondary",
        code: `<button className="h-10 px-4 bg-gray-100 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
  Cancel
</button>`,
        preview: "secondary"
      },
      {
        title: "Outline",
        code: `<button className="h-10 px-4 bg-white text-gray-900 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors">
  Settings
</button>`,
        preview: "outline"
      },
      {
        title: "Ghost",
        code: `<button className="h-10 px-4 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-gray-900 transition-colors">
  Learn more
</button>`,
        preview: "ghost"
      },
      {
        title: "Danger",
        code: `<button className="h-10 px-4 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
  Delete
</button>`,
        preview: "danger"
      },
      {
        title: "With Icon",
        code: `<button className="h-10 px-4 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
  Add New
</button>`,
        preview: "icon"
      },
      {
        title: "Loading",
        code: `<button className="h-10 px-4 bg-black text-white rounded-lg text-sm font-medium inline-flex items-center gap-2 opacity-70 cursor-not-allowed" disabled>
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
        code: `<button className="h-8 px-3 bg-black text-white rounded-md text-xs font-medium">Small</button>
<button className="h-10 px-4 bg-black text-white rounded-lg text-sm font-medium">Medium</button>
<button className="h-12 px-6 bg-black text-white rounded-lg text-base font-medium">Large</button>`,
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
    importStatement: "import { IconButton } from '@minimal/ui'",
    tailwind: true,
    props: [
      { name: "variant", type: "'default' | 'ghost' | 'danger'", required: false, default: "'default'", description: "Visual style" },
      { name: "size", type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: "Button size" },
      { name: "label", type: "string", required: true, description: "Accessible label for screen readers" }
    ],
    examples: [
      {
        title: "Variants",
        code: `<button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" aria-label="Settings">
  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
</button>
<button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close">
  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
</button>
<button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-500 transition-colors" aria-label="Delete">
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
    importStatement: "import { ButtonGroup } from '@minimal/ui'",
    tailwind: true,
    props: [
      { name: "attached", type: "boolean", required: false, default: "true", description: "Attach buttons together" }
    ],
    examples: [
      {
        title: "Default",
        code: `<div className="inline-flex rounded-lg border border-gray-200 divide-x divide-gray-200">
  <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 first:rounded-l-lg">Left</button>
  <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200">Center</button>
  <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 last:rounded-r-lg">Right</button>
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
    importStatement: "import { Input } from '@minimal/ui'",
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
      variants: ["default", "error", "disabled"],
      sizes: ["sm", "md", "lg"],
      states: ["default", "focus", "error", "disabled"]
    },
    props: [
      { name: "type", type: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url'", required: false, default: "'text'", description: "Input type" },
      { name: "placeholder", type: "string", required: false, description: "Placeholder text" },
      { name: "error", type: "boolean", required: false, default: "false", description: "Error state" },
      { name: "disabled", type: "boolean", required: false, default: "false", description: "Disabled state" },
      { name: "prefix", type: "ReactNode", required: false, description: "Prefix element or icon" },
      { name: "suffix", type: "ReactNode", required: false, description: "Suffix element or icon" }
    ],
    examples: [
      {
        title: "Default",
        code: `<input
  type="text"
  placeholder="Enter your name"
  className="h-10 w-full px-3 bg-white border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow"
/>`,
        preview: "default"
      },
      {
        title: "With Label & Helper",
        code: `<div className="space-y-2">
  <label className="text-sm font-medium text-gray-700">Email address</label>
  <input
    type="email"
    placeholder="you@example.com"
    className="h-10 w-full px-3 bg-white border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
  />
  <p className="text-sm text-gray-500">We'll never share your email.</p>
</div>`,
        preview: "with-label"
      },
      {
        title: "Error State",
        code: `<div className="space-y-2">
  <label className="text-sm font-medium text-gray-700">Email</label>
  <input
    type="email"
    value="invalid-email"
    className="h-10 w-full px-3 bg-white border border-red-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
  />
  <p className="text-sm text-red-500">Please enter a valid email address.</p>
</div>`,
        preview: "error"
      },
      {
        title: "With Icon",
        code: `<div className="relative">
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
  <input
    type="text"
    placeholder="Search..."
    className="h-10 w-full pl-10 pr-3 bg-white border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
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
  className="h-10 w-full px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
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
    importStatement: "import { Textarea } from '@minimal/ui'",
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
  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-y"
></textarea>`,
        preview: "default"
      },
      {
        title: "With Character Count",
        code: `<div className="space-y-2">
  <label className="text-sm font-medium text-gray-700">Bio</label>
  <textarea
    placeholder="Tell us about yourself..."
    rows="3"
    maxLength="200"
    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
  ></textarea>
  <p className="text-xs text-gray-400 text-right">0 / 200</p>
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
    importStatement: "import { Select } from '@minimal/ui'",
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
  <select className="h-10 w-full px-3 pr-10 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent cursor-pointer">
    <option value="">Select an option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
</div>`,
        preview: "default"
      },
      {
        title: "With Label",
        code: `<div className="space-y-2">
  <label className="text-sm font-medium text-gray-700">Country</label>
  <div className="relative">
    <select className="h-10 w-full px-3 pr-10 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-pointer">
      <option value="">Select country</option>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
    </select>
    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
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
    importStatement: "import { Checkbox } from '@minimal/ui'",
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
  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 focus:ring-offset-0" />
  <span className="text-sm text-gray-700">Unchecked</span>
</label>

<!-- Checked -->
<label className="flex items-center gap-3 cursor-pointer">
  <input type="checkbox" checked className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 focus:ring-offset-0" />
  <span className="text-sm text-gray-700">Checked</span>
</label>

<!-- Disabled -->
<label className="flex items-center gap-3 cursor-not-allowed">
  <input type="checkbox" disabled className="w-4 h-4 rounded border-gray-200 text-gray-400" />
  <span className="text-sm text-gray-400">Disabled</span>
</label>`,
        preview: "states"
      },
      {
        title: "With Description",
        code: `<label className="flex items-start gap-3 cursor-pointer">
  <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-gray-300 text-gray-900 focus:ring-gray-900" />
  <div>
    <span className="text-sm font-medium text-gray-700">Marketing emails</span>
    <p className="text-sm text-gray-500">Receive emails about new products and features.</p>
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
    importStatement: "import { Radio } from '@minimal/ui'",
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
  <legend className="text-sm font-medium text-gray-700">Notification preference</legend>
  <label className="flex items-center gap-3 cursor-pointer">
    <input type="radio" name="notification" value="all" checked className="w-4 h-4 border-gray-300 text-gray-900 focus:ring-gray-900" />
    <span className="text-sm text-gray-700">All notifications</span>
  </label>
  <label className="flex items-center gap-3 cursor-pointer">
    <input type="radio" name="notification" value="mentions" className="w-4 h-4 border-gray-300 text-gray-900 focus:ring-gray-900" />
    <span className="text-sm text-gray-700">Mentions only</span>
  </label>
  <label className="flex items-center gap-3 cursor-pointer">
    <input type="radio" name="notification" value="none" className="w-4 h-4 border-gray-300 text-gray-900 focus:ring-gray-900" />
    <span className="text-sm text-gray-700">None</span>
  </label>
</fieldset>`,
        preview: "group"
      },
      {
        title: "Card Selection",
        code: `<div className="grid grid-cols-3 gap-3">
  <label className="relative cursor-pointer">
    <input type="radio" name="plan" value="starter" className="peer sr-only" />
    <div className="p-4 bg-white border border-gray-200 rounded-xl peer-checked:border-gray-900 peer-checked:ring-1 peer-checked:ring-gray-900 transition-all">
      <p className="font-medium text-gray-900">Starter</p>
      <p className="text-sm text-gray-500">$9/mo</p>
    </div>
  </label>
  <label className="relative cursor-pointer">
    <input type="radio" name="plan" value="pro" className="peer sr-only" checked />
    <div className="p-4 bg-white border border-gray-200 rounded-xl peer-checked:border-gray-900 peer-checked:ring-1 peer-checked:ring-gray-900 transition-all">
      <p className="font-medium text-gray-900">Pro</p>
      <p className="text-sm text-gray-500">$29/mo</p>
    </div>
  </label>
  <label className="relative cursor-pointer">
    <input type="radio" name="plan" value="enterprise" className="peer sr-only" />
    <div className="p-4 bg-white border border-gray-200 rounded-xl peer-checked:border-gray-900 peer-checked:ring-1 peer-checked:ring-gray-900 transition-all">
      <p className="font-medium text-gray-900">Enterprise</p>
      <p className="text-sm text-gray-500">Custom</p>
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
    importStatement: "import { Toggle } from '@minimal/ui'",
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
<button className="w-11 h-6 bg-gray-200 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform" />
</button>

<!-- On -->
<button className="w-11 h-6 bg-gray-900 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform translate-x-5" />
</button>`,
        preview: "states"
      },
      {
        title: "With Label",
        code: `<label className="flex items-center justify-between cursor-pointer">
  <div>
    <p className="text-sm font-medium text-gray-700">Dark mode</p>
    <p className="text-sm text-gray-500">Use dark theme across the app</p>
  </div>
  <button className="w-11 h-6 bg-gray-900 rounded-full relative transition-colors ml-4">
    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform translate-x-5" />
  </button>
</label>`,
        preview: "with-label"
      }
    ],
    relatedComponents: ["Checkbox", "Radio"]
  },
  {
    name: "FormGroup",
    slug: "form-group",
    description: "Container for form fields with label and helper text.",
    category: "Forms",
    importStatement: "import { FormGroup } from '@minimal/ui'",
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
    <label className="text-sm font-medium text-gray-700">Full name <span className="text-red-500">*</span></label>
    <input type="text" className="h-10 w-full px-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
  </div>

  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
    <input type="email" className="h-10 w-full px-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
    <p className="text-sm text-gray-500">We'll use this for account notifications.</p>
  </div>

  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">Password</label>
    <input type="password" className="h-10 w-full px-3 bg-white border border-red-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
    <p className="text-sm text-red-500">Password must be at least 8 characters.</p>
  </div>

  <button type="submit" className="h-10 px-4 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800">
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
    importStatement: "import { FileUpload } from '@minimal/ui'",
    tailwind: true,
    props: [
      { name: "accept", type: "string", required: false, description: "Accepted file types" },
      { name: "multiple", type: "boolean", required: false, default: "false", description: "Allow multiple files" },
      { name: "maxSize", type: "number", required: false, description: "Max file size in bytes" }
    ],
    examples: [
      {
        title: "Drop Zone",
        code: `<div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-gray-300 transition-colors cursor-pointer">
  <svg className="w-10 h-10 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
  <p className="mt-4 text-sm text-gray-600">
    <span className="font-medium text-gray-900">Click to upload</span> or drag and drop
  </p>
  <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
  <input type="file" className="hidden" />
</div>`,
        preview: "dropzone"
      },
      {
        title: "Compact",
        code: `<label className="inline-flex items-center gap-2 h-10 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
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
    importStatement: "import { Table } from '@minimal/ui'",
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
        code: `<div className="border border-gray-200 rounded-xl overflow-hidden">
  <table className="w-full">
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      <tr className="hover:bg-gray-50">
        <td className="px-4 py-3 text-sm text-gray-900">John Doe</td>
        <td className="px-4 py-3"><span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700">Active</span></td>
        <td className="px-4 py-3 text-sm text-gray-500">Admin</td>
        <td className="px-4 py-3 text-right text-sm"><button className="text-gray-500 hover:text-gray-900">Edit</button></td>
      </tr>
      <tr className="hover:bg-gray-50">
        <td className="px-4 py-3 text-sm text-gray-900">Jane Smith</td>
        <td className="px-4 py-3"><span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">Pending</span></td>
        <td className="px-4 py-3 text-sm text-gray-500">User</td>
        <td className="px-4 py-3 text-right text-sm"><button className="text-gray-500 hover:text-gray-900">Edit</button></td>
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
    importStatement: "import { Badge } from '@minimal/ui'",
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
      variants: ["default", "success", "warning", "error", "info"],
      sizes: ["sm", "md"]
    },
    props: [
      { name: "variant", type: "'default' | 'success' | 'warning' | 'error' | 'info'", required: false, default: "'default'", description: "Badge variant" },
      { name: "size", type: "'sm' | 'md'", required: false, default: "'md'", description: "Badge size" },
      { name: "dot", type: "boolean", required: false, default: "false", description: "Show status dot" }
    ],
    examples: [
      {
        title: "Variants",
        code: `<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Default</span>
<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700">Success</span>
<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-amber-50 text-amber-700">Warning</span>
<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-red-50 text-red-700">Error</span>
<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700">Info</span>`,
        preview: "variants"
      },
      {
        title: "With Dot",
        code: `<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700">
  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
  Online
</span>
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
  Offline
</span>
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full bg-amber-50 text-amber-700">
  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
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
    importStatement: "import { Avatar } from '@minimal/ui'",
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
  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-medium ring-2 ring-white">+5</div>
</div>`,
        preview: "group"
      },
      {
        title: "With Status",
        code: `<div className="relative inline-block">
  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-sm font-medium">JD</div>
  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></span>
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
    importStatement: "import { Card } from '@minimal/ui'",
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
      variants: ["default", "outlined", "elevated", "filled"]
    },
    props: [
      { name: "variant", type: "'default' | 'outlined' | 'elevated' | 'filled'", required: false, default: "'default'", description: "Card style variant" },
      { name: "padding", type: "'none' | 'sm' | 'md' | 'lg'", required: false, default: "'md'", description: "Internal padding" },
      { name: "interactive", type: "boolean", required: false, default: "false", description: "Clickable card with hover effect" }
    ],
    examples: [
      {
        title: "Default",
        code: `<div className="p-6 bg-white border border-gray-200 rounded-xl">
  <h3 className="font-semibold text-gray-900">Card Title</h3>
  <p className="mt-2 text-sm text-gray-500">This is a basic card with default styling.</p>
</div>`,
        preview: "default"
      },
      {
        title: "Interactive",
        code: `<div className="p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all cursor-pointer">
  <h3 className="font-semibold text-gray-900">Interactive Card</h3>
  <p className="mt-2 text-sm text-gray-500">Hover to see the shadow effect.</p>
</div>`,
        preview: "interactive"
      },
      {
        title: "With Header & Footer",
        code: `<div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
  <div className="px-6 py-4 border-b border-gray-200">
    <h3 className="font-semibold text-gray-900">Card Header</h3>
  </div>
  <div className="px-6 py-4">
    <p className="text-sm text-gray-500">Card body content goes here. You can put any content inside.</p>
  </div>
  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
    <button className="text-sm font-medium text-gray-600 hover:text-gray-900">View details →</button>
  </div>
</div>`,
        preview: "with-sections"
      },
      {
        title: "Stats Card",
        code: `<div className="p-6 bg-white border border-gray-200 rounded-xl">
  <p className="text-sm font-medium text-gray-500">Total Revenue</p>
  <p className="mt-2 text-3xl font-semibold text-gray-900">$45,231.89</p>
  <p className="mt-2 text-sm text-emerald-600">↑ 20.1% from last month</p>
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
    importStatement: "import { EmptyState } from '@minimal/ui'",
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
  <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
  <h3 className="mt-4 text-sm font-medium text-gray-900">No documents</h3>
  <p className="mt-2 text-sm text-gray-500">Get started by creating a new document.</p>
  <button className="mt-4 h-9 px-4 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800">
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
    importStatement: "import { CodeBlock } from '@minimal/ui'",
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
        code: `<p className="text-sm text-gray-700">
  Run <code className="px-1.5 py-0.5 bg-gray-100 rounded text-sm font-mono text-gray-900">npm install</code> to install dependencies.
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
    importStatement: "import { Tabs } from '@minimal/ui'",
    tailwind: true,
    props: [
      { name: "items", type: "Array<{ label: string; value: string; disabled?: boolean }>", required: true, description: "Tab items" },
      { name: "value", type: "string", required: true, description: "Active tab value" },
      { name: "variant", type: "'default' | 'pills' | 'underline'", required: false, default: "'default'", description: "Tab style variant" }
    ],
    examples: [
      {
        title: "Pills",
        code: `<div className="inline-flex bg-gray-100 rounded-lg p-1">
  <button className="px-4 py-2 text-sm font-medium bg-white text-gray-900 rounded-md shadow-sm">Overview</button>
  <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Analytics</button>
  <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Settings</button>
</div>`,
        preview: "pills"
      },
      {
        title: "Underline",
        code: `<div className="border-b border-gray-200">
  <nav className="flex gap-8">
    <button className="py-3 text-sm font-medium text-gray-900 border-b-2 border-gray-900">Overview</button>
    <button className="py-3 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent">Analytics</button>
    <button className="py-3 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent">Settings</button>
  </nav>
</div>`,
        preview: "underline"
      }
    ],
    relatedComponents: ["Breadcrumb", "Sidebar"]
  },
  {
    name: "Breadcrumb",
    slug: "breadcrumb",
    description: "Navigation breadcrumbs showing page hierarchy.",
    category: "Navigation",
    importStatement: "import { Breadcrumb } from '@minimal/ui'",
    tailwind: true,
    props: [
      { name: "items", type: "Array<{ label: string; href?: string }>", required: true, description: "Breadcrumb items" },
      { name: "separator", type: "ReactNode", required: false, default: "'/'", description: "Item separator" }
    ],
    examples: [
      {
        title: "Default",
        code: `<nav className="flex items-center gap-2 text-sm">
  <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Home</a>
  <span className="text-gray-300">/</span>
  <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Products</a>
  <span className="text-gray-300">/</span>
  <span className="text-gray-900 font-medium">Headphones</span>
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
    importStatement: "import { Pagination } from '@minimal/ui'",
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
  <button className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-50" disabled>
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
  </button>
  <button className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium bg-gray-900 text-white">1</button>
  <button className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">2</button>
  <button className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">3</button>
  <span className="w-9 h-9 flex items-center justify-center text-gray-400">...</span>
  <button className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">10</button>
  <button className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100">
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
    importStatement: "import { Sidebar } from '@minimal/ui'",
    tailwind: true,
    props: [
      { name: "items", type: "Array<{ label: string; href: string; icon?: ReactNode; active?: boolean }>", required: true, description: "Navigation items" },
      { name: "collapsed", type: "boolean", required: false, default: "false", description: "Collapsed state" }
    ],
    examples: [
      {
        title: "Default",
        code: `<aside className="w-64 bg-white border-r border-gray-200 h-screen">
  <div className="p-4 border-b border-gray-200">
    <span className="font-semibold text-gray-900">Dashboard</span>
  </div>
  <nav className="p-2 space-y-1">
    <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
      Home
    </a>
    <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
      Analytics
    </a>
    <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
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
    importStatement: "import { Alert } from '@minimal/ui'",
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
      variants: ["info", "success", "warning", "error"]
    },
    props: [
      { name: "variant", type: "'info' | 'success' | 'warning' | 'error'", required: false, default: "'info'", description: "Alert variant" },
      { name: "title", type: "string", required: false, description: "Alert title" },
      { name: "dismissible", type: "boolean", required: false, default: "false", description: "Show dismiss button" }
    ],
    examples: [
      {
        title: "Variants",
        code: `<!-- Info -->
<div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
  <div className="flex gap-3">
    <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <div>
      <p className="text-sm font-medium text-blue-800">Information</p>
      <p className="mt-1 text-sm text-blue-700">A new software update is available.</p>
    </div>
  </div>
</div>

<!-- Success -->
<div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
  <div className="flex gap-3">
    <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <div>
      <p className="text-sm font-medium text-emerald-800">Success</p>
      <p className="mt-1 text-sm text-emerald-700">Your changes have been saved.</p>
    </div>
  </div>
</div>

<!-- Warning -->
<div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
  <div className="flex gap-3">
    <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <div>
      <p className="text-sm font-medium text-amber-800">Warning</p>
      <p className="mt-1 text-sm text-amber-700">Your trial expires in 3 days.</p>
    </div>
  </div>
</div>

<!-- Error -->
<div className="p-4 bg-red-50 border border-red-200 rounded-lg">
  <div className="flex gap-3">
    <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <div>
      <p className="text-sm font-medium text-red-800">Error</p>
      <p className="mt-1 text-sm text-red-700">There was an error processing your request.</p>
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
    importStatement: "import { Toast } from '@minimal/ui'",
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
<div className="max-w-sm p-4 bg-white border border-gray-200 rounded-xl shadow-lg">
  <div className="flex items-start gap-3">
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-900">Scheduled: Meeting</p>
      <p className="mt-1 text-sm text-gray-500">Friday, February 10 at 5:57 PM</p>
    </div>
    <button className="text-gray-400 hover:text-gray-600">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
  </div>
</div>

<!-- Success -->
<div className="max-w-sm p-4 bg-white border border-gray-200 rounded-xl shadow-lg">
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
      <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
    </div>
    <p className="text-sm font-medium text-gray-900">Successfully saved!</p>
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
    importStatement: "import { Progress } from '@minimal/ui'",
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
    <span className="text-gray-700">Progress</span>
    <span className="text-gray-500">75%</span>
  </div>
  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
    <div className="h-full bg-gray-900 rounded-full transition-all duration-300" style="width: 75%"></div>
  </div>
</div>`,
        preview: "default"
      },
      {
        title: "Sizes",
        code: `<div className="h-1 bg-gray-100 rounded-full overflow-hidden">
  <div className="h-full bg-gray-900 rounded-full" style="width: 60%"></div>
</div>
<div className="h-2 bg-gray-100 rounded-full overflow-hidden">
  <div className="h-full bg-gray-900 rounded-full" style="width: 60%"></div>
</div>
<div className="h-3 bg-gray-100 rounded-full overflow-hidden">
  <div className="h-full bg-gray-900 rounded-full" style="width: 60%"></div>
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
    importStatement: "import { Skeleton } from '@minimal/ui'",
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
    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
    <div className="space-y-2">
      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
  <div className="space-y-2">
    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
  </div>
</div>`,
        preview: "content"
      },
      {
        title: "Card Loading",
        code: `<div className="p-6 bg-white border border-gray-200 rounded-xl">
  <div className="h-40 bg-gray-200 rounded-lg animate-pulse"></div>
  <div className="mt-4 space-y-2">
    <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse"></div>
    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
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
    importStatement: "import { Spinner } from '@minimal/ui'",
    tailwind: true,
    props: [
      { name: "size", type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: "Spinner size" },
      { name: "color", type: "string", required: false, default: "'currentColor'", description: "Spinner color" }
    ],
    examples: [
      {
        title: "Sizes",
        code: `<svg className="w-4 h-4 animate-spin text-gray-900" viewBox="0 0 24 24" fill="none">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
</svg>

<svg className="w-6 h-6 animate-spin text-gray-900" viewBox="0 0 24 24" fill="none">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
</svg>

<svg className="w-8 h-8 animate-spin text-gray-900" viewBox="0 0 24 24" fill="none">
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
    importStatement: "import { Modal } from '@minimal/ui'",
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
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl">
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900">Modal Title</h2>
      <button className="text-gray-400 hover:text-gray-600">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
    <div className="px-6 py-4">
      <p className="text-sm text-gray-500">Modal content goes here. You can put any content inside.</p>
    </div>
    <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
      <button className="h-10 px-4 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
      <button className="h-10 px-4 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800">Confirm</button>
    </div>
  </div>
</div>`,
        preview: "default"
      },
      {
        title: "Confirmation",
        code: `<div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 text-center">
  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
    <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  </div>
  <h3 className="mt-4 text-lg font-semibold text-gray-900">Delete item?</h3>
  <p className="mt-2 text-sm text-gray-500">This action cannot be undone. This will permanently delete the item.</p>
  <div className="mt-6 flex gap-3">
    <button className="flex-1 h-10 px-4 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
    <button className="flex-1 h-10 px-4 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600">Delete</button>
  </div>
</div>`,
        preview: "confirmation"
      }
    ],
    relatedComponents: ["Dropdown", "Alert"]
  },
  {
    name: "Dropdown",
    slug: "dropdown",
    description: "Floating menu for actions or navigation.",
    category: "Overlays",
    importStatement: "import { Dropdown } from '@minimal/ui'",
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
  <button className="h-10 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 inline-flex items-center gap-2">
    Options
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
  </button>

  <!-- Dropdown Menu -->
  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-10">
    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
      Edit
    </button>
    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
      Duplicate
    </button>
    <div className="my-1 border-t border-gray-100"></div>
    <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
      Delete
    </button>
  </div>
</div>`,
        preview: "default"
      }
    ],
    relatedComponents: ["Modal", "Tooltip", "Select"]
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    description: "Contextual information on hover.",
    category: "Overlays",
    importStatement: "import { Tooltip } from '@minimal/ui'",
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
  <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm">Hover me</button>
  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
    Tooltip text
    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
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
    importStatement: "import { Divider } from '@minimal/ui'",
    tailwind: true,
    props: [
      { name: "orientation", type: "'horizontal' | 'vertical'", required: false, default: "'horizontal'", description: "Divider orientation" },
      { name: "label", type: "string", required: false, description: "Optional center label" }
    ],
    examples: [
      {
        title: "Default",
        code: `<hr className="border-gray-200" />`,
        preview: "default"
      },
      {
        title: "With Label",
        code: `<div className="flex items-center gap-4">
  <hr className="flex-1 border-gray-200" />
  <span className="text-sm text-gray-500">or</span>
  <hr className="flex-1 border-gray-200" />
</div>`,
        preview: "with-label"
      },
      {
        title: "Vertical",
        code: `<div className="flex items-center gap-4 h-8">
  <span className="text-sm text-gray-700">Item 1</span>
  <div className="w-px h-full bg-gray-200"></div>
  <span className="text-sm text-gray-700">Item 2</span>
  <div className="w-px h-full bg-gray-200"></div>
  <span className="text-sm text-gray-700">Item 3</span>
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
    importStatement: "import { Container } from '@minimal/ui'",
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
  }
];
