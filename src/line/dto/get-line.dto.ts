import { ApiModelProperty } from '@nestjs/swagger';
import { ILine } from '../interface/line.interface';
import { Machine } from '@app/machine/machine.entity';

export class GetLineDto {
  constructor(data: ILine) {
    this.id = data.id;
    this.name = data.name;
    // this.machines = data.machines;
  }
  @ApiModelProperty() id: number;
  @ApiModelProperty() name: string;
  // @ApiModelProperty() machines: Machine[];
}
