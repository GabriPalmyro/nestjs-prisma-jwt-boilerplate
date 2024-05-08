import { User } from '@app/entities/user';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.userId,
      name: user.fullName,
      email: user.email,
    };
  }
}
