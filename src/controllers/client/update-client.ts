import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { authenticator, requestValidator } from '../../middlewares';
import {
  createClient,
  updateClient,
} from '../../services/client/client-service';

const router = express.Router();

/**
 * @swagger
 * /api/v1/client/update-client/{clientId}:
 *  post:
 *      description: update a Client.
 *      security:
 *         - bearerAuth: []
 *      tags:
 *          - Client
 *      parameters:
 *          - in: path
 *            name: clientId
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *               type: object
 *               properties:
 *                    agencyId:
 *                      type: string
 *                    name:
 *                      type: string
 *                    email:
 *                      type: string
 *                    phoneNumber:
 *                      type: number
 *                    totalBill:
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
  '/api/v1/client/update-client/:clientId',
  [
    body('name')
      .optional()
      .isString()
      .withMessage('Name is required and mush be a non empty string'),
    body('email')
      .optional()
      .isEmail()
      .withMessage('Email is required and mush be a non empty string'),
    body('phoneNumber')
      .optional()
      .isMobilePhone('en-IN')
      .withMessage(
        'Phone number is required and mush be a valid mobile number'
      ),
    body('totalBill')
      .optional()
      .isNumeric()
      .withMessage('Total bill is required and mush be a number'),
    body('agencyId')
      .optional()
      .custom((input) => {
        if (!mongoose.isValidObjectId(input)) {
          throw new Error('Agency id is required and mush be a valid id');
        }
        return true;
      }),
  ],
  authenticator,
  requestValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const client = await updateClient(req, res, next);
    res.status(200).json(client);
  }
);

export { router as updateClientRoute };
