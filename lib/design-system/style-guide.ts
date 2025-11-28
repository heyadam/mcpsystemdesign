import type { StyleGuide, ComponentCategory } from './types';

export const styleGuide: StyleGuide = {
  colors: [
    // ===================================
    // SEMANTIC TOKENS - Theme-adaptive
    // ===================================
    {
      name: "Surfaces",
      description: "Theme-adaptive background colors",
      colors: [
        { name: "surface", value: "#ffffff", darkValue: "#030712", cssVar: "--color-surface", role: "background", usage: "Primary background" },
        { name: "surface-raised", value: "#ffffff", darkValue: "#111827", cssVar: "--color-surface-raised", role: "background", usage: "Elevated surfaces (cards, modals)" },
        { name: "surface-sunken", value: "#f9fafb", darkValue: "#030712", cssVar: "--color-surface-sunken", role: "background", usage: "Recessed backgrounds" },
        { name: "surface-overlay", value: "rgba(0, 0, 0, 0.5)", darkValue: "rgba(0, 0, 0, 0.7)", cssVar: "--color-surface-overlay", role: "background", usage: "Modal/dialog backdrops" },
        { name: "surface-hover", value: "#f9fafb", darkValue: "#1f2937", cssVar: "--color-surface-hover", role: "background", usage: "Hover state backgrounds" }
      ]
    },
    {
      name: "Text",
      description: "Theme-adaptive text colors",
      colors: [
        { name: "text", value: "#111827", darkValue: "#f9fafb", cssVar: "--color-text", role: "foreground", usage: "Primary text" },
        { name: "text-muted", value: "#6b7280", darkValue: "#9ca3af", cssVar: "--color-text-muted", role: "foreground", usage: "Secondary text" },
        { name: "text-subtle", value: "#9ca3af", darkValue: "#6b7280", cssVar: "--color-text-subtle", role: "foreground", usage: "Tertiary/placeholder text" }
      ]
    },
    {
      name: "Borders",
      description: "Theme-adaptive border colors",
      colors: [
        { name: "border", value: "#e5e7eb", darkValue: "#1f2937", cssVar: "--color-border", role: "border", usage: "Default borders" },
        { name: "border-muted", value: "#f3f4f6", darkValue: "#111827", cssVar: "--color-border-muted", role: "border", usage: "Subtle borders" },
        { name: "border-emphasis", value: "#d1d5db", darkValue: "#374151", cssVar: "--color-border-emphasis", role: "border", usage: "Emphasized borders (focus rings)" }
      ]
    },
    {
      name: "Primary",
      description: "Primary action and brand colors",
      colors: [
        { name: "primary", value: "#000000", darkValue: "#ffffff", cssVar: "--color-primary", role: "emphasis", usage: "Primary buttons, links" },
        { name: "primary-hover", value: "#1f2937", darkValue: "#e5e7eb", cssVar: "--color-primary-hover", role: "emphasis", usage: "Primary hover state" },
        { name: "primary-foreground", value: "#ffffff", darkValue: "#000000", cssVar: "--color-primary-foreground", role: "foreground", usage: "Text on primary background" }
      ]
    },
    // ===================================
    // STATE TOKENS - Theme-adaptive
    // ===================================
    {
      name: "Success",
      description: "Success and positive state colors",
      colors: [
        { name: "success", value: "#ecfdf5", darkValue: "rgba(16, 185, 129, 0.15)", cssVar: "--color-success", role: "background", usage: "Success background" },
        { name: "success-emphasis", value: "#10b981", darkValue: "#10b981", cssVar: "--color-success-emphasis", role: "emphasis", usage: "Success icons, badges" },
        { name: "success-foreground", value: "#065f46", darkValue: "#6ee7b7", cssVar: "--color-success-foreground", role: "foreground", usage: "Success text" },
        { name: "success-border", value: "#a7f3d0", darkValue: "#065f46", cssVar: "--color-success-border", role: "border", usage: "Success border" }
      ]
    },
    {
      name: "Error",
      description: "Error and destructive state colors",
      colors: [
        { name: "error", value: "#fef2f2", darkValue: "rgba(239, 68, 68, 0.15)", cssVar: "--color-error", role: "background", usage: "Error background" },
        { name: "error-emphasis", value: "#ef4444", darkValue: "#ef4444", cssVar: "--color-error-emphasis", role: "emphasis", usage: "Error icons, badges" },
        { name: "error-foreground", value: "#991b1b", darkValue: "#fca5a5", cssVar: "--color-error-foreground", role: "foreground", usage: "Error text" },
        { name: "error-border", value: "#fecaca", darkValue: "#991b1b", cssVar: "--color-error-border", role: "border", usage: "Error border" }
      ]
    },
    {
      name: "Warning",
      description: "Warning and caution state colors",
      colors: [
        { name: "warning", value: "#fffbeb", darkValue: "rgba(245, 158, 11, 0.15)", cssVar: "--color-warning", role: "background", usage: "Warning background" },
        { name: "warning-emphasis", value: "#f59e0b", darkValue: "#f59e0b", cssVar: "--color-warning-emphasis", role: "emphasis", usage: "Warning icons, badges" },
        { name: "warning-foreground", value: "#92400e", darkValue: "#fcd34d", cssVar: "--color-warning-foreground", role: "foreground", usage: "Warning text" },
        { name: "warning-border", value: "#fde68a", darkValue: "#92400e", cssVar: "--color-warning-border", role: "border", usage: "Warning border" }
      ]
    },
    {
      name: "Info",
      description: "Informational state colors",
      colors: [
        { name: "info", value: "#eff6ff", darkValue: "rgba(59, 130, 246, 0.15)", cssVar: "--color-info", role: "background", usage: "Info background" },
        { name: "info-emphasis", value: "#3b82f6", darkValue: "#3b82f6", cssVar: "--color-info-emphasis", role: "emphasis", usage: "Info icons, badges" },
        { name: "info-foreground", value: "#1e40af", darkValue: "#93c5fd", cssVar: "--color-info-foreground", role: "foreground", usage: "Info text" },
        { name: "info-border", value: "#bfdbfe", darkValue: "#1e40af", cssVar: "--color-info-border", role: "border", usage: "Info border" }
      ]
    },
    // ===================================
    // REFERENCE PALETTES
    // ===================================
    {
      name: "Gray Scale",
      description: "Neutral reference palette (prefer semantic tokens above)",
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
  { name: "Actions", slug: "actions", description: "Interactive button and link components", order: 0 },
  { name: "AI", slug: "ai", description: "AI chat and assistant interface components", order: 1 },
  { name: "Base", slug: "base", description: "Foundational design tokens and styles", order: 2 },
  { name: "Data Display", slug: "data-display", description: "Components for displaying information", order: 3 },
  { name: "Feedback", slug: "feedback", description: "User feedback and notification components", order: 4 },
  { name: "Forms", slug: "forms", description: "Form inputs and controls", order: 5 },
  { name: "Layout", slug: "layout", description: "Layout and structure components", order: 6 },
  { name: "Navigation", slug: "navigation", description: "Navigation and wayfinding components", order: 7 },
  { name: "Overlays", slug: "overlays", description: "Modal, dialog, and overlay components", order: 8 }
];
