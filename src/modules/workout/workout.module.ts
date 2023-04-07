import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutEntity } from './entities/workout.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [WorkoutEntity],
    )
  ],
  providers: [WorkoutService],
  controllers: [WorkoutController]
})
export class WorkoutModule {}
