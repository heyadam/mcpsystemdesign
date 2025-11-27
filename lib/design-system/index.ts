import type { DesignSystem, Component, ComponentCategory } from './types';
import { components } from './components';
import { styleGuide, categories } from './style-guide';

// Re-export types
export * from './types';

// Re-export data
export { components } from './components';
export { styleGuide, categories } from './style-guide';

// Main design system object
export const designSystem: DesignSystem = {
  name: "AI Design System",
  version: "1.0.0",
  description: "A comprehensive, AI-first design system optimized for MCP integrations and built with Tailwind CSS.",
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
 * Get navigation structure for sidebar
 */
export function getNavigationItems(): Array<{ category: ComponentCategory; components: Component[] }> {
  return categories
    .sort((a, b) => a.order - b.order)
    .map(category => ({
      category,
      components: getComponentsByCategory(category.name)
    }));
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
