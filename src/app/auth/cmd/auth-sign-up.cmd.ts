import { UserRole, UserStatus } from '@app/app/user/user.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { IUser } from '@app/app/user/interface/user.interface';

export class AuthSignUpCmd implements IUser {
  constructor(data: IUser) {
    this.username = data.username;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.password = data.password;
  }
  @ApiModelProperty() username: string;
  @ApiModelProperty() firstname: string;
  @ApiModelProperty() lastname: string;
  @ApiModelProperty() password: string;
}
