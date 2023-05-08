import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutHistoryEntity } from './entities/workout-history.entity';
import { Repository } from 'typeorm';
import { CoachEntity } from '../coach/entities/coach.entity';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class WorkoutHistoryService {
  constructor(
    @InjectRepository(WorkoutHistoryEntity)
    private readonly workoutHistoryRepo: Repository<WorkoutHistoryEntity>, 
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async getAllHistory(user: any): Promise<WorkoutHistoryEntity[]> {
    if (user.role === 'admin') {
      return await this.workoutHistoryRepo.find();
    } 
  }

  async getHistoryById(id: number, user: any): Promise<WorkoutHistoryEntity> {
    const history = await this.workoutHistoryRepo.findOne({
      where: { id_history: id },
      relations: ['user'],
    });

    if (user.role_name !== 'admin' && user.role_name !== 'coach' && history.user.id_user !== user.id_user) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }
    

    return history;
  }

  async getHistoryByUserId(user: any): Promise<WorkoutHistoryEntity[]> {
    if (!user) {
      throw new HttpException('User object not provided', HttpStatus.BAD_REQUEST);
    }
  
    const reqUser = await this.userRepo.findOne({
      where: {id_user: user.id_user},
    });
  
  
    if (!reqUser) {
      throw new HttpException('Requested user not found', HttpStatus.NOT_FOUND);
    }
  
    const history = await this.workoutHistoryRepo.find({
      where: {user: reqUser},
    });
  
    if (user.role_name !== 'admin' && user.role_name !== 'coach' && user.id_user !== reqUser.id_user) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }
  
    return history;
  }  

  async createHistory(workoutHistory: WorkoutHistoryEntity, user: any): Promise<WorkoutHistoryEntity> {

    if (!workoutHistory.coach || !workoutHistory.user) {
      throw new HttpException('Invalid workoutHistory data', HttpStatus.BAD_REQUEST);
    }

    if (user.role_name === 'coach') {
      workoutHistory.coach.id_coach = user.id_coach;
    }
    if(user.role_name === 'user') {
      workoutHistory.user.id_user = user.id_user;
    }
    return this.workoutHistoryRepo.save(workoutHistory);
  }

  async updateHistoryById(id: number, updatedData, user: any): Promise<WorkoutHistoryEntity | null> {

    const workout = await this.workoutHistoryRepo.preload({ id_history: id, ...updatedData });

    if (!workout || !workout.user) {
      throw new HttpException('Invalid workout data', HttpStatus.BAD_REQUEST);
    }

    if ((user.role !== 'admin' && workout.user.id_user !== user.id)) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
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
