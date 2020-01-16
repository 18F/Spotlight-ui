import React, { useState, useEffect, Suspense } from "react"

const Scan = ({ scanType }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [scanData, setScanData] = useState({})
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
    <Paginator>
      <ScanTable scanType={scanType} scanData={scanData} />
    </Paginator>
  )
}

const ScanTable = ({ scanType, scanData }) => {
  let data = scanData[scanType]
  const numRecords = data.length
  const recordsPerPage = 10
  data = data.slice(0, 30)
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

const Paginator = ({ children }) => {
  const numRecords = 400
  const recordsPerPage = 10
  const numPages = Math.ceil(numRecords / recordsPerPage)
  const pageNumbers = []

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
