import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { InitialShift } from '@app/initial-shift/initial-shift.entity';
import { Line } from '@app/line/line.entity';
import { InitialSku } from '@app/initial-sku/initial-sku.entity';
import { User } from '@app/user/user.entity';
import { IDowntime } from './interface/downtime.interface';

@Entity()
export class Downtime implements IDowntime{
  constructor(data: IDowntime) {
    if (!!data) {
      this.id = data.id;
    }
  }

  @PrimaryGeneratedColumn() public id: number;
  
  @Column() public po_number: string;
  @Column() public standart_ct: number;
  @Column() public target_produksi: number;
  @Column({ type : "date" }) public date: string;
  @Column({ type : "timestamp" }) public created_at: string;
  @Column({ type : "datetime", default : null  }) public updated_at: string;
  @Column({ type : "datetime", default : null }) public deleted_at: string;

  @OneToOne(type => InitialShift)
  @JoinColumn() 
  public shift: InitialShift;

  
  @OneToOne(type => Line)
  @JoinColumn() 
  public line: Line;

  @OneToOne(type => InitialSku)
  @JoinColumn() 
  public sku: InitialSku;

  @OneToOne(type => User)
  @JoinColumn() 
  public supervisor: User;
}
