import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { InitialShift } from '@app/app/initial-shift/initial-shift.entity';
import { Line } from '@app/app/line/line.entity';
import { InitialSku } from '@app/app/initial-sku/initial-sku.entity';
import { User } from '@app/app/user/user.entity';
import { RencanaProduksi } from '../rencana-produksi/rencana-produksi.entity';
import { Machine } from '../machine/machine.entity';
import { DowntimeCategory } from '../downtime-category/downtime-category.entity';
import { DowntimeReason } from '../downtime-reason/downtime-reason.entity';
import { type } from 'os';
import { IBadstockCategory } from '../badstock-category/interface/badstock-category.interface';
import { BadstockCategory } from '../badstock-category/badstock-category.entity';
import { IReworkLine } from './interface/rework-line.interface';

@Entity()
export class ReworkLine implements IReworkLine {
  constructor(data: IReworkLine) {
    if (!!data) {
      this.id = data.id;
      this.total = data.total;

      this.created_at = data.created_at;
      this.updated_at = data.updated_at;
      this.deleted_at = data.deleted_at;

      this.rencana_produksi = data.rencana_produksi;

      this.rencanaProduksiId = data.rencanaProduksiId;
    }
  }

  @PrimaryGeneratedColumn() public id: number;

  @Column() public total: number;
  
  @Column({ type : "timestamp" }) public created_at: string;
  @Column({ type : "datetime", default : null  }) public updated_at: string;
  @Column({ type : "datetime", default : null }) public deleted_at: string;

  @ManyToOne(type => RencanaProduksi, rencana_produksi => rencana_produksi.badstock_timbangan)
  @JoinColumn({ name : "rencanaProduksiId" })
  public rencana_produksi: RencanaProduksi;

  @Column({  type: "int", nullable: true })
  rencanaProduksiId: number;
  
}
