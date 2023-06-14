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
    let validatedEntity;
    if (payload.role_id === 1 || payload.role_id === 3) {
      validatedEntity = await this.authService.validateUserById(payload.id);
    } else if (payload.role_id === 2) {
      validatedEntity = await this.authService.validateCoachById(payload.id_coach);
    }
  
    if (!validatedEntity) {
      throw new UnauthorizedException();
    }
  
    const result =  { 
      ...validatedEntity, 
      role_id: payload.role_id, 
    };

    return result;
  }
}