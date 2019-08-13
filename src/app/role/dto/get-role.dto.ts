import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '@app/app/user/user.entity';
import { IRole } from '../interface/role.interface';

export class GetRoleDto {
  constructor(data: IRole) {
    this.id = data.id;
    this.role = data.role;
  }

  @ApiModelProperty() id: number;
  @ApiModelProperty() role: string;
  @ApiModelProperty() users: User[];
}
