import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class UserGenderDTO {

  @IsInt()
  id_user_gender: number;

  @IsString()
  @MaxLength(45)
  @IsNotEmpty()
  gender_name: string;
}