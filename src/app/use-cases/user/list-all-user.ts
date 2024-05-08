import { Injectable } from '@nestjs/common';
import { User } from 'src/app/entities/user';
import { UserRepository } from 'src/app/repositories/user-repository';

interface ListAllUsersResponse {
  users: User[];
}

@Injectable()
export class ListAllUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<ListAllUsersResponse> {
    const users = await this.userRepository.listAll();

    return { users };
  }
}
