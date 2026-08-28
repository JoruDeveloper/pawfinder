"use client";

import { PawPrint } from "lucide-react";
import PetCard from "@/components/PetCard";
import type { PetRecord } from "@/types/pet";

interface PetGridProps {
  pets: PetRecord[];
  onSelect: (pet: PetRecord) => void;
  onReset: () => void;
}

export default function PetGrid({ pets, onSelect, onReset }: PetGridProps) {
  if (pets.length === 0) {
    return (
      <section
        id="mascotas"
        aria-label="Lista de mascotas"
        className="mx-auto w-full max-w-6xl px-4 pb-16"
      >
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/70 p-10 text-center shadow-sm ring-1 ring-white/60">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <PawPrint className="h-8 w-8" aria-hidden="true" />
          </span>
          <p className="text-lg font-semibold text-slate-700">
            No encontramos mascotas con esos filtros
          </p>
          <p className="max-w-sm text-sm text-slate-500">
            Prueba ampliar la búsqueda o limpiar los filtros activos para ver
            todas las mascotas reportadas.
          </p>
          <button
            type="button"
            onClick={onReset}
            className="touch-target mt-1 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary px-6 text-sm font-semibold text-white shadow"
          >
            Ver todas las mascotas
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="mascotas"
      aria-label="Lista de mascotas"
      className="mx-auto w-full max-w-6xl px-4 pb-16"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
