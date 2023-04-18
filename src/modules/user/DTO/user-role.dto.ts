import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { ManyToOne, PrimaryGeneratedColumn } from "typeorm";


export class RoleDTO {

  @IsInt()
  id_user_role: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  role_name: string;
}