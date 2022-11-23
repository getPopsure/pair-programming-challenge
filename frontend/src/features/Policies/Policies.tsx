import { useCallback, useEffect, useMemo, useState } from 'react';

import { Policy, PolicyStatus } from './Policies.model';

import { Header } from 'components/Header';
import { Table } from 'components/Table';
import { FilterPanel } from 'components/FilterPanel';
import { Message } from 'components/Message';

export const Policies = () => {
  const {
    hasError,
    message,
    policies,
    customerSearch,
    policyStatus,
    onPolicyStatus,
    onCustomerSearch,
  } = usePolicies();

  return (
    <div>
      <Header>Policies</Header>
      <FilterPanel
        onPolicyStatus={onPolicyStatus}
        policyStatus={policyStatus}
        customerSearch={customerSearch}
        onCustomerSearch={onCustomerSearch}
      />
      <Table policies={policies} />
      {message && <Message error={hasError} message={message} />}
    </div>
  );
};

const usePolicies = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>('Loading...');
  const [customerSearch, setCustomerSearch] = useState<string>('');
  const [policyStatus, setPolicyStatus] = useState<PolicyStatus | undefined>(
    undefined
  );
  const [policies, setPolicies] = useState<Policy[]>([]);

  const fetchPolicies = useCallback(async (search = '') => {
    await fetch(`http://localhost:4000/policies?search=${search.trim()}`)
      .then((r) => r.json())
      .then((data) => {
        setPolicies(data);
        setHasError(false);
        setMessage(data.length === 0 ? 'No results found' : null);
      })
      .catch((e) => {
        setHasError(true);
        setMessage(`Error loading policies: ${e.message}`);
      });
  }, []);

  const handleCustomerSearch = useCallback(
    (search) => {
      fetchPolicies(search);
      setCustomerSearch(search);
    },
    [fetchPolicies]
  );

  const handlePolicyStatus = useCallback((status) => {
    setPolicyStatus(status);
  }, []);

  const result = useMemo(() => {
    if (policies.length === 0) return [];
    let result = [...policies];
    if (policyStatus) {
      result = policies.filter((policy) => policy.status === policyStatus);
    }

    setMessage(result.length === 0 ? 'No results found' : null);

    return result;
  }, [policies, policyStatus]);

  useEffect(() => {
    fetchPolicies();

    // Component clean-up
    return () => {
      setPolicies([]);
      setHasError(false);
      setMessage(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    customerSearch,
    message,
    policies: result,
    loading: Boolean(message?.startsWith('Loading')),
    hasError,
    policyStatus,
    onCustomerSearch: handleCustomerSearch,
    onPolicyStatus: handlePolicyStatus,
  };
};
