import { useEffect, useMemo, useState } from 'react';
import { PaginatedPolicies, Policy } from './Policies.model';
import { Header } from 'components/Header';
import { Table } from 'components/Table';

/**
 * {
 *    pages: total pages
 *    size_per_page
 *    data: policies[]
 *    currPage
 * }
 * @returns
 */

export const Policies = () => {
  const [error, setError] = useState<string | undefined>();
  const [policies, setPolicies] = useState<PaginatedPolicies | undefined>();

  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const [page, setPage] = useState(1);
  const onNextClick = () => setPage((page) => page + 1);
  const onPrevClick = () => setPage((page) => (page -= 1));
  const onPageClick = (page: number) => setPage(page);

  useEffect(() => {
    const fetchPolicies = async () => {
      await fetch(`http://localhost:4000/policies?page=${page}`)
        .then((r) => r.json())
        .then((data) => setPolicies(data))
        .catch((e) => setError(e.message));
    };

    fetchPolicies();

    // Component clean-up
    return () => {
      setPolicies(undefined);
      setError('');
      setSelectedPolicy(null);
    };
  }, [page]);

  const getPolicyPages = useMemo(() => {
    if (!!policies) {
      let pages = Array.from(Array(policies?.totalPages).keys()).map((el) => el + 1);

      if (pages.length > 5) {
        pages = pages.slice(page - 1, page + 5);
      }

      return pages;
    }

    return [];
  }, [policies, page]);

  if (!error && !policies) return <p>Loading...</p>;

  if (error) return <p className="text-red-500" id="policies-error">Error loading policies: {error}</p>;

  return (
    <div>
      <Header>Policies</Header>
      {policies && <Table policies={policies.data} {...{ selectedPolicy, setSelectedPolicy, pages: getPolicyPages, currPage: page, onNextClick, onPageClick, onPrevClick }} />}
    </div>
  );
};
