import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from 'prisma/services/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    email: string,
    displayName: string,
    role: UserRole = UserRole.USER,
  ) {
    if (email === 'davidfaco.ufc@gmail.com') {
      role = UserRole.ADMIN;
    }
    const user = await this.prisma.user.create({
      data: {
        email,
        name: displayName,
        role,
      },
    });

    return user
  }

  async checkUserExistence(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user !== null;
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
    return user;
  }
}
