import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '@app/app/user/user.entity';
import { IRules } from '../interface/rules.interface';

export class GetRulesDto {
  constructor(data: IRules) {
    this.id = data.id;
    this.rule = data.rule;
  }

  @ApiModelProperty() id: number;
  @ApiModelProperty() rule: string;
  @ApiModelProperty() users: User[];
}
