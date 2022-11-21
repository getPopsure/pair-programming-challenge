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

export const policyMockHandler = (searchValue?: string) => rest.get(
  'http://localhost:4000/policies?search='+searchValue,
  (req, res, ctx) => {
    console.log(req)
    const searchInput = search.toLowerCase()
    const searchResult  = policyMockResponse.filter(policy => {

      return policy.customer.firstName.toLowerCase().include(searchResult) ||  
        policy.customer.lastName.toLowerCase().include(searchResult) || 
        policy.provider.toLowerCase().include(searchResult) 
    })
    return res(ctx.status(200), ctx.json(search ? searchResult : policyMockResponse));
  }
);
