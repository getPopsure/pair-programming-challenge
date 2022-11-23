import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Policies } from './Policies';
import { server } from 'mocks/server';
import { rest } from 'msw';
import { validCustomer } from './Policies.mocks';

describe('Features/Policies', () => {
  test('shows a loading state', () => {
    render(<Policies />);
    screen.getByText(/loading/i);
  });

  test('should correctly display a list of policies', async () => {
    render(<Policies />);
    await waitFor(() => screen.getByText(`${validCustomer.firstName}`, { exact: false }));
  });

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

describe('Policy Details', () => {
  test('policy details loads', async () => {
    // request is successful
    server.use(
      rest.get('http://localhost:4000/policies', (req, res, ctx) => {
        // return res();
      })
    );

    render(<Policies />);
    await waitFor(() => screen.getByText(`${validCustomer.firstName}`, { exact: false }));

    fireEvent.click(screen.getByText('View Details'));

    await waitFor(() => screen.getByText('Customer Name'));
    await waitFor(() => screen.getByText('Provider'));
  });
});
