import { IsNumber, IsString } from "class-validator";


export class CoachGenderDTO {
  
  @IsNumber()
  id_coach_gender: number;

  @IsString()
  gender_name: string;
}