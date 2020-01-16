import React, { useState, useEffect } from "react"

const Scan = ({ scanType }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [scanData, setScanData] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(40)

  let startIndex = 0

  useEffect(() => {
    startIndex = startIndex + recordsPerPage * currentPage
  }, [recordsPerPage, currentPage])

  const apiBaseUrl = `https://site-scanning.app.cloud.gov/api/v1/scans/`

  const fetchScanData = async () => {
    const resp = await fetch(`${apiBaseUrl}${scanType}`)
    const json = await resp.json()

    setScanData(prevState => ({ ...prevState, [scanType]: json }))
    setIsLoading(false)
  }

  useEffect(() => {
    fetchScanData()
  }, [])

  return isLoading ? (
    <p>Loading…</p>
  ) : (
    <Paginator
      numRecords={scanData.length}
      recordsPerPage={recordsPerPage}
      startIndex={startIndex}
    >
      <ScanTable
        scanType={scanType}
        scanData={scanData[scanType].slice(
          startIndex,
          startIndex + recordsPerPage
        )}
      />
    </Paginator>
  )
}

const ScanTable = ({ scanType, scanData }) => {
  const headings = Object.keys(scanData[0])

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
          {scanData.map(d => (
            <ScanTableRow record={d} />
          ))}
        </tbody>
      </table>
    </>
  )
}

const Paginator = ({ children }) => {
  const numRecords = 400
  const recordsPerPage = 10
  const numPages = Math.ceil(numRecords / recordsPerPage)
  const pageNumbers = []
  const startIndex = 0

  for (let i = 1; i <= numPages; i++) pageNumbers.push(i)

  return (
    <>
      {children}
      <ul>
        {pageNumbers.map(num => (
          <li>{num}</li>
        ))}
      </ul>
    </>
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
