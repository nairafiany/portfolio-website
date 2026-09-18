"use client";

import Link from "next/link";

export default function TransitionLink({
  href,
  onClick,
  children,
  transitionLabel,
  transitionNumber,
  direction = "forward",
  ...props
}) {
  const handleClick = (event) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      (event.currentTarget.target && event.currentTarget.target !== "_self") ||
      event.currentTarget.hasAttribute("download")
    ) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const card = event.currentTarget.closest("article");
    if (card) card.dataset.navigating = "true";

    window.dispatchEvent(
      new CustomEvent("portfolio:project-navigation", {
        detail: {
          label: transitionLabel,
          number: transitionNumber,
          direction,
        },
      }),
    );

    // Keep this animation independent of navigation. A view-transition update
    // callback pauses rendering, so waiting for animation frames can time out.
    // Next's Link owns the asynchronous route update; the overlay is decorative.
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
