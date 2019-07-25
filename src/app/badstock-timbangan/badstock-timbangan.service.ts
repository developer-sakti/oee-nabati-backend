import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadstockTimbangan } from './badstock-timbangan.entity';
import { Repository } from 'typeorm';
import { Utils } from '@app/shared/utils';

@Injectable()
export class BadstockTimbanganService {
    constructor(@InjectRepository(BadstockTimbangan) private readonly badstockTimbanganRepository: Repository<BadstockTimbangan>) {}

    public async create(badstockTimbangan: BadstockTimbangan): Promise<BadstockTimbangan> {
        try {
            return await this.badstockTimbanganRepository.save(badstockTimbangan);
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }
}
