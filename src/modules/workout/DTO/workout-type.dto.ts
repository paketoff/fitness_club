import { IsNumber, IsString } from "class-validator";


export class WorkoutTypeDTO {
  @IsNumber()
  id_workout_type: number;

  @IsString()
  type_name: string;

  @IsString()
  type_desc: string;
}