"use client";

import { useState, type ReactElement } from "react";
import { cn } from "@/lib/pet-helpers";
import { normalizeSpecies } from "@/lib/pet-helpers";

interface PetImageFallbackProps {
  src: string | null | undefined;
  alt: string;
  species: string | null | undefined;
  className?: string;
}

const SPECIES_THEME: Record<
  string,
  { from: string; to: string; icon: ReactElement }
> = {
  perro: {
    from: "#fde68a",
    to: "#f59e0b",
    icon: (
      <path d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7Zm3-1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-5 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
    ),
  },
  gato: {
    from: "#ddd6fe",
    to: "#7c3aed",
    icon: (
      <path d="M6 4l2 3M18 4l-2 3M5 9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Zm4 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
    ),
  },
  ave: {
    from: "#bae6fd",
    to: "#0ea5e9",
    icon: (
      <path d="M12 3c3 0 5 2 5 5 0 2-1 4-3 5l1 4H9l1-4c-2-1-3-3-3-5 0-3 2-5 5-5Z" />
    ),
  },
  otro: {
    from: "#fca5a5",
    to: "#ef4444",
    icon: <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" />,
  },
};

export default function PetImageFallback({
  src,
  alt,
  species,
  className,
}: PetImageFallbackProps) {
  const [failed, setFailed] = useState(false);
  const hasValidSrc = typeof src === "string" && src.trim().length > 0;
  const theme = SPECIES_THEME[normalizeSpecies(species)] ?? SPECIES_THEME.otro;

  if (!hasValidSrc || failed) {
    const gradId = `grad-${normalizeSpecies(species)}-${alt.replace(/\s+/g, "-")}`;
    return (
      <div
        className={cn(
          "flex items-center justify-center overflow-hidden",
          className
        )}
        role="img"
        aria-label={alt}
        style={{
          background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-1/2 w-1/2 text-white/90"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {theme.icon}
        </svg>
        <span className="sr-only">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src as string}
      alt={alt}
      className={cn("object-cover", className)}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
