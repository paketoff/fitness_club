import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DurationTransformer } from "../DurationTransformer/duration-transformer.class";


@Entity('workout')
export class WorkoutEntity {

  @PrimaryGeneratedColumn()
  id_workout: number;

  @Column()
  workout_name: string;

  @Column({type: 'mediumtext'})
  description: string;

  @Column({type: 'time', transformer: new DurationTransformer()})
  duration: Date = new Date();
}