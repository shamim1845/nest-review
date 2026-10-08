import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.headers.authorization);
    const token = request.headers.authorization?.split(' ')[1];

    if (token === "secret1234") {
      return true;
    } else {
      return false;
    }
  }
}
