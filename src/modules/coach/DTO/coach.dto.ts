import { Type } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, ValidateNested } from "class-validator";
import { CoachCategoryDTO } from "./coach-category.dto";
import { CoachGenderDTO } from "./coach-gender.dto";


export class CoachDTO {

  @IsInt()
  id_coach: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  surname: string;

  @IsNumber()
  @IsNotEmpty()
  salary: number;

  @IsString()
  @MaxLength(45)
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(255)
  password: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ValidateNested({each: true})
  @Type(() => CoachCategoryDTO)
  category_id: CoachCategoryDTO;

  @ValidateNested({each: true})
  @Type(() => CoachGenderDTO)
  coach_gender_id: CoachGenderDTO;

}