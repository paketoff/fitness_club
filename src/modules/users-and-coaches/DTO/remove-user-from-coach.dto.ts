import { IsNotEmpty, IsNumber } from 'class-validator';

export class RemoveUserFromCoachDTO {
  @IsNumber()
  @IsNotEmpty()
  coach_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}