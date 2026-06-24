import { PropertyService } from "./property_service";
import { FakePropertyRepository } from "../infrastructure/repositories/fake_property_repository";

describe("PropertyService", () => {
  let propertyService: PropertyService;
  let fakePropertyRepository: FakePropertyRepository;
  
  beforeEach(() => {
    fakePropertyRepository = new FakePropertyRepository();
    propertyService = new PropertyService(fakePropertyRepository);
  });

  it("deve retornar null quando um ID invalido for passado!", async () => {
    const property = await propertyService.findPropertyById("999");
    expect(property).toBeNull();
  });
})