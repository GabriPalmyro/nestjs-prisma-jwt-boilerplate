import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserHttpModule } from './user/controllers/userHttp.module';

@Module({
  imports: [DatabaseModule, UserHttpModule],
})
export class HttpModule {}
