import Joi from 'joi';

/**
 * Task Validation Schemas
 */

export const createTaskSchema = Joi.object({
  title: Joi.string().max(100).required().messages({
    'string.required': 'Title is required',
    'string.max': 'Title length cannot exceed 100 characters'
  }),
  description: Joi.string().max(500).optional().messages({
    'string.max': 'Description length cannot exceed 500 characters'
  }),
  priority: Joi.string().valid('low', 'medium', 'high').required().messages({
    'any.required': 'Priority is required',
    'any.only': 'Priority must be one of low, medium, or high'
  }),
  dueDate: Joi.date().greater('now').optional().messages({
    'date.base': 'Due date must be a valid date',
    'date.greater': 'Due date must be in the future'
  }),
}).unknown(false); // Reject unknown fields

export const taskQuerySchema = Joi.object({
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional().messages({
    'any.only': 'Status must be one of pending, in-progress, or completed'
  }),
  priority: Joi.string().valid('low', 'medium', 'high').optional().messages({
    'any.only': 'Priority must be one of low, medium, or high'
  }),
}).unknown(false); // Reject unknown query params


// Validation helper functions
export const validateCreateTask = (data: unknown) => {
  return createTaskSchema.validate(data);
};

export const validateTaskQuery = (data: unknown) => {
  return taskQuerySchema.validate(data);
}; 