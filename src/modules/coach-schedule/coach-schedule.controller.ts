import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CoachScheduleService } from './coach-schedule.service';
import { CoachScheduleEntity } from './entities/coach-schedule.entity';
import { CoachScheduleDTO } from './DTO/coach-schedule.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('coach-schedule')
export class CoachScheduleController {

  constructor(private readonly coachScheduleService: CoachScheduleService) {}

  @Get('get-all-schedules')
  async getAllCoachSchedule():Promise<CoachScheduleEntity[]> {
    return await this.coachScheduleService.getAllCoachSchedule();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'coach')
  @Get('check-coach-schedule')
  async getScheduleForCoach(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<
  { data: CoachScheduleEntity[], 
    total: number, 
    page: number, 
    limit: number }> {
    return await this.coachScheduleService.getCoachScheduleForCoach(req.user, {page, limit});
  }

  @Get(':id')
  async getCoachScheduleById(id: number): Promise<CoachScheduleEntity> {
    return await this.coachScheduleService.getCoachScheduleById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'coach')
  @Post('create-coach-schedule')
  async createCoachSchedule(
    @Body() coachScheduleDTO: any,
    @Req() req,
    ): Promise<CoachScheduleEntity> {
    const coachSchedule = new CoachScheduleEntity();
    Object.assign(coachSchedule, coachScheduleDTO);
    return await this.coachScheduleService.createCoachSchedule(coachSchedule, req.user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'coach', 'user')
  @Put(':id')
  async updateCoachScheduleById(
    @Param('id') id: number,
    @Body() updatedData: any,
    @Req() req,
    ): Promise<CoachScheduleEntity | null> {
      const coachScheduleUpd = new CoachScheduleEntity();
      Object.assign(coachScheduleUpd, updatedData);
      return await this.coachScheduleService.updateCoachScheduleById(id, coachScheduleUpd, req.user);
    }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'coach')
  @Delete(':id')
  async deleteCoachScheduleById(
    id: number,
    @Req() req,
  ): Promise<void> {
    return await this.coachScheduleService.deleteCoachScheduleById(id, req.user);
  }


}
