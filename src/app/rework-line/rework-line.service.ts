import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReworkLine } from './rework-line.entity';
import { Repository } from 'typeorm';
import { Utils } from '@app/shared/utils';

@Injectable()
export class ReworkLineService {
    constructor(@InjectRepository(ReworkLine) private readonly reworkLineRepository: Repository<ReworkLine>) {}

    public async create(reworkLine: ReworkLine): Promise<ReworkLine> {
        try {
            return await this.reworkLineRepository.save(reworkLine);
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }
}
