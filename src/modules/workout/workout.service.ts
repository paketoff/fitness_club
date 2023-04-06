import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WorkoutEntity } from './entities/workout.entity';

@Injectable()
export class WorkoutService {

  constructor(private workoutRepository: Repository<WorkoutEntity>) {}


  async getAllWorkouts() {
    return await this.workoutRepository.find();
  }

  async findWorkoutById(id: number) {
    return await this.workoutRepository.findOne({
      where: {id_workout: id}
    });
  }

  async createWorkout(id: number , updatedData: WorkoutEntity): Promise<WorkoutEntity | null> {
    const workout = await this.workoutRepository.preload({
      id_workout: id,
      ...updatedData,
    });

    if(!workout) {
      throw new NotFoundException(`Workout with ${id} not found!`);
    }

    return await this.workoutRepository.save(workout);
  }

  async delete(id: number) {
    return await this.workoutRepository.delete(id);
  }

}
