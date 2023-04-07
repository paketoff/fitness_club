import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsString, ValidateNested } from "class-validator";
import { CoachCategoryDTO } from "./coach-category.dto";
import { CoachGenderDTO } from "./coach-gender.dto";


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

  @ValidateNested({each: true})
  @Type(() => CoachCategoryDTO)
  category_id: CoachCategoryDTO;

  @ValidateNested({each: true})
  @Type(() => CoachGenderDTO)
  coach_gender_id: CoachGenderDTO;

}