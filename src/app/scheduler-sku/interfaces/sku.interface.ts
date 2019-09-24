import { ISkuDetail } from './sku-detail.interface';

export class ISku {
  readonly id: number;
  readonly sku: string;
  readonly name: string;
  readonly desc: string;
  readonly created_at: string;
  readonly updated_at: string;
  readonly deleted_at: string;
  readonly user_id: number;
  readonly attribute: ISkuDetail;
}
