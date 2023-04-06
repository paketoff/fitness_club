import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CoachEntity } from './coach.entity';

@Entity('coach_gender')
export class CoachGenderEntity {
  @PrimaryGeneratedColumn()
  id_coach_gender: number;

  @Column()
  gender_name: string;

  @OneToMany(() => CoachEntity, (coach) => coach.gender)
  coaches: CoachEntity[];
}