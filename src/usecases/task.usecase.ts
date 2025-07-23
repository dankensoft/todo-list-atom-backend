import { TaskRepository } from '../infrastructure/repositories/task.repository';
import { CreateTaskDTO } from '../domain/dtos/create-task.dto';
import { Task } from '../domain/entities/task.entity';

const taskRepo = new TaskRepository();

export class TaskUseCase {
  async getTasksByUser(userId: string): Promise<Task[]> {
    return await taskRepo.getAllByUser(userId);
  }

  async createTask(dto: CreateTaskDTO): Promise<Task> {
    return await taskRepo.create(dto);
  }

  async updateTask(taskId: string, data: Partial<Task>): Promise<void> {
    return await taskRepo.update(taskId, data);
  }

  async deleteTask(taskId: string): Promise<void> {
    return await taskRepo.delete(taskId);
  }
}
