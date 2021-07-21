import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Task } from 'src/tasks/task.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[]
  /**
   * eager: when set to true, it means that when we fetch the user from the db, we fetch all the tasks for that user as well
   */
}
