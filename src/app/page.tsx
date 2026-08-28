"use client";

import { useMemo, useState } from "react";
import rawPets from "@/data/pets.json";
import Header from "@/components/Header";
import StatsBanner from "@/components/StatsBanner";
import FilterBar from "@/components/FilterBar";
import PetGrid from "@/components/PetGrid";
import PetModal from "@/components/PetModal";
import ReportPetModal from "@/components/ReportPetModal";
import { sanitizePets, computeStats } from "@/lib/pet-helpers";
import type {
  PetRecord,
  PetFilterState,
  PetStatus,
} from "@/types/pet";

const INITIAL_FILTERS: PetFilterState = {
  search: "",
  species: "todos",
  status: "todos",
  sortBy: "recent",
};

export default function Home() {
  const [pets, setPets] = useState<PetRecord[]>(() =>
    sanitizePets(rawPets as unknown[])
  );
  const [filters, setFilters] = useState<PetFilterState>(INITIAL_FILTERS);
  const [selected, setSelected] = useState<PetRecord | null>(null);
  const [reportOpen, setReportOpen] = useState(false);

  const stats = useMemo(() => computeStats(pets), [pets]);

  const filtered = useMemo(() => {
    const term = filters.search.trim().toLowerCase();
    let list = pets.filter((pet) => {
      if (filters.status !== "todos" && pet.status !== filters.status)
        return false;
      if (filters.species !== "todos") {
        const species = (pet.species ?? "").toString().toLowerCase();
        const map: Record<string, string[]> = {
          perro: ["perro", "dog"],
          gato: ["gato", "cat"],
          ave: ["ave", "pájaro", "pajaro", "loro", "canario", "bird"],
          otro: [],
        };
        const aliases = map[filters.species];
        const matches =
          aliases.length === 0
            ? !["perro", "gato", "ave"].some((s) =>
                (pet.species ?? "").toString().toLowerCase().includes(s)
              )
            : aliases.some((a) => species.includes(a));
        if (!matches) return false;
      }
      if (term.length > 0) {
        const haystack = [
          pet.name,
          pet.breed,
          pet.location,
          pet.description,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      if (filters.sortBy === "reward") {
        return (b.reward_amount ?? 0) - (a.reward_amount ?? 0);
      }
      if (filters.sortBy === "name") {
        const an = (a.name ?? "zzz").toLowerCase();
        const bn = (b.name ?? "zzz").toLowerCase();
        return an.localeCompare(bn);
      }
      return (b.date_reported ?? "").localeCompare(a.date_reported ?? "");
    });

    return list;
  }, [pets, filters]);

  const nextId = useMemo(
    () => pets.reduce((max, p) => Math.max(max, p.id), 0) + 1,
    [pets]
  );

  const updateFilters = (next: Partial<PetFilterState>) =>
    setFilters((prev) => ({ ...prev, ...next }));

  const resetFilters = () => setFilters(INITIAL_FILTERS);

  const handleAdd = (pet: PetRecord) =>
    setPets((prev) => [pet, ...prev]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-white">
      <Header onReportClick={() => setReportOpen(true)} />

      <section className="mx-auto w-full max-w-6xl px-4 pb-2 pt-6 text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-800 sm:text-3xl">
          Encontremos a tu{" "}
          <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            mejor amigo
          </span>
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
          Una comunidad para reportar mascotas perdidas, encontrar a las que
          fueron rescatadas y dar en adopción a quienes buscan hogar.
        </p>
      </section>

      <StatsBanner
        stats={stats}
        activeStatus={filters.status}
        onSelect={(status: PetStatus | "todos") =>
          updateFilters({ status })
        }
      />

      <FilterBar
        filters={filters}
        onChange={updateFilters}
        onReset={resetFilters}
        resultCount={filtered.length}
      />

      <PetGrid
        pets={filtered}
        onSelect={setSelected}
        onReset={resetFilters}
      />

      <footer className="border-t border-slate-100 bg-white/60 py-6">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-slate-400">
          <p className="font-semibold text-slate-500">PawFinder</p>
          <p className="mt-1">
            Portal comunitario de búsqueda y rescate de mascotas. Ante
            emergencias, contacta a tu municipalidad o centro de rescate local.
          </p>
        </div>
      </footer>

      <PetModal pet={selected} onClose={() => setSelected(null)} />

      <ReportPetModal
        open={reportOpen}
        nextId={nextId}
        onClose={() => setReportOpen(false)}
        onAdd={handleAdd}
      />
    </main>
  );
}
