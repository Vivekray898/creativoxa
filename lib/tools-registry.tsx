import type { ComponentType, ReactElement } from "react";
import WordCounter from "@/components/tools/WordCounter";
import ImageCompressor from "@/components/tools/ImageCompressor";
import UnitConverter from "@/components/tools/UnitConverter";

export type ToolEntry = {
  title: string;
  description: string;
  /**
   * The PascalCase key stored in `tools.component` in the database (see
   * `supabase/migrations/006_tools.sql`).
   */
  componentKey: string;
  component: ComponentType;
  category: string;
};

/**
 * The one place a free tool's implementation is declared.
 *
 * `tools.component` in the database holds the PascalCase `componentKey`, so a row
 * read from Supabase and the equivalent row in `DEFAULT_TOOLS` both resolve to
 * the same build. Lookups accept a slug or a component key.
 */
export const TOOL_REGISTRY: Record<string, ToolEntry> = {
  "word-counter": {
    title: "Word & SEO Counter",
    description: "Professional real-time text analysis for SEO and content length.",
    componentKey: "WordCounter",
    component: WordCounter,
    category: "Content",
  },
  "image-compressor": {
    title: "Ultra Image Compressor",
    description: "Lossless browser-based compression to boost your page speed scores.",
    componentKey: "ImageCompressor",
    component: ImageCompressor,
    category: "Performance",
  },
  "unit-converter": {
    title: "Digital Unit Converter",
    description: "Convert between pixels, REM, and EM for modern responsive design.",
    componentKey: "UnitConverter",
    component: UnitConverter,
    category: "Developer",
  },
};

// Reverse index so `tools.component` values resolve without a hardcoded map.
const BY_COMPONENT_KEY: Record<string, ToolEntry> = Object.fromEntries(
  Object.values(TOOL_REGISTRY).map((entry) => [entry.componentKey, entry])
);

/**
 * Resolves the registry entry for a tool row.
 *
 * The slug is tried first, then the `component` value from the database, so a row
 * with a null `component` still works and an admin can repoint a row at a
 * different build. Returns undefined for a slug that has no implementation —
 * the page renders a holding message rather than crashing.
 */
export function getToolEntry(tool: { slug: string; component?: string | null }) {
  return (
    TOOL_REGISTRY[tool.slug] ?? (tool.component ? BY_COMPONENT_KEY[tool.component] : undefined)
  );
}

/**
 * Renders a tool, or null when the row has no build.
 *
 * This is a switch over statically imported components rather than a lookup of
 * `entry.component` at render time: handing JSX a component reference resolved
 * during render makes React treat it as a freshly created component type, which
 * resets its state on every parent render. The tool components are all stateful
 * (counters, uploaders), so that bug would be immediately visible.
 */
export function renderTool(tool: { slug: string; component?: string | null }): ReactElement | null {
  const entry = getToolEntry(tool);
  if (!entry) return null;

  switch (entry.componentKey) {
    case "WordCounter":
      return <WordCounter />;
    case "ImageCompressor":
      return <ImageCompressor />;
    case "UnitConverter":
      return <UnitConverter />;
    default:
      return null;
  }
}