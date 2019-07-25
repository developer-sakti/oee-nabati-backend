import { InitialShift } from "@app/app/initial-shift/initial-shift.entity";
import { Line } from "@app/app/line/line.entity";
import { User } from "@app/app/user/user.entity";
import { InitialSku } from "@app/app/initial-sku/initial-sku.entity";
import { Machine } from "@app/app/machine/machine.entity";
import { DowntimeCategory } from "@app/app/downtime-category/downtime-category.entity";
import { DowntimeReason } from "@app/app/downtime-reason/downtime-reason.entity";

export interface IDowntimeReasonMachine {
  readonly id?: number;

  readonly machine?: Machine;
  readonly downtime_category?: DowntimeCategory;
  readonly downtime_reason?: DowntimeReason;
}
