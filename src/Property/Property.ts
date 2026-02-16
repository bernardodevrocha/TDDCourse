import { validateProperty } from "../entities/property.validator";

export class Property {
  private readonly id: string;
  private readonly name: string;
  private readonly description: string;
  private readonly maxGuest: number;
  private readonly price: number;
  
  constructor(id: string, name: string, description: string, maxGuest: number, price: number) {
    validateProperty({id, name, description, maxGuest, price})
    
    this.id = id;
    this.name = name;
    this.description = description;
    this.maxGuest = maxGuest;
    this.price = price;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getMaxGuests(): number {
    return this.maxGuest;
  }

  getPrice(): number {
    return this.price;
  }
}
