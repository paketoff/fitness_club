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
import { CoachScheduleService } from '../coach-schedule/coach-schedule.service';
import { WorkoutTypeEntity } from '../workout/entities/workout-type.entity';
import { WorkoutEntity } from '../workout/entities/workout.entity';
import { WorkoutService } from '../workout/workout.service';
import { CoachScheduleEntity } from '../coach-schedule/entities/coach-schedule.entity';
import { CoachEntity } from '../coach/entities/coach.entity';
import { CoachService } from '../coach/coach.service';
import { CoachQualificationEntity } from '../coach-qualification/entities/coach-qualification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [RoleEntity, WorkoutHistoryEntity, UserEntity, WorkoutTypeEntity, WorkoutEntity, CoachScheduleEntity, CoachEntity, CoachQualificationEntity],
    )
  ],
  providers: [WorkoutHistoryService, CoachScheduleService, RolesGuard, UserService, RoleService, WorkoutService, CoachService],
  controllers: [WorkoutHistoryController]
})
export class WorkoutHistoryModule {}
