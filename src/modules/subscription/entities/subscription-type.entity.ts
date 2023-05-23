import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubscriptionEntity } from "./subscription.entity";

@Entity('subscription_type')
export class SubscriptionTypeEntity {

  @PrimaryGeneratedColumn()
  id_subscription_type: number;

  @Column()
  type_name: string;

  @Column()
  price: number;

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.subscriptionType)
  subscriptions: SubscriptionEntity[];
}