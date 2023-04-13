import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class SubscriptionStatusDTO {

  @IsInt()
  id_sub_status: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  status_name: string;
}