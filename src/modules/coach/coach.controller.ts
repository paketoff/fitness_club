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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user', 'admin')
  @Get('get-coaches')
  async getAllCoaches():Promise<CoachEntity[]> {
    return await this.coachService.getAllCoaches();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('coach', 'admin')
  @Get(':id')
  async getCoachById(
    @Param('id') id: number,
    @Req() req,
    ): Promise<CoachEntity> {
    const coach = await this.coachService.getCoachById(id, req.user);

    if (
      (req.user.role_name !== 'admin' && Number(req.user.id_coach) !== Number(id)) ||
      !coach
    ) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }
  
    return coach;
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
  ): Promise<void> {
    return await this.coachService.deleteCoachById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post('add-qualification-to-coach')
  async addQualificationToCoach(
    @Body() addQualificationToCoachDTO: AddQualificationToCoachDTO
  ): Promise<CoachEntity> {
    return await this.coachService.addQualificationToCoach(
      addQualificationToCoachDTO.coach_id, 
      addQualificationToCoachDTO.qualification_id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'coach')
  @Get('get-qualifications-for-coach/:id')
  async getQualificationsForCoach(
    @Param('id') coach_id: number,
  ): Promise<CoachQualificationEntity[]> {
    return await this.coachService.getQualificationsForCoach(coach_id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Put('update-qualifications-for-coach')
  async updateQualificationsForCoach(
    @Body() updateQualificationsForCoachDTO: UpdateQualificationsForCoachDTO,
  ): Promise<CoachEntity> {
    return await this.coachService.updateQualificationsForCoach(
      updateQualificationsForCoachDTO.coach_id,
      updateQualificationsForCoachDTO.new_qualification_ids,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('remove-qualification-from-coach')
  async removeQualificationFromCoach(
    @Body() removeQualificationFromCoachDTO: RemoveQualificationFromCoachDTO,
  ): Promise<CoachEntity> {
    return await this.coachService.removeQualificationFromCoach(
      removeQualificationFromCoachDTO.coach_id,
      removeQualificationFromCoachDTO.qualification_id,
    );
  }

  //TODO: do the analysis who has to add the user to coach. 
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles('admin')
  @Post('add-user-to-coach')
  async addUserToCoach(
    @Body() addUserToCoachDTO: AddUserToCoachDTO,
  ): Promise<CoachEntity> {
    return await this.coachService.addUserToCoach(
      addUserToCoachDTO.coach_id,
      addUserToCoachDTO.user_id,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'coach')
  @Get('get-user-for-coach/:id')
  async getCoachesForUser(
    @Param('id') coach_id: number,
    @Req() req,
  ): Promise<UserEntity[]> {
    return await this.coachService.getUsersForCoach(coach_id, req.user);
  }

  //TODO: add ID's to req-URL to implement the auth functionality.
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'coach')
  @Put('update-users-for-coach')
  async updateUsersForCoach(
    @Body() updateUsersForCoachDTO: UpdateUsersForCoachDTO,
    @Req() req,
  ): Promise<CoachEntity> {
    return await this.coachService.updateUsersForCoach(
      updateUsersForCoachDTO.coach_id,
      updateUsersForCoachDTO.new_user_ids,
      req.user,
    );
  }

  //TODO: add ID's to req-URL to implement the auth functionality.
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'coach')
  @Post('remove-user-from-coach')
  async removeUserFromCoach(
    @Body() removeUserFromCoachDTO: RemoveUserFromCoachDTO,
    @Req() req,
  ): Promise<CoachEntity> {
    return await this.coachService.removeUserFromCoach(
      removeUserFromCoachDTO.coach_id,
      removeUserFromCoachDTO.user_id,
      req.user,
    );
  }
}
