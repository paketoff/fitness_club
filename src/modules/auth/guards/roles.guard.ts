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
  
    
    if (!authEntity.role_id) {
      return false;
    }


    
    
  
    const authEntityRole = await this.roleRepo.findOne({ 
      where: {
        id_user_role: authEntity.role_id,
      }
   });

   console.log('authEntityRole', authEntityRole);

   

  
    if (!authEntityRole) {
      return false;
    }
  

    console.log('requiredRoles', requiredRoles);
    console.log('authEntityRole.role_name', authEntityRole.role_name);

    return requiredRoles.some((role) => role === authEntityRole.role_name);
  }
}


