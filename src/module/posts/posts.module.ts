import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/db/database.module';
import { PostsController } from './posts.controller';
import { postsProviders } from './posts.providers';
import { PostsService } from './posts.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [
    ...postsProviders,
    PostsService
  ]
})
export class PostsModule { }
