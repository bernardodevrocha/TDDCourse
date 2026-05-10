import { User } from "../user/User";

export interface UserRepository{
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
}