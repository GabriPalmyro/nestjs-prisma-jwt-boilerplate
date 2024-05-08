import { CreateUser } from '@app/use-cases/user/create-user';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports: [DatabaseModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, CreateUser],
})
export class AuthModule {}
