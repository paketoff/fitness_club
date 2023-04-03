import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class UserGenderEntity {

  @PrimaryGeneratedColumn()
  id_user_gender: number;

  @Column()
  user_gender_name: string;

  @ManyToOne(() => UserEntity, (user) => user.user_gender_id)
  user: UserEntity;
}