import { ApiModelProperty } from '@nestjs/swagger';

export class BadstockGetDateCmd {
  @ApiModelProperty() date: string;
}