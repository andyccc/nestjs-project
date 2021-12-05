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
import { ConfigModule, ConfigService } from '@nestjs/config';
import path, { resolve } from 'path';
import { environment } from 'config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { AllExceptionsFilter } from './common/filters/any-exception.filter';


console.log('process.env.NODE_ENV :' + process.env.NODE_ENV);

console.log(`${environment}.env.ts`);
console.log('config: ' + JSON.stringify(environment));


@Module({
  imports: [
    // ConfigModule.forRoot({
    //   load: environment,
    // }),

    // ConfigModule.forRoot({
    //   isGlobal: true, // 作用于全局
    //   envFilePath: `${environment}.env.ts`,
    // }),

    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule], // 数据库配置项依赖于ConfigModule，需在此引入
    //   useFactory: () => environment['default']['DATABASE_CONFIG'],
    //   // useFactory: (configService: ConfigService) => configService.get('DATABASE_CONFIG'),
    //   // useFactory: async (configService: ConfigService) => (
    //   //   {
    //   //     charset: 'utf8',
    //   //     type: 'mysql',
    //   //     host: '192.168.2.152',
    //   //     port: 3306,
    //   //     username: 'ceshi',
    //   //     password: 'ceshi',
    //   //     database: 'ceshi',
    //   //     entities: [
    //   //       __dirname + '/../../**/*.entity{.ts,.js}'
    //   //     ],
    //   //     synchronize: true // WARNING: Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.

    //   //   } as MysqlConnectionOptions),
    //   // inject: [ConfigService], // 记得注入服务，不然useFactory函数中获取不到ConfigService
    // }),

    LoggerModule.forRoot(),
    RedisModule.register(environment['default']['REDIS_CONFIG']),
    PostsModule, UserModule,


    // MailerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => configService.get('mailer'),
    //   inject: [ConfigService],
    //  }),
    //  MulterModule.register(),
  ],
  controllers: [AppController],
  providers: [
    // global exception，can ignore
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    // set global guard，useClass为自定义的Guard
    {
      provide: APP_GUARD,
      useClass: RoleAuthGuard,
    },
    AppService],
})
export class AppModule { }
