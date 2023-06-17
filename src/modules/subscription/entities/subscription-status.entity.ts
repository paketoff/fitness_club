import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubscriptionEntity } from "./subscription.entity";

@Entity('subscription_status')
export class SubscriptionStatusEntity {

  @PrimaryGeneratedColumn()
  id_status: number;
  
  @Column()
  status_name: number;

  @OneToMany(() => SubscriptionEntity, (sub) => sub.subscriptionStatus)
  subscriptions: SubscriptionEntity[];
  
}