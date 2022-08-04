import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { authenticator } from '../../middlewares';
import { getApiKey } from '../../services/apiKey/apiKeyService';
import { getClient } from '../../services/client/client-service';

const router = express.Router();

/**
 * @swagger
 * /api/v1/client/getClinet/{clientId}:
 *  get:
 *   description: get client details
 *   tags:
 *    - Client
 *   parameters:
 *      - in: path
 *        name: clientId
 *        required: true
 *        schema:
 *            type: string
 *   responses:
 *    '200':
 *      description: Successfully retrieved API key
 *    '400':
 *      description: Bad request
 *    '404':
 *      description: User not found
 */
router.get(
  '/api/v1/client/getClinet/:clientId',
  authenticator,
  async (req: Request, res: Response, next: NextFunction) => {
    const client = await getClient(req, res, next);
    res.status(200).json({ client });
  }
);

export { router as getClientRouter };
