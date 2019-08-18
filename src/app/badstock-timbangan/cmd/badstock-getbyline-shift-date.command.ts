import { ApiModelProperty } from '@nestjs/swagger';

export class BodstockGetbylineShiftDateCmd {
  @ApiModelProperty() line_id: number;
  @ApiModelProperty() shift_id: number;
  @ApiModelProperty() from_date: string;
  @ApiModelProperty() to_date: string;
}