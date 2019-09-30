import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { IInitialSku } from './interface/initial-sku.interface';
import { RencanaProduksi } from '@app/app/rencana-produksi/rencana-produksi.entity';

@Entity()
export class InitialSku implements IInitialSku {
  constructor(data: IInitialSku) {
    if (!!data) {
      this.id = data.id;
      this.sku = data.sku;
      this.name = data.name;
      this.desc = data.desc;
      this.product_id = data.product_id;
      this.gr = data.gr;
      this.bag = data.bag;
      this.pcs = data.pcs;
      this.bks = data.bks;
      this.berat_ctn = data.berat_ctn;
    }
  }

  @PrimaryGeneratedColumn() public id: number;

  @ApiModelProperty()
  @Column()
  public sku?: string;

  @ApiModelProperty()
  @Column()
  public name?: string;

  @ApiModelProperty()
  @Column()
  desc?: string;

  @ApiModelProperty()
  @Column()
  product_id?: number;

  @ApiModelProperty()
  @Column()
  gr?: number;

  @ApiModelProperty()
  @Column()
  bag?: number;

  @ApiModelProperty()
  @Column()
  pcs?: number;

  @ApiModelProperty()
  @Column()
  bks?: number;

  @ApiModelProperty()
  @Column()
  berat_ctn?: number;

  @OneToMany(type => RencanaProduksi, rencana_produksi => rencana_produksi.sku)
  public rencana_produksi: RencanaProduksi;
}
