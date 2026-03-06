import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {

    const req = context.switchToHttp().getRequest();

    const user = req.user;

    if (user.role === 'admin') {
      return true;
    }

    return false;

  }

}