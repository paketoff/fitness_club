import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { WorkoutHistoryService } from './workout-history.service';
import { WorkoutHistoryEntity } from './entities/workout-history.entity';
import { WorkoutHistoryDTO } from './DTO/workout-history.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('workout-history')
export class WorkoutHistoryController {

  constructor(private readonly workoutHistoryService: WorkoutHistoryService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Get('get-all-history')
  async getAllWorkoutHistory(
    @Req() req,
  ): Promise<WorkoutHistoryEntity[]> {
    return await this.workoutHistoryService.getAllHistory(req.user);
  }

  @UseGuards(AuthGuard)
  @Roles('user', 'admin')
  @Post('book/:id')
  async bookTraining(
    @Req() req,
    @Param('id') scheduleId: number
  ): Promise<WorkoutHistoryEntity> {
    return this.workoutHistoryService.bookTraining(req.user, scheduleId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Get('user-history')
  async getUserWorkoutHistory(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<
  { data: WorkoutHistoryEntity[], 
    total: number, 
    page: number, 
    limit: number }> {
    return await this.workoutHistoryService.getUserWorkoutHistory(req.user, {page, limit});
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'coach', 'user')
  @Get(':id')
  async getWorkoutHistoryById(
    @Param('id') id: number,
    @Req() req,
  ): Promise<WorkoutHistoryEntity> {
    return await this.workoutHistoryService.getHistoryById(id, req.user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'coach')
  @Post('create-workout-history')
  async createWorkoutHistory(
    @Body() workoutHistoryDTO: WorkoutHistoryDTO,
    @Req() req,
    ): Promise<WorkoutHistoryEntity> {
    const workoutHistory = new WorkoutHistoryEntity();
    Object.assign(workoutHistory, workoutHistoryDTO);
    return await this.workoutHistoryService.createHistory(workoutHistory, req.user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  async updateWorkoutHistoryById(
    id: number,
    @Body() workoutHistoryDTO: WorkoutHistoryDTO,
    @Req() req,
    ): Promise<WorkoutHistoryEntity | null> {
      const workoutHistoryUpd = new WorkoutHistoryEntity();
      Object.assign(workoutHistoryUpd, workoutHistoryDTO);
      return await this.workoutHistoryService.updateHistoryById(id, workoutHistoryUpd, req.user);
    }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteWorkoutHistoryById(
    id: number
  ): Promise<void> {
    return await this.workoutHistoryService.deleteHistoryById(id);
  }

}
