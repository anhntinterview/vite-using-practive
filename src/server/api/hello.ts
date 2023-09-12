'use strict';
import { Request, Response } from 'express';

/**
 * List of API examples.
 * @route GET /api
 */
export const greeting = async (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Hello World' });
};
