import { RencanaProduksi } from "@app/app/rencana-produksi/rencana-produksi.entity";
import { Machine } from "@app/app/machine/machine.entity";
import { DowntimeCategory } from "@app/app/downtime-category/downtime-category.entity";
import { DowntimeReason } from "@app/app/downtime-reason/downtime-reason.entity";
import { InitialShift } from "@app/app/initial-shift/initial-shift.entity";
import { Line } from "@app/app/line/line.entity";

export interface IDowntime {
  readonly id?: number;
  readonly duration?: number;
  readonly date?: string;

  readonly created_at?: string;
  readonly updated_at?: string;
  readonly deleted_at?: string;

  readonly shift?: InitialShift;
  readonly line?: Line;
  readonly rencana_produksi?: RencanaProduksi;
  readonly machine?: Machine;
  readonly downtime_category?: DowntimeCategory;
  readonly downtime_reason?: DowntimeReason;

  readonly shiftId?: number;
  readonly lineId?: number;
  readonly rencanaProduksiId?: number;
  readonly machineId?: number;
  readonly downtimeCategoryId?: number;
  readonly downtimeReasonId?: number;
}
