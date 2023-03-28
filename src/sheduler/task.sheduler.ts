import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('* * * * *')
  handleCron() {
    this.logger.debug('Called every minute');
    // We can handle here a scheduled function
  }
}
