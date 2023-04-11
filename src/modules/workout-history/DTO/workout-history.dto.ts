import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString, ValidateNested } from "class-validator";
import { CoachDTO } from "src/modules/coach/DTO/coach.dto";
import { UserDTO } from "src/modules/user/DTO/user.dto";
import { WorkoutTypeDTO } from "src/modules/workout/DTO/workout-type.dto";
import { WorkoutDTO } from "src/modules/workout/DTO/workout.dto";


export class WorkoutHistoryDTO {
  @IsNumber()
  id_history: number;

  @IsString()
  start_time: string;

  @IsString()
  end_time: string;

  @IsDate()
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