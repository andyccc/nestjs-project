import { IsNotEmpty, Length } from "class-validator"

export class LoginUserDto {

    @IsNotEmpty({ message: 'username can‘t be empty' })
    @Length(1, 20, { message: 'username length is in 1~20' })
    username: string

    @IsNotEmpty({ message: 'password can‘t be empty' })
    @Length(6, 20, { message: 'username length is in 6~20' })
    password: string

}