import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class UserStatusEntity {

  @PrimaryGeneratedColumn()
  id_user_status: number;

  @Column()
  user_status_name: string;

  @ManyToOne(() => UserEntity, (user) => user.user_status_id)
  user: UserEntity;
}