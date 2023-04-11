import { Module } from '@nestjs/common';
import { CoachScheduleService } from './coach-schedule.service';
import { CoachScheduleController } from './coach-schedule.controller';

@Module({
  providers: [CoachScheduleService],
  controllers: [CoachScheduleController]
})
export class CoachScheduleModule {}
