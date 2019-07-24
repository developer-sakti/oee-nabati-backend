import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RencanaProduksi } from './rencana-produksi.entity';
import { Repository, DeepPartial } from 'typeorm';
import { RencanaProduksiCmd } from './cmd/rencana-produksi.command';

@Injectable()
export class RencanaProduksiService {
    constructor(@InjectRepository(RencanaProduksi) private readonly rencanaProduksiRepository: Repository<RencanaProduksi>) {}

    public async findAll(): Promise<RencanaProduksi[]> {
        return await this.rencanaProduksiRepository.find({
            relations : ['shift', 'line', 'sku', 'supervisor']
        });
    }

    public async findOne(params: RencanaProduksiCmd): Promise<RencanaProduksi> {
        let rencanaProduksi: RencanaProduksi;
        try {
            rencanaProduksi = await this.rencanaProduksiRepository
                                .createQueryBuilder("rencana_produksi")
                                .select(['rencana_produksi', 'shift', 'line', 'sku', 'supervisor'])
                                .where("rencana_produksi.date = :value", {value : params.date})
                                .innerJoin("rencana_produksi.shift", "shift")
                                .innerJoin("rencana_produksi.line", "line")
                                .innerJoin("rencana_produksi.sku", "sku")
                                .innerJoin("rencana_produksi.supervisor", "supervisor")
                                .where("shift.start_time <= :value", {value : params.time})
                                .where("shift.end_time > :value", {value : params.time})
                                .getOne();
            // rencanaProduksi = await this.rencanaProduksiRepository.findOne(params, {
            //     join : {
            //         alias: "rencana",
            //         innerJoinAndSelect : {
            //             shift : "rencana.shift"
            //         }
            //     },
            //     // relations : ['line', 'sku', 'supervisor']
            // });
        } catch (error) {}
        if (!rencanaProduksi) {
          throw new NotFoundException(`RencanaProduksi with ${JSON.stringify(params)} does not exist`);
        }
        return rencanaProduksi;
    }
    
    public async create(rencanaProduksi: RencanaProduksi): Promise<RencanaProduksi> {
      try {
        return await this.rencanaProduksiRepository.save(rencanaProduksi);
      } catch (error) {
        throw new BadRequestException(error);
      }
    }

}
