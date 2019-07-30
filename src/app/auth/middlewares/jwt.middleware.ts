import * as passport from 'passport';

import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

import { User } from '@app/app/user/user.entity';
import { Utils } from '@app/shared/utils';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  public resolve() {
    return async (req, res, next) => {
      return await passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
          next(new UnauthorizedException(err));
        } else if (typeof info !== 'undefined') {
          let message;
          switch (info.message) {
            case 'No auth token':
            case 'invalid signature':
            case 'jwt malformed':
              message = 'You must provide a valid authenticated access token';
              break;
            case 'jwt expired':
              message = 'Your session has expired. Please log in again';
              break;
          }
          next(Utils.sendResponseUnauthorized());
        } else {
          req.user = new User(user);
          next();
        }
      })(req, res, next);
    };
  }

  public use(req : Request, res: Response) {
    return ""
  }
}
