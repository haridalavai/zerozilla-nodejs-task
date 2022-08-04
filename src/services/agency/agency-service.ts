import { NextFunction, Request, Response } from 'express';
import { Agency } from '../../models/agency';

const createAgency = async (req: Request) => {
  const { name, address1, address2, city, state, phoneNumber } = req.body;
  const agency = Agency.build({
    name,
    address1,
    address2,
    city,
    state,
    phoneNumber,
  });
  await agency.save();
  return agency;
};

const getAllAgencies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const agencies = await Agency.find({});
  return agencies;
};

const getAgency = async (req: Request, res: Response, next: NextFunction) => {
  const agencyId = req.params.agencyId;
  const agency = await Agency.findById(agencyId);
  return agency;
};
export { createAgency, getAllAgencies, getAgency };
