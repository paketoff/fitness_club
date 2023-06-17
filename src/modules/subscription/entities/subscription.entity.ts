import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SubscriptionTypeEntity } from "./subscription-type.entity";
import { SubscriptionStatusEntity } from "./subscription-status.entity";

@Entity('subscription')
export class SubscriptionEntity {

  @PrimaryGeneratedColumn()
  id_subscription: number;

  @Column({type: 'decimal'})
  price: number;

  @Column({type: 'date'})
  start_period: Date;

  @Column({type: 'date'})
  end_period: Date;

  @Column()
  trains_count: number;

  @ManyToOne(() => UserEntity, (user) => user.id_user, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'user_id'})
  user: UserEntity;

  @ManyToOne(() => SubscriptionTypeEntity, (sub_type) => sub_type.id_subscription_type, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({name: 'subscription_type_id'})
  subscriptionType: SubscriptionTypeEntity;

  @ManyToOne(() => SubscriptionStatusEntity, (sub_status) => sub_status.id_status, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({name: 'subscription_status_id'})
  subscriptionStatus: SubscriptionStatusEntity;
}