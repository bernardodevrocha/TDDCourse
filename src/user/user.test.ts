import {User} from "./User";

describe("User Entity", () => {
  it("deve criar uma instancia de user com ID e Nome", () => {
    const user = new User("1", "Bernardo Rocha")
    expect(user.getId()).toBe("1")
    expect(user.getName()).toBe("Bernardo Rocha")
  });

  it("deve lancar um erro se o nome for vazio", () => {
    expect(() => new User("1", "")).toThrow("O nome e obrigatorio!");
  })

  it("deve lancar um erro se o ID for vazio", () => {
    expect(() => new User("", "Bernardo")).toThrow("O ID e obrigatorio!");
  })

})