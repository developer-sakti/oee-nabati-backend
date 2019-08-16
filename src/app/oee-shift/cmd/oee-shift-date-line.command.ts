import { ApiModelProperty } from '@nestjs/swagger';

export class OeeShiftDateLineCmd {
  @ApiModelProperty() shiftId: number;
  @ApiModelProperty() lineId: number;
  @ApiModelProperty() date: string;
}
