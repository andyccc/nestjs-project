import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/common/db/database.module';
import { PostsEntity } from './entities/posts.entity';
import { PostsController } from './posts.controller';
import { postsProviders } from './posts.providers';
import { PostsService } from './posts.service';

@Module({
  imports: [
    DatabaseModule,
    // TypeOrmModule.forFeature([PostsEntity])
  ],
  controllers: [PostsController],
  providers: [
    ...postsProviders,
    PostsService
  ]
})
export class PostsModule { }
