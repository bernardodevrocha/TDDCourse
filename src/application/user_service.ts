import { UserRepository } from "../repositories/user_repositories";
import { User } from "../user/User";

export class UserService {
  constructor(private readonly userRepository: UserRepository){}

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}

// Fake - Repositorio -> classe Fake que simula BD
// Mocks - Objecto que simula o comportamento que desejamos