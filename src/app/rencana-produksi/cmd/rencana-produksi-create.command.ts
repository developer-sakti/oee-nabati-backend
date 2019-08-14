import { ApiModelProperty } from '@nestjs/swagger';

export class RencanaProduksiCreateCmd {
  @ApiModelProperty() po_number: string;
  @ApiModelProperty() standart_ct: number;
  @ApiModelProperty() bottleneck_ct: number;
  @ApiModelProperty() target_produksi: number;
  @ApiModelProperty() date: string;
  @ApiModelProperty() start_po: string; 
  @ApiModelProperty() end_po: string; 

  @ApiModelProperty() shiftId: number;
  @ApiModelProperty() lineId: number;
  @ApiModelProperty() skuId: number;
  @ApiModelProperty() supervisorId: number;
}
