import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DowntimeReason } from './downtime-reason.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DowntimeReasonService {
    constructor(@InjectRepository(DowntimeReason) private readonly downtimeReasonRepository: Repository<DowntimeReason>) {}

    public async findAll(): Promise<DowntimeReason[]> {
        return await this.downtimeReasonRepository.find();
    }
}
