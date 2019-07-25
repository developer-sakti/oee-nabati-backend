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

  readonly created_at?: string;
  readonly updated_at?: string;
  readonly deleted_at?: string;

  readonly shift?: InitialShift;
  readonly line?: Line;
  readonly sku?: InitialSku;
  readonly supervisor?: User;
}
