import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { InitialShift } from '@app/app/initial-shift/initial-shift.entity';
import { Line } from '@app/app/line/line.entity';
import { InitialSku } from '@app/app/initial-sku/initial-sku.entity';
import { User } from '@app/app/user/user.entity';
import { IDowntime } from './interface/downtime.interface';
import { RencanaProduksi } from '../rencana-produksi/rencana-produksi.entity';
import { Machine } from '../machine/machine.entity';
import { DowntimeCategory } from '../downtime-category/downtime-category.entity';
import { DowntimeReason } from '../downtime-reason/downtime-reason.entity';
import { type } from 'os';

@Entity()
export class Downtime implements IDowntime{
  constructor(data: IDowntime) {
    if (!!data) {
      this.id = data.id;
      this.duration = data.duration;

      this.created_at = data.created_at;
      this.updated_at = data.updated_at;
      this.deleted_at = data.deleted_at;

      this.rencana_produksi = data.rencana_produksi;
      this.machine = data.machine;
      this.downtime_category = data.downtime_category;
      this.downtime_reason = data.downtime_reason;

      this.rencanaProduksiId = data.rencanaProduksiId;
      this.machineId = data.machineId;
      this.downtimeCategoryId = data.downtimeCategoryId;
      this.downtimeReasonId = data.downtimeReasonId;
    }
  }

  @PrimaryGeneratedColumn() public id: number;

  @Column() public duration: number;
  
  @Column({ type : "timestamp" }) public created_at: string;
  @Column({ type : "datetime", default : null  }) public updated_at: string;
  @Column({ type : "datetime", default : null }) public deleted_at: string;

  @ManyToOne(type => RencanaProduksi, rencana_produksi => rencana_produksi.downtime)
  @JoinColumn({ name : "rencanaProduksiId" })
  public rencana_produksi: RencanaProduksi;
  
  @ManyToOne(type => Machine, machine => machine.downtime)
  @JoinColumn({ name : "machineId" })
  public machine: Machine;
  
  @ManyToOne(type => DowntimeCategory, downtime_category => downtime_category.downtime)
  @JoinColumn({ name : "downtimeCategoryId" })
  public downtime_category: DowntimeCategory;
  
  @ManyToOne(type => DowntimeReason, downtime_reason => downtime_reason.downtime)
  @JoinColumn({ name : "downtimeReasonId" })
  public downtime_reason: DowntimeReason;

  @Column({  type: "int", nullable: true })
  rencanaProduksiId: number;
  @Column({  type: "int", nullable: true })
  machineId: number;
  @Column({  type: "int", nullable: true })
  downtimeCategoryId: number;
  @Column({  type: "int", nullable: true })
  downtimeReasonId: number;
}
