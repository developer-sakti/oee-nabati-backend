import * as jwt from 'jsonwebtoken';

import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Req, UseGuards } from '@nestjs/common';

import { GetProfileDto } from './dto/get-profile.dto';
import { UserService } from '@app/app/user/user.service';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('profile')
@ApiBearerAuth()
@Controller('api/v1/profile')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.OK, type: GetProfileDto, description: 'Success!' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({ title: 'Get user profile', description: 'Get get user profile from JWT payload.' })
  async getProfile(@Req() req): Promise<GetProfileDto> {
    const user = await this.userService.findOne({ username: 'admin' });
    return new GetProfileDto(user);
  }
}
