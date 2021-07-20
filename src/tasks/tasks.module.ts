import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}

/**
 * because the controller is defined in this module, adding the TaskService in our providers means that we are able to inject the service into our TaskController
 * the service is defined as a provider which makes it injectable, given that the service has the @Injectable decorator
 */
