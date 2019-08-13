import { Machine } from "@app/app/machine/machine.entity";
import { Line } from "@app/app/line/line.entity";
import { User } from "@app/app/user/user.entity";

export interface IRole {
  readonly id?: number;
  readonly role?: string;
  readonly users?: User[];
}
