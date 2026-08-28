"use client";

import { Search, X, ArrowDownWideNarrow } from "lucide-react";
import { cn } from "@/lib/pet-helpers";
import type { PetFilterState, PetSpecies } from "@/types/pet";

interface FilterBarProps {
  filters: PetFilterState;
  onChange: (next: Partial<PetFilterState>) => void;
  onReset: () => void;
  resultCount: number;
}

const SPECIES_CHIPS: Array<{ key: PetSpecies | "todos"; label: string }> = [
  { key: "todos", label: "Todas" },
  { key: "perro", label: "Perros" },
  { key: "gato", label: "Gatos" },
  { key: "ave", label: "Aves" },
  { key: "otro", label: "Otros" },
];

const SORT_OPTIONS: Array<{ key: PetFilterState["sortBy"]; label: string }> = [
  { key: "recent", label: "Más recientes" },
  { key: "reward", label: "Mayor recompensa" },
  { key: "name", label: "Nombre (A-Z)" },
];

export default function FilterBar({
  filters,
  onChange,
  onReset,
  resultCount,
}: FilterBarProps) {
  return (
    <section
      aria-label="Filtros de búsqueda"
      className="mx-auto w-full max-w-6xl px-4 py-4"
    >
      <div className="rounded-2xl bg-white/70 p-3 shadow-sm ring-1 ring-white/60 sm:p-4">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={filters.search}
              onChange={(e) => onChange({ search: e.target.value })}
              placeholder="Busca por nombre, raza o ubicación…"
              aria-label="Buscar mascota"
              className="touch-target w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-10 text-sm text-slate-800 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30"
            />
            {filters.search.length > 0 && (
              <button
                type="button"
                onClick={() => onChange({ search: "" })}
                aria-label="Limpiar búsqueda"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {SPECIES_CHIPS.map((chip) => {
              const active = filters.species === chip.key;
              return (
                <button
                  key={chip.key}
                  type="button"
                  onClick={() => onChange({ species: chip.key })}
                  aria-pressed={active}
                  className={cn(
                    "touch-target inline-flex shrink-0 items-center rounded-full px-4 text-sm font-medium transition",
                    active
                      ? "bg-brand-primary text-white shadow"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-2">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <ArrowDownWideNarrow className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">Ordenar:</span>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  onChange({ sortBy: e.target.value as PetFilterState["sortBy"] })
                }
                className="touch-target rounded-full border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-brand-primary"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={onReset}
              className="touch-target inline-flex items-center rounded-full px-4 text-sm font-medium text-slate-500 hover:bg-slate-100"
            >
              <X className="mr-1 h-4 w-4" aria-hidden="true" />
              Resetear
            </button>
          </div>

          <p className="text-xs text-slate-500" aria-live="polite">
            {resultCount} {resultCount === 1 ? "resultado" : "resultados"}
          </p>
        </div>
      </div>
    </section>
  );
}
