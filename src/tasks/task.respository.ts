import { EntityRepository, Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { TaskStatus } from './task-status.enum'
import { Task } from './task.entity'

// To make this a repository typeorm can work with, we decorate it
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    })

    await this.save(task)
    return task
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto
    const query = this.createQueryBuilder('task')

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      )
    }

    const tasks = await query.getMany()
    return tasks
  }
}
