import { WorkoutHistoryEntity } from "src/modules/workout-history/entities/workout-history.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('workout_type')
export class WorkoutTypeEntity {

  @PrimaryGeneratedColumn()
  id_workout_type: number;

  @Column()
  type_name: string;

  @Column({type: 'mediumtext'})
  type_desc: string;

  @OneToMany(() => WorkoutHistoryEntity, (workout_history) => workout_history.workout_type)
  workout_histories: WorkoutHistoryEntity[];
}