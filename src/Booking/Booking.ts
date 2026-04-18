import { Property } from "../Property/Property";
import { User } from "../user/User";
import { DateRange } from "../value_objects/date_range";

export class Booking{
  private readonly id: string;
  private readonly property: Property;
  private readonly user: User
  private readonly dateRange: DateRange;
  private readonly guestCount: number;
  private status: 'CONFIRMED' | 'CANCELLED' = 'CONFIRMED';
  private totalPrice: number;

  constructor(id: string, property: Property, user: User, dateRange: DateRange, guestCount: number, totalPrice: number){
    if(guestCount <= 0){
      throw new Error("O numero de hospedes deve ser maior que 0");
    }
    property.validateGuestCount(guestCount);

    if(!property.isAvailable(dateRange)){
      throw new Error("A propriedade nao esta disponivel para as datas selecionadas");
    }

    this.id = id;
    this.property = property;
    this.user = user;
    this.dateRange = dateRange;
    this.guestCount = guestCount;
    this.totalPrice = totalPrice;

    property.addBooking(this);
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

  getStatus(): 'CONFIRMED' | 'CANCELLED'{
    return this.status;
  }

  getTotalPrice(): number {
    return this.totalPrice;
  }

  calculateTotalPrice(): number{
    return this.property.calculateTotalPrice(this.dateRange);
  }

  canceledBooking(): string{
    const dateCanceled = new Date();
    const diffMs = this.dateRange.getStartDate().getTime() - dateCanceled.getTime();

    if(diffMs <= (1000 * 60 * 60 * 24) && diffMs >= 0){
      this.status = 'CANCELLED';
      return "Cliente cancelou a reserva com menos de 1 dia para o check-in, nao havera reembolso";
    }else{
      throw new Error("Falha ao cancelar a reserva!");
    }
  }

  cancel(currentDate: Date) : void {
    if(this.status == "CANCELLED"){
      throw new Error("A reserva ja foi cancelada");
    }

    this.status = "CANCELLED";

    const checkInDate = this.dateRange.getStartDate();
    const timeDiff = checkInDate.getTime() - currentDate.getTime();
    const daysUntilCheckIn = Math.ceil(timeDiff / (1000 * 3600 *24));    

    if(daysUntilCheckIn >= 7){
      this.totalPrice = 0;
    }else if (daysUntilCheckIn >= 1 && daysUntilCheckIn < 7){
      this.totalPrice *= 0.5;
    }else{
      console.log("Erro ao cancelar sua reserva")
    }
  }
}
