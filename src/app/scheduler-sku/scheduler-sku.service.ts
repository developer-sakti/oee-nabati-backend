import { Injectable } from '@nestjs/common';
import { NestSchedule, Cron } from 'nest-schedule';

@Injectable()
export class SchedulerSkuService extends NestSchedule {
  @Cron('10 41 * * * *', {
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  })
  async cronJob() {
    console.log('Test cron');
  }
}
