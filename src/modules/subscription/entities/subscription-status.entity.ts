import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubscriptionEntity } from "./subscription.entity";


export class SubscriptionStatusEntity {

  @PrimaryGeneratedColumn()
  id_subscription_status: number;
  
  @Column()
  status_name: number;

  @OneToMany(() => SubscriptionEntity, (sub) => sub.subscriptionStatus_id)
  subscriptions: SubscriptionEntity[];
  
}