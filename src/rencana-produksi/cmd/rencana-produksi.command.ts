import { ApiModelProperty } from '@nestjs/swagger';

export class RencanaProduksiCmd {
  @ApiModelProperty() date: string;
  @ApiModelProperty() time: string;
}
