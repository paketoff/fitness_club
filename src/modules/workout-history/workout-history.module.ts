import { Module } from '@nestjs/common';
import { WorkoutHistoryService } from './workout-history.service';
import { WorkoutHistoryController } from './workout-history.controller';
import { RolesGuard } from '../auth/guards/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../user/entities/role.entity';
import { WorkoutHistoryEntity } from './entities/workout-history.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { RoleService } from '../user/role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [RoleEntity, WorkoutHistoryEntity, UserEntity],
    )
  ],
  providers: [WorkoutHistoryService, RolesGuard, UserService, RoleService],
  controllers: [WorkoutHistoryController]
})
export class WorkoutHistoryModule {}
