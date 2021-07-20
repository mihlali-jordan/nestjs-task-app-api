import { Injectable, NotFoundException } from '@nestjs/common'
import { TaskStatus } from './task-status.enum'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { TaskRepository } from './task.respository'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './task.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto)
  }

  async getTaskById(id: string): Promise<Task> {
    const foundTask = await this.tasksRepository.findOne(id)

    if (!foundTask) {
      throw new NotFoundException(`Task not found`)
    }

    return foundTask
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto)
  }

  async deleteTaskById(id: string): Promise<void> {
    const foundTask = await this.tasksRepository.delete(id)

    if (foundTask.affected === 0) {
      throw new NotFoundException(`Task not found`)
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id)
    task.status = status

    await this.tasksRepository.save(task)
    return task
  }
}
