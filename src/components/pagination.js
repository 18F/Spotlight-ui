import React from "react"

const Pagination = ({ currentPageNumber, handlePageNav }) => {
  return (
    <nav>
      <button
        onClick={() => handlePageNav(currentPageNumber - 1)}
        disabled={currentPageNumber === 1}
      >
        Prev
      </button>
      <button onClick={() => handlePageNav(currentPageNumber + 1)}>Next</button>
    </nav>
  )
}

export default Pagination
