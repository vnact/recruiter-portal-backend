import { UserRole } from '@vnact/recruiter-shared-enum';
import { ROLES_KEY } from '@decorators/roles.decorator';
import { JwtClaimsDto } from '@modules/auth/dto/jwt-claims.dto';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const user: JwtClaimsDto = context.switchToHttp().getRequest().user;
    return requiredRoles.some((role) => user.role === role);
  }
}
