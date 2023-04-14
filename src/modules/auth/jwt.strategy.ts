import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt';
import { AuthService } from "./auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
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