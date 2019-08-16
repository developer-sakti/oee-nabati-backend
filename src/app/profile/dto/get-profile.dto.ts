import { UserRole, UserStatus } from '@app/app/user/user.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { IUser } from '@app/app/user/interface/user.interface';

export class GetProfileDto implements IUser {
  constructor(data: IUser) {
    this.id = data.id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.username = data.username;
    this.roleId = data.roleId;
    this.status = data.status;
  }
  @ApiModelProperty() id: number;
  @ApiModelProperty() firstname: string;
  @ApiModelProperty() lastname: string;
  @ApiModelProperty() username: string;
  @ApiModelProperty() roleId: number;
  @ApiModelProperty() status: UserStatus;
}
