import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachEntity } from './entities/coach.entity';
import { CoachDTO } from './DTO/coach.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('coaches')
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

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
}
