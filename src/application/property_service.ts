import { Property } from "../Property/Property";
import { PropertyRepository } from "../repositories/property_repositories";

export class PropertyService{
  constructor(private readonly propertyRepository: PropertyRepository){}

  async findPropertyById(id: string): Promise<Property | null>{
    return this.propertyRepository.findById(id);
  }
}