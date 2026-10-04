import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

// Markdown from the CMS is converted to HTML and sanitised on the server before
// it ever reaches the browser. Nothing from the database is rendered raw, and
// the allowlist below is the complete set of tags an article may use.
//
// Server-only: imported by server components and never by client components.

const ALLOWED_TAGS = [
  "h2",
  "h3",
  "h4",
  "p",
  "a",
  "ul",
  "ol",
  "li",
  "strong",
  "em",
  "blockquote",
  "code",
  "pre",
  "hr",
  "br",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "img",
];

export function renderMarkdown(markdown: string | null | undefined): string {
  if (!markdown) return "";

  const html = marked.parse(markdown, { gfm: true }) as string;

  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "title"],
      code: ["class"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    // External links open safely in a new tab; internal links behave normally.
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        const external = /^https?:\/\//i.test(href);
        return {
          tagName,
          attribs: external
            ? { ...attribs, target: "_blank", rel: "noopener noreferrer" }
            : attribs,
        };
      },
    },
  });
}
