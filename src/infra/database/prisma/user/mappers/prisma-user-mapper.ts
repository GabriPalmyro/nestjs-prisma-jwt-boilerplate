import { User } from '@app/entities/user';
import { User as RawUser } from '@prisma/client';
export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      birthdayDate: user.birthdayDate,
      email: user.email,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      userType: user.userType,
      hashPassword: user.hashPassword,
      unique_register: user.unique_register,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User({
      userId: raw.userId,
      email: raw.email,
      firstName: raw.firstName,
      lastName: raw.lastName,
      gender: raw.gender,
      phoneNumber: raw.phoneNumber,
      birthdayDate: raw.birthdayDate,
      hashPassword: raw.hashPassword,
      userType: raw.userType,
      unique_register: raw.unique_register,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
