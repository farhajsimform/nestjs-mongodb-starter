import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FileService } from 'src/file/file.service';

@Injectable()
export class TasksService {
  constructor(private file: FileService) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron('@daily')
  handleCron() {
    this.logger.debug('Called daily');
    this.file.saveFile();
  }
}
