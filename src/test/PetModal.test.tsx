import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PetModal from "@/components/PetModal";
import type { PetRecord } from "@/types/pet";

const pet: PetRecord = {
  id: 1,
  name: "Toby",
  species: "perro",
  breed: "Labrador",
  age_years: 3,
  gender: "macho",
  status: "perdido",
  description: "Perro perdido",
  location: "Santiago",
  date_reported: "2026-08-10",
  image_url: "https://x/y.jpg",
  contact_name: "Camila",
  contact_phone: "+56912345678",
  contact_email: "c@b.cl",
  reward_amount: 150000,
  is_vaccinated: 1,
  is_sterilized: 0,
};

describe("PetModal", () => {
  it("returns null when pet is null", () => {
    const { container } = render(
      <PetModal pet={null} onClose={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders pet details and contact actions", () => {
    render(<PetModal pet={pet} onClose={() => {}} />);
    expect(screen.getByText("Toby")).toBeInTheDocument();
    expect(screen.getByText(/Perro perdido/)).toBeInTheDocument();
    expect(screen.getByText("Llamar")).toBeInTheDocument();
  });

  it("calls onClose when close button clicked", () => {
    const onClose = vi.fn();
    render(<PetModal pet={pet} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText("Cerrar"));
    expect(onClose).toHaveBeenCalled();
  });
});
