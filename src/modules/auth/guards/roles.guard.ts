import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { CoachEntity } from "src/modules/coach/entities/coach.entity";
import { RoleEntity } from "src/modules/user/entities/role.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
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
    const authEntity = request.user;

  //authenticated entity can be an user entity and coach entity as well so I make desicion to 
  //give a more abstract name to this variable.
  const authEntityRole = authEntity.role_id;

  if (!authEntityRole) {
    return false;
  }
  return requiredRoles.some((role) => role === authEntityRole);
  }
}


