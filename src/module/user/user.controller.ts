import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Req, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { NoAuth } from 'src/common/decorator/customize';
import { AuthGuard } from '@nestjs/passport';
import { CacheService } from 'src/common/cache/cache.service';
import { BaseController } from 'src/common/controller/baes.controller';
import { ApiException } from 'src/common/exceptions/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Controller('user')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Post('create')
  @NoAuth()
  @ApiOperation({ summary: 'create user, just register for one' })
  async create(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.repassword) {
      throw new ApiException('twice passsword is not same.', ApiErrorCode.USER_PASSWORD_TWICE_NOT_SAME);
    }

    let result = await this.userService.create(createUserDto);
    if (!result.status) {
      throw new ApiException(result.message, result.code);
    }

    let user = result.data as UserEntity;
    user.password = null;
    return user;
  }

  @Post('login')
  @NoAuth()
  async login(@Body() userDto: LoginUserDto) {
    let result = await this.userService.validAccount(userDto.username, userDto.password);
    if (!result.status) {
      throw new ApiException(result.message, result.code);
    }

    return { token: result.data };
  }

  @Get('profile')
  async getProfile(@Req() req) {
    // jwt' user info  from req.user get 
    let result = await this.userService.findOne(req.user.id);
    result.password = null;
    return result;
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
