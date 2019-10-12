import { ApiModelProperty } from '@nestjs/swagger';
import { IRencanaProduksi } from '../interface/rencana-produksi.interface';
import { InitialShift } from '@app/app/initial-shift/initial-shift.entity';
import { Line } from '@app/app/line/line.entity';
import { User } from '@app/app/user/user.entity';
import { InitialSku } from '@app/app/initial-sku/initial-sku.entity';

export class GetRencanaProduksiDto {
  constructor(data: IRencanaProduksi) {
    this.id = data.id;

    this.shift = data.shift;
    this.line = data.line;
    this.sku = data.sku;
    this.supervisor = data.supervisor;

    this.shiftId = data.shiftId;
    this.lineId = data.lineId;
    this.skuId = data.skuId;
    this.supervisorId = data.supervisorId;

    this.po_number = data.po_number;
    this.standart_ct = data.standart_ct;
    this.bottleneck_ct = data.bottleneck_ct;
    this.target_produksi = data.target_produksi;
    this.date = data.date;
    this.start_po = data.start_po;
    this.end_po = data.start_po;

    this.b_finishgood_qty_karton = data.b_finishgood_qty_karton;
    this.c_total_qty_karton = data.c_total_qty_karton;

    this.d_defect_qty_karton = data.d_defect_qty_karton;
    this.e_rework_qty_karton = data.e_rework_qty_karton;

    this.q_defect_losses = data.q_defect_losses;
    this.q_rework_losses = data.q_rework_losses;

    this.q_total_quality_losses = data.q_total_quality_losses;

    this.is_active = data.is_active;

    this.created_at = data.created_at;
  }
  @ApiModelProperty() id: number;

  @ApiModelProperty() shift: InitialShift;
  @ApiModelProperty() line: Line;
  @ApiModelProperty() sku: InitialSku;
  @ApiModelProperty() supervisor: User;

  @ApiModelProperty() shiftId: number;
  @ApiModelProperty() lineId: number;
  @ApiModelProperty() skuId: number;
  @ApiModelProperty() supervisorId: number;

  @ApiModelProperty() po_number: string;
  @ApiModelProperty() standart_ct: number;
  @ApiModelProperty() bottleneck_ct: number;
  @ApiModelProperty() target_produksi: number;
  @ApiModelProperty() date: string;
  @ApiModelProperty() start_po?: string;
  @ApiModelProperty() end_po?: string;

  @ApiModelProperty() b_finishgood_qty_karton?: number;
  @ApiModelProperty() c_total_qty_karton?: number;

  @ApiModelProperty() d_defect_qty_karton?: number;
  @ApiModelProperty() e_rework_qty_karton?: number;

  @ApiModelProperty() q_defect_losses?: number;
  @ApiModelProperty() q_rework_losses?: number;

  @ApiModelProperty() q_total_quality_losses?: number;

  @ApiModelProperty() is_active?: number;

  @ApiModelProperty() created_at: string;
}
