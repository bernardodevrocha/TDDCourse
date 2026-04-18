import { Property } from "../Property/Property";
import { User } from "../user/User";
import { DateRange } from "../value_objects/date_range";
import { Booking } from "./Booking";

describe("Booking", () => {
  it("deve criar uma instancia de Booking com todos os atributos", () => {
    const property = new Property("1", "Sobrado", "Sobrado bonito", 4, 200);
    const user = new User("1", "Bernardo Rocha");
    const dateRange = new DateRange(new Date("2026-01-10"), new Date("2026-01-17"));
    const totalPrice = property.calculateTotalPrice(dateRange);

    const booking = new Booking("1", property, user, dateRange, 2, totalPrice);

    expect(booking.getId()).toBe("1");
    expect(booking.getProperty()).toBe(property);
    expect(booking.getUser()).toBe(user);
    expect(booking.getDateRange()).toBe(dateRange);
    expect(booking.getMaxGuests()).toBe(2);
    expect(booking.getTotalPrice()).toBe(totalPrice);
  })

  it("deve lancar um erro se o numero de hospedes for 0", () => {
    const property = new Property("1", "Sobrado", "Sobrado bonito", 4, 200);
    const user = new User("1", "Bernardo Rocha");
    const dateRange = new DateRange(new Date("2026-01-10"), new Date("2026-01-17"));
    const totalPrice = property.calculateTotalPrice(dateRange);

    expect(() => new Booking("1", property, user, dateRange, 0, totalPrice)).toThrow("O numero de hospedes deve ser maior que 0");
  })

  it("deve lancar um erro se a propriedade nao tiver capacidade suficiente para o numero de hospedes", () => {
    const property = new Property("1", "Sobrado", "Sobrado bonito", 4, 200);
    const user = new User("1", "Bernardo Rocha");
    const dateRange = new DateRange(new Date("2026-01-10"), new Date("2026-01-17"));
    const totalPrice = property.calculateTotalPrice(dateRange);

    expect(() => new Booking("1", property, user, dateRange, 5, totalPrice)).toThrow("A propriedade nao tem capacidade suficiente para o numero de hospedes");
  })

  it("deve lancar um erro ao tentar reservar com numero de hospedes acima do maximo permitido", () => {
    const property = new Property("1", "Sobrado", "Sobrado bonito", 4, 200);
    const user = new User("1", "Bernardo Rocha");
    const dateRange = new DateRange(new Date("2026-01-10"), new Date("2026-01-17"));
    const totalPrice = property.calculateTotalPrice(dateRange);
    
    expect(() => new Booking("1", property, user, dateRange, 5, totalPrice)).toThrow("A propriedade nao tem capacidade suficiente para o numero de hospedes");
  })

  it("deve verificar se o preco da reserva esta correto", () => {
    // Arrange
    const property = new Property("1", "Sobrado", "Sobrado bonito", 4, 200);
    const user = new User("1", "Bernardo Rocha");
    const dateRange = new DateRange(new Date("2026-01-01"), new Date("2026-01-10"));
    const totalPrice = property.calculateTotalPrice(dateRange);

    // Act
    const booking = new Booking("1", property, user, dateRange, 2, totalPrice);

    // Assert
    expect(booking.calculateTotalPrice()).toBe(1620);
  })
  
  it("nao deve realizar o agendamento quando uma propriedade nao estiver disponivel", () => {
    // Arrange
    const property = new Property("1", "Sobrado", "Sobrado bonito", 4, 200);
    const user = new User("1", "Bernardo Rocha");
    const dateRange = new DateRange(new Date("2026-01-01"), new Date("2026-01-10"));
    const dateRange2 = new DateRange(new Date("2026-01-02"), new Date("2026-01-09"));
    const totalPrice = property.calculateTotalPrice(dateRange);
    const totalPrice2 = property.calculateTotalPrice(dateRange2);

    new Booking("1", property, user, dateRange, 4, totalPrice);

    expect(() => {
      new Booking("2", property, user, dateRange2, 4, totalPrice2);
    }).toThrow("A propriedade nao esta disponivel para as datas selecionadas");
  })

  it("deve cancelar uma reserva sem reembolso quando faltam menos de 1 dia para o check-in", () => {
    const property = new Property("1", "Sobrado", "Sobrado bonito", 4, 200);
    const user = new User("1", "Bernardo Rocha");
    const dateRange = new DateRange(new Date("2026-01-01"), new Date("2026-01-10"));
    const totalPrice = property.calculateTotalPrice(dateRange);
    const booking = new Booking("1", property, user, dateRange, 4, totalPrice);

    const currentDate = new Date("2025-12-09");
    booking.cancel(currentDate);

    expect(booking.getStatus()).toBe("CANCELLED");
  })

  it("deve cancelar uma reserva com reembolso total quando a data for superior a 7 dias da hospedagem", () => {
    const property = new Property("1", "Sobrado", "Sobrado bonito", 4, 200);
    const user = new User("1", "Bernardo Rocha");
    const dateRange = new DateRange(new Date("2026-01-20"), new Date("2026-01-25"));
    const totalPrice = property.calculateTotalPrice(dateRange);
    const booking = new Booking("1", property, user, dateRange, 4, totalPrice);

    const currentDate = new Date("2025-12-10");
    booking.cancel(currentDate);
    
    expect(booking.getStatus()).toBe("CANCELLED");
    expect(booking.getTotalPrice()).toBe(0);
  })

  it("deve cancelar uma reserva com reembolso parcial quando a data estiver entre 1 a 7 dias da hospedagem", () => {
    const property = new Property("1", "Sobrado", "Sobrado bonito", 4, 200);
    const user = new User("1", "Bernardo Rocha");
    const dateRange = new DateRange(new Date("2026-01-20"), new Date("2026-01-25"));
    const totalPrice = property.calculateTotalPrice(dateRange);
    const booking = new Booking("1", property, user, dateRange, 4, totalPrice);

    const currentDate = new Date("2026-01-18");
    booking.cancel(currentDate);

    expect(booking.getStatus()).toBe("CANCELLED");
    expect(booking.getTotalPrice()).toBe(200 * 5 * 0.5);
  })
  
  it("Nao deve permitir cancelar a reserva mais que uma vez", () => {
    const property = new Property("1", "Sobrado", "Sobrado bonito", 4, 200);
    const user = new User("1", "Bernardo Rocha");
    const dateRange = new DateRange(new Date("2026-01-20"), new Date("2026-01-25"));
    const totalPrice = property.calculateTotalPrice(dateRange);
    const booking = new Booking("1", property, user, dateRange, 4, totalPrice);

    const currentDate = new Date("2026-01-18");
    booking.cancel(currentDate);

    expect(() => {
      booking.cancel(currentDate);
    }).toThrow("A reserva ja foi cancelada");
  })
})
