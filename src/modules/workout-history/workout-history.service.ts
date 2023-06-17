import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutHistoryEntity } from './entities/workout-history.entity';
import { Repository } from 'typeorm';
import { CoachEntity } from '../coach/entities/coach.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CoachScheduleService } from '../coach-schedule/coach-schedule.service';
import { WorkoutEntity } from '../workout/entities/workout.entity';
import { WorkoutTypeEntity } from '../workout/entities/workout-type.entity';
import { WorkoutService } from '../workout/workout.service';
import { CoachService } from '../coach/coach.service';

@Injectable()
export class WorkoutHistoryService {
  constructor(
    @InjectRepository(WorkoutHistoryEntity)
    private readonly workoutHistoryRepo: Repository<WorkoutHistoryEntity>, 
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly coachScheduleService: CoachScheduleService,
    private readonly workoutService: WorkoutService,
    private readonly coachService: CoachService,
    @InjectRepository(WorkoutTypeEntity)
    private readonly workoutTypeRepo: Repository<WorkoutTypeEntity>,
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

  async bookTraining(user: any, scheduleId: number): Promise<WorkoutHistoryEntity> {
    const coachSchedule = await this.coachScheduleService.getCoachScheduleById(scheduleId);

    if (!coachSchedule) {
      throw new NotFoundException('Schedule was not found');
    }

    const workoutHistoryData = {
      date: coachSchedule.work_date,
      start_time: coachSchedule.workPeriod_Start,
      end_time: coachSchedule.workPeriod_End,
      coach: await this.coachService.getCoachById(coachSchedule.coach.id_coach),
      workout: await this.workoutService.findWorkoutById(7),
      workout_type: await this.workoutTypeRepo.findOne({
        where: {id_workout_type: 3},
      }),
      user: user
    };

    const workoutHistory = new WorkoutHistoryEntity();
    Object.assign(workoutHistory, workoutHistoryData);

    const savedWorkoutHistory = await this.workoutHistoryRepo.save(workoutHistory);

    // Обновите запись в coach_schedule, установив isBooked в true
    await this.coachScheduleService.updateCoachScheduleById(scheduleId, { isBooked: true }, user);

    return savedWorkoutHistory;
  }

  async getUserWorkoutHistory(user: any): Promise<WorkoutHistoryEntity[]> {
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
      relations: ['coach', 'workout', 'workout_type'],
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
