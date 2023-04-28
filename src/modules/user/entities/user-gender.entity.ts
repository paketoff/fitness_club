import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('user_gender')
export class UserGenderEntity {

  @PrimaryGeneratedColumn()
  id_user_gender: number;

  @Column()
  user_gender_name: string;

  @OneToMany(() => UserEntity, (user) => user.user_gender)
  users: UserEntity[];
}