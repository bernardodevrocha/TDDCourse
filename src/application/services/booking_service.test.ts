import { CreateBookingDTO } from "../dtos/create_booking_dto"
import { Booking } from "../../Booking/Booking"
import { BookingService } from "./booking_service";
import { FakeBookingRepository } from "../../infrastructure/repositories/fake_booking_repository"
import { PropertyService } from "../property_service";
import { UserService } from "../user_service";

jest.mock("./property_service")
jest.mock("./user_service")
describe("BookingService", () => {
  let bookingService: BookingService;
  let fakeBookingRepository: FakeBookingRepository;
  let mockPropertyService: jest.Mocked<PropertyService>;
  let mockUserService: jest.Mocked<UserService>;

  beforeEach(() => {
    const mockPropertyRepository = {} as any;
    const mockUserRepository = {} as any;

    mockPropertyService = new PropertyService(
      mockPropertyRepository
    ) as jest.Mocked<PropertyService>;
    
    mockUserService = new UserService(
      mockUserRepository
    ) as jest.Mocked<UserService>;

    fakeBookingRepository = new FakeBookingRepository();

    bookingService = new BookingService(
      fakeBookingRepository,
      mockPropertyService,
      mockUserService
    )
  })
  
  it("deve criar uma reserva com sucesso usando repositorio fake", async () => {
    const bookingDTO: CreateBookingDTO = {
      propertyId: "1",
      guestId: "1",
      startDate: new Date("2025-05-20"),
      endDate: new Date("2025-05-25"),
      guestCount: 2
    };

    const result = BookingService.createBooking(bookingDTO);

    expect(result).toBeInstanceOf(Booking);
    expect(result.getStatus()).toBe("CONFIRMED");
    expect(result.getTotalPrice()).toBe(500);

    const savedBooking = await fakeBookingRepository.findById(result.getId());
    expect(savedBooking).not.toBeNull();
    expect(savedBooking?.getId()).toBe(result.getId());
  })
})