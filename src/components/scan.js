import React, { useState, useEffect } from "react"
import Pagination from "./pagination"
import ScanTable from "./scan-table"
import QueryForm from "./query-form"

const Scan = ({ scanType, columns }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [scanData, setScanData] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [privacyPresent, setPrivacyPresent] = useState(200)
  const [agencies, setAgencies] = useState([])

  const [queryParams, setQueryParams] = useState({
    page: currentPage,
    data: {
      status_code: privacyPresent,
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

  const apiBaseUrl = `https://site-scanning.app.cloud.gov/api/v1/`

  useEffect(() => {
    const fetchAgencies = async () => {
      const resp = await fetch(`${apiBaseUrl}lists/${scanType}/agencies/`)
      setAgencies(await resp.json())
    }
    fetchAgencies()
  }, [scanType])

  const extractSelectedColumns = columns => queryObj => {
    return columns.map(c => queryObj[c] || queryObj.data[c])
  }

  const fetchScanData = async () => {
    const flatQueryObj = flattenObject(queryParams)
    const queryString = Object.entries(flatQueryObj)
      .map(entry => entry.join("="))
      .join("&")

    const req = new Request(`${apiBaseUrl}scans/${scanType}/?${queryString}`, {
      method: "GET",
    })
    const resp = await fetch(req)
    const json = await resp.json()
    setScanData(json.results.map(extractSelectedColumns(columns)))
    setIsLoading(false)
  }

  useEffect(() => {
    fetchScanData()
  }, [currentPage, privacyPresent])

  const handlePageNav = newPageNumber => {
    setCurrentPage(newPageNumber)
    setQueryParams(oldParams =>
      Object.assign(oldParams, { page: newPageNumber })
    )
  }

  const handleFilterQuery = newQuery => {
    setPrivacyPresent(newQuery)
    setQueryParams(Object.assign(queryParams, newQuery))
  }

  return isLoading ? (
    <p>Loading…</p>
  ) : (
      <>
        <QueryForm agencies={agencies} handleFilterQuery={handleFilterQuery} />
        <Pagination
          currentPageNumber={currentPage}
          handlePageNav={handlePageNav}
        />
        <ScanTable scanType={scanType} scanData={scanData} columns={columns} />
        <Pagination
          currentPageNumber={currentPage}
          handlePageNav={handlePageNav}
        />
      </>
    )
}

export default Scan
