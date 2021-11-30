import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './module/posts/posts.module';
import { UserModule } from './module/user/user.module';
import { RedisModule } from 'nestjs-redis'
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RoleAuthGuard } from './common/guard/role.auth.guard';
// import { AllExceptionsFilter } from '@all-exception.filter';
// import { RoleAuthGuard } from '@/auth/guards/role-auth.guard';
import customConfig from 'config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true, // 作用于全局s
    //   load: [customConfig], // 加载自定义配置项
    // }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule], // 数据库配置项依赖于ConfigModule，需在此引入
    //   useFactory: (configService: ConfigService) => configService.get('DATABASE_CONFIG'),
    //   inject: [ConfigService], // 记得注入服务，不然useFactory函数中获取不到ConfigService
    // }),
    LoggerModule.forRoot(),
    RedisModule.register({
      port: 6379,
      host: '192.168.2.152',
      password: 'redis@2021',
      db: 0,
    }),
    PostsModule, UserModule,

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
