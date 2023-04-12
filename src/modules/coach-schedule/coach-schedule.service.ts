import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoachScheduleEntity } from './entities/coach-schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoachScheduleService {

  constructor(
    @InjectRepository(CoachScheduleEntity)
    private readonly coachScheduleRepo: Repository<CoachScheduleEntity>, 
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

  async createCoachSchedule(schedule: CoachScheduleEntity): Promise<CoachScheduleEntity> {
    return await this.coachScheduleRepo.save(schedule);
  }

  async updateCoachScheduleById(id: number, updatedData: CoachScheduleEntity): Promise<CoachScheduleEntity> {
    const scheduleUpd = await this.coachScheduleRepo.preload({
      id_schedule: id,
      ...updatedData,
    })

    if(!scheduleUpd) {
      throw new NotFoundException(`Schedule with ${id} not found!`);
    }

    return await this.coachScheduleRepo.save(scheduleUpd);
  }

  async deleteCoachScheduleById(id: number): Promise<void> {
    const result = await this.coachScheduleRepo.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`Schedule with id ${id} not found`);
    }
  }
}
