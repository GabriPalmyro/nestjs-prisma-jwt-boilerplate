import { IsString } from 'class-validator';

export class RefreshTokenUserBody {
  @IsString()
  userId: string;

  @IsString()
  refreshToken: string;
}
