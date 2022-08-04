import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { authenticator } from '../../middlewares';
import { getApiKey } from '../../services/apiKey/apiKeyService';
import {
  getAllClients,
  getClient,
  getTopClient,
  getTopClients,
} from '../../services/client/client-service';

const router = express.Router();

/**
 * @swagger
 * /api/v1/client/getTopClinet:
 *  get:
 *   description: get top client for the agency
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
  '/api/v1/client/getTopClinet',
  authenticator,
  async (req: Request, res: Response, next: NextFunction) => {
    const topClient: any = await getTopClient(req, res, next);
    res.status(200).json({
      agencyName: topClient[0].agency[0].name,
      clientName: topClient[0].name,
      totalBill: topClient[0].totalBill,
    });
  }
);

export { router as getTopClient };
