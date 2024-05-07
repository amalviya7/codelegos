import { Request, Response, NextFunction } from 'express';

/**
 *
 /**
 * Handle GET request to get examples
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Next function
 */
export function exampleMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('Example middleware executed');
  next();
}
