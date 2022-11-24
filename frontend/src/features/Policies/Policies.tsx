import { useEffect, useState } from 'react';

import { Policy, PolicyStatus } from './Policies.model';

import { Header } from 'components/Header';
import { Table } from 'components/Table';
import { SearchInput } from 'components/SearchInput';
import { stringify } from 'query-string';
import { Filters } from 'components/Filters';

// SearchInput
// - hook for filters
// - tests to the component and tests to the feature, hook

export const Policies = () => {
  const [error, setError] = useState<string | undefined>();
  const [policies, setPolicies] = useState<Policy[] | undefined>();
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<PolicyStatus | ''>('');

  useEffect(() => {
    const fetchPolicies = async () => {
      const urlParams = stringify({ search, status: statusFilter });
      await fetch(`http://localhost:4000/policies?${urlParams}`)
        .then((r) => r.json())
        .then((data) => setPolicies(data))
        .catch((e) => setError(e.message));
    };

    fetchPolicies();

    // Component clean-up
    return () => {
      setPolicies([]);
      setError('');
    };
  }, [search, statusFilter]);

  if (!error && !policies) return <p>Loading...</p>;

  if (error)
    return <p className="text-red-500">Error loading policies: {error}</p>;

  return (
    <div>
      <Header title="Policies">
        <SearchInput
          aria-label="Search for policy name"
          onValueChange={setSearch}
          placeholder="Search policy"
        />
      </Header>
      <Filters onStatusChange={setStatusFilter} value={statusFilter} />
      <Table policies={policies} />
    </div>
  );
};
