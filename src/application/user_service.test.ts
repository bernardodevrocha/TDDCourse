import { UserService } from "./user_service"
import { FakeUserRepository } from "../infrastructure/repositories/fake_user_repository";
import { User } from "../user/User";

describe("UserService", () => {
  let userService: UserService;
  let fakeUserRepository: FakeUserRepository;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    userService = new UserService(fakeUserRepository);
  })

  it("Deve retornar branco se um ID invalido for passado!", async () => {
    const userService = new UserService(fakeUserRepository);
    const user = await userService.findUserById("999");
    expect(user).toBeNull();
  })
  
  it("Deve retornar um usuario um ID valido for passado", async () => {
    const user = await userService.findUserById("1");
    expect(user).not.toBeNull();
    expect(user?.getId()).toBe("1");
    expect(user?.getName()).toBe("John Doe");
  })
  
  it("Deve salvar um novo usuario com sucesso usando repositorio fake e buscando novamente", async () => {
    const newUser = new User("3", "Test User");
    await fakeUserRepository.save(newUser);
    const user = await userService.findUserById("3")
    expect(user).not.toBeNull();
    expect(user?.getId()).toBe("3");
    expect(user?.getName()).toBe("Test User");
  })
})