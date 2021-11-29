import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/common/db/database.module';
import { userProviders } from './user.providers';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from 'src/config/constatns';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { CacheService } from 'src/common/cache/cache.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: '20s' }
    }),
    DatabaseModule,
    // TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UserController],
  providers: [
    ...userProviders,
    UserService,
    LocalStrategy, JwtStrategy

  ]
})
export class UserModule { }


