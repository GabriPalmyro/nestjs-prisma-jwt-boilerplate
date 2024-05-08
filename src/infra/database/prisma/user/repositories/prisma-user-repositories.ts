import { Injectable } from '@nestjs/common';
import { User } from 'src/app/entities/user';
import { UserRepository } from 'src/app/repositories/user-repository';
import { PrismaService } from '../../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUserRepositories implements UserRepository {
  constructor(private prismaService: PrismaService) {}
  async create(user: User): Promise<User> {
    const userCreated = await this.prismaService.user.create({
      data: PrismaUserMapper.toPrisma(user),
    });

    return PrismaUserMapper.toDomain(userCreated);
  }

  async findById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        userId: id,
      },
    });

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    return PrismaUserMapper.toDomain(user);
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        userId: id,
      },
    });
  }

  async update(user: User): Promise<void> {
    await this.prismaService.user.update({
      where: {
        userId: user.userId,
      },
      data: PrismaUserMapper.toPrisma(user),
    });
  }

  async updateHashRT(userId: string, hashRefreshToken: string): Promise<void> {
    await this.prismaService.user.update({
      where: { userId: userId },
      data: {
        hashedRt: hashRefreshToken,
      },
    });
  }

  async listAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();
    return users.map((user) => {
      return PrismaUserMapper.toDomain(user);
    });
  }
}
