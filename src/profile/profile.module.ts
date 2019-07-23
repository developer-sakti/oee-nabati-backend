import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { JwtMiddleware } from 'auth/middlewares/jwt.middleware';
import { ProfileController } from './profile.controller';
import { UserModule } from 'user/user.module';
import { UserService } from 'user/user.service';

@Module({
  imports: [UserModule],
  controllers: [ProfileController],
  providers: [],
})
export class ProfileModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('/profile');
  }
}
