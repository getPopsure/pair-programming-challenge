import { useEffect, useState, useCallback } from 'react';

import { Policy } from './Policies.model';
import {SearchInput} from 'components/SearchInput'
import {EmptyState} from 'components/EmptyState'
import { Header } from 'components/Header';
import { Table } from 'components/Table';

export const Policies = () => {
  const [error, setError] = useState<string | undefined>();
  const [policies, setPolicies] = useState<Policy[] | undefined>();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchPolicies = async () => {
      await fetch(`http://localhost:4000/policies?search=${searchInput}`)
        .then((r) => {
          console.log(r)
          return r.json()
        })
        .then((data) => {
          console.warn(data)
          return setPolicies(data)
        })
        .catch((e) => setError(e.message));
    };

    fetchPolicies();

    // Component clean-up
    return () => {
      setPolicies([]);
      setError('');
    };
  }, [searchInput]);

  const handleSearchInputChange = useCallback((value: string) => {
    // trigger our search here
    // TODO: call need to be debounced
    const trimmedValue = value.trim()
    if(trimmedValue)
      setSearchInput(trimmedValue)
  }, [])

  if (!error && !policies) return <p>Loading...</p>;

  if (error)
    return <p className="text-red-500">Error loading policies: {error}</p>;

  return (
    <div>
      <Header>Policies</Header>
      <SearchInput onChange={handleSearchInputChange} />
      {
        policies?.length === 0 ? <EmptyState />: <Table policies={policies} />
      }
    </div>
  );
};
