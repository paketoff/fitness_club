import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class GetCoachesForUserDTO {
  @IsInt()
  @IsNotEmpty()
  user_id: number;
}