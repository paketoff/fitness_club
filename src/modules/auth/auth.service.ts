import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDTO } from '../user/DTO/user.dto';
import { UserEntity } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CoachService } from '../coach/coach.service';
import { CoachEntity } from '../coach/entities/coach.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly coachService: CoachService,
    ) {}


  async registerUser(user: UserEntity): Promise<UserEntity | null> {
    const createdUser = await this.userService.createUser(user);
    return createdUser;
  }

  async registerCoach(coach: CoachEntity): Promise<CoachEntity | null> {
    const createdCoach = await this.coachService.createCoach(coach);
    return createdCoach;
  }

  async validateUser(email: string, password: string): Promise<Omit<UserEntity, 'password'> | null> {
    const user = await this.userService.findUserByEmail(email);

    if(user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateCoach(email: string, password: string): Promise<Omit<CoachEntity, 'password'> | null> {
    const coach = await this.coachService.findCoachByEmail(email);

    if(coach && await bcrypt.compare(password, coach.password)) {
      const { password, ...result } = coach;
      return result;
    }
    return null;
  }

  async loginUser(user: Omit<UserEntity, 'password'>) {
    const payload = {
      id: user.id_user, 
      email: user.email, 
      name: user.name,
      surname: user.surname,
      role_id: user.user_role.id_user_role,
      role_name: user.user_role.role_name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginCoach(coach: Omit<CoachEntity, 'password'>) {
    const payload  = {
      id_coach: coach.id_coach,
      email: coach.email,
      name: coach.name,
      surname: coach.surname,
      rating: coach.rating,
      category_id: coach.category.id_category, 
      coach_gender_id: coach.gender.id_coach_gender, 
      role_id: coach.role.id_user_role,
      role_name: coach.role.role_name,
    }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUserById(id: number): Promise<UserEntity | null> {
    return await this.userService.findUserById(id);
  }

  async validateCoachById(id: number): Promise<CoachEntity | null> {
    return await this.coachService.getCoachById(id);
  }

}
