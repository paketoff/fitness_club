import { Type } from "class-transformer";
import { IsNumber, ValidateNested } from "class-validator";
import { UserDTO } from "src/modules/user/DTO/user.dto";
import { SubscriptionStatusDTO } from "./subscription-status.dto";
import { SubscriptionTypeDTO } from "./subscription-type.dto";


export class SubscriptionDTO {

  @IsNumber()
  id_subscription: number;

  @IsNumber()
  price: number;

  @IsNumber()
  trains_count: number;

  @ValidateNested({ each: true })
  @Type(() => UserDTO)
  user_id: UserDTO;

  @ValidateNested({ each: true })
  @Type(() => SubscriptionStatusDTO)
  sub_status_id: SubscriptionStatusDTO;

  @ValidateNested({ each: true})
  @Type(() => SubscriptionTypeDTO)
  sub_type_id: SubscriptionTypeDTO;
}