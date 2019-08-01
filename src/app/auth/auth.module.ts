import * as passport from 'passport';

import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';
import { LogInMiddleware } from './middlewares/login.middleware';
import { UserModule } from '@app/app/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '@env/environment.dev';

@Module({
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  imports: [
    UserModule, 
    PassportModule,
    JwtModule.register({
      secret: environment.SECRET_KEY,
      signOptions: { expiresIn: environment.JWT_EXPIRATION },
    }),
  ],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogInMiddleware).forRoutes('/auth/login');
  }
}
