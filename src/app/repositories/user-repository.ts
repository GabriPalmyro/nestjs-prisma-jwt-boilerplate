import { User } from '../entities/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract delete(id: string): Promise<void>;
  abstract update(user: User): Promise<void>;
  abstract updateHashRT(
    userId: string,
    hashRefreshToken: string,
  ): Promise<void>;
  abstract listAll(): Promise<User[]> | null;
}
