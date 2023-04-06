import { IsNumber, IsString } from "class-validator";


export class CoachCategoryDTO {

  @IsNumber()
  id_category: number;

  @IsString()
  coach_category_name: string;
}