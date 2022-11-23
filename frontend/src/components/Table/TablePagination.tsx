type PaginationProps = {
  pages: number[];
  currPage: number;
  onPageClick: (page: number) => void;
  onNextClick: (event: React.MouseEvent<HTMLElement>) => void;
  onPrevClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export const TablePagination = function ({ pages, currPage, onNextClick, onPageClick, onPrevClick }: PaginationProps) {
  return (
    <div className="flex justify-center mt-5">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <button disabled={currPage === 1} onClick={onPrevClick} className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {pages.map((page) => {
            return (
              <li key={page} className="page-item">
                <button onClick={() => onPageClick(page)} disabled={currPage === page} className={`page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none ${currPage === page ? 'bg-blue-200' : ''}`}>
                  {page}
                </button>
              </li>
            );
          })}
          <li className="page-item">
            <button disabled={currPage === pages.length} onClick={onNextClick} className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
