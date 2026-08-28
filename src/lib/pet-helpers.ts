import type { PetRecord, PetSpecies, PetStatus, PetStats } from "@/types/pet";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function getSafePetName(pet: Pick<PetRecord, "name">): string {
  const value = pet?.name;
  if (value === null || value === undefined) return "Mascota sin nombre identificado";
  const trimmed = String(value).trim();
  return trimmed.length > 0 ? trimmed : "Mascota sin nombre identificado";
}

export function getSafeBreed(pet: Pick<PetRecord, "breed">): string {
  const value = pet?.breed;
  if (value === null || value === undefined) return "Raza no especificada / Mestizo";
  const trimmed = String(value).trim();
  return trimmed.length > 0 ? trimmed : "Raza no especificada / Mestizo";
}

export function getSafeAge(pet: Pick<PetRecord, "age_years">): string {
  const value = pet?.age_years;
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "Edad no especificada";
  }
  const years = Number(value);
  if (years < 1) {
    const months = Math.max(1, Math.round(years * 12));
    return `${months} ${months === 1 ? "mes" : "meses"}`;
  }
  const rounded = Math.round(years * 10) / 10;
  return `${rounded} ${rounded === 1 ? "año" : "años"}`;
}

export function getSafeGender(pet: Pick<PetRecord, "gender">): { label: string; symbol: string } {
  const value = pet?.gender;
  if (value === null || value === undefined) return { label: "Sexo desconocido", symbol: "?" };
  const normalized = String(value).trim().toLowerCase();
  if (normalized === "macho" || normalized === "m") return { label: "Macho", symbol: "♂" };
  if (normalized === "hembra" || normalized === "h") return { label: "Hembra", symbol: "♀" };
  return { label: "Sexo desconocido", symbol: "?" };
}

export function getSafeLocation(pet: Pick<PetRecord, "location">): string {
  const value = pet?.location;
  if (value === null || value === undefined) return "Ubicación no disponible";
  const trimmed = String(value).trim();
  return trimmed.length > 0 ? trimmed : "Ubicación no disponible";
}

export function formatSafeDate(date: string | null | undefined): string {
  const value = date ?? null;
  if (!value) return "Fecha no registrada";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Fecha no registrada";
  return parsed.toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatReward(amount: number | null | undefined): string {
  const value = amount ?? null;
  if (value === null || value === undefined || Number.isNaN(Number(value)) || Number(value) <= 0) {
    return "Sin recompensa";
  }
  const number = Number(value);
  return `$${number.toLocaleString("es-CL")}`;
}

export interface StatusConfig {
  label: string;
  badgeClass: string;
  chipClass: string;
  dotClass: string;
}

export function getStatusConfig(status: PetStatus): StatusConfig {
  switch (status) {
    case "perdido":
      return {
        label: "Perdido",
        badgeClass:
          "bg-red-100 text-red-700 ring-1 ring-red-300 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-500/30",
        chipClass: "bg-red-500",
        dotClass: "bg-red-500",
      };
    case "encontrado":
      return {
        label: "Encontrado",
        badgeClass:
          "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30",
        chipClass: "bg-emerald-500",
        dotClass: "bg-emerald-500",
      };
    case "en_adopcion":
      return {
        label: "En adopción",
        badgeClass:
          "bg-blue-100 text-blue-700 ring-1 ring-blue-300 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-500/30",
        chipClass: "bg-blue-500",
        dotClass: "bg-blue-500",
      };
    default:
      return {
        label: "Desconocido",
        badgeClass: "bg-gray-100 text-gray-700 ring-1 ring-gray-300",
        chipClass: "bg-gray-500",
        dotClass: "bg-gray-500",
      };
  }
}

export function normalizeSpecies(species: string | null | undefined): PetSpecies {
  const value = (species ?? "").toString().trim().toLowerCase();
  if (value.includes("perro") || value === "dog" || value === "can") return "perro";
  if (value.includes("gato") || value === "cat" || value === "fel") return "gato";
  if (
    value.includes("ave") ||
    value.includes("pájaro") ||
    value.includes("pajaro") ||
    value === "bird" ||
    value.includes("loro") ||
    value.includes("canario")
  ) {
    return "ave";
  }
  return "otro";
}

export function computeStats(pets: PetRecord[]): PetStats {
  const stats: PetStats = { total: pets.length, lost: 0, found: 0, adoption: 0 };
  for (const pet of pets) {
    if (pet.status === "perdido") stats.lost += 1;
    else if (pet.status === "encontrado") stats.found += 1;
    else if (pet.status === "en_adopcion") stats.adoption += 1;
  }
  return stats;
}

export function sanitizePets(raw: unknown): PetRecord[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item, index) => {
    const record = (item ?? {}) as Record<string, unknown>;
    const status = (record.status as PetStatus) ?? "perdido";
    return {
      id: typeof record.id === "number" ? record.id : index + 1,
      name: record.name as string | null,
      species: record.species as string | null,
      breed: record.breed as string | null,
      age_years: (record.age_years as number | null) ?? null,
      gender: record.gender as string | null,
      status: ["perdido", "encontrado", "en_adopcion"].includes(status) ? status : "perdido",
      description: record.description as string | null,
      location: record.location as string | null,
      date_reported: record.date_reported as string | null,
      image_url: record.image_url as string | null,
      contact_name: record.contact_name as string | null,
      contact_phone: record.contact_phone as string | null,
      contact_email: record.contact_email as string | null,
      reward_amount: (record.reward_amount as number | null) ?? null,
      is_vaccinated: (record.is_vaccinated as number | null) ?? null,
      is_sterilized: (record.is_sterilized as number | null) ?? null,
    } satisfies PetRecord;
  });
}
