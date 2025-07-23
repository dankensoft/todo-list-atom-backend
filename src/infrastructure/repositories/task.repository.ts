import { tasksRef } from '../firestore';
import { Task } from '../../domain/entities/task.entity';
import { CreateTaskDTO } from '../../domain/dtos/create-task.dto';

export class TaskRepository {
  async getAllByUser(userId: string): Promise<Task[]> {
    const snapshot = await tasksRef.where('userId', '==', userId).orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
  }

  async create(taskDto: CreateTaskDTO): Promise<Task> {
    const now = new Date().toISOString();
    const docRef = await tasksRef.add({ ...taskDto, createdAt: now, completed: false });
    return { id: docRef.id, ...taskDto, createdAt: now, completed: false };
  }

  async update(taskId: string, data: Partial<Task>): Promise<void> {
    await tasksRef.doc(taskId).update(data);
  }

  async delete(taskId: string): Promise<void> {
    await tasksRef.doc(taskId).delete();
  }
}
