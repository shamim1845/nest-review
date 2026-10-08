import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './roles.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, 
      [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const userRole = request.headers["x-user-role"];
    console.log({requiredRoles, userRole});
    
    return requiredRoles.includes(userRole as Role);
  }
}
