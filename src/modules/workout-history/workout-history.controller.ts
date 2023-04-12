import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WorkoutHistoryService } from './workout-history.service';
import { WorkoutHistoryEntity } from './entities/workout-history.entity';
import { WorkoutHistoryDTO } from './DTO/workout-history.dto';

@Controller('workout-history')
export class WorkoutHistoryController {

  constructor(private readonly workoutHistoryService: WorkoutHistoryService) {}

  @Get('get-all-history')
  async getAllWorkoutHistory(): Promise<WorkoutHistoryEntity[]> {
    return await this.workoutHistoryService.getAllHistory();
  }

  @Get(':id')
  async getWorkoutHistoryById(
    @Param('id') id: number,
  ): Promise<WorkoutHistoryEntity> {
    return await this.workoutHistoryService.getHistoryById(id);
  }

  @Post('create-workout-history')
  async createWorkoutHistory(@Body() workoutHistoryDTO: WorkoutHistoryDTO): Promise<WorkoutHistoryEntity> {
    const workoutHistory = new WorkoutHistoryEntity();
    Object.assign(workoutHistory, workoutHistoryDTO);
    return await this.workoutHistoryService.createHistory(workoutHistory);
  }

  @Put(':id')
  async updateWorkoutHistoryById(
    id: number,
    @Body() workoutHistoryDTO: WorkoutHistoryDTO): Promise<WorkoutHistoryEntity | null> {
      const workoutHistoryUpd = new WorkoutHistoryEntity();
      Object.assign(workoutHistoryUpd, workoutHistoryDTO);
      return await this.workoutHistoryService.updateHistoryById(id, workoutHistoryUpd);
    }

  @Delete(':id')
  async deleteWorkoutHistoryById(
    id: number
  ): Promise<void> {
    return await this.workoutHistoryService.deleteHistoryById(id);
  }

}
