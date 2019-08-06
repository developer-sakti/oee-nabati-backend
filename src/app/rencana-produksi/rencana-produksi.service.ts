import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RencanaProduksi } from './rencana-produksi.entity';
import { Repository, DeepPartial } from 'typeorm';
import { RencanaProduksiCmd } from './cmd/rencana-produksi.command';
import { Utils } from '@app/shared/utils';
import { RencanaProduksiFindCmd } from './cmd/rencana-produksi-find.command';
import { RencanaProduksiCreateCmd } from './cmd/rencana-produksi-create.command';

@Injectable()
export class RencanaProduksiService {
    constructor(@InjectRepository(RencanaProduksi) private readonly rencanaProduksiRepository: Repository<RencanaProduksi>) {}

    public async findAll(): Promise<RencanaProduksi[]> {
      return await this.rencanaProduksiRepository.find({
          relations : ['shift', 'line', 'sku', 'supervisor']
      });
  }
  public async findById(id : number): Promise<any> {
      return await this.rencanaProduksiRepository.findOne({
          where : {
            id : id
          }
      });
  }

  public async findOne(params: RencanaProduksiCmd): Promise<any> {
      let rencanaProduksi: RencanaProduksi;
      
      try {
          rencanaProduksi = await this.rencanaProduksiRepository
                              .createQueryBuilder("rencana_produksi")
                              .select(['rencana_produksi', 'shift', 'line', 'sku', 'supervisor'])
                              .innerJoin("rencana_produksi.shift", "shift")
                              .innerJoin("rencana_produksi.line", "line")
                              .innerJoin("rencana_produksi.sku", "sku")
                              .innerJoin("rencana_produksi.supervisor", "supervisor")
                              .andWhere("rencana_produksi.date = :value1", {value1 : params.date})
                              .andWhere("shift.start_time < :value2", {value2 : params.time})
                              .andWhere("shift.end_time >= :value3", {value3 : params.time})
                              .andWhere("line.id = :value4", {value4 : params.line_id})
                              .getOne();
      } catch (error) {}
      if (!rencanaProduksi) {
        return Utils.NULL_RETURN;
      }
      return rencanaProduksi;
  }

  public async findByLineDate(params: RencanaProduksiFindCmd): Promise<any> {
    let rencanaProduksi: RencanaProduksi[];
    
    try {
      if (params.line_id === null || params.line_id === undefined) {
        rencanaProduksi = await this.rencanaProduksiRepository
                            .createQueryBuilder("rencana_produksi")
                            .select(['rencana_produksi', 'shift', 'line', 'sku', 'supervisor'])
                            .innerJoin("rencana_produksi.shift", "shift")
                            .innerJoin("rencana_produksi.line", "line")
                            .innerJoin("rencana_produksi.sku", "sku")
                            .innerJoin("rencana_produksi.supervisor", "supervisor")
                            .andWhere("rencana_produksi.date = :value1", {value1 : params.date})
                            .getMany();
      } else {
        rencanaProduksi = await this.rencanaProduksiRepository
                            .createQueryBuilder("rencana_produksi")
                            .select(['rencana_produksi', 'shift', 'line', 'sku', 'supervisor'])
                            .innerJoin("rencana_produksi.shift", "shift")
                            .innerJoin("rencana_produksi.line", "line")
                            .innerJoin("rencana_produksi.sku", "sku")
                            .innerJoin("rencana_produksi.supervisor", "supervisor")
                            .andWhere("rencana_produksi.date = :value1", {value1 : params.date})
                            .andWhere("line.id = :value4", {value4 : params.line_id})
                            .getMany();
      }
    } catch (error) {}
    if (!rencanaProduksi) {
      return Utils.EMPTY_ARRAY_RETURN;
    }
    return rencanaProduksi;
  }
    
  public async create(rencanaProduksi: RencanaProduksiCreateCmd): Promise<RencanaProduksi> {
    try {
      return await this.rencanaProduksiRepository.save(rencanaProduksi);
    } catch (error) {
      return Utils.NULL_RETURN;
    }
  }
    
  public async update(params: DeepPartial<RencanaProduksi>): Promise<RencanaProduksi> {
    try {
      console.log(params)
      return Utils.NULL_RETURN;
      // return await this.rencanaProduksiRepository.save(params);
    } catch (error) {
      return Utils.NULL_RETURN;
    }
  }

}
