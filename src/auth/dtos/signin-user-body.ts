/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString
} from 'class-validator';

export class SignInUserBody {
  @IsEmail({}, { message: 'O e-mail inserido é inválido ou está incorreto'})
  @ApiProperty({
    description: 'E-mail único do usuário',
    example: 'email@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'SenhaTeste2023#',
    minLength: 5,
    maxLength: 30,
  })
  password: string;
}
