import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from '../user/DTO/user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { LoginUserDTO } from '../user/DTO/login-user.dto';
import { CoachDTO } from '../coach/DTO/coach.dto';
import { CoachEntity } from '../coach/entities/coach.entity';
import { LoginCoachDTO } from '../coach/DTO/coach-login.dto';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() createUserDTO: UserDTO): Promise<UserEntity> {
    const userEntity = new UserEntity();
    Object.assign(userEntity, createUserDTO);
    return await this.authService.registerUser(userEntity);
  }

  @Post('login') 
  async loginUser(@Body() loginUserDTO: LoginUserDTO) {
    const user = await this.authService.validateUser(loginUserDTO.email, loginUserDTO.password);

    if(!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return await this.authService.loginUser(user);
  }

  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  @Post('register-coach')
  async registerCoach(@Body() createCoachDTO: CoachDTO): Promise<CoachEntity> {
    const coachEntity = new CoachEntity();
    Object.assign(coachEntity, createCoachDTO);
    return await this.authService.registerCoach(coachEntity);
  }

  @Post('login-coach')
  async loginCoach(@Body() loginCoachDTO: LoginCoachDTO) {
    const coach = await this.authService.validateCoach(loginCoachDTO.email, loginCoachDTO.password);

    if(!coach) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return await this.authService.loginCoach(coach);
  }
}
