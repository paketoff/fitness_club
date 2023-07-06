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
    return await this.coachScheduleRepo.find({ 
        where: { isBooked: false } ,
        relations: ['coach'],
      },
    );
  }

  async getCoachScheduleById(id: number): Promise<CoachScheduleEntity> {
    return await this.coachScheduleRepo.findOne({
        where: {id_schedule: id},
        relations: ['coach'],
      }
    )
  }

  async getCoachScheduleForCoach(user: any, paginationOptions: { page: number, limit: number }): Promise<
  { data: CoachScheduleEntity[], 
    total: number, 
    page: number, 
    limit: number }> {
    if (!user) {
      throw new HttpException('User object not provided', HttpStatus.BAD_REQUEST);
    }

    const reqUser = await this.coachRepo.findOne({
      where: {id_coach: user.id_coach}
    });

    if (!reqUser) {
      throw new HttpException('Requested coach not found', HttpStatus.NOT_FOUND);
    }

    const [results, total] = await this.coachScheduleRepo.findAndCount({
      where: { coach: reqUser },
      relations: ['coach'],
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    if (user.role_name !== 'admin' && user.id_coach !== reqUser.id_coach) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

    if(user.role_name == 'user') {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

    return {
      data: results,
      total,
      page: paginationOptions.page,
      limit: paginationOptions.limit
    };
  }

  async createCoachSchedule(schedule: any, user?: any): Promise<CoachScheduleEntity> {
    if (user.role_name !== 'admin' && user.id_coach !== schedule.coach.id_coach) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

    const scheduleData = {
      work_date: schedule.work_date,
      workPeriod_Start: schedule.workPeriod_Start,
      workPeriod_End: schedule.workPeriod_End,
      additional_info: schedule.additional_info,
      isBooked: schedule.isBooked,
      coach: await this.coachRepo.findOne({
        where: {id_coach: user.id_coach},
        relations: ['schedules'],
      })
    }

    const scheduleObj = new CoachScheduleEntity();
    Object.assign(scheduleObj, scheduleData);

    return await this.coachScheduleRepo.save(scheduleObj);
  }

  async updateCoachScheduleById(id: number, updatedData: any, user?: any): Promise<CoachScheduleEntity> {
    const schedule = await this.coachScheduleRepo.findOne({
      where: {id_schedule: id},
      relations: ['coach'],
    });

    if (!schedule) {
        throw new NotFoundException(`Schedule with ${id} not found!`);
    }

    if (user.role_name !== 'admin' && user.id_coach !== schedule.coach.id_coach) {
        throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

    Object.assign(schedule, updatedData);

    return await this.coachScheduleRepo.save(schedule);
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
