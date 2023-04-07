import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachEntity } from './entities/coach.entity';
import { CoachDTO } from './DTO/coach.dto';

@Controller('coaches')
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  @Get('get-coaches')
  async getAllCoaches():Promise<CoachEntity[]> {
    return await this.coachService.getAllCoaches();
  }

  @Get(':id')
  async getCoachById(@Param('id') id: number): Promise<CoachEntity> {
    return await this.coachService.getCoachById(id);
  }

  @Post('register')
  async createCoach(@Body() createCoachDTO: CoachDTO): Promise<CoachEntity> {
    const coachEntity = new CoachEntity();
    Object.assign(coachEntity, createCoachDTO);
    return await this.coachService.createCoach(coachEntity);
  } 

  @Put(':id')
  async updateCoachById(
    @Param('id') id: number,
    @Body() updatedData: CoachDTO
  ): Promise<CoachEntity | null> {
    const coachEntityUpd = new CoachEntity();
    Object.assign(coachEntityUpd, updatedData);
    return await this.coachService.updateCoachById(id, coachEntityUpd);
  }

  @Delete(':id')
  async deleteCoachById(
    @Param('id') id: number,
  ): Promise<void> {
    return await this.coachService.deleteCoachById(id);
  }
}
