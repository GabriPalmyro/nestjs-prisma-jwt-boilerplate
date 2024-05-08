import { IsNumber } from 'class-validator';

export class LogoutUserBody {
  @IsNumber()
  userId: number;
}
