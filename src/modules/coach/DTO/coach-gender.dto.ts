import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class CoachGenderDTO {
  
  @IsInt()
  id_coach_gender: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  gender_name: string;
}