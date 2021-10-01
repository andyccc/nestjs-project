import { DefaultValuePipe } from "@nestjs/common"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class MyPageDto {
    @ApiPropertyOptional({ description: 'default is 10' })
    limit: number = 10
    @ApiPropertyOptional({ description: 'default is 1 ' })
    page: number = 1
}

export interface PageData {
    list: [],
    page: number,
    limit: number,
    totalPage: number,
    totalRows: number
}