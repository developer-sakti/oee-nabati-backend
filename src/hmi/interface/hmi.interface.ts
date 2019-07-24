import { Machine } from "@app/machine/machine.entity";
import { Line } from "@app/line/line.entity";

export interface IHmi {
  readonly id?: number;
  readonly name?: string;
  readonly lines?: Line[];
  readonly machines?: Machine[];
}
