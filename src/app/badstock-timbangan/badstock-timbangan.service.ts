import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadstockTimbangan } from './badstock-timbangan.entity';
import { Repository } from 'typeorm';
import { Utils } from '@app/shared/utils';
import { OeeShiftDateShiftCmd } from '../oee-shift/cmd/oee-shift-date-shift.command';
import { OeeShiftDateLineCmd } from '../oee-shift/cmd/oee-shift-date-line.command';

@Injectable()
export class BadstockTimbanganService {
    constructor(@InjectRepository(BadstockTimbangan) private readonly repo: Repository<BadstockTimbangan>) {}

    public async findByDateShiftLine(params : OeeShiftDateLineCmd): Promise<any> {
        let data: BadstockTimbangan[];
      
        try {
            data = await this.repo
                                .createQueryBuilder("badstock_timbangan")
                                .select(['badstock_timbangan', 'rencana_produksi', 'machine', 'badstock_category'])
                                .innerJoin("badstock_timbangan.rencana_produksi", "rencana_produksi")
                                .innerJoin("badstock_timbangan.machine", "machine")
                                .innerJoin("badstock_timbangan.badstock_category", "badstock_category")
                                .andWhere("rencana_produksi.date = :value1", {value1 : params.date})
                                .andWhere("rencana_produksi.shiftId = :value2", {value2 : params.shiftId})
                                .andWhere("rencana_produksi.lineId = :value3", {value3 : params.lineId})
                                .getMany();
        } catch (error) {}

        if (!data) {
            return Utils.NULL_RETURN;
        }
        return data;
    }
    
    public async create(badstockTimbangan: BadstockTimbangan): Promise<BadstockTimbangan> {
        try {
            return await this.repo.save(badstockTimbangan);
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }
}
