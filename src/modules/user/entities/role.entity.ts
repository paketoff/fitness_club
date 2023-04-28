import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { CoachEntity } from "src/modules/coach/entities/coach.entity";

@Entity('role')
export class RoleEntity {
  
  @PrimaryGeneratedColumn()
  id_user_role: number;

  @Column()
  role_name: string;

  @OneToMany(() => UserEntity, (user) => user.user_role)
  users: UserEntity[];

  @OneToMany(() => CoachEntity, (coach) => coach.role)
  coaches: CoachEntity[];
}