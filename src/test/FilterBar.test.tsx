import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "@/components/FilterBar";
import type { PetFilterState } from "@/types/pet";

const filters: PetFilterState = {
  search: "",
  species: "todos",
  status: "todos",
  sortBy: "recent",
};

describe("FilterBar", () => {
  it("updates the search term", () => {
    const onChange = vi.fn();
    render(
      <FilterBar
        filters={filters}
        onChange={onChange}
        onReset={() => {}}
        resultCount={5}
      />
    );
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "toby" } });
    expect(onChange).toHaveBeenCalledWith({ search: "toby" });
  });

  it("renders species chips", () => {
    render(
      <FilterBar
        filters={filters}
        onChange={() => {}}
        onReset={() => {}}
        resultCount={5}
      />
    );
    expect(screen.getByText("Perros")).toBeInTheDocument();
    expect(screen.getByText("Gatos")).toBeInTheDocument();
  });

  it("calls onReset when reset button clicked", () => {
    const onReset = vi.fn();
    render(
      <FilterBar
        filters={filters}
        onChange={() => {}}
        onReset={onReset}
        resultCount={5}
      />
    );
    fireEvent.click(screen.getByText("Resetear"));
    expect(onReset).toHaveBeenCalled();
  });
});
