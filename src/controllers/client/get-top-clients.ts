import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { authenticator } from '../../middlewares';
import { getApiKey } from '../../services/apiKey/apiKeyService';
import {
  getAllClients,
  getClient,
  getTopClients,
} from '../../services/client/client-service';

const router = express.Router();

/**
 * @swagger
 * /api/v1/client/getTopClinet/{agencyId}:
 *  get:
 *   description: get top client for the agency
 *   tags:
 *    - Client
 *   parameters:
 *     - in: path
 *       name: agencyId
 *       required: true
 *   responses:
 *    '200':
 *      description: Successfully retrieved API key
 *    '400':
 *      description: Bad request
 *    '404':
 *      description: User not found
 */
router.get(
  '/api/v1/client/getTopClinet/:agencyId',
  authenticator,
  async (req: Request, res: Response, next: NextFunction) => {
    const topClient = await getTopClients(req, res, next);
    res.status(200).json({ topClient });
  }
);

export { router as getTopClients };
