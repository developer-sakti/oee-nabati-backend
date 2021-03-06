import { ApiBearerAuth, ApiImplicitBody, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { AuthLoginCmd } from './cmd/auth-login.command';
import { AuthService } from './auth.service';
import { AuthSignUpCmd } from './cmd/auth-sign-up.cmd';
import { ChangePasswordCmd } from '@app/app/user/cmd/change-password.cmd';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from '@app/app/user/dto/create-user.dto';
import { TokenDto } from './dto/token.dto';
import { User } from '@app/app/user/user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('auth')
@ApiBearerAuth()
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ title: 'Sign-up', description: 'Register user. Returns a valid JWT.' })
  @ApiResponse({ description: 'Success!', status: HttpStatus.OK, type: TokenDto })
  @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
  public async signUp(@Body() user: AuthSignUpCmd): Promise<TokenDto> {
    return await this.authService.signUp(new User(user));
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiImplicitBody({ name: 'AuthLoginCmd', type: AuthLoginCmd })
  @ApiOperation({ title: 'Login', description: 'Login user. Generate a new valid JWT.' })
  @ApiResponse({ description: 'JWT successfully created.', status: HttpStatus.CREATED, type: TokenDto })
  @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
  public async login(@Body() req): Promise<TokenDto> {
    // return await this.authService.createToken(new User(req.user));
    return await this.authService.validateUser(req);
  }

  @Patch('password')
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: ChangePasswordDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'An error occured during password hashing.' })
  @ApiOperation({ title: 'Update user password', description: 'Update user password matching route id.' })
  async changePassword(@Body() cmd: ChangePasswordCmd): Promise<ChangePasswordDto> {
    const updatedUser = await this.authService.changePassword(cmd);
    return new ChangePasswordDto(updatedUser);
  }
}
