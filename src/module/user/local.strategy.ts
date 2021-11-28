import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { UserService } from "./user.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super();
    }

    async validate(username: string, password: string) {
        // AuthGuard('local') passed direct return object

        console.log('LocalStrategy: username : ' + username + ', password: ' + password);
        return { username, password }

        // or to valid username and password info and return object
        const user = await this.userService.validAccount(username, password);
        if (!user) {
            throw new HttpException({
                message: 'username or password is incorrect',
                error: 'please try again later.'
            }, HttpStatus.BAD_REQUEST);
        }
        return user;
    }


}