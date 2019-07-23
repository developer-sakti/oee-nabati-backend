import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserRole, UserStatus } from '@app/user/user.entity';

import { ChangePasswordCmd } from 'user/cmd/change-password.cmd';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { TokenDto } from './dto/token.dto';
import { TokenUserPayload } from './dto/token-user-payload.dto';
import { UserService } from '@app/user/user.service';
import { environment } from '@env/environment.dev';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  rs;
  public async signUp(user: User) {
    user.role = UserRole.USER;
    user.status = UserStatus.PENDING;
    user = await this.userService.create(user);
    return this.createToken(user);
  }

  public async changePassword(cmd: ChangePasswordCmd): Promise<User> {
    let oldUser;
    try {
      oldUser = await this.userService.findOne({ username: cmd.username });
    } catch (error) {
      throw new NotFoundException(`No user was found for username : ${cmd.username}.`);
    }
    return this.userService.update(
      oldUser.id,
      new User({ ...oldUser, password: cmd.oldPassword }),
      cmd.newPassword,
    );
  }
  public async createToken(signedUser: User) {
    const expiresIn = environment.JWT_EXPIRATION;
    const secretOrKey = environment.SECRET_KEY;
    const user = new TokenUserPayload(signedUser);
    const userPOJO = JSON.parse(JSON.stringify(user));
    const accessToken = jwt.sign(userPOJO, secretOrKey, { expiresIn });
    return new TokenDto({
      expiresIn,
      accessToken,
    });
  }
}
