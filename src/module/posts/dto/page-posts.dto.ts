import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { MyPageDto } from "src/common/page/page.dto";

export class PagePostsDto extends MyPageDto {
    @ApiPropertyOptional({ description: 'title fuzzy query' })
    title: string
}