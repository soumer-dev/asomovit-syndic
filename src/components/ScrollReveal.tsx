"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import type React from "react";

interface ScrollRevealProps {
  children: ReactNode;
  /** Extra Tailwind / CSS classes forwarded to the wrapper element. */
  className?: string;
  /** HTML tag to render. Defaults to "div". */
  as?: ElementType;
  /**
   * Stagger delay in ms applied to direct children via CSS custom property.
   * Set to 0 to disable stagger (all children animate together).
   * Default: 80ms between children.
   */
  stagger?: number;
  /** Base delay before the first child animates (ms). Default: 0. */
  delay?: number;
  /** IntersectionObserver threshold. Default: 0.1. */
  threshold?: number;
}

/**
 * Wraps any block in a scroll-triggered fade-up reveal.
 *
 * Children receive a `--reveal-delay` CSS custom property so they can
 * stagger independently using the `.reveal-child` class defined in globals.css.
 *
 * Usage:
 *   <ScrollReveal stagger={80}>
 *     <Card />
 *     <Card />
 *     <Card />
 *   </ScrollReveal>
 */
export function ScrollReveal({
  children,
  className = "",
  as: Tag = "div",
  stagger = 80,
  delay = 0,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion — skip animation entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("sr-visible");
      return;
    }

    // Stamp stagger delays on direct children
    if (stagger > 0) {
      Array.from(el.children).forEach((child, i) => {
        (child as HTMLElement).style.setProperty("--reveal-delay", `${delay + i * stagger}ms`);
      });
    } else if (delay > 0) {
      el.style.setProperty("--reveal-delay", `${delay}ms`);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("sr-visible");
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger, delay, threshold]);

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={`sr-container ${className}`}>
      {children}
    </Tag>
  );
}
