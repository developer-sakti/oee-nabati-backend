import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '@app/app/user/user.entity';

export class TokenDto {
  constructor(data) {
    this.accessToken = data.accessToken;
    this.expiresIn = data.expiresIn;
    this.user = data.user;
  }

  @ApiModelProperty() accessToken: string;

  @ApiModelProperty() expiresIn: number;

  @ApiModelProperty() user : User;
}
