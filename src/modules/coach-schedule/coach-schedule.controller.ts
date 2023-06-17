import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
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
  ): Promise<CoachScheduleEntity[]> {
    return await this.coachScheduleService.getCoachScheduleForCoach(req.user);
  }

  @Get(':id')
  async getCoachScheduleById(id: number): Promise<CoachScheduleEntity> {
    return await this.coachScheduleService.getCoachScheduleById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'coach')
  @Post('create-coach-schedule')
  async createCoachSchedule(
    @Body() coachScheduleDTO: CoachScheduleDTO,
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
    id: number,
    @Body() updatedData: CoachScheduleDTO,
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
