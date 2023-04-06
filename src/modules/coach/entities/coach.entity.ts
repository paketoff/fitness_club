import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CoachCategoryEntity } from './coach-category.entity';
import { CoachGenderEntity } from './coach-gender.entity';

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
}