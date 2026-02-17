import { Property } from "./Property";
import { DateRange } from "../value_objects/date_range";

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

  it("deve validar o numero de hospedes", () => { 
    expect(() => {
      new Property('1', 'Casa', 'descricao', 6, 200);
    }).toThrow("A quantidade de hospedes e invalida para o quarto!")
  })
  
  it("deve lancar um erro se o preco for 0 ou negativo", () => {
    expect(() => {
      new Property('1', 'Casa', 'descricao', 3, 0);
    }).toThrow("O preco deve ser maior que 0!")
  })
  
  it("deve lancar um erro se nao existir descricao", () => {
    expect(() => {
      new Property('1', 'Casa', '', 1, 0);
    }).toThrow("A descricao e obrigatoria!")
  })

  it("nao deve aplicar desconto para estadias menores que 7 noites", () => {
    const property = new Property("1", "Sitio", "Sitio isolado, bonito e bom pra pesca", 4, 750);
    const dateRange = new DateRange(new Date("2026-01-10"), new Date("2026-01-15"));
    const totalPrice = property.calculateTotalPrice(dateRange);

    expect(totalPrice).toBe(3750);
  })
  
  it("deve aplicar desconto para estadias de 7 noites ou mais", () => {
    const property = new Property("1", "Sitio", "Sitio isolado, bonito e bom pra pesca", 2, 100);
    const dateRange = new DateRange(new Date("2026-01-10"), new Date("2026-01-18"));
    const totalPrice = property.calculateTotalPrice(dateRange);

    expect(totalPrice).toBe(720);
  })
})
