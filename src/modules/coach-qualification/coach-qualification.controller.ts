import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CoachQualificationEntity } from './entities/coach-qualification.entity'; 
import { CoachQualificationService } from './coach-qualification.service'; 
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('qualifications')
export class CoachQualificationController {
  constructor(private readonly qualificationService: CoachQualificationService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async createQualification(@Body() qualification: CoachQualificationEntity): Promise<CoachQualificationEntity> {
    return await this.qualificationService.createQualification(qualification);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async getAllQualifications(): Promise<CoachQualificationEntity[]> {
    return await this.qualificationService.getAllQualifications();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  async getQualificationById(@Param('id', ParseIntPipe) id: number): Promise<CoachQualificationEntity> {
    return await this.qualificationService.getQualificationById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  async updateQualificationById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedData: CoachQualificationEntity,
  ): Promise<CoachQualificationEntity | null> {
    return await this.qualificationService.updateQualificationById(id, updatedData);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteQualificationById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.qualificationService.deleteQualificationById(id);
  }
}