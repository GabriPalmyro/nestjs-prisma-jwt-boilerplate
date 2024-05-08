/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsPhoneNumber,
  IsString,
  Length,
  Matches
} from 'class-validator';

export class SignUpUserBody {
  @IsString()
  @Length(4, 150, {message: 'O nome deve ter entre 4 a 150 caracteres'})
  @ApiProperty({
    description: 'Nome do novo usuário',
    example: 'Gabriel'
  })
  firstName: string;

  @IsString()
  @Length(4, 150, {message: 'O nome deve ter entre 4 a 150 caracteres'})
  @ApiProperty({
    description: 'Nome do novo usuário',
    example: 'Palmyro'
  })
  lastName: string;
  
  @IsString()
  @Length(11, 11, {message: 'O CPF deve ter 11 caracteres'})
  @ApiProperty({
    description: 'CPF do usuario',
    example: '48672615808'
  })
  unique_register: string;
  
  @IsEmail({}, {message: 'O e-mail informado está inválido'})
  @ApiProperty({
    description: 'E-mail único do novo usuário',
    example: 'email@gmail.com'
  })
  email: string;
  
  @IsString()
  @Length(5, 30, {message: 'A senha deve ter entre 5 a 30 caracteres'})
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha informada é muito fraca',
  })
  @ApiProperty({
    description: 'Senha do novo usuário',
    example: 'SenhaTeste2023#',
      minLength: 4,
      maxLength: 22    
  })
  password: string;

  @IsPhoneNumber()
  @ApiProperty({
    description: 'Numero de Telefone',
    example: '+5511912345678'
  })
  phoneNumber: string;

  @IsDateString()
  @ApiProperty({
    description: 'Data de nascimento do novo usuário',
    example: '2001-07-07T11:00:00.000Z'
  })
  birthDate: Date;

  @IsString()
  @ApiProperty({
    description: 'Genero',
    example: 'MALE'
  })
  gender: string;

  @IsString()
  @ApiProperty({
    description: 'Tipo de usuario',
    example: 'ADMIN | STUDENT | SUPPORT'
  })
  userType: string;
}
