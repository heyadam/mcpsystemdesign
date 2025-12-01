import type { DesignSystem, Component, ComponentCategory } from './types';
import { components } from './components';
import { styleGuide, categories } from './style-guide';
import { getAllWebComponents, type WebComponentDoc } from './web-components';

// Re-export types
export * from './types';
export type { WebComponentDoc } from './web-components';

// Re-export data
export { components } from './components';
export { styleGuide, categories } from './style-guide';
export { getAllWebComponents, getWebComponentByTag, searchWebComponents } from './web-components';

// Main design system object
export const designSystem: DesignSystem = {
  name: "mcpsystem.design",
  version: "1.0.0",
  description: "Tailwind CSS component patterns for AI assistants via MCP. Copy-paste recipes, not a component library.",
  components,
  categories,
  styleGuide,
};

// ============ COMPONENT HELPERS ============

/**
 * Get a component by its URL slug
 */
export function getComponentBySlug(slug: string): Component | undefined {
  return components.find(c => c.slug === slug);
}

/**
 * Get a component by its name (case-insensitive)
 */
export function getComponentByName(name: string): Component | undefined {
  return components.find(c => c.name.toLowerCase() === name.toLowerCase());
}

/**
 * Get all components in a category
 */
export function getComponentsByCategory(category: string): Component[] {
  return components.filter(c => c.category.toLowerCase() === category.toLowerCase());
}

/**
 * Search components by name or description
 */
export function searchComponents(query: string): Component[] {
  const q = query.toLowerCase();
  return components.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q) ||
    c.category.toLowerCase().includes(q)
  );
}

/**
 * Get components grouped by category
 */
export function getComponentsGroupedByCategory(): Record<string, Component[]> {
  return components.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, Component[]>);
}

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): ComponentCategory | undefined {
  return categories.find(c => c.slug === slug);
}

/**
 * Get all unique category names
 */
export function getAllCategories(): string[] {
  return [...new Set(components.map(c => c.category))];
}

/**
 * Get related components for a component
 */
export function getRelatedComponents(component: Component): Component[] {
  if (!component.relatedComponents) return [];
  return component.relatedComponents
    .map(name => getComponentByName(name))
    .filter((c): c is Component => c !== undefined);
}

// ============ NAVIGATION HELPERS ============

/**
 * Get patterns grouped by category with full metadata.
 * Use this when you need the complete category info (name, slug, description).
 * For sidebar navigation, use getAllNavigation() instead.
 */
export function getNavigationItems(): Array<{ category: ComponentCategory; components: Component[] }> {
  return categories
    .sort((a, b) => a.order - b.order)
    .map(category => ({
      category,
      components: getComponentsByCategory(category.name)
    }));
}

// ============ UNIFIED NAVIGATION ============

/**
 * Navigation item - a single link in the sidebar
 */
export interface NavItem {
  title: string;
  href: string;
  anchors?: { id: string; label: string }[]; // For in-page sections
}

/**
 * Navigation category - a group of items under a section (e.g., "Actions" under "Components")
 */
export interface NavCategory {
  id: string;
  title: string;
  items: NavItem[];
}

/**
 * Navigation section - a top-level collapsible group in the sidebar accordion
 */
export interface NavSection {
  id: string;
  title: string;
  items?: NavItem[];           // Direct items (for Docs)
  categories?: NavCategory[];  // Nested categories (for Components)
}

/**
 * Get complete site navigation structure for unified sidebar
 * This is the single source of truth for all navigation
 * Returns 4 main sections: Home, Docs, Patterns, and Components (all expanded by default)
 */
export function getAllNavigation(): NavSection[] {
  const webComponents = getAllWebComponents();

  return [
    // Home section
    {
      id: 'home',
      title: 'Home',
      items: [
        {
          title: 'Home',
          href: '/',
        },
      ],
    },
    // Documentation section
    {
      id: 'docs',
      title: 'Docs',
      items: [
        {
          title: 'Getting Started',
          href: '/docs/getting-started',
          anchors: [
            { id: 'cursor', label: 'Cursor' },
            { id: 'claude-code', label: 'Claude Code' },
            { id: 'verification', label: 'Verification' },
            { id: 'tools', label: 'Available Tools' },
          ],
        },
      ],
    },
    // Patterns section with nested categories (Tailwind CSS patterns)
    {
      id: 'patterns',
      title: 'Patterns',
      items: [
        {
          title: 'All Patterns',
          href: '/patterns',
        },
      ],
      categories: categories.sort((a, b) => a.order - b.order).map(category => ({
        id: category.slug,
        title: category.name,
        items: getComponentsByCategory(category.name).map(c => ({
          title: c.name,
          href: `/patterns/${c.slug}`,
        })),
      })),
    },
    // Components section (@mcpsystem/ui Web Components)
    {
      id: 'components',
      title: 'Components',
      items: [
        {
          title: 'All Components',
          href: '/components',
        },
        ...webComponents.map(c => ({
          title: c.name,
          href: `/components/${c.tagName}`,
        })),
      ],
    },
  ];
}

// ============ STYLE GUIDE HELPERS ============

/**
 * Get all colors flattened
 */
export function getAllColors() {
  return styleGuide.colors.flatMap(category =>
    category.colors.map(color => ({
      ...color,
      category: category.name
    }))
  );
}

/**
 * Get color by name
 */
export function getColorByName(name: string) {
  for (const category of styleGuide.colors) {
    const color = category.colors.find(c => c.name === name);
    if (color) return { ...color, category: category.name };
  }
  return undefined;
}

// ============ STATS ============

/**
 * Get design system statistics
 */
export function getDesignSystemStats() {
  return {
    totalComponents: components.length,
    categories: getAllCategories(),
    totalCategories: categories.length,
    totalColors: getAllColors().length,
    totalTypographyStyles: styleGuide.typography.length,
    totalSpacingTokens: styleGuide.spacing.length,
    totalBreakpoints: styleGuide.breakpoints.length
  };
}
