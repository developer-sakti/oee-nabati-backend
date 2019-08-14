import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Downtime } from './downtime.entity';
import { Repository } from 'typeorm';
import { Utils } from '@app/shared/utils';
import { DowntimeGetbylineCmd } from './cmd/downtime-getbyline.command';

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

    public async findByLine(params : DowntimeGetbylineCmd): Promise<any> {
        let downtime: Downtime[];
      
        try {
            downtime = await this.downtimeRepository
                                .createQueryBuilder("downtime")
                                .select(['downtime', 'machine', 'downtime_category', 'downtime_reason', 'line', 'shift'])
                                .innerJoin("downtime.machine", "machine")
                                .innerJoin("downtime.downtime_category", "downtime_category")
                                .innerJoin("downtime.downtime_reason", "downtime_reason")
                                .innerJoin("downtime.line", "line")
                                .innerJoin("downtime.shift", "shift")
                                .andWhere("line.id = :value1", {value1 : params.line_id})
                                .orderBy("downtime.created_at", "DESC")
                                .limit(20)
                                .getMany();
        } catch (error) {}

        if (!downtime) {
            return Utils.NULL_RETURN;
        }
        return downtime;
    }
}
