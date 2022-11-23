import { Policy } from 'features/Policies';
import { Badge } from '../Badge';

interface TableRowProps {
  row: Policy;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPolicy: React.Dispatch<React.SetStateAction<Policy | null>>;
  setShowDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TableRow = ({ row, setShowModal, setSelectedPolicy, setShowDetailsModal }: TableRowProps) => {
  const onClickShowEmails = (event: React.MouseEvent<HTMLElement>) => {
    setSelectedPolicy(row);
    setShowModal(true);
  };

  const onClickShowDetails = (event: React.MouseEvent<HTMLElement>) => {
    setSelectedPolicy(row);
    setShowDetailsModal(true);
  };

  return (
    <tr className="border-b">
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {row.customer.firstName} {row.customer.lastName}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{row.provider}</td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{row.insuranceType}</td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <Badge status={row.status} />
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <button
          type="button"
          data-modal-toggle="authentication-modal"
          onClick={onClickShowEmails} // set current user
          className="mr-4"
        >
          Add Email
        </button>
        <button
          type="button"
          data-modal-toggle="authentication-modal"
          onClick={onClickShowDetails} // set current user
        >
          View Details
        </button>
      </td>
    </tr>
  );
};
