import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { JwtMiddleware } from '@app/app/auth/middlewares/jwt.middleware';
import { ProfileController } from './profile.controller';
import { UserModule } from '@app/app/user/user.module';
import { UserService } from '@app/app/user/user.service';

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
