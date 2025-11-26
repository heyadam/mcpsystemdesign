import type { DesignSystem } from "./types.js";

export const designSystem: DesignSystem = {
  name: "ACME Design System",
  version: "2.0.0",
  description: "A comprehensive design system for building consistent, accessible, and beautiful user interfaces.",

  components: [
    {
      name: "Button",
      description: "A versatile button component that supports multiple variants, sizes, and states. Use buttons for primary actions, form submissions, and interactive elements.",
      category: "Actions",
      importStatement: "import { Button } from '@acme/ui'",
      props: [
        { name: "variant", type: "'primary' | 'secondary' | 'ghost' | 'danger'", required: false, default: "'primary'", description: "Visual style variant of the button" },
        { name: "size", type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: "Size of the button" },
        { name: "disabled", type: "boolean", required: false, default: "false", description: "Whether the button is disabled" },
        { name: "loading", type: "boolean", required: false, default: "false", description: "Shows a loading spinner and disables the button" },
        { name: "leftIcon", type: "ReactNode", required: false, description: "Icon to display on the left side" },
        { name: "rightIcon", type: "ReactNode", required: false, description: "Icon to display on the right side" },
        { name: "fullWidth", type: "boolean", required: false, default: "false", description: "Whether the button should take full width" },
        { name: "onClick", type: "() => void", required: false, description: "Click handler function" },
        { name: "children", type: "ReactNode", required: true, description: "Button content" }
      ],
      examples: [
        {
          title: "Basic Usage",
          description: "Simple button with different variants",
          code: `<Button>Default Button</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`
        },
        {
          title: "With Icons",
          description: "Buttons with leading or trailing icons",
          code: `<Button leftIcon={<PlusIcon />}>Add Item</Button>
<Button rightIcon={<ArrowRightIcon />}>Next Step</Button>`
        },
        {
          title: "Loading State",
          description: "Button in loading state",
          code: `<Button loading>Submitting...</Button>`
        }
      ],
      relatedComponents: ["IconButton", "ButtonGroup", "Link"]
    },
    {
      name: "Input",
      description: "A form input component for text entry with support for validation states, labels, and helper text.",
      category: "Forms",
      importStatement: "import { Input } from '@acme/ui'",
      props: [
        { name: "type", type: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url'", required: false, default: "'text'", description: "Input type" },
        { name: "label", type: "string", required: false, description: "Label text displayed above the input" },
        { name: "placeholder", type: "string", required: false, description: "Placeholder text" },
        { name: "value", type: "string", required: false, description: "Controlled input value" },
        { name: "defaultValue", type: "string", required: false, description: "Default value for uncontrolled usage" },
        { name: "error", type: "string", required: false, description: "Error message to display" },
        { name: "helperText", type: "string", required: false, description: "Helper text displayed below the input" },
        { name: "disabled", type: "boolean", required: false, default: "false", description: "Whether the input is disabled" },
        { name: "required", type: "boolean", required: false, default: "false", description: "Whether the input is required" },
        { name: "onChange", type: "(e: ChangeEvent<HTMLInputElement>) => void", required: false, description: "Change handler" }
      ],
      examples: [
        {
          title: "Basic Input",
          code: `<Input label="Email" placeholder="Enter your email" />`
        },
        {
          title: "With Error State",
          code: `<Input
  label="Email"
  value="invalid-email"
  error="Please enter a valid email address"
/>`
        },
        {
          title: "With Helper Text",
          code: `<Input
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
/>`
        }
      ],
      relatedComponents: ["TextArea", "Select", "FormField"]
    },
    {
      name: "Card",
      description: "A container component for grouping related content with optional header, footer, and various visual styles.",
      category: "Layout",
      importStatement: "import { Card, CardHeader, CardBody, CardFooter } from '@acme/ui'",
      props: [
        { name: "variant", type: "'elevated' | 'outlined' | 'filled'", required: false, default: "'elevated'", description: "Visual style of the card" },
        { name: "padding", type: "'none' | 'sm' | 'md' | 'lg'", required: false, default: "'md'", description: "Internal padding" },
        { name: "hoverable", type: "boolean", required: false, default: "false", description: "Whether to show hover effects" },
        { name: "clickable", type: "boolean", required: false, default: "false", description: "Whether the card is clickable" },
        { name: "children", type: "ReactNode", required: true, description: "Card content" }
      ],
      examples: [
        {
          title: "Basic Card",
          code: `<Card>
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardBody>
    <p>Card content goes here.</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`
        },
        {
          title: "Outlined Card",
          code: `<Card variant="outlined">
  <CardBody>Simple outlined card</CardBody>
</Card>`
        }
      ],
      relatedComponents: ["Paper", "Box", "Container"]
    },
    {
      name: "Modal",
      description: "A dialog overlay component for focused interactions, confirmations, or displaying additional content.",
      category: "Overlays",
      importStatement: "import { Modal, ModalHeader, ModalBody, ModalFooter } from '@acme/ui'",
      props: [
        { name: "isOpen", type: "boolean", required: true, description: "Whether the modal is visible" },
        { name: "onClose", type: "() => void", required: true, description: "Callback when modal should close" },
        { name: "size", type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", required: false, default: "'md'", description: "Modal size" },
        { name: "closeOnOverlayClick", type: "boolean", required: false, default: "true", description: "Whether clicking overlay closes modal" },
        { name: "closeOnEsc", type: "boolean", required: false, default: "true", description: "Whether pressing Escape closes modal" },
        { name: "children", type: "ReactNode", required: true, description: "Modal content" }
      ],
      examples: [
        {
          title: "Confirmation Modal",
          code: `const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader>Confirm Action</ModalHeader>
  <ModalBody>
    Are you sure you want to proceed?
  </ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button variant="danger">Confirm</Button>
  </ModalFooter>
</Modal>`
        }
      ],
      relatedComponents: ["Dialog", "Drawer", "AlertDialog"]
    },
    {
      name: "Avatar",
      description: "A component for displaying user profile images with fallback to initials or a default icon.",
      category: "Data Display",
      importStatement: "import { Avatar, AvatarGroup } from '@acme/ui'",
      props: [
        { name: "src", type: "string", required: false, description: "Image source URL" },
        { name: "alt", type: "string", required: false, description: "Alt text for the image" },
        { name: "name", type: "string", required: false, description: "User name for generating initials fallback" },
        { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", required: false, default: "'md'", description: "Avatar size" },
        { name: "status", type: "'online' | 'offline' | 'away' | 'busy'", required: false, description: "Status indicator" }
      ],
      examples: [
        {
          title: "Basic Avatar",
          code: `<Avatar src="/user.jpg" alt="John Doe" />
<Avatar name="John Doe" />  {/* Shows "JD" */}
<Avatar />  {/* Shows default icon */}`
        },
        {
          title: "Avatar Group",
          code: `<AvatarGroup max={3}>
  <Avatar name="Alice" />
  <Avatar name="Bob" />
  <Avatar name="Charlie" />
  <Avatar name="Diana" />
</AvatarGroup>`
        }
      ],
      relatedComponents: ["Badge", "UserCard"]
    },
    {
      name: "Toast",
      description: "A notification component for displaying brief messages to users about actions or events.",
      category: "Feedback",
      importStatement: "import { useToast } from '@acme/ui'",
      props: [
        { name: "title", type: "string", required: false, description: "Toast title" },
        { name: "description", type: "string", required: false, description: "Toast message content" },
        { name: "status", type: "'info' | 'success' | 'warning' | 'error'", required: false, default: "'info'", description: "Toast type/color" },
        { name: "duration", type: "number", required: false, default: "5000", description: "Duration in ms before auto-dismiss" },
        { name: "isClosable", type: "boolean", required: false, default: "true", description: "Whether to show close button" }
      ],
      examples: [
        {
          title: "Using Toast Hook",
          code: `const toast = useToast();

toast({
  title: "Success!",
  description: "Your changes have been saved.",
  status: "success",
  duration: 3000,
});`
        },
        {
          title: "Error Toast",
          code: `toast({
  title: "Error",
  description: "Something went wrong. Please try again.",
  status: "error",
  isClosable: true,
});`
        }
      ],
      relatedComponents: ["Alert", "Notification"]
    }
  ],

  styleGuide: {
    colors: [
      {
        name: "Primary",
        description: "Primary brand colors used for main actions and emphasis",
        colors: [
          { name: "primary-50", value: "#EEF2FF", usage: "Subtle backgrounds" },
          { name: "primary-100", value: "#E0E7FF", usage: "Hover backgrounds" },
          { name: "primary-200", value: "#C7D2FE", usage: "Active backgrounds" },
          { name: "primary-300", value: "#A5B4FC", usage: "Borders" },
          { name: "primary-400", value: "#818CF8", usage: "Icons" },
          { name: "primary-500", value: "#6366F1", usage: "Primary buttons, links" },
          { name: "primary-600", value: "#4F46E5", usage: "Hover states" },
          { name: "primary-700", value: "#4338CA", usage: "Active/pressed states" },
          { name: "primary-800", value: "#3730A3", usage: "Text on light backgrounds" },
          { name: "primary-900", value: "#312E81", usage: "Headings" }
        ]
      },
      {
        name: "Neutral",
        description: "Grayscale colors for text, backgrounds, and borders",
        colors: [
          { name: "gray-50", value: "#F9FAFB", usage: "Page backgrounds" },
          { name: "gray-100", value: "#F3F4F6", usage: "Subtle backgrounds" },
          { name: "gray-200", value: "#E5E7EB", usage: "Borders, dividers" },
          { name: "gray-300", value: "#D1D5DB", usage: "Disabled borders" },
          { name: "gray-400", value: "#9CA3AF", usage: "Placeholder text" },
          { name: "gray-500", value: "#6B7280", usage: "Secondary text" },
          { name: "gray-600", value: "#4B5563", usage: "Body text" },
          { name: "gray-700", value: "#374151", usage: "Labels" },
          { name: "gray-800", value: "#1F2937", usage: "Headings" },
          { name: "gray-900", value: "#111827", usage: "Primary text" }
        ]
      },
      {
        name: "Semantic",
        description: "Colors for status, feedback, and meaning",
        colors: [
          { name: "success", value: "#10B981", description: "Success states and positive actions" },
          { name: "success-light", value: "#D1FAE5", description: "Success backgrounds" },
          { name: "warning", value: "#F59E0B", description: "Warning states and caution" },
          { name: "warning-light", value: "#FEF3C7", description: "Warning backgrounds" },
          { name: "error", value: "#EF4444", description: "Error states and destructive actions" },
          { name: "error-light", value: "#FEE2E2", description: "Error backgrounds" },
          { name: "info", value: "#3B82F6", description: "Informational states" },
          { name: "info-light", value: "#DBEAFE", description: "Info backgrounds" }
        ]
      }
    ],
    typography: [
      { name: "display-xl", fontFamily: "Inter, sans-serif", fontSize: "4.5rem", fontWeight: "800", lineHeight: "1", usage: "Hero sections, large marketing headers" },
      { name: "display-lg", fontFamily: "Inter, sans-serif", fontSize: "3.75rem", fontWeight: "800", lineHeight: "1", usage: "Page titles, major section headers" },
      { name: "h1", fontFamily: "Inter, sans-serif", fontSize: "2.25rem", fontWeight: "700", lineHeight: "1.2", usage: "Page headings" },
      { name: "h2", fontFamily: "Inter, sans-serif", fontSize: "1.875rem", fontWeight: "600", lineHeight: "1.25", usage: "Section headings" },
      { name: "h3", fontFamily: "Inter, sans-serif", fontSize: "1.5rem", fontWeight: "600", lineHeight: "1.3", usage: "Subsection headings" },
      { name: "h4", fontFamily: "Inter, sans-serif", fontSize: "1.25rem", fontWeight: "600", lineHeight: "1.4", usage: "Card titles, smaller headings" },
      { name: "body-lg", fontFamily: "Inter, sans-serif", fontSize: "1.125rem", fontWeight: "400", lineHeight: "1.75", usage: "Lead paragraphs, important body text" },
      { name: "body", fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: "400", lineHeight: "1.75", usage: "Default body text" },
      { name: "body-sm", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: "400", lineHeight: "1.5", usage: "Secondary text, captions" },
      { name: "caption", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: "400", lineHeight: "1.5", letterSpacing: "0.025em", usage: "Labels, helper text, metadata" },
      { name: "code", fontFamily: "JetBrains Mono, monospace", fontSize: "0.875rem", fontWeight: "400", lineHeight: "1.5", usage: "Code blocks, technical content" }
    ],
    spacing: [
      { name: "0", value: "0", pixels: 0 },
      { name: "px", value: "1px", pixels: 1 },
      { name: "0.5", value: "0.125rem", pixels: 2 },
      { name: "1", value: "0.25rem", pixels: 4 },
      { name: "1.5", value: "0.375rem", pixels: 6 },
      { name: "2", value: "0.5rem", pixels: 8 },
      { name: "2.5", value: "0.625rem", pixels: 10 },
      { name: "3", value: "0.75rem", pixels: 12 },
      { name: "3.5", value: "0.875rem", pixels: 14 },
      { name: "4", value: "1rem", pixels: 16 },
      { name: "5", value: "1.25rem", pixels: 20 },
      { name: "6", value: "1.5rem", pixels: 24 },
      { name: "7", value: "1.75rem", pixels: 28 },
      { name: "8", value: "2rem", pixels: 32 },
      { name: "9", value: "2.25rem", pixels: 36 },
      { name: "10", value: "2.5rem", pixels: 40 },
      { name: "12", value: "3rem", pixels: 48 },
      { name: "14", value: "3.5rem", pixels: 56 },
      { name: "16", value: "4rem", pixels: 64 },
      { name: "20", value: "5rem", pixels: 80 },
      { name: "24", value: "6rem", pixels: 96 },
      { name: "32", value: "8rem", pixels: 128 }
    ],
    breakpoints: [
      { name: "xs", value: "475px", description: "Extra small devices, large phones" },
      { name: "sm", value: "640px", description: "Small devices, tablets in portrait" },
      { name: "md", value: "768px", description: "Medium devices, tablets in landscape" },
      { name: "lg", value: "1024px", description: "Large devices, laptops" },
      { name: "xl", value: "1280px", description: "Extra large devices, desktops" },
      { name: "2xl", value: "1536px", description: "Large desktops and above" }
    ]
  }
};
