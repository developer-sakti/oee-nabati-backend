import { ApiModelProperty } from '@nestjs/swagger';

export class OeeShiftDateLineCmd {
  @ApiModelProperty({ required : false }) shiftId: number;
  @ApiModelProperty({ required : false }) lineId: number;
  @ApiModelProperty() date: string;
}
