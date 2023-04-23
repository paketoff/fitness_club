import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "./entities/role.entity";
import { Repository } from "typeorm";

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}


  async getRoleById(id: number): Promise<RoleEntity> {
    return await this.roleRepository.findOne({
      where: {
        id_user_role: id,
      }
    });
  }
  
}