import { Column, PrimaryGeneratedColumn } from "typeorm";


export class CoachQualificationEntity {

  @PrimaryGeneratedColumn()
  id_qualification: number;

  @Column()
  qualification_name: string;

  @Column()
  qualification_type: string;

  @Column({type: 'mediumtext'})
  qualification_desc: string;
}