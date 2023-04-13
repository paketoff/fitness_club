import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class CoachCategoryDTO {

  @IsInt()
  id_category: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  coach_category_name: string;
}