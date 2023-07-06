import { Injectable, NotFoundException } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { WorkoutEntity } from './entities/workout.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WorkoutService {

  constructor(
    @InjectRepository(WorkoutEntity)
    private workoutRepository: Repository<WorkoutEntity>,
    ) {}



  async createWorkout(workout: WorkoutEntity): Promise<WorkoutEntity> {
    return await this.workoutRepository.save(workout);
  }

  async getAllWorkouts(): Promise<WorkoutEntity[]> {
    return await this.workoutRepository.find({
        where: {
          id_workout: Not(7),
        }
      }
    );
  }

  async findWorkoutById(id: number): Promise<WorkoutEntity> {
    return await this.workoutRepository.findOne({
      where: {id_workout: id}
    });
  }

  async updateWorkoutById(id: number , updatedData: WorkoutEntity): Promise<WorkoutEntity | null> {
    const workout = await this.workoutRepository.preload({
      id_workout: id,
      ...updatedData,
    });

    if(!workout) {
      throw new NotFoundException(`Workout with ${id} not found!`);
    }

    return await this.workoutRepository.save(workout);
  }

  async deleteWorkoutById(id: number): Promise<void> {
    const result = await this.workoutRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`Workout with id ${id} not found`);
    }
  }

}
