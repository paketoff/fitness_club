import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoachEntity } from './entities/coach.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoachService {
  constructor(
    @InjectRepository(CoachEntity)
    private readonly coachRepository: Repository<CoachEntity>,
    ) {}

  async createCoach(coach: CoachEntity): Promise<CoachEntity> {
    return await this.coachRepository.save(coach);
  }

  async getAllCoaches(): Promise<CoachEntity[]> {
    return await this.coachRepository.find();
  }

  async getCoachById(id: number): Promise<CoachEntity> {
    return await this.coachRepository.findOne({
      where: {id_coach: id}
    });
  }

  async updateCoachById(id: number, updatedData: CoachEntity): Promise<CoachEntity | null> {
    const coach = await this.coachRepository.preload({
      id_coach: id,
      ...updatedData
    });

    if(!coach) {
      throw new NotFoundException(`Coach with id ${id} was not found!`);
    }

    return await this.coachRepository.save(coach);
  }

  async deleteCoachById(id: number): Promise<void> {
    const result = await this.coachRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`Coach with id ${id} not found`);
    }
  }
}


