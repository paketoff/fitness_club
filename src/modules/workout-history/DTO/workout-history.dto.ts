import { Type } from "class-transformer";
import { IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { CoachDTO } from "src/modules/coach/DTO/coach.dto";
import { UserDTO } from "src/modules/user/DTO/user.dto";
import { WorkoutTypeDTO } from "src/modules/workout/DTO/workout-type.dto";
import { WorkoutDTO } from "src/modules/workout/DTO/workout.dto";


export class WorkoutHistoryDTO {
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

  @ValidateNested({each: true})
  @Type(() => UserDTO)
  user_id: UserDTO;

  @ValidateNested({each: true})
  @Type(() => CoachDTO)
  coach_id: CoachDTO;

  @ValidateNested({each: true})
  @Type(() => WorkoutDTO)
  workout_id: WorkoutDTO;

  @ValidateNested({each: true})
  @Type(() => WorkoutTypeDTO)
  workout_type_id: WorkoutTypeDTO;
}