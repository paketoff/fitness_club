import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutEntity } from './entities/workout.entity';
import { WorkoutDTO } from './DTO/workout.dto';

@Controller('workouts')
export class WorkoutController {

  constructor(private readonly workoutService: WorkoutService) {}

  @Get('get-workouts')
  async getAllWorkouts(): Promise<WorkoutEntity[]> {
    return await this.workoutService.getAllWorkouts();
  }

  @Get(':id')
  async getWorkoutById(@Param('id') id: number): Promise<WorkoutEntity> {
    return await this.workoutService.findWorkoutById(id);
  }

  @Post('create-workout') 
  async createWorkout(@Body() createWorkoutDTO: WorkoutDTO): Promise<WorkoutEntity> {
    const workout = new WorkoutEntity();
    Object.assign(workout, createWorkoutDTO);
    return await this.workoutService.createWorkout(workout);
  }

  @Put(':id')
  async updateWorkoutById(
    @Param('id') id: number,
    @Body() updatedData: WorkoutDTO,
  ): Promise<WorkoutEntity | null> {
    const workoutUpd = new WorkoutEntity();
    Object.assign(workoutUpd, updatedData);
    return await this.workoutService.updateWorkoutById(id, workoutUpd);
  }

  @Delete(':id')
  async deleteWorkoutById(
    @Param('id') id: number,
  ): Promise<void> {
    return await this.workoutService.deleteWorkoutById(id);    
  }

}
