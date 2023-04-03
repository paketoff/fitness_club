import { IsNumber, IsString, MaxLength } from "class-validator";


export class UserGenderDTO {

  @IsNumber()
  id_user_gender: number;

  @IsString()
  @MaxLength(45)
  gender_name: string;
}