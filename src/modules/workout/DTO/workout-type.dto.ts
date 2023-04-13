import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class WorkoutTypeDTO {
  @IsInt()
  id_workout_type: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  type_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  type_desc: string;
}