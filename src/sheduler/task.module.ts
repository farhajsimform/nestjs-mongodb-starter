import { Module } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { TasksService } from './task.sheduler';

@Module({
  providers: [TasksService, FileService],
})
export class TaskSchedulerModule {}
