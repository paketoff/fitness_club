import { Transform, Type } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
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

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => value === undefined || value === '' ? 1 : parseInt(value, 10))
  category_id: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => value === undefined || value === '' ? 1 : parseInt(value, 10))
  coach_gender_id: number;

}