import { UserRole, UserStatus } from '../user.entity';

import { ApiModelProperty } from '@nestjs/swagger';

export interface IChangePasswordCmd {
  username: string;
  oldPassword: string;
  newPassword: string;
}

export class ChangePasswordCmd {
  constructor(data: IChangePasswordCmd) {
    this.username = data.username;
    this.oldPassword = data.oldPassword;
    this.newPassword = data.newPassword;
  }
  @ApiModelProperty() username: string;
  @ApiModelProperty() oldPassword: string;
  @ApiModelProperty() newPassword: string;
}
