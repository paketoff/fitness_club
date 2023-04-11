import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WorkoutHistoryEntity } from "src/modules/workout-history/DTO/workout-history.dto";


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

  @OneToMany(() => WorkoutHistoryEntity, (workout_history) => workout_history.workout)
  workout_histories: WorkoutHistoryEntity[];
}