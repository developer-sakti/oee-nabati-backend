import { UserRole, UserStatus } from '../user.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { IUser } from '../interface/user.interface';

export class UpdateUserDto {
  constructor(data: IUser) {
    this.id = data.id;
    this.username = data.username;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.role = data.role;
    this.status = data.status;
  }
  @ApiModelProperty() id: number;
  @ApiModelProperty() username: string;
  @ApiModelProperty() firstname: string;
  @ApiModelProperty() lastname: string;
  @ApiModelProperty() role: UserRole;
  @ApiModelProperty() status: UserStatus;
}