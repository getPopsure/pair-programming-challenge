import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { Policy } from './Policies.model';

import { Header } from 'components/Header';
import { Table } from 'components/Table';
import { NoResultsFound } from 'components/NoResultsFound';

export const Policies = () => {
  const [error, setError] = useState<string | undefined>();
  const [policies, setPolicies] = useState<Policy[] | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchPolicies = async () => {
      await fetch('http://localhost:4000/policies')
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
  }, []);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  };

  const memoizedFilteredPolicies = useMemo(() => {
    if (policies)
      return [...policies].filter(
        (policy) =>
          policy.customer.firstName.toLowerCase().includes(searchQuery) ||
          policy.customer.lastName.toLowerCase().includes(searchQuery) ||
          policy.provider.toLowerCase().includes(searchQuery) ||
          policy.insuranceType.toLowerCase().includes(searchQuery) ||
          policy.status.toLowerCase().includes(searchQuery)
      );
  }, [searchQuery, policies]);

  if (!error && !policies) return <p>Loading...</p>;

  if (error)
    return <p className="text-red-500">Error loading policies: {error}</p>;

  return (
    <div>
      <Header>Policies</Header>
      <input
        className="flex flex-1 my-2 py-2 px-2"
        type="search"
        placeholder="Search policies..."
        onChange={(e) => handleSearchInput(e)}
      ></input>
      {memoizedFilteredPolicies?.length ? (
        <Table policies={memoizedFilteredPolicies} />
      ) : (
        <NoResultsFound />
      )}
    </div>
  );
};
