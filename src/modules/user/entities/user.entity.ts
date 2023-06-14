import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserGenderEntity } from "./user-gender.entity";
import { UserStatusEntity } from "./user-status.entity";
import { SubscriptionEntity } from "src/modules/subscription/entities/subscription.entity";
import { WorkoutHistoryEntity } from "src/modules/workout-history/entities/workout-history.entity";
import { CoachEntity } from "src/modules/coach/entities/coach.entity";
import { RoleEntity } from "./role.entity";
import { CoachScheduleEntity } from "src/modules/coach-schedule/entities/coach-schedule.entity";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column() 
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  img_src: string;

  @ManyToOne(() => RoleEntity, (role) => role.users, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'user_role_id'})
  user_role: RoleEntity;

  @ManyToOne(() => UserStatusEntity, (status) => status.users, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'client_status_id'})
  user_status: UserStatusEntity;

  @ManyToOne(() => UserGenderEntity, (gender) => gender.users, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'gender_id'})
  user_gender: UserGenderEntity;

  @OneToMany(() => SubscriptionEntity, (sub) => sub.user)
  subscriptions: SubscriptionEntity[];

  @OneToMany(() => WorkoutHistoryEntity, (workout_history) => workout_history.user)
  workout_histories: WorkoutHistoryEntity[];

  @ManyToMany(() => CoachScheduleEntity, (coachSchedule) => coachSchedule.clients, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  coach_schedules: CoachScheduleEntity[];
}