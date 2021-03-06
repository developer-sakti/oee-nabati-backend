import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RencanaProduksi } from './rencana-produksi.entity';
import { Repository, DeepPartial, DeleteResult } from 'typeorm';
import { RencanaProduksiCmd } from './cmd/rencana-produksi.command';
import { Utils } from '@app/shared/utils';
import { RencanaProduksiFindCmd } from './cmd/rencana-produksi-find.command';
import { RencanaProduksiCreateCmd } from './cmd/rencana-produksi-create.command';
import { RencanaProduksiWaitingListCmd } from './cmd/rencana-produksi-waiting-list.command';
import { RencanaProduksiFindShiftCmd } from './cmd/rencana-produksi-find-shift.command';
import { ReworkLineCmd } from '../rework-line/cmd/rework-line-request.command';
import { LakbanFinishgoodCmd } from '../lakban-finishgood/cmd/lakban-finishgood-request.command';
import { BadstockRequestCmd } from '../badstock-timbangan/cmd/badstock-request.command';
import { concat } from 'rxjs';
import { RencanaProduksiFindShiftDateCmd } from './cmd/rencana-produksi-find-shiftdate.command';
import { AnalysisTimePeriodicCmd } from '../analysis/cmd/analysis-time-periodic.command';
import { raw } from 'mysql';
import { Variable } from '@app/shared/variable';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class RencanaProduksiService extends TypeOrmCrudService<RencanaProduksi> {
  constructor(
    @InjectRepository(RencanaProduksi) repo,
    @InjectRepository(RencanaProduksi)
    private readonly rencanaProduksiRepository: Repository<RencanaProduksi>,
  ) {
    super(repo);
  }

  public async findAll(): Promise<RencanaProduksi[]> {
    return await this.rencanaProduksiRepository.find({
      relations: ['shift', 'line', 'sku', 'supervisor'],
    });
  }

  public async findById(id: number): Promise<any> {
    return await this.rencanaProduksiRepository.findOne({
      where: { id: id },
    });
  }

  public async delete(id: number): Promise<any> {
    try {
      const data = await this.rencanaProduksiRepository.findOne({
        where: { id: id },
      });
      return await this.rencanaProduksiRepository.remove(data);
    } catch (error) {
      return Utils.NULL_RETURN;
    }
  }

  public async findByPO(po: string): Promise<RencanaProduksi> {
    return await this.rencanaProduksiRepository.findOne({
      where: {
        po_number: po,
      },
    });
  }

  public async findActivePo(params: RencanaProduksiCmd): Promise<any> {
    let rencanaProduksi: RencanaProduksi;

    try {
      rencanaProduksi = await this.rencanaProduksiRepository
        .createQueryBuilder('rencana_produksi')
        .select(['rencana_produksi', 'shift', 'line', 'sku', 'supervisor'])
        .innerJoin('rencana_produksi.shift', 'shift')
        .innerJoin('rencana_produksi.line', 'line')
        .innerJoin('rencana_produksi.sku', 'sku')
        .innerJoin('rencana_produksi.supervisor', 'supervisor')
        .andWhere('rencana_produksi.date = :value1', { value1: params.date })
        .andWhere('rencana_produksi.start_po < :value2', { value2: params.time })
        .andWhere('rencana_produksi.end_po >= :value3', { value3: params.time })
        .andWhere('line.id = :value4', { value4: params.line_id })
        .andWhere('rencana_produksi.is_active = 1')
        .getOne();
    } catch (error) {}
    if (!rencanaProduksi) {
      return Utils.NULL_RETURN;
    }
    return rencanaProduksi;
  }

  public async findWaitingList(params: RencanaProduksiWaitingListCmd): Promise<any> {
    let rencanaProduksi: RencanaProduksi[];

    console.log(params.datetime);

    try {
      rencanaProduksi = await this.rencanaProduksiRepository
        .createQueryBuilder('rencana_produksi')
        .select(['rencana_produksi', 'shift', 'line', 'sku', 'supervisor'])
        .innerJoin('rencana_produksi.shift', 'shift')
        .innerJoin('rencana_produksi.line', 'line')
        .innerJoin('rencana_produksi.sku', 'sku')
        .innerJoin('rencana_produksi.supervisor', 'supervisor')
        .andWhere('rencana_produksi.date_startpo >= :value1', { value1: params.datetime })
        .andWhere('line.id = :value2', { value2: params.lineId })
        .getMany();
    } catch (error) {}
    if (!rencanaProduksi) {
      return Utils.NULL_RETURN;
    }
    return rencanaProduksi;
  }

  public async getProductivity(): Promise<any> {
    let rencanaProduksi;
    let rawQuery =
      'SELECT DATE_FORMAT(oee_shift.date, "%Y-%m-%d") as date,' +
      ' SUM(oee_shift.total_target_produksi) as total_target_produksi' +
      ' FROM oee_shift' +
      ' WHERE oee_shift.date < NOW()' +
      ' GROUP BY DATE(oee_shift.date)' +
      ' LIMIT 7';

    try {
      rencanaProduksi = await this.rencanaProduksiRepository.query(rawQuery);
    } catch (error) {}
    if (!rencanaProduksi) {
      return Utils.NULL_RETURN;
    }
    return rencanaProduksi;
  }

  public async findByLineDate(params: RencanaProduksiFindCmd): Promise<any> {
    let rencanaProduksi: RencanaProduksi[];

    try {
      if (params.line_id === null || params.line_id === undefined) {
        rencanaProduksi = await this.rencanaProduksiRepository
          .createQueryBuilder('rencana_produksi')
          .select(['rencana_produksi', 'shift', 'line', 'sku', 'supervisor'])
          .innerJoin('rencana_produksi.shift', 'shift')
          .innerJoin('rencana_produksi.line', 'line')
          .innerJoin('rencana_produksi.sku', 'sku')
          .innerJoin('rencana_produksi.supervisor', 'supervisor')
          .andWhere('rencana_produksi.date = :value1', { value1: params.date })
          .getMany();
      } else {
        rencanaProduksi = await this.rencanaProduksiRepository
          .createQueryBuilder('rencana_produksi')
          .select(['rencana_produksi', 'shift', 'line', 'sku', 'supervisor'])
          .innerJoin('rencana_produksi.shift', 'shift')
          .innerJoin('rencana_produksi.line', 'line')
          .innerJoin('rencana_produksi.sku', 'sku')
          .innerJoin('rencana_produksi.supervisor', 'supervisor')
          .andWhere('rencana_produksi.date = :value1', { value1: params.date })
          .andWhere('line.id = :value4', { value4: params.line_id })
          .getMany();
      }
    } catch (error) {}
    if (!rencanaProduksi) {
      return Utils.EMPTY_ARRAY_RETURN;
    }
    return rencanaProduksi;
  }

  public async findByLineDateShift(
    params: RencanaProduksiFindShiftCmd,
  ): Promise<RencanaProduksi[]> {
    let rencanaProduksi: RencanaProduksi[];

    try {
      if (params.line_id === null || params.line_id === undefined) {
        rencanaProduksi = await this.rencanaProduksiRepository
          .createQueryBuilder('rencana_produksi')
          .select(['rencana_produksi', 'shift', 'line', 'sku', 'supervisor'])
          .innerJoin('rencana_produksi.shift', 'shift')
          .innerJoin('rencana_produksi.line', 'line')
          .innerJoin('rencana_produksi.sku', 'sku')
          .innerJoin('rencana_produksi.supervisor', 'supervisor')
          .andWhere('rencana_produksi.date = :value1', { value1: params.date })
          .andWhere('shift.id = :value2', { value2: params.shift_id })
          .getMany();
      } else {
        rencanaProduksi = await this.rencanaProduksiRepository
          .createQueryBuilder('rencana_produksi')
          .select(['rencana_produksi', 'shift', 'line', 'sku', 'supervisor'])
          .innerJoin('rencana_produksi.shift', 'shift')
          .innerJoin('rencana_produksi.line', 'line')
          .innerJoin('rencana_produksi.sku', 'sku')
          .innerJoin('rencana_produksi.supervisor', 'supervisor')
          .andWhere('rencana_produksi.date = :value1', { value1: params.date })
          .andWhere('line.id = :value4', { value4: params.line_id })
          .andWhere('shift.id = :value2', { value2: params.shift_id })
          .getMany();
      }
    } catch (error) {}
    if (!rencanaProduksi) {
      return Utils.EMPTY_ARRAY_RETURN;
    }
    return rencanaProduksi;
  }

  public async findByDateShift(
    params: RencanaProduksiFindShiftDateCmd,
  ): Promise<RencanaProduksi[]> {
    let rencanaProduksi: RencanaProduksi[];

    try {
      rencanaProduksi = await this.rencanaProduksiRepository
        .createQueryBuilder('rencana_produksi')
        .select(['rencana_produksi', 'shift', 'line', 'sku', 'supervisor'])
        .innerJoin('rencana_produksi.shift', 'shift')
        .innerJoin('rencana_produksi.line', 'line')
        .innerJoin('rencana_produksi.sku', 'sku')
        .innerJoin('rencana_produksi.supervisor', 'supervisor')
        .andWhere('rencana_produksi.date = :value1', { value1: params.date })
        .andWhere('shift.id = :value2', { value2: params.shiftId })
        .getMany();
    } catch (error) {}
    if (!rencanaProduksi) {
      return Utils.EMPTY_ARRAY_RETURN;
    }
    return rencanaProduksi;
  }

  public async findByTimePeriodic(params: AnalysisTimePeriodicCmd): Promise<any> {
    let data: any;
    let rawQuery: string;

    if (params.time_periodic === Variable.TIME_PERIODIC[0]) {
      rawQuery =
        "SELECT DATE_FORMAT(rencana_produksi.date, '%Y-%m-%d') as date," +
        ' SUM(rencana_produksi.target_produksi) AS target_produksi,' +
        ' SUM(rencana_produksi.b_finishgood_qty_karton) AS finish_good' +
        ' FROM rencana_produksi' +
        ' WHERE rencana_produksi.date >= ?' +
        ' AND rencana_produksi.date <= ?' +
        ' AND rencana_produksi.lineId = ?' +
        ' GROUP BY DATE(rencana_produksi.date)' +
        ' LIMIT 6';
    } else if (params.time_periodic === Variable.TIME_PERIODIC[1]) {
      rawQuery =
        'SELECT WEEK(rencana_produksi.date) as week,' +
        ' SUM(rencana_produksi.target_produksi) AS target_produksi,' +
        ' SUM(rencana_produksi.b_finishgood_qty_karton) AS finish_good' +
        ' FROM rencana_produksi' +
        ' WHERE rencana_produksi.date >= ?' +
        ' AND rencana_produksi.date <= ?' +
        ' AND rencana_produksi.lineId = ?' +
        ' GROUP BY WEEK(rencana_produksi.date)' +
        ' LIMIT 6';
    } else if (params.time_periodic === Variable.TIME_PERIODIC[2]) {
      rawQuery =
        'SELECT MONTH(rencana_produksi.date) as month,' +
        ' SUM(rencana_produksi.target_produksi) AS target_produksi,' +
        ' SUM(rencana_produksi.b_finishgood_qty_karton) AS finish_good' +
        ' FROM rencana_produksi' +
        ' WHERE rencana_produksi.date >= ?' +
        ' AND rencana_produksi.date <= ?' +
        ' AND rencana_produksi.lineId = ?' +
        ' GROUP BY MONTH(rencana_produksi.date)' +
        ' LIMIT 6';
    } else if (params.time_periodic === Variable.TIME_PERIODIC[3]) {
      rawQuery =
        'SELECT YEAR(rencana_produksi.date) as year,' +
        ' SUM(rencana_produksi.target_produksi) AS target_produksi,' +
        ' SUM(rencana_produksi.b_finishgood_qty_karton) AS finish_good' +
        ' FROM rencana_produksi' +
        ' WHERE rencana_produksi.date >= ?' +
        ' AND rencana_produksi.date <= ?' +
        ' AND rencana_produksi.lineId = ?' +
        ' GROUP BY YEAR(rencana_produksi.date)' +
        ' LIMIT 6';
    } else {
      rawQuery =
        "SELECT DATE_FORMAT(a.date, '%Y-%m-%d') as date," +
        ' b.shift_name as shift_name,' +
        ' a.target_produksi AS target_produksi, ' +
        ' a.b_finishgood_qty_karton AS finish_good' +
        ' FROM rencana_produksi a, initial_shift b' +
        ' WHERE a.shiftId = b.id' +
        ' AND a.date >= ?' +
        ' AND a.date <= ?' +
        ' AND a.lineId = ?' +
        ' LIMIT 10';
    }

    try {
      data = await this.rencanaProduksiRepository.query(rawQuery, [
        params.from_date,
        params.to_date,
        params.line_id,
      ]);
    } catch (error) {}

    if (!data) {
      console.log('Query error');
      return Utils.EMPTY_ARRAY_RETURN;
    }

    return data;
  }

  public async getStatisticTimePeriodic(params: AnalysisTimePeriodicCmd): Promise<any> {
    let data: any;
    let rawQuery =
      'SELECT CAST(SUM(rencana_produksi.b_finishgood_qty_karton) /' +
      ' SUM(rencana_produksi.target_produksi) * 100 AS DECIMAL(10, 2)) AS percentage_success' +
      ' FROM rencana_produksi' +
      ' WHERE rencana_produksi.date >= ?' +
      ' AND rencana_produksi.date <= ?' +
      ' AND rencana_produksi.lineId = ?';

    try {
      data = await this.rencanaProduksiRepository.query(rawQuery, [
        params.from_date,
        params.to_date,
        params.line_id,
      ]);
    } catch (error) {}

    if (!data) {
      console.log('Query error');
      return Utils.EMPTY_ARRAY_RETURN;
    }

    return data;
  }

  public async create(rencanaProduksi: RencanaProduksiCreateCmd): Promise<RencanaProduksi> {
    try {
      let po = null;
      let date_startpo = rencanaProduksi.date.concat(' ').concat(rencanaProduksi.start_po);

      if (rencanaProduksi.start_po < '06:00:00') {
        let date = new Date(date_startpo);
        let tomorrow_after_date = new Date(date);

        tomorrow_after_date.setDate(date.getDate() + 1);
        date_startpo = tomorrow_after_date.toLocaleDateString();
      }

      try {
        po = await this.rencanaProduksiRepository.find;
      } catch (error) {
        throw new BadRequestException('Error');
      }

      if (po !== null) console.log('PO = ' + po.po_number);
      else console.log('PO = null');

      console.log('date PO = ' + date_startpo);

      rencanaProduksi.date_startpo = date_startpo;
      return await this.rencanaProduksiRepository.save(rencanaProduksi);
    } catch (error) {
      return Utils.NULL_RETURN;
    }
  }

  public async updateDefectBadstock(
    params: DeepPartial<BadstockRequestCmd>,
  ): Promise<RencanaProduksi> {
    try {
      let po = await this.rencanaProduksiRepository.findOne(params.rencanaProduksiId);
      po.d_defect_qty_karton += params.weight_kg;
      po.q_defect_losses = po.d_defect_qty_karton * po.standart_ct;
      po.q_total_quality_losses = po.q_rework_losses + po.q_defect_losses;

      return await this.rencanaProduksiRepository.save(po);
    } catch (error) {
      return Utils.NULL_RETURN;
    }
  }

  public async updateIsActive(id: number): Promise<any> {
    try {
      let po = await this.rencanaProduksiRepository.findOne(id);

      if (po.is_active == 0) po.is_active = 1;
      else po.is_active = 0;

      const update = await this.rencanaProduksiRepository.save(po);
      if (update) return Utils.sendResponseUpdateSuccess(update);
    } catch (error) {
      return Utils.sendResponseUpdateFailed('is active PO');
    }
  }

  public async updateRework(params: DeepPartial<ReworkLineCmd>): Promise<RencanaProduksi> {
    try {
      let po = await this.rencanaProduksiRepository.findOne(params.rencanaProduksiId);
      po.e_rework_qty_karton += params.total;
      po.q_rework_losses = po.e_rework_qty_karton * po.standart_ct;
      po.q_total_quality_losses = po.q_rework_losses + po.q_defect_losses;

      return await this.rencanaProduksiRepository.save(po);
    } catch (error) {
      return Utils.NULL_RETURN;
    }
  }

  public async updateFinishgood(
    params: DeepPartial<LakbanFinishgoodCmd>,
  ): Promise<RencanaProduksi> {
    try {
      let po = await this.rencanaProduksiRepository.findOne(params.rencanaProduksiId);
      po.b_finishgood_qty_karton = params.total;

      return await this.rencanaProduksiRepository.save(po);
    } catch (error) {
      return Utils.NULL_RETURN;
    }
  }

  public async minFinishgood(params: DeepPartial<LakbanFinishgoodCmd>): Promise<RencanaProduksi> {
    try {
      let po = await this.rencanaProduksiRepository.findOne(params.rencanaProduksiId);
      po.b_finishgood_qty_karton = po.b_finishgood_qty_karton - params.total;

      return await this.rencanaProduksiRepository.save(po);
    } catch (error) {
      return Utils.NULL_RETURN;
    }
  }
}
