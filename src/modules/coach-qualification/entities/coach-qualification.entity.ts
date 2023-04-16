import { CoachEntity } from "src/modules/coach/entities/coach.entity";

import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('coach_qualification')
export class CoachQualificationEntity {

  @PrimaryGeneratedColumn()
  id_qualification: number;

  @Column()
  qualification_name: string;

  @Column()
  qualification_type: string;

  @Column({type: 'mediumtext'})
  qualification_desc: string;

  @ManyToMany(() => CoachEntity, (coach) => coach.qualifications)
  coaches: CoachEntity[];
}