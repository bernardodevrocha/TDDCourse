import { Property } from "./Property"

describe("Property Entity", () =>{
  it("Deve criar uma instancia de Property com todos os atributos", () => {
    const property = new Property("1", "Casa de Praia", "Uma bela casa na praia", 4, 200);
    expect(property.getId()).toBe("1");
    expect(property.getName()).toBe("Casa de Praia")
    expect(property.getDescription()).toBe("Uma bela casa na praia");
    expect(property.getMaxGuests()).toBe(4);
    expect(property.getPrice()).toBe(200);
  })

  it("deve lancar um erro se o nome for vazio", () => {
    expect(() => {
      new Property('1', '', 'descricao', 4, 200)
    }).toThrow("O nome e obrigatorio!")
  })

  it("deve lancar um erro se o numero maximo de hospedes for 0 ou negativo", () => {
    expect(() => {
      new Property('1', 'Casa', 'descricao', 0, 200);
    }).toThrow("O numero maximo de hospedes deve ser maior que zero!")
  })
  
  it("deve lancar um erro se o preco for 0 ou negativo", () => {
    expect(() => {
      new Property('1', 'Casa', 'descricao', 3, 0);
    }).toThrow("O preco deve ser maior que 0!")
  })
})
