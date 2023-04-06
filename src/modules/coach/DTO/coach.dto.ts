import { IsEmail, IsNumber, IsString } from "class-validator";


export class CoachDTO {

  @IsNumber()
  id_coach: number;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsNumber()
  salary: number;

  @IsString()
  @IsEmail()
  email: string;

  @IsNumber()
  rating: number;

  @IsNumber()
  category_id: number;

  @IsNumber()
  coach_gender_id: number;

}