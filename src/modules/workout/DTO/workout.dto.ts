import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class WorkoutDTO {
  @IsInt()
  id_workout: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  workout_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}