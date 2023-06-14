import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { CoachCategoryEntity } from './coach-category.entity';
import { CoachGenderEntity } from './coach-gender.entity';
import { WorkoutHistoryEntity } from 'src/modules/workout-history/entities/workout-history.entity';
import { CoachScheduleEntity } from 'src/modules/coach-schedule/entities/coach-schedule.entity';
import { CoachQualificationEntity } from 'src/modules/coach-qualification/entities/coach-qualification.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { RoleEntity } from 'src/modules/user/entities/role.entity';

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

  @Column()
  password: string;

  @Column({ type: 'decimal' })
  rating: number;

  @Column()
  train_price: number;
  
  @Column({ nullable: true })
  img_url: string;

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

  @ManyToMany(() => CoachQualificationEntity, (qualification) => qualification.coaches)
  @JoinTable({
    name: 'qualification_and_coach', 
    joinColumn: { name: 'coach_id', referencedColumnName: 'id_coach' },
    inverseJoinColumn: { name: 'qualification_id', referencedColumnName: 'id_qualification' },
  })
  qualifications: CoachQualificationEntity[];

  @ManyToOne(() => RoleEntity, (role) => role.coaches, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'coach_role_id'})
  role: RoleEntity;
}