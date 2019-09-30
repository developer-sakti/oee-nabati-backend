import { ApiModelProperty } from '@nestjs/swagger';

export class RencanaProduksiFindByPoCmd {
  @ApiModelProperty() po: string;
}
