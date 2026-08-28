"use client";

import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import { cn } from "@/lib/pet-helpers";
import type { PetRecord, PetSpecies, PetStatus } from "@/types/pet";

interface ReportPetModalProps {
  open: boolean;
  nextId: number;
  onClose: () => void;
  onAdd: (pet: PetRecord) => void;
}

interface FormState {
  name: string;
  species: PetSpecies | "";
  breed: string;
  age_years: string;
  gender: string;
  status: PetStatus;
  description: string;
  location: string;
  image_url: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  reward_amount: string;
}

const EMPTY: FormState = {
  name: "",
  species: "",
  breed: "",
  age_years: "",
  gender: "",
  status: "perdido",
  description: "",
  location: "",
  image_url: "",
  contact_name: "",
  contact_phone: "",
  contact_email: "",
  reward_amount: "",
};

const SPECIES_OPTIONS: Array<{ value: PetSpecies; label: string }> = [
  { value: "perro", label: "Perro" },
  { value: "gato", label: "Gato" },
  { value: "ave", label: "Ave" },
  { value: "otro", label: "Otro" },
];

const STATUS_OPTIONS: Array<{ value: PetStatus; label: string }> = [
  { value: "perdido", label: "Perdido" },
  { value: "encontrado", label: "Encontrado" },
  { value: "en_adopcion", label: "En adopción" },
];

export default function ReportPetModal({
  open,
  nextId,
  onClose,
  onAdd,
}: ReportPetModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY);

  useEffect(() => {
    if (open) setForm(EMPTY);
  }, [open]);

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

  if (!open) return null;

  const update = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = form.age_years.trim() === "" ? null : Number(form.age_years);
    const rewardNum =
      form.reward_amount.trim() === "" ? null : Number(form.reward_amount);
    const newPet: PetRecord = {
      id: nextId,
      name: form.name.trim() === "" ? null : form.name.trim(),
      species: form.species === "" ? null : form.species,
      breed: form.breed.trim() === "" ? null : form.breed.trim(),
      age_years: ageNum !== null && !Number.isNaN(ageNum) ? ageNum : null,
      gender: form.gender.trim() === "" ? null : form.gender.trim(),
      status: form.status,
      description:
        form.description.trim() === "" ? null : form.description.trim(),
      location: form.location.trim() === "" ? null : form.location.trim(),
      date_reported: new Date().toISOString().slice(0, 10),
      image_url: form.image_url.trim() === "" ? null : form.image_url.trim(),
      contact_name:
        form.contact_name.trim() === "" ? null : form.contact_name.trim(),
      contact_phone:
        form.contact_phone.trim() === "" ? null : form.contact_phone.trim(),
      contact_email:
        form.contact_email.trim() === "" ? null : form.contact_email.trim(),
      reward_amount:
        rewardNum !== null && !Number.isNaN(rewardNum) ? rewardNum : null,
      is_vaccinated: null,
      is_sterilized: null,
    };
    onAdd(newPet);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 animate-fade-in sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Publicar aviso de mascota"
      onClick={onClose}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-4">
          <h2 className="text-lg font-bold text-slate-800">Publicar aviso</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="touch-target flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 space-y-3 overflow-y-auto p-4"
        >
          <Field label="Nombre de la mascota">
            <input
              className={inputCls}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Ej: Toby (opcional)"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Especie">
              <select
                className={inputCls}
                value={form.species}
                onChange={(e) => update("species", e.target.value)}
              >
                <option value="">Selecciona…</option>
                {SPECIES_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Estado">
              <select
                className={inputCls}
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Raza">
              <input
                className={inputCls}
                value={form.breed}
                onChange={(e) => update("breed", e.target.value)}
                placeholder="Opcional"
              />
            </Field>
            <Field label="Edad (años)">
              <input
                className={inputCls}
                type="number"
                step="0.1"
                min="0"
                value={form.age_years}
                onChange={(e) => update("age_years", e.target.value)}
                placeholder="Opcional"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Sexo">
              <input
                className={inputCls}
                value={form.gender}
                onChange={(e) => update("gender", e.target.value)}
                placeholder="Macho / Hembra"
              />
            </Field>
            <Field label="Ubicación">
              <input
                className={inputCls}
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="Ej: Providencia"
              />
            </Field>
          </div>

          <Field label="Descripción">
            <textarea
              className={cn(inputCls, "min-h-[80px]")}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Señas particulares, contexto…"
            />
          </Field>

          <Field label="URL de foto">
            <input
              className={inputCls}
              value={form.image_url}
              onChange={(e) => update("image_url", e.target.value)}
              placeholder="https://… (opcional)"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Recompensa ($)">
              <input
                className={inputCls}
                type="number"
                min="0"
                value={form.reward_amount}
                onChange={(e) => update("reward_amount", e.target.value)}
                placeholder="Opcional"
              />
            </Field>
            <Field label="Contacto (nombre)">
              <input
                className={inputCls}
                value={form.contact_name}
                onChange={(e) => update("contact_name", e.target.value)}
                placeholder="Tu nombre"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Teléfono">
              <input
                className={inputCls}
                value={form.contact_phone}
                onChange={(e) => update("contact_phone", e.target.value)}
                placeholder="Opcional"
              />
            </Field>
            <Field label="Email">
              <input
                className={inputCls}
                type="email"
                value={form.contact_email}
                onChange={(e) => update("contact_email", e.target.value)}
                placeholder="Opcional"
              />
            </Field>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="touch-target inline-flex items-center justify-center rounded-full bg-slate-100 px-5 text-sm font-medium text-slate-600 hover:bg-slate-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="touch-target inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary px-6 text-sm font-semibold text-white shadow"
            >
              <Upload className="h-4 w-4" aria-hidden="true" /> Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputCls =
  "touch-target w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}
