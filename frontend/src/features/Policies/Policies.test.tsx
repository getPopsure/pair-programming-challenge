import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Policies } from './Policies';
import { server } from 'mocks/server';
import { rest } from 'msw';
import { policiesForFilteringResponse, policiesForFilteringResponseProcessed, validCustomer } from './Policies.mocks';

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

  test('should correctly handle errors', async () => {
    server.use(
      rest.get('http://localhost:4000/policies', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Policies />);
    await waitFor(() => screen.getByText(/error/i));
  });

  test('should correctly filter policies', async () => {
    const nameFilter = 'Sam';
    server.use(
      rest.get(`http://localhost:4000/policies`, (req, res, ctx) => {
        return res(ctx.json(policiesForFilteringResponse));
      })
    );

    render(<Policies />);
    const tableEl = await waitFor(() => screen.getByTestId("policies_list_table"));
    expect(tableEl.querySelectorAll("tr").length).toEqual(4);

    server.use(
      rest.get(`http://localhost:4000/policies?search=${nameFilter}`, (req, res, ctx) => {
        return res(ctx.json(policiesForFilteringResponseProcessed));
      })
    );

    const nameFilterEl = await waitFor(() => screen.getByTestId("customer_name"));
    fireEvent.change(nameFilterEl, {target: {value: nameFilter}});
    await waitFor(() => screen.getByText("Loading..."));
    const tableElFiltered = await waitFor(() => screen.getByTestId("policies_list_table"));
    expect(tableElFiltered.querySelectorAll("tr").length).toEqual(3);
  });
});
