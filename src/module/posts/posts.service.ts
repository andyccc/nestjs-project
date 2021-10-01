import { Inject, Injectable, Post } from '@nestjs/common';
import { min } from 'class-validator';
import { PageData } from 'src/common/page/page.dto';
import { BaseService } from 'src/common/service/base.service';
import { snid } from 'src/common/util/SnowflakeID';
import { Repository } from 'typeorm';
import { PagePostsDto } from './dto/page-posts.dto';
import { PostsEntity } from './entities/posts.entity';

@Injectable()
export class PostsService extends BaseService<PostsEntity>{
    constructor(
        @Inject('POSTS_REPOSITORY')
        private postsRepository: Repository<PostsEntity>,
    ) {
        super();
    }

    async findAll(): Promise<PostsEntity[]> {
        return this.postsRepository.find({ where: { is_valid: true } });
    }

    async findPostsList(posts: PostsEntity): Promise<PostsEntity[]> {
        posts.is_valid = true;
        return this.postsRepository.find({ where: posts })
    }

    async findPostsById(id: string): Promise<PostsEntity> {
        return this.postsRepository.findOne({ id: id, is_valid: true });
    }

    async saveOrUpdatePosts(posts: PostsEntity) {
        if (posts.id) {

            return this.savePosts(posts);

            // let result = await this.postsRepository.update({ id: posts.id }, posts);
            // if (!result) {
            //     return 0;
            // }
            // return result['affected'] || 0;

            // let result = this.postsRepository.update({ id: posts.id }, posts);
            // if (result) {
            //     return { status: true, data: result }
            // } else {
            //     return { status: false }
            // }
        } else {
            // manul to generate id
            let id = snid.generate();
            posts.id = id;

            return this.savePosts(posts);

            // save return object id 
            // let result = await this.postsRepository.insert(posts); 
            // return this.postsRepository.save(posts);
            // if (result) {
            //     return { status: true, data: result };
            // } else {
            //     return { status: false };
            // }
        }
    }

    savePosts(posts: PostsEntity) {
        // .save 方法具有update 的效果
        return this.postsRepository.save(posts);
    }

    async softDeletePosts(posts: PostsEntity) {
        if (!posts.id) {
            return 0;
        }

        posts.is_valid = false;

        return this.savePosts(posts);
    }

    async deletePosts(posts: PostsEntity): Promise<number> {
        if (!posts.id) {
            return 0;
        }

        let result = await this.postsRepository.delete(posts);
        if (!result) {
            return 0;
        }

        return result['affected'] || 0;
    }

    async findListByPage(pageDto: PagePostsDto) {
        return super.findListByPage(pageDto, this.postsRepository, (query) => {
            query = query.orderBy('create_date', 'DESC')

            if (pageDto.title) {
                query = query.where("title like :title", { title: '%' + pageDto.title + '%' })
            }
            return query;
        })
    }

}
