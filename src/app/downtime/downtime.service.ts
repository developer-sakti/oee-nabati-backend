import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Downtime } from './downtime.entity';
import { Repository } from 'typeorm';
import { Utils } from '@app/shared/utils';

@Injectable()
export class DowntimeService {
    constructor(@InjectRepository(Downtime) private readonly downtimeRepository: Repository<Downtime>) {}

    public async create(downtime: Downtime): Promise<Downtime> {
        try {
            return await this.downtimeRepository.save(downtime);
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }
}
