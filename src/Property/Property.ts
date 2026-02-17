import { validateProperty } from "../validator/property.validator";
import { DateRange } from "../value_objects/date_range";

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

  calculateTotalPrice(dateRange: DateRange): number {
    const totalNights = dateRange.getTotalNights();
    let totalPrice = totalNights * this.getPrice();

    if(totalNights >= 7){
      totalPrice *= 0.9;
    }

    return totalPrice;
  }
}
