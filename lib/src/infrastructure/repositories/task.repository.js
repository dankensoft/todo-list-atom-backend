"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const firestore_1 = require("../firestore");
class TaskRepository {
    async getAllByUser(userId) {
        const snapshot = await firestore_1.tasksRef.where('userId', '==', userId).orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
    }
    async create(taskDto) {
        const now = new Date().toISOString();
        const docRef = await firestore_1.tasksRef.add(Object.assign(Object.assign({}, taskDto), { createdAt: now, completed: false }));
        return Object.assign(Object.assign({ id: docRef.id }, taskDto), { createdAt: now, completed: false });
    }
    async update(taskId, data) {
        await firestore_1.tasksRef.doc(taskId).update(data);
    }
    async delete(taskId) {
        await firestore_1.tasksRef.doc(taskId).delete();
    }
}
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=task.repository.js.map