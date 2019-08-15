import { Injectable } from '@nestjs/common';
import { OeeShiftCreateCmd } from './cmd/oee-shift-create.command';
import { OeeShift } from './oee-shift.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utils } from '@app/shared/utils';

@Injectable()
export class OeeShiftService {
    constructor(@InjectRepository(OeeShift) private readonly repo: Repository<OeeShift>) {}

    public async create(body: OeeShiftCreateCmd): Promise<any> {
        try {
            return await this.repo.save(body);
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }

    public async update(id : number, body: OeeShiftCreateCmd): Promise<any> {
        try {
            return await this.repo.update({
                id : id
            }, {
                total_target_produksi : body.total_target_produksi
            });
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }

    public async findByLineDateShift(params: OeeShiftCreateCmd): Promise<any> {
        let data : OeeShift;
        try {
            data = await this.repo.findOne({
                where : {
                    lineId : params.lineId,
                    shiftId : params.shiftId,
                    date : params.date
                }
            })
            return data;
        } catch (error) {
            return Utils.EMPTY_ARRAY_RETURN;
        }        
    }
}
