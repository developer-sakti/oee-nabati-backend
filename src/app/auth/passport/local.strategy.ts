import * as bcrypt from 'bcrypt';
import * as passport from 'passport';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { Strategy } from 'passport-local';
import { UserService } from '@app/app/user/user.service';
import { AuthLoginCmd } from '../cmd/auth-login.command';
import { AuthService } from '../auth.service';
import { Utils } from '@app/shared/utils';

@Injectable()
export class LocalStrategy extends Strategy {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {
    super(
      {
        usernameField: 'username',
        passReqToCallback: false,
      },
      async (username, password, done) => await this.logIn(username, password, done),
    );
    passport.use(this as Strategy);
  }

  public async logIn(username, password, done) {
    await this.userService
      .findOne({ username })
      .then(async user => {
        await bcrypt
          .compare(password, user.password)
          .then(isValid => {
            return isValid ? done(null, user) : Promise.reject('Invalid password');
          })
          .catch(err => Promise.reject(new UnauthorizedException(err.toString())));
      })
      .catch(err => done(err, false));
  }

  async validate(params: AuthLoginCmd): Promise<any> {
    const user = await this.authService.validateUser(params);
    if (!user) {
      return Utils.sendResponseUnauthorized();
    }
    return user;
  }
}
