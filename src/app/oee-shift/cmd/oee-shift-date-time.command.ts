import { ApiModelProperty } from '@nestjs/swagger';

export class OeeShiftDateTimeCmd {
  @ApiModelProperty() date: string;
  @ApiModelProperty() time: string;
}
