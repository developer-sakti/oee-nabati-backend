import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { IRencanaProduksi } from './interface/rencana-produksi.interface';
import { InitialShift } from '@app/app/initial-shift/initial-shift.entity';
import { Line } from '@app/app/line/line.entity';
import { InitialSku } from '@app/app/initial-sku/initial-sku.entity';
import { User } from '@app/app/user/user.entity';
import { Downtime } from '../downtime/downtime.entity';
import { BadstockTimbangan } from '../badstock-timbangan/badstock-timbangan.entity';

@Entity()
export class RencanaProduksi implements IRencanaProduksi{
  constructor(data: IRencanaProduksi) {
    if (!!data) {
      this.id = data.id;

      this.shift = data.shift;
      this.line = data.line;
      this.sku = data.sku;
      this.supervisor =data.supervisor;

      this.shiftId = data.shiftId;
      this.lineId = data.lineId;
      this.skuId = data.skuId;
      this.supervisorId = data.supervisorId;

      this.po_number = data.po_number;
      this.standart_ct = data.standart_ct;
      this.bottleneck_ct = data.bottleneck_ct;
      this.target_produksi = data.target_produksi;
      this.date = data.date;
      this.start_po = data.start_po;
      this.end_po = data.end_po;
      
      this.b_finishgood_qty_karton = data.b_finishgood_qty_karton;
      this.c_total_qty_karton = data.c_total_qty_karton;
    
      this.d_defect_qty_karton = data.d_defect_qty_karton;
      this.e_rework_qty_karton = data.e_rework_qty_karton;
    
      this.q_defect_losses = data.q_defect_losses;
      this.q_rework_losses = data.q_rework_losses;
    
      this.q_total_quality_losses = data.q_total_quality_losses;

      this.created_at = data.created_at;
      this.updated_at = data.updated_at;
      this.deleted_at = data.deleted_at;
    }
  }

  @PrimaryGeneratedColumn() public id: number;

  @Column({  type: "int", nullable: true })
  shiftId: number;
  @Column({  type: "int", nullable: true })
  lineId: number;
  @Column({  type: "int", nullable: true })
  skuId: number;
  @Column({  type: "int", nullable: true })
  supervisorId: number;

  @Column() public po_number: string;
  @Column({  type: "float", default : 0 }) public standart_ct: number;
  @Column({  type: "float", default : 0 }) public bottleneck_ct: number;
  @Column() public target_produksi: number;
  @Column({ type : "date" }) public date: string;
  @Column({ type : "time"}) public start_po: string;
  @Column({ type : "time"}) public end_po: string;

  @Column({ type : "datetime",  nullable: true}) public date_startpo: string;

  @Column({  type: "float", default : 0 }) public b_finishgood_qty_karton?: number;
  @Column({  type: "float", default : 0 }) public c_total_qty_karton?: number;

  @Column({  type: "float", default : 0 }) d_defect_qty_karton?: number;
  @Column({  type: "float", default : 0 }) e_rework_qty_karton?: number;

  @Column({  type: "float", default : 0 }) q_defect_losses?: number;
  @Column({  type: "float", default : 0 }) q_rework_losses?: number;

  @Column({  type: "float", default : 0 }) q_total_quality_losses?: number;

  @Column({ type : "timestamp" }) public created_at: string;
  @Column({ type : "datetime", default : null  }) public updated_at: string;
  @Column({ type : "datetime", default : null }) public deleted_at: string;

  @ManyToOne(type => InitialShift, initial_shift => initial_shift.rencana_produksi)
  public shift: InitialShift;
  
  @ManyToOne(type => Line, line => line.rencana_produksi)
  public line: Line;

  @ManyToOne(type => InitialSku, initial_sku => initial_sku.rencana_produksi)
  public sku: InitialSku;

  @ManyToOne(type => User, user => user.rencana_produksi)
  public supervisor: User;

  @OneToMany(type => Downtime, downtime => downtime.rencana_produksi)
  public downtime: Downtime;

  @OneToMany(type => BadstockTimbangan, badstock_timbangan => badstock_timbangan.rencana_produksi)
  public badstock_timbangan: BadstockTimbangan;

}
