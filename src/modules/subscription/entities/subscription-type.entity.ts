import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubscriptionEntity } from "./subscription.entity";


export class SubscriptionTypeEntity {

  @PrimaryGeneratedColumn()
  id_subscription_type: number;

  @Column()
  type_name: string;

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.subscriptionType_id)
  subscriptions: SubscriptionEntity[];
}