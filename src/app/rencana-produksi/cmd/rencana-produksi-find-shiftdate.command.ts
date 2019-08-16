import { ApiModelProperty } from '@nestjs/swagger';

export class RencanaProduksiFindShiftDateCmd {
  @ApiModelProperty() date: string;
  @ApiModelProperty() shiftId: number;
}
