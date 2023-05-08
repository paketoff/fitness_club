import { Type } from "class-transformer";
import { IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CoachDTO } from "src/modules/coach/DTO/coach.dto";
import { UserDTO } from "src/modules/user/DTO/user.dto";
import { WorkoutTypeDTO } from "src/modules/workout/DTO/workout-type.dto";
import { WorkoutDTO } from "src/modules/workout/DTO/workout.dto";


export class WorkoutHistoryDTO {
  @IsOptional()
  @IsInt()
  id_history: number;

  @IsString()
  @IsNotEmpty()
  start_time: string;

  @IsString()
  @IsNotEmpty()
  end_time: string;

  @IsDateString()
  @Type(() => Date)
  @IsNotEmpty()
  date: Date;

  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsOptional()
  @IsInt()
  coach_id: number;

  @IsInt()
  @IsNotEmpty()
  workout_id: number;

  @IsInt()
  @IsNotEmpty()
  workout_type_id: number;
}