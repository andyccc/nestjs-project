import { ApiProperty } from "@nestjs/swagger"

export class UpdatePostsDto {
    @ApiProperty({ description: 'posts title' })
    title: string
    @ApiProperty({ description: 'posts content' })
    content: string

}
