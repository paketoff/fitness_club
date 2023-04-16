import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CoachQualificationEntity } from './entities/coach-qualification.entity'; 
import { CoachQualificationService } from './coach-qualification.service'; 

@Controller('qualifications')
export class CoachQualificationController {
  constructor(private readonly qualificationService: CoachQualificationService) {}

  @Post()
  async createQualification(@Body() qualification: CoachQualificationEntity): Promise<CoachQualificationEntity> {
    return await this.qualificationService.createQualification(qualification);
  }

  @Get()
  async getAllQualifications(): Promise<CoachQualificationEntity[]> {
    return await this.qualificationService.getAllQualifications();
  }

  @Get(':id')
  async getQualificationById(@Param('id', ParseIntPipe) id: number): Promise<CoachQualificationEntity> {
    return await this.qualificationService.getQualificationById(id);
  }

  @Put(':id')
  async updateQualificationById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedData: CoachQualificationEntity,
  ): Promise<CoachQualificationEntity | null> {
    return await this.qualificationService.updateQualificationById(id, updatedData);
  }

  @Delete(':id')
  async deleteQualificationById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.qualificationService.deleteQualificationById(id);
  }
}