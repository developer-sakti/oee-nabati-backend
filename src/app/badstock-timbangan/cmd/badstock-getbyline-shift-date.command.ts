import { ApiModelProperty } from '@nestjs/swagger';

export class BodstockGetbylineShiftDateCmd {
  @ApiModelProperty() line_id: number;
  @ApiModelProperty() shift_id: number;
  
  @ApiModelProperty({ required : false }) from_date: string;
  @ApiModelProperty({ required : false }) to_date: string;
  @ApiModelProperty({ required : false }) date: string;
}