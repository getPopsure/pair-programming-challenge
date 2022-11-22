import { useCallback, useEffect, useState } from "react";

import { Policy, PolicyStatus } from "./Policies.model";

import { Header } from "components/Header";
import { Table } from "components/Table";
import { SearchComponent } from "./SearchComponent";
import { NotFound } from "./NotFound";

export function processPolicies(
  policies: Policy[],
  status: PolicyStatus | undefined
) {
  const result = policies.filter((policy) => {
    if (status === undefined) {
      return true;
    }
    return policy.status === status;
  });
  return result;
}

export const Policies = () => {
  const [error, setError] = useState<string | undefined>();
  const [policies, setPolicies] = useState<Policy[] | undefined>();
  const [filtered, setFiltered] = useState<Policy[] | undefined>();
  const [status, setStatus] = useState(undefined);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPolicies = async () => {
      await fetch(`http://localhost:4000/policies?search=${query}`)
        .then((r) => r.json())
        .then((data) => {
          setPolicies(data);

          const processedData = processPolicies(data, status);
          setFiltered(processedData);
        })
        .catch((e) => setError(e.message));
    };

    fetchPolicies();

    // Component clean-up
    return () => {
      setPolicies([]);
      setError("");
    };
  }, [status, query]);

  const handleChangeStatus = useCallback((e) => {
    const value = e.target.value;
    console.log("value:", value);
    if (value === "") {
      setStatus(undefined);
    } else {
      setStatus(value);
    }
  }, []);

  const handleQuery = useCallback(async (query: string) => {
    setQuery(query);
  }, []);

  if (!error && !policies) return <p>Loading...</p>;

  if (error)
    return <p className="text-red-500">Error loading policies: {error}</p>;

  const isEmptyPolicies = policies!.length === 0;
  return (
    <div>
      <SearchComponent onChange={handleQuery} />
      <select name="status" onChange={handleChangeStatus}>
        <option value="">ALL</option>
        <option value="ACTIVE">ACTIVE</option>
        <option value="PENDING">PENDING</option>
        <option value="CANCELLED">CANCELLED</option>
        <option value="DROPPED_OUT">DROPPED_OUT</option>
      </select>
      {isEmptyPolicies ? (
        <NotFound />
      ) : (
        <>
          <Header>Policies</Header>
          <Table policies={filtered} />
        </>
      )}
    </div>
  );
};
