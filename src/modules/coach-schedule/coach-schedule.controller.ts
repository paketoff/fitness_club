import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CoachScheduleService } from './coach-schedule.service';
import { CoachScheduleEntity } from './entities/coach-schedule.entity';
import { CoachScheduleDTO } from './DTO/coach-schedule.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('coach-schedule')
export class CoachScheduleController {

  constructor(private readonly coachScheduleService: CoachScheduleService) {}

  @Get('get-all-schedules')
  async getAllCoachSchedule():Promise<CoachScheduleEntity[]> {
    return await this.coachScheduleService.getAllCoachSchedule();
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

  @Delete(':id')
  async deleteCoachScheduleById(
    id: number,
    @Req() req,
  ): Promise<void> {
    return await this.coachScheduleService.deleteCoachScheduleById(id, req.user);
  }


}
