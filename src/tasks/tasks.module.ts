import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskRepository } from './task.respository'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}

/**
 * because the controller is defined in this module, adding the TaskService in our providers means that we are able to inject the service into our TaskController
 * the service is defined as a provider which makes it injectable, given that the service has the @Injectable decorator
 */
