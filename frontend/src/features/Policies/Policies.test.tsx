import { render, screen, waitFor } from '@testing-library/react';
import { Policies } from './Policies';
import { server } from 'mocks/server';
import { rest } from 'msw';
import { filteredCustomer, validCustomer } from './Policies.mocks';
import userEvent from '@testing-library/user-event';

describe('Features/Policies', () => {
  test('shows a loading state', () => {
    render(<Policies />);
    screen.getByText(/loading/i);
  });

  test('should correctly display a list of policies', async () => {
    render(<Policies />);
    await waitFor(() =>
      screen.getByText(`${validCustomer.firstName}`, { exact: false })
    );
  });

  test('should correctly display a list of filtered policies', async () => {
    render(<Policies />);
    await waitFor(() => {
      screen.getByText(`${filteredCustomer.firstName}`, { exact: false });
      expect(screen.getAllByTestId('table-row')).toHaveLength(2);
    });

    await userEvent.type(screen.getByTestId('search-input'), 'D');

    await waitFor(() => {
      expect(screen.getAllByTestId('table-row')).toHaveLength(1);
    });
  });

  test('should correctly display a empty results message', async () => {
    render(<Policies />);

    await waitFor(() => {
      screen.getByText(`${validCustomer.firstName}`, { exact: false });
    });

    await userEvent.type(screen.getByTestId('search-input'), 'A');

    await waitFor(() => {
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
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
