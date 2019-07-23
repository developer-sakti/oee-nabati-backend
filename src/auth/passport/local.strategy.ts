import * as bcrypt from 'bcrypt';
import * as passport from 'passport';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { Strategy } from 'passport-local';
import { UserService } from '@app/user/user.service';

@Injectable()
export class LocalStrategy extends Strategy {
  constructor(private readonly userService: UserService) {
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
}
