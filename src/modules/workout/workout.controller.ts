import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutEntity } from './entities/workout.entity';
import { WorkoutDTO } from './DTO/workout.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('workouts')
export class WorkoutController {

  constructor(private readonly workoutService: WorkoutService) {}

  
  @Get('get-workouts')
  async getAllWorkouts(): Promise<WorkoutEntity[]> {
    return await this.workoutService.getAllWorkouts();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Get(':id')
  async getWorkoutById(@Param('id') id: number): Promise<WorkoutEntity> {
    return await this.workoutService.findWorkoutById(id);
  }

  
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post('create-workout') 
  async createWorkout(@Body() createWorkoutDTO: WorkoutDTO): Promise<WorkoutEntity> {
    const workout = new WorkoutEntity();
    Object.assign(workout, createWorkoutDTO);
    return await this.workoutService.createWorkout(workout);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  async updateWorkoutById(
    @Param('id') id: number,
    @Body() updatedData: WorkoutDTO,
  ): Promise<WorkoutEntity | null> {
    const workoutUpd = new WorkoutEntity();
    Object.assign(workoutUpd, updatedData);
    return await this.workoutService.updateWorkoutById(id, workoutUpd);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteWorkoutById(
    @Param('id') id: number,
  ): Promise<void> {
    return await this.workoutService.deleteWorkoutById(id);    
  }

}
