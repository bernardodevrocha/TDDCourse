import { Property } from "../../Property/Property";
import { PropertyRepository } from "../../repositories/property_repositories";

export class FakePropertyRepository implements PropertyRepository {
  private properties: Property[] = [
    new Property("1", "Casa na Praia", "Casa com vista para o mar", 4 , 100),
    new Property("2", "Apartamento no centro", "Apartamento Moderno", 2, 200)
  ];
  
  async save(property: Property):Promise<void>{
    this.properties.push(property);
  }

  async findById(id: string): Promise<Property | null> {
    return this.properties.find(property => property.getId() === id) ?? null;
  }
}