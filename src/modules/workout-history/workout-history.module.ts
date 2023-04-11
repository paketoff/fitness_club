import { Module } from '@nestjs/common';
import { WorkoutHistoryService } from './workout-history.service';
import { WorkoutHistoryController } from './workout-history.controller';

@Module({
  providers: [WorkoutHistoryService],
  controllers: [WorkoutHistoryController]
})
export class WorkoutHistoryModule {}
