import { IsNumber, IsString, MaxLength } from "class-validator";
import { ManyToOne, PrimaryGeneratedColumn } from "typeorm";


export class UserRoleDTO {

  @IsNumber()
  id_user_role: number;

  @IsString()
  @MaxLength(45)
  role_name: string;
}