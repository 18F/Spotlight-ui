import React, { useState, useEffect } from "react"
import Pagination from "./pagination"
import ScanTable from "./scan-table"
import QueryForm from "./query-form"

const Scan = ({ scanType }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [scanData, setScanData] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(50)
  const [privacyPageQuery, setPrivacyPageQuery] = useState("*")

  const [queryParams, setQueryParams] = useState({
    page: currentPage,
    data: {
      status_code: privacyPageQuery,
    },
  })

  const flattenObject = (obj, prefix = "") =>
    Object.keys(obj).reduce((acc, k) => {
      const pre = prefix.length ? prefix + "." : ""
      if (typeof obj[k] === "object")
        Object.assign(acc, flattenObject(obj[k], pre + k))
      else acc[pre + k] = obj[k]
      return acc
    }, {})

  const apiBaseUrl = `https://site-scanning.app.cloud.gov/api/v1/scans/`

  const fetchScanData = async () => {
    const flatQueryObj = flattenObject(queryParams)
    const queryString = Object.entries(flatQueryObj)
      .map(entry => entry.join("="))
      .join("&")

    console.log(`${apiBaseUrl}${scanType}/?${queryString}`)
    const req = new Request(`${apiBaseUrl}${scanType}/?${queryString}`, {
      method: "GET",
    })
    const resp = await fetch(req)
    const json = await resp.json()
    setScanData(json)
    setIsLoading(false)
  }

  const { page } = queryParams

  useEffect(() => {
    fetchScanData()
    console.log(scanData)
  }, [currentPage, privacyPageQuery])

  const handlePageNav = newPageNumber => {
    setQueryParams(oldParams =>
      Object.assign(oldParams, { page: newPageNumber })
    )
    setCurrentPage(newPageNumber)
  }

  const handleFilterQuery = newQuery => {
    setPrivacyPageQuery(newQuery)
    setQueryParams(Object.assign(queryParams, newQuery))
  }

  return isLoading ? (
    <p>Loading…</p>
  ) : (
    <>
      <QueryForm handleFilterQuery={handleFilterQuery} />
      <ScanTable scanType={scanType} scanData={scanData} />
      <Pagination
        currentPageNumber={currentPage}
        handlePageNav={handlePageNav}
      />
    </>
  )
}

export default Scan
