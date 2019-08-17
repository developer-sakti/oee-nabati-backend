import { ApiModelProperty } from '@nestjs/swagger';

export class OeeShiftDateTimeLineCmd {
  @ApiModelProperty() date: string;
  @ApiModelProperty() time: string;

  @ApiModelProperty() line_id: number;
}
