import { Booking } from "../Booking/Booking";

export interface BookingRepository{
  save(booking: Booking): Promise<void>
  findById(booking: Booking): Promise<Booking | null>;
}