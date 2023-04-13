import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class UserStatusDTO {

  @IsInt()
  id_user_status: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  status_name: string;
}