import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { IInitialSku } from './interface/initial-sku.interface';
import { RencanaProduksi } from '@app/app/rencana-produksi/rencana-produksi.entity';

@Entity()
export class InitialSku implements IInitialSku{
  constructor(data: IInitialSku) {
    if (!!data) {
      this.id = data.id;
      this.code = data.code;
      this.name = data.name;
    }
  }

  @PrimaryGeneratedColumn() public id: number;
  
  @ApiModelProperty()
  @Column() public code?: string;
  @ApiModelProperty()
  @Column() public name?: string;

  @OneToMany(type => RencanaProduksi, rencana_produksi => rencana_produksi.sku)
  public rencana_produksi : RencanaProduksi;
}
