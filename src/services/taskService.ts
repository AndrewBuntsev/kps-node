import { v4 as uuidv4 } from 'uuid';
import { Task, CreateTaskRequest, TaskQueryParams } from '../types/task';
import { createError } from '../middleware/errorHandler';

/**
 * Task Service - Business Logic Layer
 * 
 * This service manages the in-memory task storage and business logic.
 * In a real application, this would interface with a database.
 */

// In-memory storage (for this interview - normally you'd use a database)
const tasks: Task[] = [];

export class TaskService {
  
  static async getAllTasks(queryParams?: TaskQueryParams): Promise<Task[]> {
    let result = tasks;

    // Filter by status
    if (queryParams?.status) {
      result = result.filter(task => task.status === queryParams.status);
    }

    // Filter by priority
    if (queryParams?.priority) {
      result = result.filter(task => task.priority === queryParams.priority);
    }

    // Sort by priority then by createdAt
    result.sort((task1, task2) => {
      const statusMap: Record<string, number> = {
        'low': 1,
        'medium': 2,
        'high': 3
      };
      if (statusMap[task1.priority] > statusMap[task2.priority]) return -1;
      if (statusMap[task1.priority] < statusMap[task2.priority]) return 1;
      return task1.createdAt.getTime() - task2.createdAt.getTime();
    });
    
    return result;
  }

  static async getTaskByTitle(title: string): Promise<Task | undefined> {
    return tasks.find(task => task.title === title);
  }

  static async createTask(taskData: CreateTaskRequest): Promise<Task> {
    // Validate for title duplication
    if (await TaskService.getTaskByTitle(taskData.title)) {
      throw createError(`A task with the title '${taskData.title}' already exists`, 409);
    }
    
    const newTask: Task = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: taskData.dueDate
    };

    tasks.push(newTask);

    return newTask;
  }

  

  // Test helper method - clears all tasks for testing
  static async clearAllTasks(): Promise<void> {
    tasks.length = 0;
  }
} 