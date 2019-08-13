import { RencanaProduksi } from "@app/app/rencana-produksi/rencana-produksi.entity";
import { Machine } from "@app/app/machine/machine.entity";
import { DowntimeCategory } from "@app/app/downtime-category/downtime-category.entity";
import { DowntimeReason } from "@app/app/downtime-reason/downtime-reason.entity";

export interface IDowntime {
  readonly id?: number;
  readonly duration?: number;

  readonly created_at?: string;
  readonly updated_at?: string;
  readonly deleted_at?: string;

  readonly rencana_produksi?: RencanaProduksi;
  readonly machine?: Machine;
  readonly downtime_category?: DowntimeCategory;
  readonly downtime_reason?: DowntimeReason;

  readonly rencanaProduksiId?: number;
  readonly machineId?: number;
  readonly downtimeCategoryId?: number;
  readonly downtimeReasonId?: number;
}
