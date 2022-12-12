import { rest } from 'msw';

export const validCustomer = {
  firstName: 'Cyrillus',
  lastName: 'Biddlecombe',
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
];

export const policiesForFilteringResponse = [
  {
    'id': '8abe3d75-5925-492a-b212-eba05afdbd2f',
    'provider': 'BARMER',
    'insuranceType': 'LIABILITY',
    'status': 'ACTIVE',
    'startDate': '2014-04-14T12:39:02.000Z',
    'endDate': null,
    'customer': {
      'id': '65eb4d01-684e-4d23-99d4-8ef3a62c5fd7',
      'firstName': 'Sam',
      'lastName': 'Penni',
      'dateOfBirth': '2002-03-24T11:34:21.000Z',
    },
  },
  {
    'id': '7b253c29-cf25-46ff-bea4-0e2263848d5d',
    'provider': 'BARMER',
    'insuranceType': 'LIABILITY',
    'status': 'ACTIVE',
    'startDate': '2014-04-14T12:39:02.000Z',
    'endDate': null,
    'customer': {
      'id': '033fafad-1177-42b4-badb-2d6b400ac11d',
      'firstName': 'Sam',
      'lastName': 'Penni',
      'dateOfBirth': '2002-03-24T11:34:21.000Z',
    },
  },
  {
    'id': 'de8ddd17-1eb6-4429-af55-46b8ab5c7c8a',
    'provider': 'AOK',
    'insuranceType': 'HEALTH',
    'status': 'PENDING',
    'startDate': '2020-05-02T05:53:46.000Z',
    'endDate': null,
    'customer': {
      'id': 'ae0079e1-6b22-4c3a-a6ef-ac91e41f2405',
      'firstName': 'Flossie',
      'lastName': 'Camings',
      'dateOfBirth': '2004-06-15T14:20:52.000Z',
    },
  }];

export const policiesForFilteringResponseProcessed = [
  {
    'id': '8abe3d75-5925-492a-b212-eba05afdbd2f',
    'provider': 'BARMER',
    'insuranceType': 'LIABILITY',
    'status': 'ACTIVE',
    'startDate': '2014-04-14T12:39:02.000Z',
    'endDate': null,
    'customer': {
      'id': '65eb4d01-684e-4d23-99d4-8ef3a62c5fd7',
      'firstName': 'Sam',
      'lastName': 'Penni',
      'dateOfBirth': '2002-03-24T11:34:21.000Z',
    },
  },
  {
    'id': '7b253c29-cf25-46ff-bea4-0e2263848d5d',
    'provider': 'BARMER',
    'insuranceType': 'LIABILITY',
    'status': 'ACTIVE',
    'startDate': '2014-04-14T12:39:02.000Z',
    'endDate': null,
    'customer': {
      'id': '033fafad-1177-42b4-badb-2d6b400ac11d',
      'firstName': 'Sam',
      'lastName': 'Penni',
      'dateOfBirth': '2002-03-24T11:34:21.000Z',
    },
  }
]

export const policyMockHandler = rest.get(
  'http://localhost:4000/policies',
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(policyMockResponse));
  },
);
