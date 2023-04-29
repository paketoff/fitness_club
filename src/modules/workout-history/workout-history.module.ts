import { Module } from '@nestjs/common';
import { WorkoutHistoryService } from './workout-history.service';
import { WorkoutHistoryController } from './workout-history.controller';
import { RolesGuard } from '../auth/guards/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../user/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [RoleEntity],
    )
  ],
  providers: [WorkoutHistoryService, RolesGuard],
  controllers: [WorkoutHistoryController]
})
export class WorkoutHistoryModule {}
