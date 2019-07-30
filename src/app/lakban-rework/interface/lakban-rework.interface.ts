import { RencanaProduksi } from "@app/app/rencana-produksi/rencana-produksi.entity";
import { Machine } from "@app/app/machine/machine.entity";
import { DowntimeCategory } from "@app/app/downtime-category/downtime-category.entity";
import { DowntimeReason } from "@app/app/downtime-reason/downtime-reason.entity";
import { BadstockCategory } from "@app/app/badstock-category/badstock-category.entity";

export interface ILakbanRework {
  readonly id?: number;
  readonly total?: number;

  readonly created_at?: string;
  readonly updated_at?: string;
  readonly deleted_at?: string;

  readonly rencana_produksi?: RencanaProduksi;
  readonly machine?: Machine;

  readonly rencanaProduksiId: number;
}
