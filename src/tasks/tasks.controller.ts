import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { UpdateTaskStatusDto } from './dto/update-task-status.dto'
import { Task, TaskStatus } from './task.model'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  // inject TaskService into the controller
  constructor(private tasksService: TasksService) {}

  // Expose get method under the tasks route
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    // if we have any filters defined, call taskService.getTasksWithFilters otherwise call just call getAllTasks
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto)
    } else {
      return this.tasksService.getAllTasks()
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id)
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto
    return this.tasksService.updateTaskStatus(id, status)
  }
}
