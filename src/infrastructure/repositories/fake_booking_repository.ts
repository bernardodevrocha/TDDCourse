import { Booking } from "../../Booking/Booking";
import { BookingRepository } from "../../repositories/booking_repositories";

export class FakeBookingRepository implements BookingRepository {
  private bookings: Booking[] = [];
  
  async save(booking: Booking): Promise<void> {
    this.bookings.push(booking);
  }

  async findById(id: string): Promise<Booking | null> {
    return this.bookings.find((booking) => booking.getId() === id) || null;
  }
}