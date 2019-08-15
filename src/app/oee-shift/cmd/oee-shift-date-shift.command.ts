import { ApiModelProperty } from '@nestjs/swagger';

export class OeeShiftDateShiftCmd {
  @ApiModelProperty() shiftId: number;
  @ApiModelProperty() date: string;
}
