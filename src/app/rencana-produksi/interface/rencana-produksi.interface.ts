import { InitialShift } from "@app/app/initial-shift/initial-shift.entity";
import { Line } from "@app/app/line/line.entity";
import { User } from "@app/app/user/user.entity";
import { InitialSku } from "@app/app/initial-sku/initial-sku.entity";

export interface IRencanaProduksi {
  readonly id?: number;

  readonly shift?: InitialShift;
  readonly line?: Line;
  readonly sku?: InitialSku;
  readonly supervisor?: User;

  readonly shiftId?: number;
  readonly lineId?: number;
  readonly skuId?: number;
  readonly supervisorId?: number;

  readonly po_number?: string;
  readonly standart_ct?: number;
  readonly bottleneck_ct?: number;
  readonly target_produksi?: number;
  readonly date?: string;
  readonly start_po?: string; 
  readonly end_po?: string; 

  readonly b_finishgood_qty_karton?: number;
  readonly c_total_qty_karton?: number;

  readonly d_defect_qty_karton?: number;
  readonly e_rework_qty_karton?: number;

  readonly q_defect_losses?: number;
  readonly q_rework_losses?: number;

  readonly q_total_losses?: number;
  
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly deleted_at?: string;
}
