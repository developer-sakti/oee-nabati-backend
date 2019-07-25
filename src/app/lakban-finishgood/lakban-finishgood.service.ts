import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LakbanFinishgood } from './lakban-finishgood.entity';
import { Repository } from 'typeorm';
import { Utils } from '@app/shared/utils';

@Injectable()
export class LakbanFinishgoodService {
    constructor(@InjectRepository(LakbanFinishgood) private readonly lakbanFinishgoodRepository: Repository<LakbanFinishgood>) {}

    public async create(lakbanFinishgood: LakbanFinishgood): Promise<LakbanFinishgood> {
        try {
            return await this.lakbanFinishgoodRepository.save(lakbanFinishgood);
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }
}
