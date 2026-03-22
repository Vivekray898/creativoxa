import type { ComponentType } from 'react';
import WordCounter from "@/components/tools/WordCounter";
import ImageCompressor from "@/components/tools/ImageCompressor";
import UnitConverter from "@/components/tools/UnitConverter"; // Example of a new one

export const TOOL_REGISTRY: Record<string, { 
  title: string; 
  description: string; 
  component: ComponentType;
  category: string;
}> = {
  "word-counter": {
    title: "Word & SEO Counter",
    description: "Professional real-time text analysis for SEO and content length.",
    component: WordCounter,
    category: "Content"
  },
  "image-compressor": {
    title: "Ultra Image Compressor",
    description: "Lossless browser-based compression to boost your page speed scores.",
    component: ImageCompressor,
    category: "Performance"
  },
  "unit-converter": {
    title: "Digital Unit Converter",
    description: "Convert between pixels, REM, and EM for modern responsive design.",
    component: UnitConverter,
    category: "Developer"
  }
};