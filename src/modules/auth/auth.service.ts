import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDTO } from '../user/DTO/user.dto';
import { UserEntity } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    ) {}


  async register(user: UserEntity): Promise<UserEntity | null> {
    const createdUser = await this.userService.createUser(user);
    return createdUser;
  }

  async validateUser(email: string, password: string): Promise<Omit<UserEntity, 'password'> | null> {
    const user = await this.userService.findByEmail(email);

    if(user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<UserEntity, 'password'>) {
    const payload = {id: user.id_user, email: user.email, 
      // roles: user.user_role_id.map(role => role.role_name)
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUserById(id: number): Promise<UserEntity | null> {
    return await this.userService.findById(id);
  }

}
