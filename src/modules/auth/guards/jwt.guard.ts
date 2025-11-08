import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_ADMIN_KEY } from 'src/common/decorators/isAdmin.decorato';
import { IS_PUBLIC_KEY } from 'src/common/decorators/isPublic.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    
      if (err || !user) {
        console.log('err >>>>>',err);
      throw err || new UnauthorizedException('Não Autorizado');
    }
    const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isAdmin && !user.role.includes('ADMIN')) {
      throw new ForbiddenException('Permissão insuficiente.');
    }
    return user;
  }
}
