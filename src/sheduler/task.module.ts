import { Module } from '@nestjs/common';
import { TasksService } from './task.sheduler';

@Module({
  providers: [TasksService],
})
export class TaskSchedulerModule {}
