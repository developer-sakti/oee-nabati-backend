import { InitialShift } from "@app/app/initial-shift/initial-shift.entity";
import { Line } from "@app/app/line/line.entity";
import { User } from "@app/app/user/user.entity";
import { InitialSku } from "@app/app/initial-sku/initial-sku.entity";
import { Machine } from "@app/app/machine/machine.entity";

export interface IDowntimeReason {
  readonly id?: number;
  readonly reason?: string;
}
