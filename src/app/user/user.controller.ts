import * as jwt from 'jsonwebtoken';

import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ChangePasswordCmd } from './cmd/change-password.cmd';
import { ChangePasswordDto } from '@app/app/auth/dto/change-password.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserCmd } from './cmd/update-user.cmd';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('users')
@ApiBearerAuth()
@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.OK, type: GetUserDto, isArray: true, description: 'Success!' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({ title: 'Get all users', description: 'Get a list of all registered users.' })
  async findAll(): Promise<GetUserDto[]> {
    const userList = (await this.userService.findAll()).map(user => new GetUserDto(user));
    return Promise.resolve(userList);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.OK, type: GetUserDto, description: 'Success!' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({ title: 'Get user', description: 'Get user matching route id.' })
  async findOne(@Param('id') id: number): Promise<GetUserDto> {
    const user = await this.userService.findOne({ id });
    return new GetUserDto(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: UpdateUserDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error.' })
  @ApiOperation({ title: 'Update user', description: 'Update user matching route id.' })
  async updateOne(@Param('id') id: number, @Body() user: UpdateUserCmd): Promise<UpdateUserDto> {
    const updatedUser = await this.userService.update(id, new User(user));
    return new UpdateUserDto(updatedUser);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: DeleteUserDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({ title: 'Delete user', description: 'Delete user matching route id.' })
  async deleteOne(@Param('id') id: number): Promise<DeleteUserDto> {
    const deletedUser = await this.userService.delete({ id });
    return new DeleteUserDto(deletedUser);
  }
}
