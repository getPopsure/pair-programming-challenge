import { PolicyStatus } from 'features/Policies';
import { ChangeEvent } from 'react';

interface FiltersProps {
  onStatusChange?: (value: PolicyStatus | '') => void;
  value?: PolicyStatus | '';
}

const isPolicyStatus = (value: any) => {
  if (['ACTIVE', 'PENDING', 'CANCELLED', 'DROPPED_OUT', ''].includes(value)) {
    return value;
  }
};

export const Filters = ({ onStatusChange, value }: FiltersProps) => {
  const handleOnStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    return onStatusChange?.(isPolicyStatus(event?.target?.value));
  };

  const clearFilters = () => onStatusChange?.('');

  return (
    <div className="grid grid-cols-6 gap-2 my-4">
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="countries"
        onChange={handleOnStatusChange}
        value={value}
      >
        <option value="">Status</option>
        <option value="ACTIVE">Active</option>
        <option value="PENDING">Pending</option>
        <option value="DROPPED_OUT">Dropped Out</option>
        <option value="CANCELLED">Cancelled</option>
      </select>

      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-3 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};
