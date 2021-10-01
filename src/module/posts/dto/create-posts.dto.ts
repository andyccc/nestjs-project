import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, Length } from "class-validator"

export class CreatePostsDto {
    @ApiProperty({ description: 'posts title' })
    @IsNotEmpty({ message: "title can't be empty" })
    @Length(1, 200, { message: 'title lenght must be in 1~200' })
    title: string

    @ApiProperty({ description: 'posts content' })
    @IsNotEmpty({ message: "content can't be empty" })
    @Length(1, 2000, { message: 'content lenght must be in 1~2000' })
    content: string
}
