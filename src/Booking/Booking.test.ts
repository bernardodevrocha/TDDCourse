import { Property } from "../Property/Property";
import { User } from "../user/User";
import { DateRange } from "../value_objects/date_range";
import { Booking } from "./Booking";

describe("Booking", () => {
  it("deve criar uma instancia de Booking com todos os atributos", () => {
    const property = new Property("1", "Sobrado", "Sobrado bonito", 4, 200);
    const user = new User("1", "Bernardo Rocha", );
    const dateRange = new DateRange(new Date("2026-01-10"), new Date("2026-01-17"));

    const booking = new Booking("1", property, user, dateRange, 2);

    expect(booking.getId()).toBe("1");
    expect(booking.getProperty()).toBe(property);
    expect(booking.getUser()).toBe(user);
    expect(booking.getDateRange()).toBe(dateRange);
    expect(booking.getMaxGuests()).toBe(2);
  })
})