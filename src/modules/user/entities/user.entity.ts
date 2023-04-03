import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRoleEntity } from "./user-role.entity";
import { UserGenderEntity } from "./user-gender.entity";
import { UserStatusEntity } from "./user-status.entity";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column() 
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  phone: number;

  @Column()
  password: string;

  @OneToMany(() => UserRoleEntity, (role) => role.user)
  user_role_id: UserRoleEntity[];

  @OneToMany(() => UserStatusEntity, (status) => status.user)
  user_status_id: UserStatusEntity[];

  @OneToMany(() => UserGenderEntity, (gender) => gender.user)
  user_gender_id: UserGenderEntity[];
}