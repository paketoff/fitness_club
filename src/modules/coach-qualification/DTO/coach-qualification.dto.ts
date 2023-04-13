import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CoachQualificationDTO {
  
  @IsInt()
  id_qualification: number;

  @IsString()
  @MaxLength(45)
  @IsNotEmpty()
  qualification_name: string;

  @IsString()
  @MaxLength(45)
  @IsNotEmpty()
  qualification_type: string;

  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  qualification_desc: string;
}