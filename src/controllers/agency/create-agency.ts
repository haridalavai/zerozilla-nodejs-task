import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { authenticator, requestValidator } from '../../middlewares';
import { createAgency } from '../../services/agency/agency-service';

const router = express.Router();

/**
 * @swagger
 * /api/v1/agency/create-agency:
 *  post:
 *      description: Create a new agency.
 *      security:
 *         - bearerAuth: []
 *      tags:
 *          - Agency
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *               type: object
 *               properties:
 *                    name:
 *                      type: string
 *                    address1:
 *                      type: string
 *                    address2:
 *                      type: string
 *                    city:
 *                      type: string
 *                    state:
 *                      type: string
 *                    phoneNumber:
 *                      type: number
 *
 *      responses:
 *          '200':
 *              description: Successfully created agency
 *          '400':
 *              description: Bad request
 *          '401':
 *              description: Unauthorised
 */
router.post(
  '/api/v1/agency/create-agency',
  [
    body('name')
      .not()
      .isEmpty()
      .isString()
      .withMessage('Name is required and mush be a non empty string'),
    body('address1')
      .not()
      .isEmpty()
      .isString()
      .withMessage('Address is required and mush be a non empty string'),
    body('city')
      .not()
      .isEmpty()
      .isString()
      .withMessage('City is required and mush be a non empty string'),
    body('state')
      .not()
      .isEmpty()
      .withMessage('State is required and mush be a non empty string'),
    body('phoneNumber')
      .not()
      .isEmpty()
      .isMobilePhone('any')
      .withMessage('Phone number is required and must be a valid phone number'),
  ],
  authenticator,
  requestValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const agency = await createAgency(req);
    res.status(200).json(agency);
  }
);

export { router as createAgencyRouter };
