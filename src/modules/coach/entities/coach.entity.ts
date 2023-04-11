import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CoachCategoryEntity } from './coach-category.entity';
import { CoachGenderEntity } from './coach-gender.entity';
import { WorkoutHistoryEntity } from 'src/modules/workout-history/entities/workout-history.entity';
import { CoachScheduleEntity } from 'src/modules/coach-schedule/entities/coach-schedule.entity';

@Entity('coach')
export class CoachEntity {
  @PrimaryGeneratedColumn()
  id_coach: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ type: 'float' })
  salary: number;

  @Column()
  email: string;

  @Column({ type: 'decimal' })
  rating: number;

  @ManyToOne(() => CoachCategoryEntity, (coachCategory) => coachCategory.coaches, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: CoachCategoryEntity;

  @ManyToOne(() => CoachGenderEntity, (coachGender) => coachGender.coaches, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'coach_gender_id' })
  gender: CoachGenderEntity;

  @OneToMany(() => WorkoutHistoryEntity, (workout_history) => workout_history.coach)
  workout_histories: WorkoutHistoryEntity[];

  @OneToMany(() => CoachScheduleEntity, (schedule) => schedule.coach)
  schedules: CoachScheduleEntity[];
}