import { User } from '@app/entities/user';
import { ApiProperty } from '@nestjs/swagger';
import { Tokens } from '../types';

export class SignUpUserResponse {
  @ApiProperty({
    description: 'Usuário cadastrado com sucesso',
    type: 'object',
    example: {
      user: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        nickname: 'johndoe',
      },
    },
  })
  readonly user: {
    name: string;
    email: string;
    nickname: string;
  };

  @ApiProperty({
    description: 'Tokens de acesso gerados para o usuário',
    type: 'object',
    example: {
      access_token: 'access_token_value',
      refresh_token: 'refresh_token_value',
    },
  })
  readonly tokens: {
    access_token: string;
    refresh_token: string;
  };

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
