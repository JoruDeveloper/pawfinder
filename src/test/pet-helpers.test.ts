import { describe, it, expect } from "vitest";
import {
  getSafePetName,
  getSafeBreed,
  getSafeAge,
  getSafeGender,
  getSafeLocation,
  formatSafeDate,
  formatReward,
  getStatusConfig,
  normalizeSpecies,
  computeStats,
  sanitizePets,
} from "@/lib/pet-helpers";
import type { PetRecord } from "@/types/pet";

const base: PetRecord = {
  id: 1,
  name: "Toby",
  species: "perro",
  breed: "Labrador",
  age_years: 3,
  gender: "macho",
  status: "perdido",
  description: "desc",
  location: "Santiago",
  date_reported: "2026-08-10",
  image_url: "https://x/y.jpg",
  contact_name: "Camila",
  contact_phone: "+569",
  contact_email: "a@b.cl",
  reward_amount: 150000,
  is_vaccinated: 1,
  is_sterilized: 0,
};

describe("getSafePetName", () => {
  it("returns the name when present", () => {
    expect(getSafePetName({ name: "Luna" })).toBe("Luna");
  });
  it("falls back when name is null", () => {
    expect(getSafePetName({ name: null })).toBe(
      "Mascota sin nombre identificado"
    );
  });
  it("falls back when name is empty string", () => {
    expect(getSafePetName({ name: "   " })).toBe(
      "Mascota sin nombre identificado"
    );
  });
});

describe("getSafeBreed", () => {
  it("returns breed when present", () => {
    expect(getSafeBreed({ breed: "Beagle" })).toBe("Beagle");
  });
  it("falls back for null/empty breed", () => {
    expect(getSafeBreed({ breed: null })).toBe("Raza no especificada / Mestizo");
    expect(getSafeBreed({ breed: "" })).toBe("Raza no especificada / Mestizo");
  });
});

describe("getSafeAge", () => {
  it("formats whole years", () => {
    expect(getSafeAge({ age_years: 3 })).toBe("3 años");
  });
  it("formats single year", () => {
    expect(getSafeAge({ age_years: 1 })).toBe("1 año");
  });
  it("converts sub-year ages to months", () => {
    expect(getSafeAge({ age_years: 0.4 })).toBe("5 meses");
  });
  it("falls back for null/NaN age", () => {
    expect(getSafeAge({ age_years: null })).toBe("Edad no especificada");
    expect(getSafeAge({ age_years: NaN })).toBe("Edad no especificada");
  });
});

describe("getSafeGender", () => {
  it("maps macho", () => {
    expect(getSafeGender({ gender: "macho" })).toEqual({
      label: "Macho",
      symbol: "♂",
    });
  });
  it("maps hembra", () => {
    expect(getSafeGender({ gender: "hembra" })).toEqual({
      label: "Hembra",
      symbol: "♀",
    });
  });
  it("falls back for unknown/null gender", () => {
    expect(getSafeGender({ gender: null })).toEqual({
      label: "Sexo desconocido",
      symbol: "?",
    });
  });
});

describe("getSafeLocation", () => {
  it("returns location when present", () => {
    expect(getSafeLocation({ location: "Ñuñoa" })).toBe("Ñuñoa");
  });
  it("falls back for null location", () => {
    expect(getSafeLocation({ location: null })).toBe(
      "Ubicación no disponible"
    );
  });
});

describe("formatSafeDate", () => {
  it("formats a valid date in spanish", () => {
    expect(formatSafeDate("2026-08-10")).toContain("agosto");
  });
  it("falls back for null date", () => {
    expect(formatSafeDate(null)).toBe("Fecha no registrada");
  });
});

describe("formatReward", () => {
  it("formats with thousands separator", () => {
    expect(formatReward(150000)).toBe("$150.000");
  });
  it("returns 'Sin recompensa' for null/zero", () => {
    expect(formatReward(null)).toBe("Sin recompensa");
    expect(formatReward(0)).toBe("Sin recompensa");
  });
});

describe("getStatusConfig", () => {
  it("returns config for perdido", () => {
    expect(getStatusConfig("perdido").label).toBe("Perdido");
  });
  it("returns config for en_adopcion", () => {
    expect(getStatusConfig("en_adopcion").label).toBe("En adopción");
  });
});

describe("normalizeSpecies", () => {
  it("normalizes perro/gato/ave/otro", () => {
    expect(normalizeSpecies("Perro")).toBe("perro");
    expect(normalizeSpecies("Gato")).toBe("gato");
    expect(normalizeSpecies("loro")).toBe("ave");
    expect(normalizeSpecies("pez")).toBe("otro");
    expect(normalizeSpecies(null)).toBe("otro");
  });
});

describe("computeStats", () => {
  it("counts statuses correctly", () => {
    const stats = computeStats([
      { ...base, status: "perdido" },
      { ...base, status: "encontrado" },
      { ...base, status: "en_adopcion" },
    ]);
    expect(stats.total).toBe(3);
    expect(stats.lost).toBe(1);
    expect(stats.found).toBe(1);
    expect(stats.adoption).toBe(1);
  });
});

describe("sanitizePets", () => {
  it("returns empty array for non-array", () => {
    expect(sanitizePets(null)).toEqual([]);
  });
  it("coerces invalid status to perdido and assigns ids", () => {
    const result = sanitizePets([{ name: "X", status: "weird" }]);
    expect(result[0].id).toBe(1);
    expect(result[0].status).toBe("perdido");
  });
});
