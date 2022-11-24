import { rest } from 'msw';

export const validCustomer = {
  firstName: 'Cyrillus',
  lastName: 'Biddlecombe',
};

export const filteredCustomer = {
  firstName: 'Diogo',
  lastName: 'Mateus',
};

export const policyMockResponse = [
  {
    id: 'cd5613c6-ab2d-4985-a129-5efe711c368f',
    provider: 'BARMER',
    insuranceType: 'HEALTH',
    status: 'PENDING',
    startDate: '2017-04-26T05:32:06.000Z',
    endDate: null,
    customer: {
      id: '980e1c21-ae5a-404a-a200-5a8a030a8721',
      dateOfBirth: '1978-12-03T06:33:17.000Z',
      ...validCustomer,
    },
  },
  {
    id: 'cd5613c6-ab2d-4985-a129-5efe711c368d',
    provider: 'AOK',
    insuranceType: 'LIABILITY',
    status: 'ACTIVE',
    startDate: '2017-04-26T05:32:06.000Z',
    endDate: null,
    customer: {
      id: '980e1c21-ae5a-404a-a200-5a8a030a8721',
      dateOfBirth: '1978-12-03T06:33:17.000Z',
      ...filteredCustomer,
    },
  },
];

export const policyMockHandler = rest.get(
  'http://localhost:4000/policies',
  (req, res, ctx) => {
    const search = req.url.searchParams.get('search');
    const filteredResponse = policyMockResponse.filter(({ customer }) => {
      return customer.firstName.startsWith(String(search));
    });

    return res(ctx.status(200), ctx.json(filteredResponse));
  }
);
