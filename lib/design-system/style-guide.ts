import type { StyleGuide, ComponentCategory } from './types';

export const styleGuide: StyleGuide = {
  colors: [
    {
      name: "Gray Scale",
      description: "Neutral palette for text, backgrounds, and borders",
      colors: [
        { name: "gray-50", value: "#FAFAFA", usage: "Subtle backgrounds" },
        { name: "gray-100", value: "#F4F4F5", usage: "Secondary backgrounds" },
        { name: "gray-200", value: "#E4E4E7", usage: "Borders, dividers" },
        { name: "gray-300", value: "#D4D4D8", usage: "Disabled borders" },
        { name: "gray-400", value: "#A1A1AA", usage: "Placeholder text" },
        { name: "gray-500", value: "#71717A", usage: "Secondary text" },
        { name: "gray-600", value: "#52525B", usage: "Tertiary text" },
        { name: "gray-700", value: "#3F3F46", usage: "Primary text light" },
        { name: "gray-800", value: "#27272A", usage: "Headings" },
        { name: "gray-900", value: "#18181B", usage: "Primary text" },
        { name: "gray-950", value: "#09090B", usage: "High contrast" }
      ]
    },
    {
      name: "Accent",
      description: "Semantic colors for states and actions",
      colors: [
        { name: "blue-500", value: "#3B82F6", usage: "Links, focus rings" },
        { name: "emerald-500", value: "#10B981", usage: "Success states" },
        { name: "amber-500", value: "#F59E0B", usage: "Warning states" },
        { name: "red-500", value: "#EF4444", usage: "Error states, destructive" }
      ]
    }
  ],
  typography: [
    { name: "Display", fontFamily: "Inter, system-ui, sans-serif", fontSize: "3.5rem", fontWeight: "600", lineHeight: "1.1", letterSpacing: "-0.02em", usage: "Hero headlines" },
    { name: "H1", fontFamily: "Inter, system-ui, sans-serif", fontSize: "2.25rem", fontWeight: "600", lineHeight: "1.2", letterSpacing: "-0.02em", usage: "Page titles" },
    { name: "H2", fontFamily: "Inter, system-ui, sans-serif", fontSize: "1.5rem", fontWeight: "600", lineHeight: "1.3", letterSpacing: "-0.01em", usage: "Section headers" },
    { name: "H3", fontFamily: "Inter, system-ui, sans-serif", fontSize: "1.125rem", fontWeight: "600", lineHeight: "1.4", usage: "Card titles" },
    { name: "Body", fontFamily: "Inter, system-ui, sans-serif", fontSize: "1rem", fontWeight: "400", lineHeight: "1.6", usage: "Paragraphs" },
    { name: "Small", fontFamily: "Inter, system-ui, sans-serif", fontSize: "0.875rem", fontWeight: "400", lineHeight: "1.5", usage: "Secondary text" },
    { name: "Caption", fontFamily: "Inter, system-ui, sans-serif", fontSize: "0.75rem", fontWeight: "500", lineHeight: "1.4", usage: "Labels, metadata" },
    { name: "Code", fontFamily: "JetBrains Mono, Menlo, monospace", fontSize: "0.875rem", fontWeight: "400", lineHeight: "1.6", usage: "Code blocks" }
  ],
  spacing: [
    { name: "0", value: "0", pixels: 0 },
    { name: "1", value: "0.25rem", pixels: 4 },
    { name: "2", value: "0.5rem", pixels: 8 },
    { name: "3", value: "0.75rem", pixels: 12 },
    { name: "4", value: "1rem", pixels: 16 },
    { name: "5", value: "1.25rem", pixels: 20 },
    { name: "6", value: "1.5rem", pixels: 24 },
    { name: "8", value: "2rem", pixels: 32 },
    { name: "10", value: "2.5rem", pixels: 40 },
    { name: "12", value: "3rem", pixels: 48 },
    { name: "16", value: "4rem", pixels: 64 },
    { name: "20", value: "5rem", pixels: 80 },
    { name: "24", value: "6rem", pixels: 96 }
  ],
  breakpoints: [
    { name: "sm", value: "640px", description: "Mobile landscape" },
    { name: "md", value: "768px", description: "Tablet" },
    { name: "lg", value: "1024px", description: "Desktop" },
    { name: "xl", value: "1280px", description: "Large desktop" },
    { name: "2xl", value: "1536px", description: "Wide screens" }
  ]
};

export const categories: ComponentCategory[] = [
  { name: "Base", slug: "base", description: "Foundational design tokens and styles", order: 0 },
  { name: "Actions", slug: "actions", description: "Interactive button and link components", order: 1 },
  { name: "Forms", slug: "forms", description: "Form inputs and controls", order: 2 },
  { name: "Data Display", slug: "data-display", description: "Components for displaying information", order: 3 },
  { name: "Feedback", slug: "feedback", description: "User feedback and notification components", order: 4 },
  { name: "Overlays", slug: "overlays", description: "Modal, dialog, and overlay components", order: 5 },
  { name: "Navigation", slug: "navigation", description: "Navigation and wayfinding components", order: 6 },
  { name: "Layout", slug: "layout", description: "Layout and structure components", order: 7 }
];
