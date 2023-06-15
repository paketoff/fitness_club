import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutEntity } from './entities/workout.entity';
import { RoleEntity } from '../user/entities/role.entity';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [WorkoutEntity, RoleEntity],
    )
  ],
  providers: [WorkoutService, RolesGuard],
  controllers: [WorkoutController],
  exports: [WorkoutService]
})
export class WorkoutModule {}
