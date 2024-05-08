import { User } from '@app/entities/user';
import { Tokens } from '../types';

export class SignupViewModel {
  static toHTTP(user: User, tokens: Tokens) {
    return {
      user: {
        name: user.fullName,
        email: user.email,
      },
      tokens: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      },
    };
  }
}
