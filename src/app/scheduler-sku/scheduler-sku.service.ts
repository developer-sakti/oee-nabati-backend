import { Injectable, HttpService, Req } from '@nestjs/common';
import { NestSchedule, Cron } from 'nest-schedule';
import { InitialSkuService } from '../initial-sku/initial-sku.service';
import { response } from 'express';
import { map } from 'rxjs/operators';
import { Variable } from '@app/shared/variable';
import { ISku } from './interfaces/sku.interface';
import { AxiosResponse } from 'axios';
import { CrudRequest } from '@nestjsx/crud';
import { InitialSku } from '../initial-sku/initial-sku.entity';

@Injectable()
export class SchedulerSkuService extends NestSchedule {
  private products: ISku[];

  constructor(
    private readonly skuService: InitialSkuService,
    private readonly httpService: HttpService,
  ) {
    super();
  }

  @Cron('0 41 21 * * *', {
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  })
  async getSku() {
    const skuLists = await this.skuService.findAll();
    this.products = await this.getProducts();

    console.log(this.products);

    await Promise.all(
      this.products.map(async (product, i) => {
        const found = skuLists.some(sku => sku.sku === product.sku);

        console.log('Found same : ' + product.name);

        if (!found) {
          let newSku = new InitialSku({
            sku: product.sku,
            name: product.name,
            desc: product.desc,
          });

          if (product.attribute !== null) {
            newSku.product_id = product.attribute.product_id;
            newSku.gr = product.attribute.gr;
            newSku.bag = product.attribute.bag;
            newSku.pcs = product.attribute.pcs;
            newSku.bks = product.attribute.bks;
            newSku.berat_ctn = product.attribute.berat_ctn;
          }

          try {
            let save = await this.skuService.create(newSku);
            console.log('Saved !' + save.name);
          } catch (error) {
            console.log('Save failed !');
          }
        }
      }),
    );
  }

  async getProducts(): Promise<ISku[]> {
    const process = await this.httpService.get<ISku[]>(Variable.PRODUCTS_URL).toPromise();
    return process.data;
  }
}
