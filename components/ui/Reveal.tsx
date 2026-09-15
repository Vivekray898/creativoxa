"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds */
  delay?: number;
  as?: ElementType;
};

/**
 * Lightweight scroll-reveal wrapper. Uses IntersectionObserver and
 * respects prefers-reduced-motion via CSS in globals.css.
 */
export default function Reveal({ children, className = "", delay = 0, as }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No IntersectionObserver support: reveal immediately (subscription-free).
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
