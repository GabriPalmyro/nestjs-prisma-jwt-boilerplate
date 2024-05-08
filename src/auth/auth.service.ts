import { UserRepository } from '@app/repositories/user-repository';
import { CreateUser } from '@app/use-cases/user/create-user';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RefreshTokenUserBody } from './dtos/refresh-user-body';
import { SignInUserBody } from './dtos/signin-user-body';
import { SignUpUserBody } from './dtos/signup-user-body';
import { UnauthorizedError } from './errors/unauthorized.error';
import { Tokens } from './types';
import { LoginViewModel } from './view-models/login-view-model';
import { SignupViewModel } from './view-models/signup-view-model';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private createUser: CreateUser,
  ) {}

  async hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  async signup(createUserBody: SignUpUserBody): Promise<SignupViewModel> {
    const {
      firstName,
      lastName,
      email,
      birthDate,
      gender,
      password,
      phoneNumber,
      unique_register,
      userType,
    } = createUserBody;

    const hashPassword = await this.hashData(password);

    const { user } = await this.createUser.execute({
      firstName,
      lastName,
      cpf: unique_register,
      email,
      phone: phoneNumber,
      birthDate,
      password: hashPassword,
      gender,
      userType,
    });

    const tokens = await this.getTokens(user.userId, user.email);
    await this.updateRtHash(user.userId, tokens.refresh_token);

    // try {
    //   await this.sendVerifyUserEmail.execute({
    //     name: user.name,
    //     email: user.email,
    //     access_token: tokens.access_token,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    return SignupViewModel.toHTTP(user, tokens);
  }

  async signin(loginUserBody: SignInUserBody): Promise<LoginViewModel> {
    const { email, password } = loginUserBody;

    const user = await this.userRepository.findByEmail(email);

    if (!user)
      throw new HttpException(
        'Verifique seu e-mail ou senha novamente',
        HttpStatus.BAD_REQUEST,
      );

    const passwordMatches = await bcrypt.compare(password, user.hashPassword);

    if (!passwordMatches)
      throw new HttpException(
        'Verifique seu e-mail ou senha novamente',
        HttpStatus.BAD_REQUEST,
      );

    // if (!user.emailVerifiedAt)
    //   throw new HttpException('E-mail não verificado', HttpStatus.UNAUTHORIZED);

    const tokens = await this.getTokens(user.userId, user.email);
    await this.updateRtHash(user.userId, tokens.refresh_token);
    return LoginViewModel.toHTTP(user, tokens);
  }

  // async logout(logoutUserBody: LogoutUserBody) {
  //   const { userId } = logoutUserBody;
  //   await this.userRepository.deleteHashRT(userId);
  // }

  async refreshToken(refreshTokenUserBody: RefreshTokenUserBody) {
    const { userId, refreshToken } = refreshTokenUserBody;
    const user = await this.userRepository.findById(userId);

    if (!user || !user.hashRefreshToken)
      throw new HttpException('Acesso Negado', HttpStatus.FORBIDDEN);

    const rtMatches = await bcrypt.compare(refreshToken, user.hashRefreshToken);

    if (!rtMatches) throw new UnauthorizedError('Access Denied');

    const tokens = await this.getTokens(user.userId, user.email);
    await this.updateRtHash(user.userId, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(userId: string, refreshToken: string) {
    const hash = await this.hashData(refreshToken);
    await this.userRepository.updateHashRT(userId, hash);
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: process.env.AT_SECRET,
          expiresIn: 60 * 60 * 24,
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: process.env.RT_SECRET,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
