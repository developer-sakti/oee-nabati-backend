import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DowntimeReasonMachine } from './downtime-reason-machine.entity';
import { Repository, createQueryBuilder } from 'typeorm';
import { DowntimeReasonMachineCmd } from './cmd/downtime-reason-machine.command';
import { Machine } from '@app/app/machine/machine.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class DowntimeReasonMachineService extends TypeOrmCrudService<DowntimeReasonMachine>{
    constructor(@InjectRepository(DowntimeReasonMachine) repo, @InjectRepository(DowntimeReasonMachine) private readonly downtimeReasonMachineRepository: Repository<DowntimeReasonMachine>) {
      super(repo)
    }

    public async findAll(): Promise<DowntimeReasonMachine[]> {
        return await this.downtimeReasonMachineRepository.find({
            relations : ['machine', 'downtime_category', 'downtime_reason'],
            where : {
                "id" : 2
            }
        });
    }

    public async findSomeDowntimeReason(params: DowntimeReasonMachineCmd): Promise<DowntimeReasonMachine[]> {
        let downtimeReasonMachine: DowntimeReasonMachine[];
        try {
            // const downtimeReasonMachine = await createQueryBuilder("downtime_reason_machine")
            //                     .innerJoin("downtime_reason_machine.machine", "machine")
            //                     // .where("machineId = 1")
            //                     .getMany();
            downtimeReasonMachine = await this.downtimeReasonMachineRepository
                                .query('select * from downtime_reason_machine a, machine b, downtime_category c, downtime_reason d where a.machineId = b.id and a.downtimeCategoryId = c.id and a.downtimeReasonId = d.id and b.id = ?', [params.machine_id]);
        } catch (error) {}
        if (!downtimeReasonMachine) {
          throw new NotFoundException(`downtimeReasonMachine with ${JSON.stringify(params)} does not exist`);
        }
        return downtimeReasonMachine;
    }
    
    public async create(downtimeReasonMachine: DowntimeReasonMachine): Promise<DowntimeReasonMachine> {
      try {
        return await this.downtimeReasonMachineRepository.save(downtimeReasonMachine);
      } catch (error) {
        throw new BadRequestException(error);
      }
    }
}
