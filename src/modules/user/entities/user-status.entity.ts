import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('user_status')
export class UserStatusEntity {

  @PrimaryGeneratedColumn()
  id_user_status: number;

  @Column()
  user_status_name: string;

  @ManyToOne(() => UserEntity, (user) => user.user_status)
  users: UserEntity[];
}