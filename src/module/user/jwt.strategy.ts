import { Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { JwtService } from '@nestjs/jwt';
import { JwtConstants } from "src/config/constatns";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly jwtService: JwtService) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('token'),
            ignoreExpiration: true,
            secretOrKey: JwtConstants.secret,
        });
    }

    validate(payload: any) {
        console.log('JwtStrategy: payload: ' + JSON.stringify(payload));
        return { userId: payload.sub, username: payload.username };
    }

}