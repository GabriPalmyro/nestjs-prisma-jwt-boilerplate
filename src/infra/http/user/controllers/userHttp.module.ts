import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ListAllUsers } from 'src/app/use-cases/user/list-all-user';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [ListAllUsers],
})
export class UserHttpModule {}
