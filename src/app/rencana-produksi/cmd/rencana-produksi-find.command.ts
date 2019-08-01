import { ApiModelProperty } from '@nestjs/swagger';

export class RencanaProduksiFindCmd {
  @ApiModelProperty() date: string;
  @ApiModelProperty({ required : false }) line_id: number;
}
