import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, ValidateNested } from "class-validator";
import { CoachQualificationDTO } from "src/modules/coach-qualification/DTO/coach-qualification.dto";
import { CoachDTO } from "src/modules/coach/DTO/coach.dto";

export class AddQualificationToCoachDTO {
  @IsNotEmpty()
  @IsInt()
  coach_id: number;
  @IsNotEmpty()
  @IsInt()
  qualification_id: number;
}