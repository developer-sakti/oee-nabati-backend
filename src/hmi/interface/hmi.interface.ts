import { Line } from "@app/line/line.entity";
import { Machine } from "@app/machine/machine.entity";

export interface IHmi {
  readonly id?: number;
  readonly name?: string;
  readonly lines?: Line[];
  readonly machines?: Machine[];
}
