import { Property } from "../Property/Property";

export interface PropertyRepository{
  save(property: Property): Promise<void>;
  findById(id: string): Promise<Property | null>;
}