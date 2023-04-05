import { IsEmail, IsString, MaxLength } from "class-validator";


export class LoginUserDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(255)
  password: string;
}