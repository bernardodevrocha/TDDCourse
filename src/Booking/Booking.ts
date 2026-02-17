import { Property } from "../Property/Property";
import { User } from "../user/User";
import { DateRange } from "../value_objects/date_range";

export class Booking{
  private readonly id: string;
  private readonly property: Property;
  private readonly user: User
  private readonly dateRange: DateRange;
  private readonly guestCount: number;

  constructor(id: string, property: Property, user: User, dateRange: DateRange, guestCount: number){
    this.id = id;
    this.property = property;
    this.user = user;
    this.dateRange = dateRange;
    this.guestCount = guestCount;
  }

  getId(): string{
    return this.id;
  }

  getProperty(): Property{
    return this.property;
  }

  getUser(): User{
    return this.user;
  }

  getDateRange(): DateRange{
    return this.dateRange;
  }

  getMaxGuests(): number{
    return this.guestCount;
  }
}