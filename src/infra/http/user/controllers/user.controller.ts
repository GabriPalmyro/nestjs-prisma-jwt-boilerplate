import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListAllUsers } from 'src/app/use-cases/user/list-all-user';
import { Public } from 'src/common/decorators/public.decorator';
import { UserViewModel } from '../view-models/user-view-model';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private listAllUsers: ListAllUsers) {}

  @Public()
  @Get('all')
  @ApiOperation({
    description: 'Lista de usuários cadastrados na plataforma',
  })
  async listAll() {
    const { users } = await this.listAllUsers.execute();
    return users.map(UserViewModel.toHTTP);
  }
}
