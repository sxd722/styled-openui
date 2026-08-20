import React from "react";

/**
 * Minimal inline-markup renderer shared by @openui-style libraries.
 *
 * Supports the editorial subset: **bold**, *italic*, and [text](url) links.
 * Deliberately dependency-free so style packages ship zero runtime deps and
 * stay consumable from CJS and ESM alike. Anything unrecognized is
 * rendered as plain text.
 */

const INLINE_TOKEN =
  /(\*\*[^*\n]+\*\*|\*[^*\n]+\*|\[[^\]\n]+\]\([^)\s]+\))/g;

// Stateless counterpart of INLINE_TOKEN for .test() — a /g regex would carry
// lastIndex between calls and misclassify alternating parts.
const IS_INLINE_TOKEN =
  /^(?:\*\*[^*\n]+\*\*|\*[^*\n]+\*|\[[^\]\n]+\]\([^)\s]+\))$/;

function renderToken(token: string, keyPrefix: string): React.ReactNode {
  if (token.startsWith("**")) {
    return <strong key={keyPrefix}>{token.slice(2, -2)}</strong>;
  }
  if (token.startsWith("*")) {
    return <em key={keyPrefix}>{token.slice(1, -1)}</em>;
  }
  const match = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token);
  if (match) {
    return (
      <a key={keyPrefix} href={match[2]}>
        {match[1]}
      </a>
    );
  }
  return token;
}

export function renderInlineMarkup(text: string): React.ReactNode[] {
  const parts = text.split(INLINE_TOKEN).filter((part) => part !== "");
  return parts.map((part, i) =>
    IS_INLINE_TOKEN.test(part) ? renderToken(part, `mk-${i}`) : part,
  );
}

/** Split raw prose into paragraphs on blank lines and render each. */
export function renderParagraphs(text: string): React.ReactNode[] {
  const paragraphs = String(text ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  return paragraphs.map((paragraph, i) => (
    <p key={`p-${i}`}>{renderInlineMarkup(paragraph)}</p>
  ));
}
