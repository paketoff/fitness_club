import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from '../user/DTO/user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { LoginUserDTO } from '../user/DTO/login-user.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDTO: UserDTO): Promise<UserEntity> {
    const userEntity = new UserEntity();
    Object.assign(userEntity, createUserDTO);
    return await this.authService.register(userEntity);
  }

  @Post('login') 
  async login(@Body() loginUserDTO: LoginUserDTO) {
    const user = await this.authService.validateUser(loginUserDTO.email, loginUserDTO.password);

    if(!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.authService.login(user);
  }
}
