"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskUseCase = void 0;
const task_repository_1 = require("../infrastructure/repositories/task.repository");
const taskRepo = new task_repository_1.TaskRepository();
class TaskUseCase {
    async getTasksByUser(userId) {
        return await taskRepo.getAllByUser(userId);
    }
    async createTask(dto) {
        return await taskRepo.create(dto);
    }
    async updateTask(taskId, data) {
        return await taskRepo.update(taskId, data);
    }
    async deleteTask(taskId) {
        return await taskRepo.delete(taskId);
    }
}
exports.TaskUseCase = TaskUseCase;
//# sourceMappingURL=task.usecase.js.map