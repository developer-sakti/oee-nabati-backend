import { Line } from "@app/line/line.entity";

export interface IHmi {
  readonly id?: number;
  readonly name?: string;
  readonly lines?: Line[];
}
