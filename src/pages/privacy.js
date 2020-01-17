import React, { useState, useEffect } from "react"

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
      <Paginator
        currentPageNumber={currentPage}
        handlePageNav={handlePageNav}
      />
    </>
  )
}

const ScanTable = ({ scanType, scanData }) => {
  const data = scanData.results
  const headings = Object.keys(data[0])

  return (
    <>
      <table>
        <thead>
          <tr>
            {headings.map(h => (
              <th scope="col">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <ScanTableRow record={d} />
          ))}
        </tbody>
      </table>
    </>
  )
}

const Paginator = ({ currentPageNumber, handlePageNav }) => {
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

const ScanTableRow = ({ record }) => {
  return (
    <tr>
      {Object.values(record).map(v => (
        <td>{typeof v === "string" ? v : JSON.stringify(v)}</td>
      ))}
    </tr>
  )
}

export default () => (
  <>
    <h1>Information for Privacy Officers</h1>
    <Scan scanType={"privacy"} />
  </>
)
