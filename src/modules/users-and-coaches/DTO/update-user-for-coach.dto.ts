import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty } from "class-validator";

export class UpdateUsersForCoachDTO {
  @IsInt()
  @IsNotEmpty()
  coach_id: number;

  @IsArray()
  @ArrayNotEmpty()
  new_user_ids: number[];
}