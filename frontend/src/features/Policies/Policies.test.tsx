import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { Policies } from './Policies';
import { server } from 'mocks/server';
import { rest } from 'msw';
import { validCustomer, policyMockHandler, policyMockResponse } from './Policies.mocks';

describe('Features/Policies', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('shows a loading state', () => {
    render(<Policies />);
    screen.getByText(/loading/i);
  });

  test('should correctly display a list of policies', async () => {
    server.use(rest.get('http://localhost:4000/policies',
      (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(policyMockResponse));
      }
    ))

    render(<Policies />);

    // screen.debug()
    await waitFor(() =>
      screen.getByText(`${validCustomer.firstName}`, { exact: false })
    );
  });

  test('should display the correct when search', async () => {
    render(<Policies />);
    const searchValue = "bar"
    
    server.use(policyMockHandler(searchValue))

    await waitFor(() =>
      screen.getByText(`${validCustomer.firstName}`, { exact: false })
    );

    act(() => {
      fireEvent.change({
        target: {
          value: searchValue
        }
      })
    })

    expect(screen.getByTestId('search-policy').value).toEqual('bar')
    await waitFor(() =>
      screen.getByText('BARMER')
    );

  })

  test('should correctly handle errors', async () => {
    server.use(
      rest.get('http://localhost:4000/policies', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Policies />);
    await waitFor(() => screen.getByText(/error/i));
  });
});
