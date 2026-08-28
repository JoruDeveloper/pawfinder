import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import StatsBanner from "@/components/StatsBanner";
import type { PetStats } from "@/types/pet";

const stats: PetStats = {
  total: 10,
  lost: 4,
  found: 3,
  adoption: 3,
};

describe("StatsBanner", () => {
  it("renders the total and each status count", () => {
    render(
      <StatsBanner stats={stats} activeStatus="todos" onSelect={() => {}} />
    );
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getAllByText("3").length).toBe(2);
  });

  it("marks the active status as pressed", () => {
    render(
      <StatsBanner stats={stats} activeStatus="perdido" onSelect={() => {}} />
    );
    const buttons = screen.getAllByRole("button");
    const perdido = buttons.find((b) => b.textContent?.includes("Perdidos"));
    expect(perdido).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onSelect with the chosen status", () => {
    const onSelect = vi.fn();
    render(
      <StatsBanner stats={stats} activeStatus="todos" onSelect={onSelect} />
    );
    const buttons = screen.getAllByRole("button");
    const adopcion = buttons.find((b) =>
      b.textContent?.includes("En adopción")
    );
    fireEvent.click(adopcion!);
    expect(onSelect).toHaveBeenCalledWith("en_adopcion");
  });
});
