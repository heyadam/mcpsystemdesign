// Component prop definition
export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

// Component example with code
export interface ComponentExample {
  title: string;
  description?: string;
  code: string;
  preview?: string;
}

// Documentation sections for component pages
export interface ComponentOverview {
  introduction: string;
  whenToUse: string[];
}

export interface ComponentGuidelines {
  dos: string[];
  donts: string[];
  accessibility?: string[];
}

export interface ComponentSpecs {
  variants?: string[];
  sizes?: string[];
  states?: string[];
}

// Main component interface
export interface Component {
  name: string;
  slug: string;
  description: string;
  category: string;
  props: ComponentProp[];
  examples: ComponentExample[];
  importStatement: string;
  relatedComponents?: string[];
  tailwind?: boolean;
  // Documentation sections
  overview?: ComponentOverview;
  guidelines?: ComponentGuidelines;
  specs?: ComponentSpecs;
}

// Style guide types
export interface ColorToken {
  name: string;
  value: string;
  darkValue?: string; // Optional dark mode variant
  usage?: string;
  cssVar?: string; // CSS variable name (e.g., --color-surface)
  role?: 'background' | 'foreground' | 'border' | 'emphasis'; // Token role for categorization
}

export interface ColorCategory {
  name: string;
  description: string;
  colors: ColorToken[];
}

export interface TypographyStyle {
  name: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing?: string;
  usage: string;
}

export interface SpacingToken {
  name: string;
  value: string;
  pixels: number;
}

export interface Breakpoint {
  name: string;
  value: string;
  description: string;
}

export interface StyleGuide {
  colors: ColorCategory[];
  typography: TypographyStyle[];
  spacing: SpacingToken[];
  breakpoints: Breakpoint[];
}

// Category metadata for navigation
export interface ComponentCategory {
  name: string;
  slug: string;
  description: string;
  order: number;
}

// Design system root
export interface DesignSystem {
  name: string;
  version: string;
  description: string;
  components: Component[];
  categories: ComponentCategory[];
  styleGuide: StyleGuide;
}
