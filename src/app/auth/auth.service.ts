import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserRole, UserStatus } from '@app/app/user/user.entity';

import { ChangePasswordCmd } from '@app/app/user/cmd/change-password.cmd';
import { CreateUserDto } from '@app/app/user/dto/create-user.dto';
import { TokenDto } from './dto/token.dto';
import { TokenUserPayload } from './dto/token-user-payload.dto';
import { UserService } from '@app/app/user/user.service';
import { environment } from '@env/environment.dev';
import { AuthLoginCmd } from './cmd/auth-login.command';
import { Utils } from '@app/shared/utils';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  rs;
  public async signUp(user: User) {
    user.roleId = UserRole.ADMIN;
    user.status = UserStatus.CONFIRM;
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
    const signUser = new User(signedUser);

    const expiresIn = environment.JWT_EXPIRATION;
    const secretOrKey = environment.SECRET_KEY;
    const user = new TokenUserPayload(signedUser);
    const userPOJO = JSON.parse(JSON.stringify(user));
    const accessToken = jwt.sign(userPOJO, secretOrKey);
    return new TokenDto({
      accessToken : accessToken,
      user : signUser,
    });
  }

  public async validateUser(params : AuthLoginCmd) : Promise<any> {
    let user = await this.userService.findOne({username : params.username});
    let status = await user.checkPasswordIsValid(params.password);

    if (!status) {
      return Utils.sendResponseWrongPassword(user);
    }

    if (user.roleId !== params.roleId) {
      return Utils.sendResponseWrongRole();
    }

    return this.createToken(user);
  }
}
