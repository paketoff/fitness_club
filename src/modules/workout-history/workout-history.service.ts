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

  async getAllHistory(user: any): Promise<WorkoutHistoryEntity[]> {
    if (user.role === 'admin') {
      return await this.workoutHistoryRepo.find();
    } else {
      return await this.workoutHistoryRepo.find({ where: { user: user } });
    }
  }

  async getHistoryById(id: number, user: any): Promise<WorkoutHistoryEntity> {
    const history = await this.workoutHistoryRepo.findOne({
      where: { id_history: id },
      relations: ['user'],
    });

    if (user.role !== 'admin' && history.user.id_user!== user.id) {
      throw new NotFoundException(`Workout history with id ${id} not found`);
    }

    return history;
  }

  async createHistory(workoutHistory: WorkoutHistoryEntity): Promise<WorkoutHistoryEntity> {
    return this.workoutHistoryRepo.save(workoutHistory);
  }

  async updateHistoryById(id: number, updatedData, user: any): Promise<WorkoutHistoryEntity | null> {

    const workout = await this.workoutHistoryRepo.preload({ id_history: id, ...updatedData });

    if (!workout || (user.role !== 'admin' && workout.user.id_user !== user.id)) {
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
