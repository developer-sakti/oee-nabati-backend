import { ApiModelProperty } from '@nestjs/swagger';
import { IInitialSku } from '../interface/initial-sku.interface';

export class GetInitialSkuDto {
  constructor(data: IInitialSku) {
    this.id = data.id;
    this.code = data.code;
    this.name = data.name;
  }
  @ApiModelProperty() id: number;
  @ApiModelProperty() code?: string;
  @ApiModelProperty() name?: string;
}
