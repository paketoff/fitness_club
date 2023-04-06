import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { CoachEntity } from './coach.entity';


@Entity('coach_category')
export class CoachCategoryEntity {
  @PrimaryColumn()
  id_category: number;

  @Column()
  coach_category_name: string;

  @OneToMany(() => CoachEntity, (coach) => coach.category)
  coaches: CoachEntity[];
}
