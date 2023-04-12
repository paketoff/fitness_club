import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRoleEntity } from "./user-role.entity";
import { UserGenderEntity } from "./user-gender.entity";
import { UserStatusEntity } from "./user-status.entity";
import { SubscriptionEntity } from "src/modules/subscription/entities/subscription.entity";
import { WorkoutHistoryEntity } from "src/modules/workout-history/entities/workout-history.entity";

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

  @ManyToOne(() => UserRoleEntity, (role) => role.users, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'user_role_id'})
  user_role_id: UserRoleEntity;

  @ManyToOne(() => UserStatusEntity, (status) => status.users, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'client_status_id'})
  user_status_id: UserStatusEntity;

  @ManyToOne(() => UserGenderEntity, (gender) => gender.users, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'gender_id'})
  user_gender_id: UserGenderEntity;

  @OneToMany(() => SubscriptionEntity, (sub) => sub.user_id)
  subscriptions: SubscriptionEntity[];

  @OneToMany(() => WorkoutHistoryEntity, (workout_history) => workout_history.user)
  workout_histories: WorkoutHistoryEntity[];

}