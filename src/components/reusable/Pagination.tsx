"use client"

import type React from "react"

interface PaginationProps {
  currentPage: number
  lastPage: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, lastPage, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    const endPage = Math.min(lastPage, startPage + maxPagesToShow - 1)

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(i)}>
            {i}
          </button>
        </li>,
      )
    }

    return pages
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            &laquo; Previous
          </button>
        </li>

        {renderPageNumbers()}

        <li className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === lastPage}
          >
            Next &raquo;
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
