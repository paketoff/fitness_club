import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('user_role')
export class UserRoleEntity {
  
  @PrimaryGeneratedColumn()
  id_user_role: number;

  @Column()
  role_name: string;

  @OneToMany(() => UserEntity, (user) => user.user_role_id)
  users: UserEntity[];
}