import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DowntimeReasonMachine } from './downtime-reason-machine.entity';
import { Repository, createQueryBuilder } from 'typeorm';
import { DowntimeReasonMachineCmd } from './cmd/downtime-reason-machine.command';
import { Machine } from '@app/app/machine/machine.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Utils } from '@app/shared/utils';
import { DowntimeReasonMachineCreateCmd } from './cmd/downtime-reason-machine-create.command';

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
            downtimeReasonMachine = await this.downtimeReasonMachineRepository
                                .query('select a.*, b.name, c.category, d.reason from downtime_reason_machine a, machine b, downtime_category c, downtime_reason d where a.machineId = b.id and a.downtimeCategoryId = c.id and a.downtimeReasonId = d.id and b.id = ?', [params.machine_id]);
        } catch (error) {}
        if (!downtimeReasonMachine) {
          return Utils.NULL_RETURN;
        }
        return downtimeReasonMachine;
    }

    public async findDowntimeReasonByCategory(params: DowntimeReasonMachineCmd): Promise<DowntimeReasonMachine[]> {
        let downtimeReasonMachine: DowntimeReasonMachine[];
        try {
            downtimeReasonMachine = await this.downtimeReasonMachineRepository
                                .query('select a.*, b.name, c.category, d.reason from downtime_reason_machine a, machine b, downtime_category c, downtime_reason d where a.machineId = b.id and a.downtimeCategoryId = c.id and a.downtimeReasonId = d.id and c.id = ? and b.id = ?', [params.categori_id, params.machine_id]);
        } catch (error) {}
        if (!downtimeReasonMachine) {
          return Utils.NULL_RETURN;
        }
        return downtimeReasonMachine;
    }

    public async findAllDowntimeReason(): Promise<DowntimeReasonMachine[]> {
        let downtimeReasonMachine: DowntimeReasonMachine[];
        try {
            downtimeReasonMachine = await this.downtimeReasonMachineRepository
                                .query('select a.*, b.name, c.category, d.reason from downtime_reason_machine a, machine b, downtime_category c, downtime_reason d where a.machineId = b.id and a.downtimeCategoryId = c.id and a.downtimeReasonId = d.id');
        } catch (error) {}
        if (!downtimeReasonMachine) {
          return Utils.NULL_RETURN;
        }
        return downtimeReasonMachine;
    }
    
    public async create(downtimeReasonMachine: DowntimeReasonMachine): Promise<DowntimeReasonMachine> {
      try {
        return await this.downtimeReasonMachineRepository.save(downtimeReasonMachine);
      } catch (error) {
        return Utils.NULL_RETURN;
      }
    }
    
    public async update(id : number, downtimeReasonMachineCmd: DowntimeReasonMachineCreateCmd): Promise<any> {
      try {
        return await this.downtimeReasonMachineRepository.update({
          id : id
        }, {
          downtimeCategoryId : downtimeReasonMachineCmd.downtimeCategoryId,
          machineId : downtimeReasonMachineCmd.machineId
        });
      } catch (error) {
        return Utils.NULL_RETURN;
      }
    }
}
