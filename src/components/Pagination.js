import React from 'react';
import './Pagination.css';

const Pagination = ({ page, totalPages, onPrevPage, onNextPage }) => {
  return (
    <div className="pagination">
      <button onClick={onPrevPage} disabled={page === 1}>
        Prev
      </button>
      <span>{`${page} of ${totalPages}`}</span>
      <button onClick={onNextPage} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
