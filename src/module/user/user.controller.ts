import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { NoAuth } from 'src/common/decorator/customize';
import { AuthGuard } from '@nestjs/passport';
import { CacheService } from 'src/common/cache/cache.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  @NoAuth()
  @ApiOperation({ summary: 'create user, just register for one' })
  async create(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.repassword) {
      throw new HttpException({ message: 'twice passsword is not same.' }, HttpStatus.BAD_REQUEST)
    }

    let result = await this.userService.create(createUserDto);
    if (result.status) {
      let user = result.data as UserEntity;
      user.password = null;
      return user;
    } else {
      throw new HttpException({ message: result.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  @NoAuth()
  async login(@Body() userDto: LoginUserDto) {
    let result = await this.userService.validAccount(userDto.username, userDto.password);
    if (!result.status) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, message: result.message, error: 'username or password is error' },
        HttpStatus.BAD_REQUEST,
      );
    }


    return { token: result.data };
  }


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
