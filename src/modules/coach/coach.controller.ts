import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachEntity } from './entities/coach.entity';
import { CoachDTO } from './DTO/coach.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { CoachQualificationService } from '../coach-qualification/coach-qualification.service';
import { classToPlain } from 'class-transformer';
import { AddQualificationToCoachDTO } from '../qualification-and-coach/DTO/add-qualification-to-coach.dto';
import { CoachQualificationEntity } from '../coach-qualification/entities/coach-qualification.entity';
import { UpdateQualificationsForCoachDTO } from '../qualification-and-coach/DTO/update-qualification-for-coach.dto';
import { RemoveQualificationFromCoachDTO } from '../qualification-and-coach/DTO/remove-qualification-from-coach.dto';

@Controller('coaches')
export class CoachController {
  constructor(
    private readonly coachService: CoachService,
      ) {}

  @Roles('user')
  @Get('get-coaches')
  async getAllCoaches():Promise<CoachEntity[]> {
    return await this.coachService.getAllCoaches();
  }

  @Get(':id')
  async getCoachById(@Param('id') id: number): Promise<CoachEntity> {
    return await this.coachService.getCoachById(id);
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

  @Post('add-qualification-to-coach')
  async addQualificationToCoach(
    @Body() addQualificationToCoachDTO: AddQualificationToCoachDTO
  ): Promise<CoachEntity> {
    return await this.coachService.addQualificationToCoach(
      addQualificationToCoachDTO.coach_id, 
      addQualificationToCoachDTO.qualification_id);
  }

  @Get('get-qualifications-for-coach/:id')
  async getQualificationsForCoach(
    @Param('id') coach_id: number,
  ): Promise<CoachQualificationEntity[]> {
    return await this.coachService.getQualificationsForCoach(coach_id);
  }

  @Put('update-qualifications-for-coach')
  async updateQualificationsForCoach(
    @Body() updateQualificationsForCoachDTO: UpdateQualificationsForCoachDTO,
  ): Promise<CoachEntity> {
    return await this.coachService.updateQualificationsForCoach(
      updateQualificationsForCoachDTO.coach_id,
      updateQualificationsForCoachDTO.new_qualification_ids,
    );
  }

  @Delete('remove-qualification-from-coach')
  async removeQualificationFromCoach(
    @Body() removeQualificationFromCoachDTO: RemoveQualificationFromCoachDTO,
  ): Promise<CoachEntity> {
    return await this.coachService.removeQualificationFromCoach(
      removeQualificationFromCoachDTO.coach_id,
      removeQualificationFromCoachDTO.qualification_id,
    );
  }
}
