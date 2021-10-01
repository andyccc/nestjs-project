import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { BaseController } from 'src/common/controller/baes.controller';
import { CreatePostsDto } from './dto/create-posts.dto';
import { PagePostsDto } from './dto/page-posts.dto';
import { UpdatePostsDto } from './dto/update-posts.dto';
import { PostsEntity } from './entities/posts.entity';
import { PostsService } from './posts.service';


@Controller('posts')
@ApiTags('posts')
export class PostsController extends BaseController {

    constructor(private readonly postsService: PostsService) {
        super();
    }

    @Get('pageList')
    @ApiOperation({ summary: 'find page posts' })
    @UsePipes(new ValidationPipe({ transform: true }))
    pageList(@Query() param: PagePostsDto) {
        console.log(param);
        return this.postsService.findListByPage(param);
    }

    @Get()
    @ApiOperation({ summary: 'list posts' })
    index() {
        let res = this.postsService.findAll();
        return res
    }

    @Get(':id')
    @ApiOperation({ summary: 'detail posts ' })
    async detail(@Param('id') id: string) {
        if (!id || id.length == 0) this.missingParam(id);
        let result = await this.postsService.findPostsById(id);

        return result || null;
    }

    @Post()
    @ApiOperation({ summary: 'create posts' })
    create(@Body() body: CreatePostsDto) {
        var posts = new PostsEntity()
        posts.title = body.title;
        posts.content = body.content;

        return this.postsService.saveOrUpdatePosts(posts)
    }

    @Put(':id')
    @ApiOperation({ summary: 'update posts' })
    async update(@Param('id') id: string, @Body() updatePostsDto: UpdatePostsDto) {

        if (!id || id.length == 0) this.missingParam(id);

        var posts = new PostsEntity()
        posts.title = updatePostsDto.title;
        posts.content = updatePostsDto.content;
        posts.id = id;
        let result = await this.postsService.saveOrUpdatePosts(posts);
        return { count: result ? 1 : 0, id: id };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'delete posts' })
    async remove(@Param('id') id: string) {
        if (!id || id.length == 0) this.missingParam(id);

        var posts = new PostsEntity()
        posts.id = id;
        let result = await this.postsService.softDeletePosts(posts);
        console.log('result : ' + result);
        return { count: result, id: id };
    }
}
