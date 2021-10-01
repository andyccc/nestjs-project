import { Equals, IsEmail, IsEmpty, IsNotEmpty, Length, Matches, ValidateIf } from "class-validator"

export class CreateUserDto {

    @ValidateIf(obj => { return obj.username ? true : false })
    @Length(2, 20, { message: 'username length is in 2~20' })
    readonly username: string

    @Matches(/(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}/, { message: 'password length is not enough' })
    @IsNotEmpty({ message: 'password can‘t be empty' })
    readonly password: string

    // @Equals(obj => {
    //     return obj.password
    // }, { message: 'twice password is not same' })
    @IsNotEmpty({ message: 'repassword can‘t be empty' })
    readonly repassword: string

    @IsEmail({}, { message: 'email is incorrect' })
    @IsNotEmpty({ message: 'email can’t be empty' })
    readonly email: string

}
