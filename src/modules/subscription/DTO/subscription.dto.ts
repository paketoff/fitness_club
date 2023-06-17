import { Transform, Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";


export class SubscriptionDTO {

  @IsOptional()
  @IsInt()
  id_subscription: number;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  trains_count: number;

  @IsInt()
  user_id: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => value === undefined || value === '' ? 2 : parseInt(value, 10))
  sub_status_id: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => value === undefined || value === '' ? 1 : parseInt(value, 10))
  sub_type_id: number;
}