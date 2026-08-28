"use client";

import { cn } from "@/lib/pet-helpers";
import type { PetStats, PetStatus } from "@/types/pet";

interface StatsBannerProps {
  stats: PetStats;
  activeStatus: PetStatus | "todos";
  onSelect: (status: PetStatus | "todos") => void;
}

const ACCENT: Record<PetStatus | "todos", string> = {
  todos: "from-slate-700 to-slate-900",
  perdido: "from-red-500 to-red-600",
  encontrado: "from-emerald-500 to-emerald-600",
  en_adopcion: "from-blue-500 to-blue-600",
};

const CARDS: Array<{
  key: PetStatus | "todos";
  label: string;
}> = [
  { key: "todos", label: "Total" },
  { key: "perdido", label: "Perdidos" },
  { key: "encontrado", label: "Encontrados" },
  { key: "en_adopcion", label: "En adopción" },
];

export default function StatsBanner({
  stats,
  activeStatus,
  onSelect,
}: StatsBannerProps) {
  const valueFor = (key: PetStatus | "todos") => {
    if (key === "todos") return stats.total;
    if (key === "perdido") return stats.lost;
    if (key === "encontrado") return stats.found;
    return stats.adoption;
  };

  return (
    <section
      id="estadisticas"
      aria-label="Estadísticas de mascotas"
      className="mx-auto w-full max-w-6xl px-4 py-4"
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CARDS.map((card) => {
          const isActive = activeStatus === card.key;
          const accent = ACCENT[card.key];
          return (
            <button
              key={card.key}
              type="button"
              onClick={() => onSelect(card.key)}
              aria-pressed={isActive}
              className={cn(
                "touch-target flex flex-col items-start justify-center rounded-2xl p-4 text-left shadow-sm ring-1 transition animate-fade-in",
                isActive
                  ? "ring-2 ring-brand-primary bg-white"
                  : "ring-white/60 bg-white/70 hover:bg-white"
              )}
            >
              <span
                className={cn(
                  "mb-1 inline-block rounded-full bg-gradient-to-r px-2 py-0.5 text-[11px] font-semibold text-white",
                  accent
                )}
              >
                {card.label}
              </span>
              <span className="text-3xl font-extrabold text-slate-800">
                {valueFor(card.key)}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
