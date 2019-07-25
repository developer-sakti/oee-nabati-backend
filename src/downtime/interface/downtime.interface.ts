import { RencanaProduksi } from "@app/rencana-produksi/rencana-produksi.entity";
import { Machine } from "@app/machine/machine.entity";
import { DowntimeCategory } from "@app/downtime-category/downtime-category.entity";
import { DowntimeReason } from "@app/downtime-reason/downtime-reason.entity";

export interface IDowntime {
  readonly id?: number;
  readonly duration?: number;
  readonly start_downtime?: number;
  readonly end_downtime?: number;
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly deleted_at?: string;

  readonly rencana_produksi?: RencanaProduksi;
  readonly machine?: Machine;
  readonly downtime_category?: DowntimeCategory;
  readonly downtime_reason?: DowntimeReason;
}
