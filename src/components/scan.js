import React, { useState, useEffect } from "react"
import Pagination from "./pagination"
import ScanTable from "./scan-table"

const Scan = ({ scanType }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [scanData, setScanData] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(50)

  const apiBaseUrl = `https://site-scanning.app.cloud.gov/api/v1/scans/`

  const fetchScanData = async () => {
    const req = new Request(`${apiBaseUrl}${scanType}?page=${currentPage}`, {
      method: "GET",
    })
    const resp = await fetch(req)
    const json = await resp.json()
    setScanData(json)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchScanData()
  }, [recordsPerPage, currentPage])

  const handlePageNav = newPageNumber => {
    setCurrentPage(newPageNumber)
  }

  return isLoading ? (
    <p>Loading…</p>
  ) : (
    <>
      <ScanTable scanType={scanType} scanData={scanData} />
      <Pagination
        currentPageNumber={currentPage}
        handlePageNav={handlePageNav}
      />
    </>
  )
}

export default Scan
