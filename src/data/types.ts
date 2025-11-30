export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

export interface ComponentExample {
  title: string;
  description?: string;
  code: string;
}

export interface Component {
  name: string;
  description: string;
  category: string;
  props: ComponentProp[];
  examples: ComponentExample[];
  usageNote: string;
  relatedComponents?: string[];
}

export interface ColorToken {
  name: string;
  value: string;
  description?: string;
  usage?: string;
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

export interface DesignSystem {
  name: string;
  version: string;
  description: string;
  components: Component[];
  styleGuide: StyleGuide;
}
