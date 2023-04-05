import { IsEmail, IsNumber, IsString, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";
import { OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRoleDTO } from "./user-role.dto";
import { Type } from "class-transformer";
import { UserStatusDTO } from "./user-status.dto";
import { UserGenderDTO } from "./user-gender.dto";


export class UserDTO {
  @IsNumber()
  id_user: number;

  @IsString()
  @MaxLength(45)
  name: string;

  @IsString()
  @MaxLength(45)
  surname: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(12)
  @MinLength(10)
  phone: string;

  @MaxLength(255)
  password: string;

  @ValidateNested({each:true})
  @Type(() => UserRoleDTO)
  user_role_id: UserRoleDTO[];

  @ValidateNested({each: true})
  @Type(() => UserStatusDTO)
  user_status_id: UserStatusDTO[];

  @ValidateNested({each: true})
  @Type(() => UserGenderDTO)
  user_gender_id: UserGenderDTO[];
}