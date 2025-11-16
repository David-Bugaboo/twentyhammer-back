import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/supabaseAuthStrategy.strategy';
import { UsersService } from 'src/common/user.service';
import { PrismaService } from 'prisma/services/prisma.service';
import { HttpModule } from '@nestjs/axios';



@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService, PrismaService],
})
export class AuthModule {}
