import { Injectable, NotFoundException } from '@nestjs/common'
import { TaskStatus } from './task-status.enum'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { TaskRepository } from './task.respository'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './task.entity'
import { User } from 'src/auth/user.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user)
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const foundTask = await this.tasksRepository.findOne({
      where: { id, user },
    })

    if (!foundTask) {
      throw new NotFoundException(`Task not found`)
    }

    return foundTask
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user)
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const foundTask = await this.tasksRepository.delete({ id, user })

    if (foundTask.affected === 0) {
      throw new NotFoundException(`Task not found`)
    }
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user)
    task.status = status

    await this.tasksRepository.save(task)
    return task
  }
}
