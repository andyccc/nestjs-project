import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/service/base.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

import { getSaltPassword } from 'src/common/util/MD5';

import { JwtService } from '@nestjs/jwt'
import { snid } from 'src/common/util/SnowflakeID';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(

    private readonly jwtService: JwtService,

    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  async create(createUserDto: CreateUserDto) {
    var user = await this.userRepository.findOne({ username: createUserDto.username, is_valid: true });
    if (user) {
      return { status: false, message: 'username was registered!' }
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
      return { status: false, message: 'username or password is incorrect', data: null };
    }

  }

  loginAccount(user: UserEntity) {
    const loginInfo = { username: user.username, id: user.id };
    const token = this.jwtService.sign(loginInfo);

    return {
      status: true,
      data: token,
      message: null,
    }
  }


  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
