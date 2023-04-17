import { IsNotEmpty, IsDateString, IsString, IsInt, ValidateNested, MaxLength } from 'class-validator';
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
  @MaxLength(1000)
  @IsString()
  additional_info: string;

  @IsInt()
  @IsNotEmpty()
  coach: number;
}
