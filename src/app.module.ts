import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './module/posts/posts.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [PostsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
