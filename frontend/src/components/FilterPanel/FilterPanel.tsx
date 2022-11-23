import { PolicyStatus } from 'features/Policies';

export const FilterPanel = ({
  customerSearch,
  policyStatus,
  onCustomerSearch,
  onPolicyStatus,
}: {
  customerSearch: string;
  policyStatus?: PolicyStatus;
  onCustomerSearch: (search: string) => void;
  onPolicyStatus: (status: PolicyStatus) => void;
}) => {
  return (
    <div className="flex">
      <input
        aria-label="Search cutomer name"
        value={customerSearch}
        onChange={(e) => onCustomerSearch(e.target.value)}
        className="border border-gray-400 p-2"
        placeholder="Search cutomer name"
      />
      <select
        onChange={(e) => onPolicyStatus(e.target.value as PolicyStatus)}
        value={policyStatus || ''}
        aria-label="Select policy status"
      >
        <option value="">SELECT STATUS</option>
        <option value="ACTIVE">ACTIVE</option>
        <option value="PENDING">PENDING</option>
        <option value="CANCELLED">CANCELLED</option>
        <option value="DROPPED_OUT">DROPPED_OUT</option>
      </select>
    </div>
  );
};
