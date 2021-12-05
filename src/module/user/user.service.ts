import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/service/base.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

import { getSaltPassword } from 'src/common/utils/MD5';

import { JwtService } from '@nestjs/jwt'
import { snid } from 'src/common/utils/SnowflakeID';
import { CacheService } from 'src/common/cache/cache.service';
import { RedisService } from 'nestjs-redis';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UserService extends BaseService<UserEntity> {
  // @Inject('USER_REPOSITORY')
  // private readonly userRepository: Repository<UserEntity>;


  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,

    // @InjectRepository(UserEntity)
    // private readonly userRepository: Repository<UserEntity>,
    private readonly redisService: RedisService,
  ) {
    super();
  }

  async create(createUserDto: CreateUserDto) {
    var user = await this.userRepository.findOne({ username: createUserDto.username, is_valid: true });
    if (user) {
      return { status: false, message: 'username was registered!', code: ApiErrorCode.USER_ACCOUNT_REGISTERED }
    }

    user = new UserEntity;
    user.id = snid.generate();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = getSaltPassword(createUserDto.password);

    let result = await this.userRepository.save(user);
    return { status: true, data: result };
  }


  async validAccount(username: string, password: string) {

    console.log('UserEntity.name = ' + UserEntity.name);


    console.log('redis test ...');

    var cache = new CacheService(this.redisService);
    await cache.set('username', '张三');
    let test = await cache.get('username');
    console.log('test: ' + test);

    let result = await this.userRepository.findOne({
      where: {
        username: username,
        password: getSaltPassword(password),
        is_valid: true
      }
    });

    if (result) {
      return this.loginAccount(result);
    } else {
      return { status: false, message: 'username or password is incorrect', data: null, code: ApiErrorCode.USER_ACCOUNT_OR_PASSWORD_INVALID };
    }

  }

  loginAccount(user: UserEntity) {
    const loginInfo = { username: user.username, id: user.id };
    const token = this.jwtService.sign(loginInfo);

    return {
      status: true,
      data: token,
      message: null,
      code: null,
    }
  }


  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string): Promise<UserEntity> {
    return this.userRepository.findOne({ id: id, is_valid: true });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
