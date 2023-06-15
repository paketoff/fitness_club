import { Module } from '@nestjs/common';
import { CoachScheduleService } from './coach-schedule.service';
import { CoachScheduleController } from './coach-schedule.controller';
import { CoachScheduleEntity } from './entities/coach-schedule.entity';
import { RoleEntity } from '../user/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CoachEntity } from '../coach/entities/coach.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoachScheduleEntity, CoachEntity, RoleEntity]),
  ],
  providers: [CoachScheduleService, RolesGuard],
  controllers: [CoachScheduleController],
  exports: [CoachScheduleService]
})
export class CoachScheduleModule {}
