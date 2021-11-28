import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './module/posts/posts.module';
import { UserModule } from './module/user/user.module';
import { RedisModule } from 'nestjs-redis'

import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RoleAuthGuard } from './common/guard/role.auth.guard';
// import { AllExceptionsFilter } from '@all-exception.filter';
// import { RoleAuthGuard } from '@/auth/guards/role-auth.guard';

@Module({
  imports: [PostsModule, UserModule,
    RedisModule.register({
      port: 6379,
      host: '192.168.2.152',
      password: 'redis@2021',
      db: 0,
    })
  ],
  controllers: [AppController],
  providers: [
    // global exception，can ignore
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
    // set global guard，useClass为自定义的Guard
    {
      provide: APP_GUARD,
      useClass: RoleAuthGuard,
    },
    AppService],
})
export class AppModule { }
