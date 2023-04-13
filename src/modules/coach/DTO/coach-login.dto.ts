import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";


export class LoginCoachDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(45)
  email: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  password: string;
}