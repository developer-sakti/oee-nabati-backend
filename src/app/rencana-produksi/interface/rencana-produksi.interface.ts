import { InitialShift } from "@app/app/initial-shift/initial-shift.entity";
import { Line } from "@app/app/line/line.entity";
import { User } from "@app/app/user/user.entity";
import { InitialSku } from "@app/app/initial-sku/initial-sku.entity";

export interface IRencanaProduksi {
  readonly id?: number;
  readonly po_number?: string;
  readonly standart_ct?: number;
  readonly bottleneck_ct?: number;
  readonly target_produksi?: number;
  readonly date?: string;
  readonly start_sku?: string; 
  readonly end_sku?: string; 

  readonly b_finishgood_qty_karton?: number;
  readonly c_total_qty_karton?: number;
  readonly d_defect_qty_karton?: number;
  readonly e_rework_qty_karton?: number;

  readonly k_total_planned_dt_losses?: number;
  readonly l_loading_hours?: number;
  readonly m_total_unplanned_dt?: number;
  readonly n_operating_hours?: number;
  readonly o_total_performance_losses?: number;

  readonly p_running_time?: number;
  readonly q_total_defect_losses?: number;

  readonly r_value_added_hours?: number;

  readonly availablity?: number;
  readonly performance_rate?: number;
  readonly quality_product_rate?: number;

  readonly created_at?: string;
  readonly updated_at?: string;
  readonly deleted_at?: string;

  readonly shift?: InitialShift;
  readonly line?: Line;
  readonly sku?: InitialSku;
  readonly supervisor?: User;

  readonly shiftId?: number;
  readonly lineId?: number;
  readonly skuId?: number;
  readonly supervisorId?: number;
}
