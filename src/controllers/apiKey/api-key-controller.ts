import express, { Request, Response, NextFunction } from 'express';
import { getApiKey } from '../../services/apiKey/apiKeyService';

const router = express.Router();

/**
 * @swagger
 * /api/v1/apiKey/getApiKey/{userId}:
 *  get:
 *   description: Get API key for a user(userId - "62ea07432eac2a65e638dc93"). Use this api key to authorise requests to the protected API
 *   tags:
 *    - ApiKey
 *   parameters:
 *      - in: path
 *        name: userId
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
  '/api/v1/apiKey/getApiKey/:userId',
  async (req: Request, res: Response, next: NextFunction) => {
    const token = await getApiKey(req, res, next);
    res.status(200).json({ token });
  }
);

export { router as apiKeyRouter };
