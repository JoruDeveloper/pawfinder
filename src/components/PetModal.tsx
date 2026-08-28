"use client";

import { useEffect } from "react";
import { X, Phone, Mail, Share2, MapPin, Syringe, Scissors } from "lucide-react";
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
  formatSafeDate,
} from "@/lib/pet-helpers";
import type { PetRecord } from "@/types/pet";

interface PetModalProps {
  pet: PetRecord | null;
  onClose: () => void;
}

export default function PetModal({ pet, onClose }: PetModalProps) {
  const open = pet !== null;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!pet) return null;

  const status = getStatusConfig(pet.status);
  const gender = getSafeGender(pet);
  const reward = formatReward(pet.reward_amount);
  const contactName =
    pet.contact_name && String(pet.contact_name).trim().length > 0
      ? pet.contact_name
      : "Contacto no disponible";
  const hasPhone =
    pet.contact_phone && String(pet.contact_phone).trim().length > 0;
  const hasEmail =
    pet.contact_email && String(pet.contact_email).trim().length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 animate-fade-in sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle de ${getSafePetName(pet)}`}
      onClick={onClose}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/10] w-full shrink-0 bg-slate-100">
          <PetImageFallback
            src={pet.image_url}
            alt={getSafePetName(pet)}
            species={pet.species}
            className="h-full w-full"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="touch-target absolute right-3 top-3 flex items-center justify-center rounded-full bg-white/90 text-slate-700 shadow hover:bg-white"
          >
            <X className="h-5 w-5" />
          </button>
          <span
            className={cn(
              "absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold shadow",
              status.badgeClass
            )}
          >
            <span className={cn("h-2 w-2 rounded-full", status.dotClass)} />
            {status.label}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800">
                {getSafePetName(pet)}
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">
                {getSafeBreed(pet)} · {getSafeAge(pet)} · {gender.label}
              </p>
            </div>
            {reward !== "Sin recompensa" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-sm font-bold text-amber-950">
                {reward}
              </span>
            )}
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            {getSafeLocation(pet)}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Reportado: {formatSafeDate(pet.date_reported)}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-slate-700">
            {pet.description && String(pet.description).trim().length > 0
              ? pet.description
              : "Sin descripción disponible."}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              <Syringe className="h-3.5 w-3.5" />{" "}
              {pet.is_vaccinated === 1
                ? "Vacunado"
                : pet.is_vaccinated === 0
                ? "Sin vacunar"
                : "Vacuna: n/d"}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              <Scissors className="h-3.5 w-3.5" />{" "}
              {pet.is_sterilized === 1
                ? "Esterilizado"
                : pet.is_sterilized === 0
                ? "No esterilizado"
                : "Esterilización: n/d"}
            </span>
          </div>

          <div className="mt-5 rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Contacto
            </p>
            <p className="mt-1 font-semibold text-slate-800">{contactName}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {hasPhone && (
                <a
                  href={`tel:${pet.contact_phone}`}
                  className="touch-target inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 text-sm font-semibold text-white shadow hover:bg-emerald-600"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" /> Llamar
                </a>
              )}
              {hasEmail && (
                <a
                  href={`mailto:${pet.contact_email}`}
                  className="touch-target inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-4 text-sm font-semibold text-white shadow hover:bg-brand-primary/90"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" /> Email
                </a>
              )}
              {!hasPhone && !hasEmail && (
                <p className="text-sm text-slate-400">
                  Sin datos de contacto directo.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={() => {
              if (typeof navigator !== "undefined" && navigator.share) {
                navigator
                  .share({
                    title: `PawFinder — ${getSafePetName(pet)}`,
                    text: `Ayúdanos a encontrar a ${getSafePetName(pet)}`,
                    url:
                      typeof window !== "undefined" ? window.location.href : "",
                  })
                  .catch(() => {});
              }
            }}
            className="touch-target inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-4 text-sm font-medium text-slate-600 hover:bg-slate-200"
          >
            <Share2 className="h-4 w-4" aria-hidden="true" /> Compartir
          </button>
          <button
            type="button"
            onClick={onClose}
            className="touch-target inline-flex items-center justify-center rounded-full bg-slate-800 px-6 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
