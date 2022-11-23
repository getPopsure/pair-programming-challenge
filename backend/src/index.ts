import cors from 'cors';
import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const app = express();
const port = 4000;
const prisma = new PrismaClient();

app.use(cors());

app.use(express.json());

app.get('/policies', async (req, res) => {
  const { search } = req.query;
  const totalPolicies = await prisma.policy.count();
  const policiesPerPage = 10;

  const or: Prisma.PolicyWhereInput = search
    ? {
        OR: [
          { provider: { contains: search as string, mode: 'insensitive' } },
          {
            customer: {
              firstName: { contains: search as string, mode: 'insensitive' },
            },
          },
          {
            customer: {
              lastName: { contains: search as string, mode: 'insensitive' },
            },
          },
        ],
      }
    : {};

  const policies = await prisma.policy.findMany({
    where: {
      ...or,
    },
    select: {
      id: true,
      provider: true,
      insuranceType: true,
      status: true,
      startDate: true,
      endDate: true,
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          dateOfBirth: true,
        },
      },
    },
    take: 10,
    skip: (+(req.query.page || 1) - 1) * policiesPerPage,
  });

  res.json({
    data: policies,
    totalPages: totalPolicies / policiesPerPage,
    policiesPerPage,
  });
});

app.patch('/customers/:customerId', async (req, res) => {
  const { customerId } = req.params;

  // we want to do additional validation, does email exist, is it the owner etc.
  await prisma.customer.update({
    where: { id: customerId },
    data: { email: req.body.email },
  });

  res.status(201).send('successful');
});

app.get('/', (req, res) => {
  res.send('Server is up and running 🚀');
});

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
});
