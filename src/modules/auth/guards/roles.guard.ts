import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRoleEntity } from "src/modules/user/entities/user-role.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepo: Repository<UserRoleEntity>,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const userRole = await this.userRoleRepo.findOneBy(user.role_id);
    if (!userRole) {
      return false;
    }
    return requiredRoles.some((role) => role === userRole.role_name);
  }
}
