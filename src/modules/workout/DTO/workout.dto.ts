import { IsDate, IsNumber, IsString } from "class-validator";


export class WorkoutDTO {
  @IsNumber()
  id_workout: number;

  @IsString()
  workout_name: string;

  @IsString()
  description: string;

  @IsNumber()
  duration: number;
}