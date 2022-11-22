import { render, screen, waitFor } from "@testing-library/react";
import { Policies, processPolicies } from "./Policies";
import { server } from "mocks/server";
import { rest } from "msw";
import { validCustomer } from "./Policies.mocks";

describe("Features/Policies", () => {
  test("shows a loading state", () => {
    render(<Policies />);
    screen.getByText(/loading/i);
  });

  test("should correctly display a list of policies", async () => {
    render(<Policies />);
    await waitFor(() =>
      screen.getByText(`${validCustomer.firstName}`, { exact: false })
    );
  });

  test("should correctly handle errors", async () => {
    server.use(
      rest.get("http://localhost:4000/policies", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Policies />);
    await waitFor(() => screen.getByText(/error/i));
  });

  test("filter array by the status", () => {
    const barmer1 = {
      id: "1902218f-118f-46de-9128-c4ae44bf6d17",
      provider: "BARMER",
      insuranceType: "LIABILITY",
      status: "PENDING",
      startDate: new Date(),
      endDate: null,
      customer: {
        id: "1a47a61d-55a3-4485-8936-03b85fa5bbf4",
        firstName: "Brandy",
        lastName: "Harbour",
        dateOfBirth: new Date(),
      },
    } as const;
    const barmer2 = {
      id: "1902218f-118f-46de-9128-c4ae44bf6d18",
      provider: "BARMER",
      insuranceType: "LIABILITY",
      status: "ACTIVE",
      startDate: new Date(),
      endDate: null,
      customer: {
        id: "1a47a61d-55a3-4485-8936-03b85fa5bbf4",
        firstName: "Brandy",
        lastName: "Harbour",
        dateOfBirth: new Date(),
      },
    } as const;
    const data = processPolicies([barmer1, barmer2], undefined);
    expect(data).toEqual([barmer1, barmer2]);
  });

  test("filter array by the ACTIVE status", () => {
    const barmer1 = {
      id: "1902218f-118f-46de-9128-c4ae44bf6d17",
      provider: "BARMER",
      insuranceType: "LIABILITY",
      status: "PENDING",
      startDate: new Date(),
      endDate: null,
      customer: {
        id: "1a47a61d-55a3-4485-8936-03b85fa5bbf4",
        firstName: "Brandy",
        lastName: "Harbour",
        dateOfBirth: new Date(),
      },
    } as const;
    const barmer2 = {
      id: "1902218f-118f-46de-9128-c4ae44bf6d18",
      provider: "BARMER",
      insuranceType: "LIABILITY",
      status: "ACTIVE",
      startDate: new Date(),
      endDate: null,
      customer: {
        id: "1a47a61d-55a3-4485-8936-03b85fa5bbf4",
        firstName: "Brandy",
        lastName: "Harbour",
        dateOfBirth: new Date(),
      },
    } as const;
    const data = processPolicies([barmer1, barmer2], "ACTIVE");
    expect(data).toEqual([barmer2]);
  });
});
