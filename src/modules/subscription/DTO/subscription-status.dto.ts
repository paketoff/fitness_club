import { IsNumber, IsString } from "class-validator";


export class SubscriptionStatusDTO {

  @IsNumber()
  id_sub_status: number;

  @IsString()
  status_name: string;
}