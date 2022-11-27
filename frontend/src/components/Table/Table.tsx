import React from 'react';

import { Policy } from 'features/Policies';
import { TableRow } from './TableRow';

const TableRowCached = React.memo(TableRow);

interface TableProps {
  policies: Policy[];
  isLoading: boolean;
}

export const Table = ({ policies, isLoading }: TableProps) => {
  if (isLoading) return <p>Loading...</p>;
  if (policies.length === 0) return <p>No results</p>;

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg shadow-sm">
            <table className="min-w-full">
              <thead className="border-b bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Provider
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {policies.map((policy: Policy) => (
                  <TableRowCached key={policy.id} row={policy} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
