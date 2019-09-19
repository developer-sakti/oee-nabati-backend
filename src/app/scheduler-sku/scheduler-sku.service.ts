import { Injectable, HttpService } from '@nestjs/common';
import { NestSchedule, Cron } from 'nest-schedule';
import { InitialSkuService } from '../initial-sku/initial-sku.service';
import { response } from 'express';
import { map } from 'rxjs/operators';
import { Variable } from '@app/shared/variable';
import { ISku } from './interfaces/sku.interface';
import { AxiosResponse } from 'axios';

@Injectable()
export class SchedulerSkuService extends NestSchedule {
  private products: ISku[];

  constructor(
    private readonly skuService: InitialSkuService,
    private readonly httpService: HttpService,
  ) {
    super();
  }

  @Cron('0 0 1 * * *', {
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  })
  async cronJob() {
    this.products = await this.getProducts();
    console.log(this.products);
  }

  async getProducts(): Promise<ISku[]> {
    let process = await this.httpService.get<ISku[]>(Variable.PRODUCTS_URL).toPromise();
    return process.data;
  }
}
