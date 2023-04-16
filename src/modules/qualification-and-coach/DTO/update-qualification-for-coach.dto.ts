import { ArrayNotEmpty, IsArray, IsInt } from "class-validator";

export class UpdateQualificationsForCoachDTO {
  @IsInt()
  coach_id: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  new_qualification_ids: number[];
}