import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt';
import { AuthService } from "./auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '',
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUserById(payload.id);
    if(!user) {
      throw new UnauthorizedException();
    }
    return {...user, roles: payload.roles};
  }
}