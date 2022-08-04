import express, { Request, Response, NextFunction } from 'express';
import { authenticator } from '../../middlewares';
import { getAgency } from '../../services/agency/agency-service';

const router = express.Router();

/**
 * @swagger
 * /api/v1/agency/getAgency/{agencyId}:
 *  get:
 *   description: get all agency details
 *   tags:
 *    - Agency
 *   parameters:
 *     - in: path
 *       name: agencyId
 *       required: true
 *       schema:
 *           type: string
 *   responses:
 *    '200':
 *      description: Successfully retrieved API key
 *    '400':
 *      description: Bad request
 *    '404':
 *      description: User not found
 */
router.get(
  '/api/v1/agency/getAgency/:agencyId',
  authenticator,
  async (req: Request, res: Response, next: NextFunction) => {
    const agencies = await getAgency(req, res, next);
    res.status(200).json({ agencies });
  }
);

export { router as getAgencyRouter };
