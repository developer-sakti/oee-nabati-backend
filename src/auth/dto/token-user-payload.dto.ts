import { UserRole, UserStatus } from 'user/user.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { IUser } from 'user/interface/user.interface';

export class TokenUserPayload {
  constructor(data: IUser) {
    this.sub = data.id;
    this.username = data.username;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.role = data.role;
    this.status = data.status;
  }
  @ApiModelProperty() sub: number;
  @ApiModelProperty() username: string;
  @ApiModelProperty() firstname: string;
  @ApiModelProperty() lastname: string;
  @ApiModelProperty() role: UserRole;
  @ApiModelProperty() status: UserStatus;
}
