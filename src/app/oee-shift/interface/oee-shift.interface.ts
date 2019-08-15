import { InitialShift } from "@app/app/initial-shift/initial-shift.entity";
import { Line } from "@app/app/line/line.entity";
import { User } from "@app/app/user/user.entity";
import { InitialSku } from "@app/app/initial-sku/initial-sku.entity";

export interface IOeeShift {
  readonly id?: number;

  readonly shift?: InitialShift;
  readonly line?: Line;

  readonly shiftId?: number;
  readonly lineId?: number;

  readonly date?: string;
  readonly total_target_produksi?: number;

  readonly b_finishgood_shift?: number;
  readonly c_total_qty_shift?: number;

  readonly k_total_planned_dt_losses?: number;
  readonly l_loading_hours?: number;
  readonly m_total_unplanned_dt?: number;
  readonly n_operating_hours?: number;
  readonly o_total_performance_losses?: number;

  readonly p_running_time?: number;
  
  readonly q_total_defect_losses?: number;
  readonly q_total_rework_losses?: number;

  readonly q_total_quality_losses?: number;

  readonly r_value_added_hours?: number;

  readonly availablity?: number;
  readonly performance_rate?: number;
  readonly quality_product_rate?: number;

  readonly line_oee?: number;

  readonly l_total_production_time?: number;
  readonly w2_total_downtime?: number;
  readonly w3_number_of_breakdown?: number;
  readonly w4_up_time?: number;

  readonly mtbf_x1?: number;
  readonly mttr_y1?: number;
  readonly mttf_z1?: number;

  readonly created_at?: string;
  readonly updated_at?: string;
  readonly deleted_at?: string;
}
