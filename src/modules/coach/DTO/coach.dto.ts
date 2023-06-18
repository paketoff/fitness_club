import { Transform, Type } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { CoachCategoryDTO } from "./coach-category.dto";
import { CoachGenderDTO } from "./coach-gender.dto";


export class CoachDTO {

  @IsOptional()
  @IsInt()
  id_coach?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  surname?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  salary?: number;

  @IsOptional()
  @IsString()
  @MaxLength(45)
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  password?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  rating?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  train_price?: number;

  @IsOptional()
  @IsString()
  img_url?: string;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => value === undefined || value === '' ? 1 : parseInt(value, 10))
  category_id?: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => value === undefined || value === '' ? 1 : parseInt(value, 10))
  coach_gender_id?: number;

}