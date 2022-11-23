import { Policy } from 'features/Policies';
import { useState } from 'react';
import { EmailModal } from '../EmailModal/EmailModal';
import { PolicyDetails } from '../PolicyDetails/PolicyDetail';
import { TablePagination } from './TablePagination';

import { TableRow } from './TableRow';

interface TableProps {
  policies?: Policy[];
  selectedPolicy: Policy | null;
  setSelectedPolicy: React.Dispatch<React.SetStateAction<Policy | null>>;
  pages: number[];
  currPage: number;
  onPageClick: (page: number) => void;
  onNextClick: (event: React.MouseEvent<HTMLElement>) => void;
  onPrevClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Table = ({ policies, selectedPolicy, setSelectedPolicy, pages, currPage, onNextClick, onPageClick, onPrevClick }: TableProps) => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  if (!policies) return <p>No results</p>;

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg shadow-sm">
            <EmailModal showEmailModal={showEmailModal} setShowEmailModal={setShowEmailModal} selectedPolicy={selectedPolicy} />
            <PolicyDetails {...{ showDetailsModal, setShowDetailsModal, selectedPolicy }} />

            <table className="min-w-full">
              <thead className="border-b bg-gray-100">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Name
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Provider
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Type
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Status
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {policies.map((policy: Policy) => (
                  <TableRow key={policy.id} row={policy} setShowModal={setShowEmailModal} {...{ setSelectedPolicy, setShowDetailsModal }} />
                ))}
              </tbody>
            </table>
          </div>
          <TablePagination {...{ pages, currPage, onNextClick, onPageClick, onPrevClick }} />
        </div>
      </div>
    </div>
  );
};
