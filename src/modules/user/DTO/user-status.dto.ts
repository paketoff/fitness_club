import { IsNumber, IsString, MaxLength } from "class-validator";


export class UserStatusDTO {

  @IsNumber()
  id_user_status: number;

  @IsString()
  @MaxLength(45)
  status_name: string;
}