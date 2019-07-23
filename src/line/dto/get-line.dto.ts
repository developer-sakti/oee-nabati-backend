import { ApiModelProperty } from '@nestjs/swagger';
import { ILine } from '../interface/line.interface';

export class GetLineDto {
  constructor(data: ILine) {
    this.id = data.id;
    this.name = data.name;
  }
  @ApiModelProperty() id: number;
  @ApiModelProperty() name: string;
}
