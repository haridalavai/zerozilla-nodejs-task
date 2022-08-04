import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { BadRequestError } from '../../errors';
import { Client, ClientAttrs } from '../../models/client';

const createClient = async (req: Request) => {
  const { agencyId, name, email, phoneNumber, totalBill } = req.body;
  const client = Client.build({
    agencyId,
    name,
    email,
    phoneNumber,
    totalBill,
  });
  await client.save();
  return client;
};

const createMultipleClientsforAnAgency = async (
  clients: [
    {
      name: string;
      email: string;
      phoneNumber: number;
      totalBill: number;
    }
  ],
  agencyId: mongoose.Schema.Types.ObjectId
) => {
  const clientsArray: ClientAttrs[] = [];
  const clientPromise = clients.map(
    async ({ name, email, phoneNumber, totalBill }) => {
      const newClient = Client.build({
        agencyId,
        name,
        email,
        phoneNumber,
        totalBill,
      });
      await newClient.save();
      clientsArray.push(newClient);
    }
  );
  await Promise.all(clientPromise);
  return clientsArray;
};

const getClient = async (req: Request, res: Response, next: NextFunction) => {
  const clientId = req.params.clientId;

  if (!mongoose.isValidObjectId(clientId)) {
    throw new BadRequestError('Invalid client id');
  }

  const client = await Client.findById(clientId);
  return client;
};

const updateClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { clientId } = req.params;
  const updateObject = req.body;
  const client = await Client.findById(clientId);
  if (!client) {
    throw new BadRequestError('Invalid client id');
  }
  client.set(updateObject);
  await client.save();
  return client;
};

const getTopClients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const agencyId = req.params.agencyId;
  const topClients = await Client.aggregate([
    {
      $lookup: {
        from: 'agencies',
        localField: 'agencyId',
        foreignField: '_id',
        as: 'agency',
      },
    },
    {
      $sort: {
        totalBill: -1,
      },
    },
    {
      $match: {
        agencyId: new mongoose.mongo.ObjectId(agencyId),
      },
    },
    {
      $limit: 1,
    },
  ]);
  return topClients;
};

const getTopClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const topClients = await Client.aggregate([
    {
      $lookup: {
        from: 'agencies',
        localField: 'agencyId',
        foreignField: '_id',
        as: 'agency',
      },
    },
    {
      $sort: {
        totalBill: -1,
      },
    },
    {
      $project: {
        name: 1,
        totalBill: 1,
        agency: {
          name: 1,
        },
      },
    },
    {
      $limit: 1,
    },
  ]);
  return topClients;
};

const getAllClients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clients = await Client.find({});
  return clients;
};

export {
  createClient,
  createMultipleClientsforAnAgency,
  getClient,
  getTopClients,
  updateClient,
  getAllClients,
  getTopClient,
};
