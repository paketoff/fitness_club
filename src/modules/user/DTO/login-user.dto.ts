import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";


export class LoginUserDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  password: string;
}