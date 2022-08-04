import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swajgerUiExpress from 'swagger-ui-express';
import { NotFoundError } from './errors';
import { errorHandler } from './middlewares';
import { apiKeyRouter } from './controllers/apiKey/api-key-controller';
import { createAgencyRouter } from './controllers/agency/create-agency';
import { createAgencyWithClientsRouter } from './controllers/agency/create-agency-with-clients';
import { createClientRouter } from './controllers/client/create-client';
import { getClientRouter } from './controllers/client/get-clients';
import { updateClientRoute } from './controllers/client/update-client';
import { getAllClientsRouter } from './controllers/client/get-client';
import { getAllAgenciesRouter } from './controllers/agency/get-agencies';
import { getAgency } from './services/agency/agency-service';
import { getAgencyRouter } from './controllers/agency/get-agency';
import { getTopClients } from './controllers/client/get-top-clients';
import { getTopClient } from './controllers/client/get-top-client';

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'Assignment API Documentation',
      version: '1.0.0',
      description: 'Assignment API Documentation',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  apis: [
    'src/controllers/apiKey/*.ts',
    'src/controllers/agency/*.ts',
    'src/controllers/client/*.ts',
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use(json());
app.use(
  '/api/v1/docs',
  swajgerUiExpress.serve,
  swajgerUiExpress.setup(swaggerDocs)
);

app.use(apiKeyRouter);

app.use(createAgencyRouter);
app.use(createAgencyWithClientsRouter);
app.use(getAllAgenciesRouter);
app.use(getAgencyRouter);

app.use(createClientRouter);
app.use(getClientRouter);
app.use(updateClientRoute);
app.use(getAllClientsRouter);
app.use(getTopClients);
app.use(getTopClient);

app.all('*', (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
