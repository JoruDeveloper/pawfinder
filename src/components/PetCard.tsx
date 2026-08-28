"use client";

import { PawPrint, MapPin, Coins, Syringe, Scissors } from "lucide-react";
import PetImageFallback from "@/components/PetImageFallback";
import {
  cn,
  getSafePetName,
  getSafeBreed,
  getSafeAge,
  getSafeGender,
  getSafeLocation,
  getStatusConfig,
  formatReward,
  normalizeSpecies,
} from "@/lib/pet-helpers";
import type { PetRecord } from "@/types/pet";

interface PetCardProps {
  pet: PetRecord;
  onSelect: (pet: PetRecord) => void;
}

export default function PetCard({ pet, onSelect }: PetCardProps) {
  const status = getStatusConfig(pet.status);
  const gender = getSafeGender(pet);
  const reward = formatReward(pet.reward_amount);

  return (
    <button
      type="button"
      onClick={() => onSelect(pet)}
      className="touch-target group flex w-full flex-col overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-primary/50 animate-fade-in"
      aria-label={`Ver detalle de ${getSafePetName(pet)}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <PetImageFallback
          src={pet.image_url}
          alt={getSafePetName(pet)}
          species={pet.species}
          className="h-full w-full"
        />
        <span
          className={cn(
            "absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold shadow",
            status.badgeClass
          )}
        >
          <span className={cn("h-2 w-2 rounded-full", status.dotClass)} />
          {status.label}
        </span>
        {reward !== "Sin recompensa" && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-amber-950 shadow">
            <Coins className="h-3.5 w-3.5" aria-hidden="true" />
            {reward}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-base font-bold text-slate-800">
            {getSafePetName(pet)}
          </h3>
          <span className="shrink-0 text-sm text-slate-500" aria-hidden="true">
            {gender.symbol}
          </span>
        </div>

        <p className="truncate text-sm text-slate-500">
          {getSafeBreed(pet)} · {getSafeAge(pet)}
        </p>

        <p className="flex items-center gap-1 truncate text-xs text-slate-400">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {getSafeLocation(pet)}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
            <PawPrint className="h-3 w-3" aria-hidden="true" />
            {normalizeSpecies(pet.species) === "otro"
              ? "Otro"
              : normalizeSpecies(pet.species).charAt(0).toUpperCase() +
                normalizeSpecies(pet.species).slice(1)}
          </span>
          <HealthChip
            icon={<Syringe className="h-3 w-3" />}
            ok={pet.is_vaccinated === 1}
            label="Vacunado"
          />
          <HealthChip
            icon={<Scissors className="h-3 w-3" />}
            ok={pet.is_sterilized === 1}
            label="Esterilizado"
          />
        </div>
      </div>
    </button>
  );
}

function HealthChip({
  icon,
  ok,
  label,
}: {
  icon: React.ReactNode;
  ok: boolean;
  label: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
        ok
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-400"
      )}
    >
      {icon}
      {label}
    </span>
  );
}
