import { ApiModelProperty } from '@nestjs/swagger';
import { RencanaProduksi } from '../rencana-produksi.entity';

export class RencanaProduksiWaitingListCmd {
  @ApiModelProperty() poActiveId: number;
}
