import { useEffect, useState } from 'react';

import { Policy, PolicyStatus } from './Policies.model';

import { Header } from 'components/Header';
import { Table } from 'components/Table';
import { Filters } from 'components/Filter';

export const Policies = () => {
  const [error, setError] = useState<string | undefined>();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [policiesFiltered, setPoliciesFiltered] = useState<Policy[]>([]);
  const [policyStatuses, setPolicyStatuses] = useState<PolicyStatus[]>([]);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [policyFilter, setPolicyFilter] = useState<PolicyStatus | "">("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPolicies = async (nameFilter: string) => {
      setLoading(true);
      setError('');

      const url = nameFilter ? `http://localhost:4000/policies?search=${nameFilter}` : 'http://localhost:4000/policies';
      try {
        const r = await fetch(url);
        const data: Policy[] = await r.json();
        setPolicies(data);
        setPolicyStatuses(data.reduce<PolicyStatus[]>((acc, policy) => {
          if(!acc.includes(policy.status)) {
            acc.push(policy.status);
          }
          return acc;
        }, []));
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
      setPolicyStatuses([]);
      setError('');
    };
  }, [nameFilter]);

  useEffect(() => {
    setPoliciesFiltered(policyFilter ? policies.filter(policy => policy.status === policyFilter) : policies);

    // Component clean-up
    return () => {
      setPoliciesFiltered([]);
    };
  }, [policies, policyFilter]);

  if (error)
    return <p className="text-red-500">Error loading policies: {error}</p>;

  return (
    <div>
      <Header>Policies</Header>
      <Filters onNameChange={value => setNameFilter(value)} onPolicyStatusChange={value => setPolicyFilter(value)} policyStatuses={policyStatuses} selectedPolicyStatus={policyFilter}/>
      <Table policies={policiesFiltered} isLoading={loading} />
    </div>
  );
};
