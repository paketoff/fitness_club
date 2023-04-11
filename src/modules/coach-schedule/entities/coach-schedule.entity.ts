import { CoachEntity } from 'src/modules/coach/entities/coach.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
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

  @Column({ type: 'text' })
  additional_info: string;

  @ManyToOne(() => CoachEntity, (coach) => coach.schedules)
  @JoinColumn({ name: 'coach_id' })
  coach: CoachEntity;
}