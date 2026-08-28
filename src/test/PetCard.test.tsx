import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PetCard from "@/components/PetCard";
import type { PetRecord } from "@/types/pet";

const fullPet: PetRecord = {
  id: 1,
  name: "Toby",
  species: "perro",
  breed: "Labrador",
  age_years: 3,
  gender: "macho",
  status: "perdido",
  description: "c",
  location: "Santiago",
  date_reported: "2026-08-10",
  image_url: "https://x/y.jpg",
  contact_name: "C",
  contact_phone: "+569",
  contact_email: "a@b.cl",
  reward_amount: 150000,
  is_vaccinated: 1,
  is_sterilized: 0,
};

const nullPet: PetRecord = {
  id: 2,
  name: null,
  species: null,
  breed: null,
  age_years: null,
  gender: null,
  status: "encontrado",
  description: null,
  location: null,
  date_reported: null,
  image_url: null,
  contact_name: null,
  contact_phone: null,
  contact_email: null,
  reward_amount: null,
  is_vaccinated: null,
  is_sterilized: null,
};

describe("PetCard", () => {
  it("renders the pet name and reward", () => {
    render(<PetCard pet={fullPet} onSelect={() => {}} />);
    expect(screen.getByText("Toby")).toBeInTheDocument();
    expect(screen.getByText("$150.000")).toBeInTheDocument();
  });

  it("renders safe fallbacks for null fields without crashing", () => {
    render(<PetCard pet={nullPet} onSelect={() => {}} />);
    expect(
      screen.getAllByText("Mascota sin nombre identificado").length
    ).toBeGreaterThan(0);
    expect(screen.getByText("Ubicación no disponible")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", () => {
    const onSelect = vi.fn();
    render(<PetCard pet={fullPet} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onSelect).toHaveBeenCalledWith(fullPet);
  });
});
