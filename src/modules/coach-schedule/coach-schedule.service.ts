import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoachScheduleEntity } from './entities/coach-schedule.entity';
import { Repository } from 'typeorm';
import { CoachEntity } from '../coach/entities/coach.entity';

@Injectable()
export class CoachScheduleService {

  constructor(
    @InjectRepository(CoachScheduleEntity)
    private readonly coachScheduleRepo: Repository<CoachScheduleEntity>, 
    @InjectRepository(CoachEntity)
    private readonly coachRepo: Repository<CoachEntity>,
  ) {}

  async getAllCoachSchedule(): Promise<CoachScheduleEntity[]> {
    return await this.coachScheduleRepo.find();
  }

  async getCoachScheduleById(id: number): Promise<CoachScheduleEntity> {
    return await this.coachScheduleRepo.findOne(
      {
        where: {id_schedule: id}
      }
    )
  }

  async getCoachScheduleForCoach(user: any): Promise<CoachScheduleEntity[]> {
    if (!user) {
      throw new HttpException('User object not provided', HttpStatus.BAD_REQUEST);
    }

    const reqUser = await this.coachRepo.findOne({
      where: {id_coach: user.id_coach}
    });

    if (!reqUser) {
      throw new HttpException('Requested coach not found', HttpStatus.NOT_FOUND);
    }

    const scheduleRows = await this.coachScheduleRepo.find({
      where: {coach: reqUser},
    })

    if (user.role_name !== 'admin' && user.id_coach !== reqUser.id_coach) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

    if(user.role_name == 'user') {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

    return scheduleRows;
  }

  async createCoachSchedule(schedule: CoachScheduleEntity, user?: any): Promise<CoachScheduleEntity> {
    if (user.role_name !== 'admin' && user.id_coach !== schedule.coach.id_coach) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

    return await this.coachScheduleRepo.save(schedule);
  }

  async updateCoachScheduleById(id: number, updatedData: CoachScheduleEntity, user?: any): Promise<CoachScheduleEntity> {
    const schedule = await this.getCoachScheduleById(id);

    if (user.role_name !== 'admin' && user.id_coach !== schedule.coach.id_coach) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

    const scheduleUpd = await this.coachScheduleRepo.preload({
      id_schedule: id,
      ...updatedData,
    })

    if(!scheduleUpd) {
      throw new NotFoundException(`Schedule with ${id} not found!`);
    }

    return await this.coachScheduleRepo.save(scheduleUpd);
  }

  async deleteCoachScheduleById(id: number, user?: any): Promise<void> {
    const schedule = await this.getCoachScheduleById(id);

    if (user.role_name !== 'admin' && user.id_coach !== schedule.coach.id_coach) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

    const result = await this.coachScheduleRepo.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`Schedule with id ${id} not found`);
    }
  }
}
