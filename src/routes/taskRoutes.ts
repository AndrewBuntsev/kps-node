import { Router } from 'express';
import * as taskController from '../controllers/taskController';

const router = Router();

// TODO: Define your routes here based on the requirements

// GET /api/tasks - Get all tasks (with query params for filtering)
router.get('/tasks', taskController.getAllTasks);

// TODO: Implement this route when ready
// GET /api/tasks/:taskId - Get task by ID
// router.get('/tasks/:taskId', taskController.getTaskById);

// POST /api/tasks - Create new task
router.post('/tasks', taskController.createTask);

// TODO: Implement this route when ready
// PUT /api/tasks/:taskId - Update task by ID
// router.put('/tasks/:taskId', taskController.updateTask);

// TODO: Implement this route when ready
// DELETE /api/tasks/:taskId - Delete task by ID
// router.delete('/tasks/:taskId', taskController.deleteTask);

// Test helper endpoint - only for clearing test data
if (process.env.NODE_ENV === 'test') {
  router.delete('/tasks/test-clear-all', async (req, res) => {
    const { TaskService } = await import('../services/taskService');
    await TaskService.clearAllTasks();
    res.status(204).send();
  });
}

export { router as taskRoutes }; 