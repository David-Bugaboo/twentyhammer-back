import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/supabaseAuthStrategy.strategy';
import { UsersService } from 'src/common/user.service';
import { PrismaService } from 'prisma/services/prisma.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { SupabaseRestService } from 'src/supabaseRestService/supabase-rest.service';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService, PrismaService, HttpService, SupabaseRestService],
})
export class AuthModule {}
