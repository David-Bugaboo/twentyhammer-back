import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LoginDto } from './dto/login.dto';
import { supabase } from 'src/supabase/supabase.client';
import { UsersService } from 'src/common/user.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  create(@Req() req: any) {
    return req.user;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginDto.email,
      password: loginDto.password,
    });
    if (error) {
      throw new UnauthorizedException(error.message);
    }

    const user = await this.usersService.findUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    return { data: user, token: data.session.access_token };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { data, error } = await supabase.auth.signUp({
      email: registerDto.email,
      password: registerDto.password,
      options: {
        data: {
          display_name: registerDto.name, // user_metadata
        },
      },
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    const user = await this.usersService.checkUserExistence(registerDto.email);
    if (user) {
      throw new UnauthorizedException('Usuário já existe.');
    }

    const newUser = await this.usersService.createUser(
      registerDto.email,
      registerDto.name,
    );

    return newUser;
  }

  @Post('send-password-change-email')
  async sendPasswordChangeEmail(@Body("email") email: string) {
    return this.authService.sendPasswordChangeEmail(email);
  }
  @Post('change-password')
  async changePassword(@Body("password") password: string, @Query("access_token") access_token: string) {
    
    return this.authService.changePassword(password, access_token);
  }
}
