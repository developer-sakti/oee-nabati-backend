import { ApiModelProperty } from '@nestjs/swagger';
import { IRencanaProduksi } from '../interface/rencana-produksi.interface';
import { InitialShift } from '@app/initial-shift/initial-shift.entity';
import { Line } from '@app/line/line.entity';
import { User } from '@app/user/user.entity';
import { InitialSku } from '@app/initial-sku/initial-sku.entity';

export class GetRencanaProduksiDto {
  constructor(data: IRencanaProduksi) {
    this.id = data.id;
    this.po_number = data.po_number;
    this.standart_ct = data.standart_ct;
    this.target_produksi = data.target_produksi;
    this.date = data.date;
    this.created_at = data.created_at;

    this.shift = data.shift;
    this.line = data.line;
    this.sku = data.sku;
    this.supervisor = data.supervisor;
  }
  @ApiModelProperty() id: number;
  @ApiModelProperty() po_number: string;
  @ApiModelProperty() standart_ct: number;
  @ApiModelProperty() target_produksi: number;
  @ApiModelProperty() date: string;
  @ApiModelProperty() created_at: string;

  @ApiModelProperty() shift: InitialShift;
  @ApiModelProperty() line: Line;
  @ApiModelProperty() sku: InitialSku;
  @ApiModelProperty() supervisor: User;
}
