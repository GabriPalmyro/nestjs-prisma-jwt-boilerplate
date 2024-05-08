import { Injectable } from '@nestjs/common';
import { Gender, UserType } from '@prisma/client';
import { User } from 'src/app/entities/user';
import { UserRepository } from 'src/app/repositories/user-repository';

interface CreateUserRequest {
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
  phone: string;
  birthDate: Date;
  password: string;
  gender: string;
  userType: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const {
      firstName,
      lastName,
      cpf,
      email,
      phone,
      birthDate,
      password,
      gender,
      userType,
    } = request;

    // const userExistsByEmail = await this.userRepository.findByEmail(email);

    // if (userExistsByEmail) {
    //   throw new HttpException(
    //     'O e-mail informado já está sendo utilizado.',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    const user = new User({
      firstName,
      lastName,
      unique_register: cpf,
      email,
      phoneNumber: phone,
      birthdayDate: birthDate,
      hashPassword: password,
      gender: Gender[gender],
      userType: UserType[userType], // Convert string to UserType
    });

    const { userId } = await this.userRepository.create(user);
    user.userId = userId;

    return { user };
  }
}
