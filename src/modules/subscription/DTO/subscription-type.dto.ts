import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class SubscriptionTypeDTO {

  @IsInt()
  id_sub_type: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  type_name: string;
}