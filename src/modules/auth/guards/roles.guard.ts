import { Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContextHost): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    const userRole =  user.role_name;
    
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    return requiredRoles.some((role) => userRole === role);
  }
}