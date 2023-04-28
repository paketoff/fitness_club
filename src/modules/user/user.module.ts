import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import {RoleService} from './role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
  ],
  providers: [UserService, RoleService],
  controllers: [UserController],
  exports: [UserService, RoleService]
})
export class UserModule {}
