import { useEffect, useState } from 'react';

import { Policy } from './Policies.model';

import { Header } from 'components/Header';
import { Table } from 'components/Table';
import { Filter } from 'components/Filter';

export const Policies = () => {
  const [error, setError] = useState<string | undefined>();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPolicies = async (nameFilter: string) => {
      setLoading(true);
      setError('');

      const url = nameFilter ? `http://localhost:4000/policies?search=${nameFilter}` : 'http://localhost:4000/policies';
      try {
        const r = await fetch(url);
        const data = await r.json();
        setPolicies(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies(nameFilter);

    // Component clean-up
    return () => {
      setPolicies([]);
      setError('');
    };
  }, [nameFilter]);

  if (error)
    return <p className="text-red-500">Error loading policies: {error}</p>;

  return (
    <div>
      <Header>Policies</Header>
      <Filter onChange={value => setNameFilter(value)}/>
      <Table policies={policies} isLoading={loading} />
    </div>
  );
};
