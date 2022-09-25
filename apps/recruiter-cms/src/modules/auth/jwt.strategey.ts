import { QueryBus } from '@nestjs/cqrs';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtClaimsDto } from './dto/jwt-claims.dto';
import { ConfigService } from '@nestjs/config';
import { GetRoleRecordQuery } from '@modules/users/queries/get-role-record.query';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    public readonly configService: ConfigService,
    private readonly queryBus: QueryBus,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate({ id: userId }): Promise<JwtClaimsDto> {
    const role = await this.queryBus.execute(new GetRoleRecordQuery(userId));

    return {
      id: userId,
      role: role,
    };
  }
}
