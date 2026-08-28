export type PetSpecies = "perro" | "gato" | "ave" | "otro";

export type PetStatus = "perdido" | "encontrado" | "en_adopcion";

export interface PetRecord {
  id: number;
  name: string | null;
  species: string | null;
  breed: string | null;
  age_years: number | null;
  gender: string | null;
  status: PetStatus;
  description: string | null;
  location: string | null;
  date_reported: string | null;
  image_url: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  reward_amount: number | null;
  is_vaccinated: number | null;
  is_sterilized: number | null;
}

export interface PetFilterState {
  search: string;
  species: PetSpecies | "todos";
  status: PetStatus | "todos";
  sortBy: "recent" | "reward" | "name";
}

export interface PetStats {
  total: number;
  lost: number;
  found: number;
  adoption: number;
}
