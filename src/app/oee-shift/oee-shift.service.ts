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
}
