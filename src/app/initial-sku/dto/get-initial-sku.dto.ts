import { ApiModelProperty } from '@nestjs/swagger';
import { IInitialSku } from '../interface/initial-sku.interface';

export class GetInitialSkuDto {
  constructor(data: IInitialSku) {
    this.id = data.id;
    this.sku = data.sku;
    this.name = data.name;
    this.desc = data.desc;
    this.product_id = data.product_id;
    this.gr = data.gr;
    this.bag = data.bag;
    this.pcs = data.pcs;
    this.bks = data.bks;
    this.berat_ctn = data.berat_ctn;
  }
  @ApiModelProperty() id: number;
  @ApiModelProperty() sku?: string;
  @ApiModelProperty() name?: string;
  @ApiModelProperty() desc?: string;
  @ApiModelProperty() product_id?: number;
  @ApiModelProperty() gr?: number;
  @ApiModelProperty() bag?: number;
  @ApiModelProperty() pcs?: number;
  @ApiModelProperty() bks?: number;
  @ApiModelProperty() berat_ctn?: number;
}
