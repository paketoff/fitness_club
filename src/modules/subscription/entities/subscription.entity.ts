import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SubscriptionTypeEntity } from "./subscription-type.entity";
import { SubscriptionStatusEntity } from "./subscription-status.entity";


export class SubscriptionEntity {

  @PrimaryGeneratedColumn()
  id_subscription: number;

  @Column({type: 'decimal'})
  price: number;

  @Column()
  trains_count: number;

  @ManyToOne(() => UserEntity, (user) => user.id_user, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  user_id: UserEntity;

  @ManyToOne(() => SubscriptionTypeEntity, (sub_type) => sub_type.id_subscription_type, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  subscriptionType_id: SubscriptionTypeEntity;

  @ManyToOne(() => SubscriptionStatusEntity, (sub_status) => sub_status.id_subscription_status, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  subscriptionStatus_id: SubscriptionStatusEntity;
}