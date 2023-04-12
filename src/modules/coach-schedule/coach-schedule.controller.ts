import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CoachScheduleService } from './coach-schedule.service';
import { CoachScheduleEntity } from './entities/coach-schedule.entity';
import { CoachScheduleDTO } from './DTO/coach-schedule.dto';

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

  @Post('create-coach-schedule')
  async createCoachSchedule(@Body() coachScheduleDTO: CoachScheduleDTO): Promise<CoachScheduleEntity> {
    const coachSchedule = new CoachScheduleEntity();
    Object.assign(coachSchedule, coachScheduleDTO);
    return await this.coachScheduleService.createCoachSchedule(coachSchedule);
  }

  @Put(':id')
  async updateCoachScheduleById(
    id: number,
    @Body() updatedData: CoachScheduleDTO): Promise<CoachScheduleEntity | null> {
      const coachScheduleUpd = new CoachScheduleEntity();
      Object.assign(coachScheduleUpd, updatedData);
      return await this.coachScheduleService.updateCoachScheduleById(id, coachScheduleUpd);
    }

  @Delete(':id')
  async deleteCoachScheduleById(
    id: number
  ): Promise<void> {
    return await this.coachScheduleService.deleteCoachScheduleById(id);
  }


}
