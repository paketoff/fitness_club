import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutHistoryEntity } from './entities/workout-history.entity';
import { Repository } from 'typeorm';
import { CoachEntity } from '../coach/entities/coach.entity';

@Injectable()
export class WorkoutHistoryService {
  constructor(
    @InjectRepository(WorkoutHistoryEntity)
    private readonly workoutHistoryRepo: Repository<WorkoutHistoryEntity>, 
    private readonly coachRepo: Repository<CoachEntity>,
  ) {}

  async getAllHistory(): Promise<WorkoutHistoryEntity[]> {
    return await this.workoutHistoryRepo.find();
  }

  async getHistoryById(id: number): Promise<WorkoutHistoryEntity> {
    return await this.workoutHistoryRepo.findOne({
      where: {
        id_history: id,
      }
    })
  }

  //TODO: провести анализ на надобность этого функционала.
  // async getHistoryByCoachId(id_coach: number): Promise<WorkoutHistoryEntity> {
    
  //   const coach = await this.coachRepo.findOne({
  //     where: {id_coach: id_coach}
  //   })
    
  //   return await this.workoutHistoryRepo.findOneBy({
  //     coach: coach
  //   })
  // }

  async createHistory(workoutHistory: WorkoutHistoryEntity): Promise<WorkoutHistoryEntity> {
    return this.workoutHistoryRepo.save(workoutHistory);
  }

  async updateHistoryById(id: number, updatedData): Promise<WorkoutHistoryEntity | null> {
    const workout = await this.workoutHistoryRepo.preload({
      id_history: id,
      ...updatedData,
    });

    if(!workout) {
      throw new NotFoundException(`Workout with ${id} not found!`);
    }

    return await this.workoutHistoryRepo.save(workout);
  }

  async deleteHistoryById(id: number): Promise<void> {
    const result = await this.workoutHistoryRepo.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`Workout with id ${id} not found`);
    }
  }
}
