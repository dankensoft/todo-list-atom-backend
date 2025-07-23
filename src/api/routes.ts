import * as express from 'express';
import { UserUseCase } from '../usecases/user.usecase';
import { TaskUseCase } from '../usecases/task.usecase';
import * as admin from 'firebase-admin';

const router = express.Router();
const userUseCase = new UserUseCase();
const taskUseCase = new TaskUseCase();

// MIDDLEWARE DE AUTENTICACIÓN CON FIREBASE
async function authenticate(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    (req as any).user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  return;
}

// RUTAS PROTEGIDAS
router.get('/tasks', authenticate, async (req, res) => {
  const userId = (req as any).user.uid;
  try {
    const tasks = await taskUseCase.getTasksByUser(userId);
    return res.json(tasks);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.post('/tasks', authenticate, async (req, res) => {
  const userId = (req as any).user.uid;
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  try {
    const task = await taskUseCase.createTask({ title, description, userId });
    return res.json(task);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create task' });
  }
});

router.put('/tasks/:id', authenticate, async (req, res) => {
  const taskId = req.params.id;
  const userId = (req as any).user.uid;
  const data = req.body;
  try {
    await taskUseCase.updateTask(taskId, { ...data, userId });
    res.json({ message: 'Task updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

router.delete('/tasks/:id', authenticate, async (req, res) => {
  const taskId = req.params.id;
  try {
    await taskUseCase.deleteTask(taskId);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// RUTA DE USUARIO
router.post('/user', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  try {
    const user = await userUseCase.findOrCreateUser(email);
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Error finding/creating user' });
  }
});

export default router;
