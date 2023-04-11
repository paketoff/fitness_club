import { IsNotEmpty, IsDateString, IsString, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CoachDTO } from 'src/modules/coach/DTO/coach.dto';

export class CoachScheduleDTO {
  @IsInt()
  id_schedule: number;

  @IsNotEmpty()
  @IsDateString()
  @Type(() => Date)
  work_date: Date;

  @IsNotEmpty()
  @IsString()
  workPeriod_Start: string;

  @IsNotEmpty()
  @IsString()
  workPeriod_End: string;

  @IsNotEmpty()
  @IsString()
  additional_info: string;

  @ValidateNested()
  @Type(() => CoachDTO)
  coach: CoachDTO;
}
