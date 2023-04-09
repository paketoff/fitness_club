import { IsNumber, IsString } from "class-validator";


export class SubscriptionTypeDTO {

  @IsNumber()
  id_sub_type: number;

  @IsString()
  type_name: string;
}