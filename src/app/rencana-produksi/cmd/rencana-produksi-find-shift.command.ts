import { ApiModelProperty } from '@nestjs/swagger';

export class RencanaProduksiFindShiftCmd {
  @ApiModelProperty() date: string;
  @ApiModelProperty() shift_id: number;
  @ApiModelProperty({ required : false }) line_id: number;
}
