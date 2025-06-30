import { Request, Response, NextFunction } from 'express';
import { Task, CreateTaskRequest, TaskQueryParams, TaskStatus, TaskPriority } from '../types/task';
import { TaskService } from '../services/taskService';
import { validateCreateTask, validateTaskQuery } from '../validation/taskValidation';
import { createError } from '../middleware/errorHandler';

/**
 * Task Controller
 * 
 * TODO: Implement the controller methods for basic task operations
 * Remember to:
 * - Use proper TypeScript types
 * - Validate input data  
 * - Handle errors appropriately
 * - Return proper HTTP status codes
 * - Use the task service for business logic
 */

export const getAllTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const queryParams: TaskQueryParams = {
      status: req.query.status as TaskStatus,
      priority: req.query.priority as TaskPriority
    };

    const { error, value } = validateTaskQuery(queryParams);
    if (error) {
      next(createError(error.message, 400));
      return;
    }

    const tasks: Task[] = await TaskService.getAllTasks(value);

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const taskData: CreateTaskRequest = req.body;
    const { error, value } = validateCreateTask(taskData);
    if (error) {
      next(createError(error.message, 400));
      return;
    }

    const newTask: Task = await TaskService.createTask(value);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
}; 