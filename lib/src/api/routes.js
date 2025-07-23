"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const user_usecase_1 = require("../usecases/user.usecase");
const task_usecase_1 = require("../usecases/task.usecase");
const admin = __importStar(require("firebase-admin"));
const router = express.Router();
const userUseCase = new user_usecase_1.UserUseCase();
const taskUseCase = new task_usecase_1.TaskUseCase();
// MIDDLEWARE DE AUTENTICACIÓN CON FIREBASE
async function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const idToken = authHeader.split('Bearer ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    return;
}
// RUTAS PROTEGIDAS
router.get('/tasks', authenticate, async (req, res) => {
    const userId = req.user.uid;
    try {
        const tasks = await taskUseCase.getTasksByUser(userId);
        return res.json(tasks);
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});
router.post('/tasks', authenticate, async (req, res) => {
    const userId = req.user.uid;
    const { title, description } = req.body;
    if (!title)
        return res.status(400).json({ error: 'Title is required' });
    try {
        const task = await taskUseCase.createTask({ title, description, userId });
        return res.json(task);
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to create task' });
    }
});
router.put('/tasks/:id', authenticate, async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.uid;
    const data = req.body;
    try {
        await taskUseCase.updateTask(taskId, Object.assign(Object.assign({}, data), { userId }));
        res.json({ message: 'Task updated' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});
router.delete('/tasks/:id', authenticate, async (req, res) => {
    const taskId = req.params.id;
    try {
        await taskUseCase.deleteTask(taskId);
        res.json({ message: 'Task deleted' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});
// RUTA DE USUARIO
router.post('/user', async (req, res) => {
    const { email } = req.body;
    if (!email)
        return res.status(400).json({ error: 'Email is required' });
    try {
        const user = await userUseCase.findOrCreateUser(email);
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json({ error: 'Error finding/creating user' });
    }
});
exports.default = router;
//# sourceMappingURL=routes.js.map