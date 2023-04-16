import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class AddUserToCoachDTO {
  @IsInt()
  @IsNotEmpty()
  coach_id: number;

  @IsInt()
  @IsNotEmpty()
  user_id: number;
}