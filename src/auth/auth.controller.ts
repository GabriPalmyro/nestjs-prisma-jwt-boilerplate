import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  // eslint-disable-next-line prettier/prettier
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { RtGuard } from 'src/common/guards/rt.guard';
import { AuthService } from './auth.service';
import { SignInUserBody } from './dtos/signin-user-body';
import { SignInUserResponse } from './dtos/signin-user-response';
import { SignUpUserBody } from './dtos/signup-user-body';
import { SignUpUserResponse } from './dtos/signup-user-response';
import { LoginViewModel } from './view-models/login-view-model';
import { SignupViewModel } from './view-models/signup-view-model';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    description:
      'Cria um novo usuário no banco de dados e envia o email de verificação de conta',
  })
  @ApiResponse({
    status: 201,
    description:
      'A conta foi criado com sucesso e o e-mail também foi enviado com sucesso',
    type: SignUpUserResponse,
  })
  @ApiResponse({
    status: 400,
    description: `
      Diversas mensagens de erros podem ser retornadas como:
       - 'A senha informada é muito fraca'
       - 'O e-mail informado está inválido'
       - 'O nickname deve ter entre 4 a 20 caracteres'
       - 'O nome deve ter entre 4 a 150 caracteres'
      `,
  })
  @ApiResponse({
    status: 403,
    description:
      'Não foi possível criar uma nova conta com as credenciais fornecidas.',
  })
  async signup(@Body() req: SignUpUserBody): Promise<SignupViewModel> {
    return this.authService.signup(req);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description:
      'Verificar se o usuário existe e está com o e-mail verificado e retorna as credenciais e o usuário',
  })
  @ApiResponse({
    status: 200,
    description:
      'Usuário autenticado com sucesso. Porém caso o email não esteja verificado o atributo email_validated é false, mas os tokens são retornadas',
    type: SignInUserResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Verifique seu e-mail ou senha novamente.',
  })
  @ApiResponse({
    status: 403,
    description:
      'Não foi possível encontrar uma conta com as credenciais fornecidas.',
  })
  async signin(@Body() req: SignInUserBody): Promise<LoginViewModel> {
    return this.authService.signin(req);
  }

  // @UseGuards(AtGuard)
  // @Post('logout')
  // @HttpCode(HttpStatus.OK)
  // async logout(@GetCurrentUserId() userId: string) {
  //   return this.authService.logout({ userId });
  // }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshTokens: string,
  ) {
    return this.authService.refreshToken({
      userId: userId,
      refreshToken: refreshTokens,
    });
  }
}
