import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LakbanRework } from './lakban-rework.entity';
import { Repository } from 'typeorm';
import { Utils } from '@app/shared/utils';

@Injectable()
export class LakbanReworkService {
    constructor(@InjectRepository(LakbanRework) private readonly lakbanReworkRepository: Repository<LakbanRework>) {}

    public async create(lakbanRework: LakbanRework): Promise<LakbanRework> {
        try {
            return await this.lakbanReworkRepository.save(lakbanRework);
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }
}
