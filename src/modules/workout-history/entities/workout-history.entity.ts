import { CoachScheduleEntity } from "src/modules/coach-schedule/entities/coach-schedule.entity";
import { CoachEntity } from "src/modules/coach/entities/coach.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { WorkoutTypeEntity } from "src/modules/workout/entities/workout-type.entity";
import { WorkoutEntity } from "src/modules/workout/entities/workout.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('workout_history')
export class WorkoutHistoryEntity {
  @PrimaryGeneratedColumn()
  id_history: number;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => CoachEntity, (coach) => coach.workout_histories, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'coach_id' })
  coach: CoachEntity;

  @ManyToOne(() => WorkoutEntity, (workout) => workout.workout_histories, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'workout_id' })
  workout: WorkoutEntity;

  @ManyToOne(() => WorkoutTypeEntity, (workoutType) => workoutType.workout_histories, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'workout_type_id' })
  workout_type: WorkoutTypeEntity;

  @ManyToOne(() => UserEntity, (user) => user.workout_histories, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}