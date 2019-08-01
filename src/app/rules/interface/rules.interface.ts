import { Machine } from "@app/app/machine/machine.entity";
import { Line } from "@app/app/line/line.entity";
import { User } from "@app/app/user/user.entity";

export interface IRules {
  readonly id?: number;
  readonly rule?: string;
  readonly users?: User[];
}
