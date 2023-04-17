import { IsInt, IsNotEmpty, ValidateNested } from "class-validator";

export class AddQualificationToCoachDTO {

  @IsNotEmpty()
  @IsInt()
  coach_id: number;

  @IsNotEmpty()
  @IsInt()
  qualification_id: number;
}