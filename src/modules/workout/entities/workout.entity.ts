import { WorkoutHistoryEntity } from "src/modules/workout-history/entities/workout-history.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('workout')
export class WorkoutEntity {

  @PrimaryGeneratedColumn()
  id_workout: number;

  @Column()
  workout_name: string;

  @Column({type: 'mediumtext'})
  description: string;

  @Column({type: 'time'})
  duration: string;

  @Column({nullable: true})
  img_src: string;

  @OneToMany(() => WorkoutHistoryEntity, (workout_history) => workout_history.workout)
  workout_histories: WorkoutHistoryEntity[];
}