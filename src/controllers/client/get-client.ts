import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { authenticator } from '../../middlewares';
import { getApiKey } from '../../services/apiKey/apiKeyService';
import { getAllClients, getClient } from '../../services/client/client-service';

const router = express.Router();

/**
 * @swagger
 * /api/v1/client/getClinet:
 *  get:
 *   description: get all client details
 *   tags:
 *    - Client
 *   responses:
 *    '200':
 *      description: Successfully retrieved API key
 *    '400':
 *      description: Bad request
 *    '404':
 *      description: User not found
 */
router.get(
  '/api/v1/client/getClinet',
  authenticator,
  async (req: Request, res: Response, next: NextFunction) => {
    const clients = await getAllClients(req, res, next);
    res.status(200).json({ clients });
  }
);

export { router as getAllClientsRouter };
