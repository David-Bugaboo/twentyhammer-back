import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/common/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private user: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: any) {
    console.log('payload >>>>>', payload);
    var user = await this.user.findUserByEmail(payload.email);

    if (!user && payload.app_metadata.provider === 'email') {
      throw new UnauthorizedException('Usuário não encontrado.');
    } else if (!user && payload.app_metadata.provider === 'github') {
      const newUser = await this.user.createUser(
        payload.email,
        payload.user_metadata.full_name,
      );
      return newUser;
    } else if (!user && payload.app_metadata.provider === 'github') {
      const newUser = await this.user.createUser(
        payload.email,
        payload.user_metadata.full_name,
      );
      return newUser;
    }

    return user;
  }
}
