import { IsInt } from "class-validator";

export class RemoveQualificationFromCoachDTO {
  @IsInt()
  coach_id: number;

  @IsInt()
  qualification_id: number;
}