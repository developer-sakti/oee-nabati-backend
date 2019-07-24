import { InitialShift } from "@app/initial-shift/initial-shift.entity";
import { Line } from "@app/line/line.entity";
import { User } from "@app/user/user.entity";
import { InitialSku } from "@app/initial-sku/initial-sku.entity";
import { Machine } from "@app/machine/machine.entity";

export interface IDowntimeReason {
  readonly id?: number;
  readonly reason?: string;
}
