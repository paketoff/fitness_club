import { CoachEntity } from 'src/modules/coach/entities/coach.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity('coach_schedule')
export class CoachScheduleEntity {
  @PrimaryGeneratedColumn()
  id_schedule: number;

  @Column({ type: 'date' })
  work_date: Date;

  @Column({ type: 'time' })
  workPeriod_Start: string;

  @Column({ type: 'time' })
  workPeriod_End: string;

  @Column({ type: 'boolean', default: false })
  isBooked: boolean;

  @Column({ type: 'text' })
  additional_info: string;

  @ManyToMany(() => UserEntity, (user) => user.coach_schedules)
  @JoinTable({
    name: 'users_and_coaches', 
    joinColumn: { name: 'coach_schedule_id', referencedColumnName: 'id_schedule' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id_user' },
  })
  clients: UserEntity[];

  @ManyToOne(() => CoachEntity, (coach) => coach.schedules)
  @JoinColumn({ name: 'coach_id' })
  coach: CoachEntity;
}