import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachEntity } from './entities/coach.entity';
import { CoachDTO } from './DTO/coach.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { AddQualificationToCoachDTO } from '../qualification-and-coach/DTO/add-qualification-to-coach.dto';
import { CoachQualificationEntity } from '../coach-qualification/entities/coach-qualification.entity';
import { UpdateQualificationsForCoachDTO } from '../qualification-and-coach/DTO/update-qualification-for-coach.dto';
import { RemoveQualificationFromCoachDTO } from '../qualification-and-coach/DTO/remove-qualification-from-coach.dto';
import { AddUserToCoachDTO } from '../users-and-coaches/DTO/add-user-to-coach.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UpdateUsersForCoachDTO } from '../users-and-coaches/DTO/update-user-for-coach.dto';
import { RemoveUserFromCoachDTO } from '../users-and-coaches/DTO/remove-user-from-coach.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('coaches')
export class CoachController {
  constructor(
    private readonly coachService: CoachService,
      ) {}

  @Get('get-coaches')
  async getAllCoaches():Promise<CoachEntity[]> {
    return await this.coachService.getAllCoaches();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('coach','admin')
  @Get('profile')
  async getCurrentCoachInfo(
    @Req() req,
  ): Promise<CoachEntity | null> {
    return await this.coachService.getCurrentCoachInfo(req.user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('coach', 'admin')
  @Put('profile')
  async updateCurrentCoach(
    @Req() req,
    @Body() updatedData: any,
  ): Promise<CoachEntity | null> {
    const coachEntityUpd = new CoachEntity();
    Object.assign(coachEntityUpd, updatedData);
    return await this.coachService.updateCurrentCoach(coachEntityUpd, req.user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('coach', 'admin')
  @Get(':id')
  async getCoachById(
    @Param('id') id: number,
    @Req() req,
    ): Promise<CoachEntity> {
    return await this.coachService.getCoachById(id, req.user);  
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('coach', 'admin')
  @Put(':id')
  async updateCoachById(
    @Param('id') id: number,
    @Req() req,
    @Body() updatedData: CoachDTO
  ): Promise<CoachEntity | null> {
    const coachEntityUpd = new CoachEntity();
    Object.assign(coachEntityUpd, updatedData);
    return await this.coachService.updateCoachById(id, coachEntityUpd, req.user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteCoachById(
    @Param('id') id: number,
    @Req() req,
  ): Promise<void> {
    return await this.coachService.deleteCoachById(id, req.user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post('add-qualification-to-coach')
  async addQualificationToCoach(
    @Body() addQualificationToCoachDTO: AddQualificationToCoachDTO,
    @Req() req,
  ): Promise<CoachEntity> {
    return await this.coachService.addQualificationToCoach(
      addQualificationToCoachDTO.coach_id, 
      addQualificationToCoachDTO.qualification_id,
      req.user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'coach')
  @Get('get-qualifications-for-coach/:id')
  async getQualificationsForCoach(
    @Param('id') coach_id: number,
    @Req() req,
  ): Promise<CoachQualificationEntity[]> {
    return await this.coachService.getQualificationsForCoach(coach_id, req.user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Put('update-qualifications-for-coach')
  async updateQualificationsForCoach(
    @Body() updateQualificationsForCoachDTO: UpdateQualificationsForCoachDTO,
    @Req() req,
  ): Promise<CoachEntity> {
    return await this.coachService.updateQualificationsForCoach(
      updateQualificationsForCoachDTO.coach_id,
      updateQualificationsForCoachDTO.new_qualification_ids,
      req.user,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('remove-qualification-from-coach')
  async removeQualificationFromCoach(
    @Body() removeQualificationFromCoachDTO: RemoveQualificationFromCoachDTO,
    @Req() req
  ): Promise<CoachEntity> {
    return await this.coachService.removeQualificationFromCoach(
      removeQualificationFromCoachDTO.coach_id,
      removeQualificationFromCoachDTO.qualification_id,
      req.user,
    );
  }

  
}
